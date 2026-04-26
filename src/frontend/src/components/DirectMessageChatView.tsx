/**
 * DirectMessageChatView — 1-to-1 private chat.
 * Visually identical to InlineClanChat / ClanChatView.
 * Own messages: right-aligned, orange gradient.
 * Other's messages: left-aligned, white bubble.
 * Supports media upload (images) with background compression, same as ClanChatView.
 */
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { ArrowLeft, MessageSquare, Plus, Send } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { buildFileUrl } from "../file-storage/FileList";
import { useFileUpload } from "../file-storage/FileUpload";
import type { DirectMessage } from "../hooks/useQueries";
import { useDirectMessages, useSendDirectMessage } from "../hooks/useQueries";
import { compressImage } from "../utils/imageUtils";

// ─── Constants ──────────────────────────────────────────────────────────────────

const IMG_PREFIX = "[img]";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface OptimisticDM {
  tempId: string;
  text: string;
  timestamp: number;
  failed: boolean;
  /** local data-URL shown while image is uploading */
  localImgUrl?: string;
}

export interface DirectMessageChatViewProps {
  otherPrincipal: Principal;
  otherName: string;
  otherAvatar?: string;
  onBack: () => void;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(tsNs: bigint): string {
  const ms = Number(tsNs / BigInt(1_000_000));
  const d = new Date(ms);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

// ─── DirectMessageChatView ────────────────────────────────────────────────────

const DirectMessageChatView: React.FC<DirectMessageChatViewProps> = ({
  otherPrincipal,
  otherName,
  onBack,
}) => {
  const { identity } = useInternetIdentity();
  const myPrincipal = identity?.getPrincipal();
  const myPrincipalStr = myPrincipal?.toString() ?? "";

  const { data: serverMessages = [] } = useDirectMessages(otherPrincipal, true);
  const sendMutation = useSendDirectMessage();
  const { uploadFile } = useFileUpload();

  const [optimisticMsgs, setOptimisticMsgs] = useState<OptimisticDM[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Merge server messages + pending optimistic, sorted by time
  const allMessages: Array<
    | { kind: "server"; msg: DirectMessage }
    | { kind: "optimistic"; opt: OptimisticDM }
  > = [
    ...serverMessages.map((m) => ({ kind: "server" as const, msg: m })),
    ...optimisticMsgs
      .filter((o) => {
        // keep only optimistic messages that have not yet appeared server-side
        return !serverMessages.some(
          (m) =>
            m.senderId.toString() === myPrincipalStr &&
            m.text === o.text &&
            Number(m.timestamp) / 1_000_000 > o.timestamp - 10_000,
        );
      })
      .map((o) => ({ kind: "optimistic" as const, opt: o })),
  ].sort((a, b) => {
    const ta =
      a.kind === "server"
        ? Number(a.msg.timestamp) / 1_000_000
        : a.opt.timestamp;
    const tb =
      b.kind === "server"
        ? Number(b.msg.timestamp) / 1_000_000
        : b.opt.timestamp;
    return ta - tb;
  });

  // Clean confirmed optimistic messages
  useEffect(() => {
    if (serverMessages.length === 0) return;
    setOptimisticMsgs((prev) =>
      prev.filter(
        (o) =>
          !serverMessages.some(
            (m) =>
              m.senderId.toString() === myPrincipalStr &&
              m.text === o.text &&
              Number(m.timestamp) / 1_000_000 > o.timestamp - 10_000,
          ),
      ),
    );
  }, [serverMessages, myPrincipalStr]);

  // Auto-scroll on new messages
  const lastCountRef = useRef(0);
  useEffect(() => {
    if (allMessages.length !== lastCountRef.current) {
      lastCountRef.current = allMessages.length;
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  });

  // ── Text send ────────────────────────────────────────────────────────────────

  const handleSend = useCallback(async () => {
    const text = inputText.trim();
    if (!text || !myPrincipal) return;

    const tempId = `opt-${Date.now()}`;
    setOptimisticMsgs((prev) => [
      ...prev,
      { tempId, text, timestamp: Date.now(), failed: false },
    ]);
    setInputText("");

    try {
      await sendMutation.mutateAsync({ recipientId: otherPrincipal, text });
    } catch {
      setOptimisticMsgs((prev) =>
        prev.map((o) => (o.tempId === tempId ? { ...o, failed: true } : o)),
      );
    }
  }, [inputText, myPrincipal, otherPrincipal, sendMutation]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  // ── Media upload ─────────────────────────────────────────────────────────────

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !myPrincipal) return;
      e.target.value = "";

      const tempId = `opt-img-${Date.now()}`;

      // Compress in the background before upload
      let compressed: { blob: Blob; dataUrl: string };
      try {
        compressed = await compressImage(file);
      } catch {
        return;
      }

      const localImgUrl = compressed.dataUrl;

      // Show optimistic local preview immediately
      setOptimisticMsgs((prev) => [
        ...prev,
        {
          tempId,
          text: `${IMG_PREFIX}${localImgUrl}`,
          timestamp: Date.now(),
          failed: false,
          localImgUrl,
        },
      ]);

      try {
        const tsKey = Date.now();
        const path = `chat-images/dm-${myPrincipalStr.slice(0, 8)}-${tsKey}.jpg`;
        const arrayBuffer = await compressed.blob.arrayBuffer();
        const uint8 = new Uint8Array(arrayBuffer);
        await uploadFile(path, "image/jpeg", uint8);

        const remoteUrl = await buildFileUrl(path);
        const finalText = `${IMG_PREFIX}${remoteUrl}`;

        // Remove the local-preview optimistic entry before sending
        setOptimisticMsgs((prev) => prev.filter((o) => o.tempId !== tempId));
        await sendMutation.mutateAsync({
          recipientId: otherPrincipal,
          text: finalText,
        });
      } catch {
        setOptimisticMsgs((prev) =>
          prev.map((o) => (o.tempId === tempId ? { ...o, failed: true } : o)),
        );
      }
    },
    [myPrincipal, myPrincipalStr, otherPrincipal, uploadFile, sendMutation],
  );

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div
      className="fixed inset-0 flex flex-col bg-black"
      style={{ paddingBottom: "60px" }}
      data-ocid="dm_chat.page"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800 shrink-0">
        <button
          type="button"
          data-ocid="dm_chat.back_button"
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-black hover:border-orange-400 transition-colors shadow-sm shrink-0"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        {/* Avatar initials */}
        <div className="w-9 h-9 rounded-xl bg-orange-100 border border-orange-200 shrink-0 flex items-center justify-center font-black text-orange-600 text-sm shadow-sm">
          {getInitials(otherName)}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-black text-base truncate">
            {otherName}
          </h2>
          <p className="text-gray-500 text-xs">Private Chat</p>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto py-3 flex flex-col gap-1"
        data-ocid="dm_chat.messages_list"
      >
        {allMessages.length === 0 && (
          <div
            className="flex flex-col items-center justify-center flex-1 px-6 text-center"
            data-ocid="dm_chat.empty_state"
          >
            <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center mb-3">
              <MessageSquare size={22} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm font-medium">
              No messages yet.
            </p>
            <p className="text-gray-600 text-xs mt-1">Say hi to {otherName}!</p>
          </div>
        )}

        {allMessages.map((item) => {
          if (item.kind === "server") {
            const msg = item.msg;
            const isOwn = msg.senderId.toString() === myPrincipalStr;
            const isImg = msg.text.startsWith(IMG_PREFIX);
            const imgUrl = isImg ? msg.text.slice(IMG_PREFIX.length) : "";
            const timeStr = formatTime(msg.timestamp);

            if (isOwn) {
              return (
                <div
                  key={msg.id.toString()}
                  className="flex justify-end mb-1 px-3"
                  data-ocid={`dm_chat.message.${msg.id.toString()}`}
                >
                  <div className="max-w-[75%] min-w-0 overflow-hidden">
                    <div className="rounded-2xl rounded-tr-sm px-3 py-2 text-sm text-white shadow-md overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600">
                      {isImg ? (
                        <img
                          src={imgUrl}
                          alt="Shared"
                          className="max-w-full rounded-lg object-cover"
                          style={{ maxHeight: 240 }}
                        />
                      ) : (
                        <p
                          className="leading-snug text-white"
                          style={{
                            overflowWrap: "break-word",
                            wordBreak: "break-word",
                          }}
                        >
                          {msg.text}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-end gap-1 mt-0.5 pr-1">
                      <span className="text-[10px] text-gray-600">
                        {timeStr}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={msg.id.toString()}
                className="flex items-end gap-2 mb-1 px-3"
                data-ocid={`dm_chat.message.${msg.id.toString()}`}
              >
                <div className="w-8 h-8 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 font-black text-xs shrink-0 shadow-sm">
                  {getInitials(otherName)}
                </div>
                <div className="max-w-[75%] min-w-0 overflow-hidden">
                  <div className="flex items-baseline gap-1.5 mb-0.5 px-1">
                    <span className="text-xs font-bold text-orange-500 truncate max-w-[120px]">
                      {otherName}
                    </span>
                  </div>
                  <div className="rounded-2xl rounded-bl-sm px-3 py-2 text-sm bg-white border border-gray-200 text-black shadow-sm overflow-hidden">
                    {isImg ? (
                      <img
                        src={imgUrl}
                        alt="Shared"
                        className="max-w-full rounded-lg object-cover"
                        style={{ maxHeight: 240 }}
                      />
                    ) : (
                      <p
                        className="leading-snug text-black"
                        style={{
                          overflowWrap: "break-word",
                          wordBreak: "break-word",
                        }}
                      >
                        {msg.text}
                      </p>
                    )}
                  </div>
                  <div className="pl-1 mt-0.5">
                    <span className="text-[10px] text-gray-500">{timeStr}</span>
                  </div>
                </div>
              </div>
            );
          }

          // Optimistic message (text or image preview)
          const opt = item.opt;
          const isImg = opt.text.startsWith(IMG_PREFIX);
          // Use local preview URL if available, otherwise slice from text
          const imgUrl = isImg
            ? (opt.localImgUrl ?? opt.text.slice(IMG_PREFIX.length))
            : "";

          return (
            <div
              key={opt.tempId}
              className="flex justify-end mb-1 px-3"
              data-ocid="dm_chat.optimistic_message"
            >
              <div className="max-w-[75%] min-w-0 overflow-hidden">
                <div
                  className={`rounded-2xl rounded-tr-sm px-3 py-2 text-sm text-white shadow-md overflow-hidden ${
                    opt.failed
                      ? "bg-red-500"
                      : "bg-gradient-to-r from-orange-400 to-orange-500 opacity-70"
                  }`}
                >
                  {isImg ? (
                    <div className="relative">
                      <img
                        src={imgUrl}
                        alt="Shared"
                        className="max-w-full rounded-lg object-cover"
                        style={{ maxHeight: 240 }}
                      />
                      {!opt.failed && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/30">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <p
                      className="leading-snug text-white"
                      style={{
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                      }}
                    >
                      {opt.text}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-end gap-1 mt-0.5 pr-1">
                  {opt.failed ? (
                    <span className="text-[10px] text-red-400">Failed</span>
                  ) : (
                    <span className="text-[10px] text-gray-600">…</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        tabIndex={-1}
        onChange={handleFileChange}
      />

      {/* Input bar */}
      <div
        className="shrink-0 flex items-center gap-2 px-3 py-2.5 border-t border-gray-800"
        data-ocid="dm_chat.input_bar"
      >
        {/* Image upload button */}
        <button
          type="button"
          data-ocid="dm_chat.image_upload_button"
          onClick={handleImageButtonClick}
          aria-label="Upload image"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md transition-all duration-200 hover:scale-110 active:scale-95 shrink-0"
        >
          <Plus size={18} />
        </button>

        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message…"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={500}
          data-ocid="dm_chat.message_input"
          className="flex-1 min-w-0 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-black placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors shadow-sm"
          style={{
            fontSize: "16px",
            WebkitUserSelect: "text",
            userSelect: "text",
          }}
        />
        <button
          type="button"
          data-ocid="dm_chat.send_button"
          onClick={handleSend}
          disabled={!inputText.trim()}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shrink-0"
          aria-label="Send"
        >
          <Send size={17} />
        </button>
      </div>
    </div>
  );
};

export default DirectMessageChatView;
