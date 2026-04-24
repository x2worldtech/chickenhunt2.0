import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { ArrowLeft, Plus, Send } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { buildFileUrl } from "../file-storage/FileList";
import { useFileUpload } from "../file-storage/FileUpload";
import type {
  ClanDetails,
  ClanMessage,
  PrincipalInfo,
} from "../hooks/useQueries";
import { useClanMessages, useSendClanMessage } from "../hooks/useQueries";
import { compressImage } from "../utils/imageUtils";
import PlayerProfileScreen from "./PlayerProfileScreen";

// ─── Constants ─────────────────────────────────────────────────────────────────

const IMG_PREFIX = "[img]";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface OptimisticMessage extends ClanMessage {
  _optimistic?: boolean;
  _failed?: boolean;
  _tempId?: number;
  _localImgUrl?: string;
}

interface ClanChatViewProps {
  clan: ClanDetails;
  onBack: () => void;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(ns: bigint): string {
  const ms = Number(ns / BigInt(1_000_000));
  const d = new Date(ms);
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  return `${hh}:${mm}`;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function memberName(members: PrincipalInfo[], principalStr: string): string {
  const m = members.find((p) => p.principal.toString() === principalStr);
  return m?.name?.trim() || `${principalStr.slice(0, 6)}…`;
}

function memberLevel(members: PrincipalInfo[], principalStr: string): number {
  const m = members.find((p) => p.principal.toString() === principalStr);
  return m ? Number(m.level) : 1;
}

function isImageMessage(text: string): boolean {
  return text.startsWith(IMG_PREFIX);
}

function getImageUrl(text: string): string {
  return text.slice(IMG_PREFIX.length);
}

// ─── Message Bubble ────────────────────────────────────────────────────────────

interface BubbleProps {
  msg: OptimisticMessage;
  isOwn: boolean;
  members: PrincipalInfo[];
  onAvatarClick: (member: PrincipalInfo) => void;
}

const MessageBubble: React.FC<BubbleProps> = ({
  msg,
  isOwn,
  members,
  onAvatarClick,
}) => {
  const senderStr = msg.senderId.toString();
  const name = memberName(members, senderStr);
  const level = memberLevel(members, senderStr);
  const member = members.find((m) => m.principal.toString() === senderStr);
  const isImg = isImageMessage(msg.text);

  const renderContent = (textColor: string) => {
    if (isImg) {
      const url = msg._localImgUrl ?? getImageUrl(msg.text);
      return (
        <img
          src={url}
          alt="Shared by user"
          className="max-w-full rounded-lg cursor-pointer object-cover"
          style={{ maxHeight: 240 }}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        />
      );
    }
    return (
      <p
        className={`leading-snug ${textColor}`}
        style={{
          overflowWrap: "break-word",
          wordBreak: "break-word",
          minWidth: 0,
        }}
      >
        {msg.text}
      </p>
    );
  };

  if (isOwn) {
    return (
      <div className="flex justify-end mb-1 px-3">
        <div className="max-w-[75%] min-w-0 overflow-hidden">
          <div
            className={`rounded-2xl rounded-tr-sm px-3 py-2 text-sm text-white shadow-md overflow-hidden ${
              msg._failed
                ? "bg-red-500"
                : msg._optimistic
                  ? "bg-gradient-to-r from-orange-400 to-orange-500 opacity-70"
                  : "bg-gradient-to-r from-orange-500 to-orange-600"
            }`}
            data-ocid="clan_chat.own_message"
          >
            {renderContent("text-white")}
          </div>
          <div className="flex items-center justify-end gap-1 mt-0.5 pr-1">
            {msg._failed && (
              <span className="text-[10px] text-red-400">Failed</span>
            )}
            {msg._optimistic && !msg._failed && (
              <span className="text-[10px] text-gray-600">…</span>
            )}
            {!msg._optimistic && (
              <span className="text-[10px] text-gray-600">
                {formatTime(msg.timestamp)}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2 mb-1 px-3">
      {/* Avatar — clickable to open full-screen profile */}
      <button
        type="button"
        data-ocid="clan_chat.avatar_button"
        onClick={() => member && onAvatarClick(member)}
        className="w-8 h-8 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 font-black text-xs shrink-0 shadow-sm hover:scale-110 active:scale-95 transition-transform"
        aria-label={`Profile of ${name}`}
      >
        {getInitials(name)}
      </button>

      {/* Bubble */}
      <div className="max-w-[75%] min-w-0 overflow-hidden">
        <div className="flex items-baseline gap-1.5 mb-0.5 px-1">
          <button
            type="button"
            onClick={() => member && onAvatarClick(member)}
            className="text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors truncate max-w-[120px]"
            data-ocid="clan_chat.name_button"
          >
            {name}
          </button>
          <span className="text-[9px] font-medium shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-1.5 py-0.5 rounded-full">
            Lv.{level}
          </span>
        </div>
        <div className="rounded-2xl rounded-bl-sm px-3 py-2 text-sm bg-white border border-gray-200 text-black shadow-sm overflow-hidden">
          {renderContent("text-black")}
        </div>
        <div className="pl-1 mt-0.5">
          <span className="text-[10px] text-gray-500">
            {formatTime(msg.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── ClanChatView ──────────────────────────────────────────────────────────────

const ClanChatView: React.FC<ClanChatViewProps> = ({ clan, onBack }) => {
  const { identity } = useInternetIdentity();
  const myPrincipal = identity?.getPrincipal();
  const myPrincipalStr = myPrincipal?.toString() ?? "";

  const { data: serverMessages = [] } = useClanMessages(clan.id);
  const sendMutation = useSendClanMessage();
  const { uploadFile } = useFileUpload();

  const [optimisticMessages, setOptimisticMessages] = useState<
    OptimisticMessage[]
  >([]);
  const [inputText, setInputText] = useState("");
  // Full-screen profile view — null = chat visible, PrincipalInfo = profile visible
  const [viewingProfile, setViewingProfile] = useState<PrincipalInfo | null>(
    null,
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allMessages: OptimisticMessage[] = (() => {
    const serverIds = new Set(serverMessages.map((m) => m.id.toString()));
    const pendingOptimistic = optimisticMessages.filter(
      (m) => m._tempId !== undefined && !serverIds.has(m.id.toString()),
    );
    const combined = [...serverMessages, ...pendingOptimistic];
    combined.sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
    return combined;
  })();

  useEffect(() => {
    if (serverMessages.length === 0) return;
    const serverIds = new Set(serverMessages.map((m) => m.id.toString()));
    setOptimisticMessages((prev) =>
      prev.filter(
        (m) => m._tempId !== undefined && !serverIds.has(m.id.toString()),
      ),
    );
  }, [serverMessages]);

  const lastCountRef = useRef(0);
  useEffect(() => {
    if (allMessages.length !== lastCountRef.current) {
      lastCountRef.current = allMessages.length;
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  });

  const handleSend = useCallback(async () => {
    const text = inputText.trim();
    if (!text || !myPrincipal) return;

    const tempId = Date.now();
    const tempMsg: OptimisticMessage = {
      id: BigInt(tempId),
      clanId: clan.id,
      senderId: myPrincipal,
      text,
      timestamp: BigInt(Date.now()) * BigInt(1_000_000),
      _optimistic: true,
      _failed: false,
      _tempId: tempId,
    };

    setOptimisticMessages((prev) => [...prev, tempMsg]);
    setInputText("");

    try {
      await sendMutation.mutateAsync({ clanId: clan.id, text });
    } catch {
      setOptimisticMessages((prev) =>
        prev.map((m) => (m._tempId === tempId ? { ...m, _failed: true } : m)),
      );
    }
  }, [inputText, myPrincipal, clan.id, sendMutation]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !myPrincipal) return;
      e.target.value = "";

      const tempId = Date.now();

      let compressed: { blob: Blob; dataUrl: string };
      try {
        compressed = await compressImage(file);
      } catch {
        return;
      }

      const localImgUrl = compressed.dataUrl;
      const tempMsg: OptimisticMessage = {
        id: BigInt(tempId),
        clanId: clan.id,
        senderId: myPrincipal,
        text: `${IMG_PREFIX}${localImgUrl}`,
        timestamp: BigInt(Date.now()) * BigInt(1_000_000),
        _optimistic: true,
        _failed: false,
        _tempId: tempId,
        _localImgUrl: localImgUrl,
      };
      setOptimisticMessages((prev) => [...prev, tempMsg]);

      try {
        const ext = "jpg";
        const path = `chat-images/${clan.id.toString()}-${tempId}.${ext}`;
        const arrayBuffer = await compressed.blob.arrayBuffer();
        const uint8 = new Uint8Array(arrayBuffer);
        await uploadFile(path, "image/jpeg", uint8);

        const remoteUrl = await buildFileUrl(path);
        const finalText = `${IMG_PREFIX}${remoteUrl}`;

        setOptimisticMessages((prev) =>
          prev.filter((m) => m._tempId !== tempId),
        );
        await sendMutation.mutateAsync({ clanId: clan.id, text: finalText });
      } catch {
        setOptimisticMessages((prev) =>
          prev.map((m) => (m._tempId === tempId ? { ...m, _failed: true } : m)),
        );
      }
    },
    [myPrincipal, clan.id, uploadFile, sendMutation],
  );

  // ── If user tapped a sender — show full-screen unified profile ──────────────
  if (viewingProfile) {
    return (
      <div
        className="fixed inset-0 flex flex-col bg-black"
        style={{ paddingBottom: "60px" }}
        data-ocid="clan_chat.player_profile.page"
      >
        <PlayerProfileScreen
          principal={viewingProfile.principal}
          fallbackName={viewingProfile.name}
          fallbackLevel={Number(viewingProfile.level)}
          isOwnProfile={myPrincipalStr === viewingProfile.principal.toString()}
          onBack={() => setViewingProfile(null)}
        />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 flex flex-col bg-black"
      style={{ paddingBottom: "60px" }}
      data-ocid="clan_chat.page"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800 shrink-0">
        <button
          type="button"
          data-ocid="clan_chat.back_button"
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-black hover:border-orange-400 transition-colors shadow-sm shrink-0"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="w-9 h-9 rounded-xl bg-orange-100 border border-orange-200 shrink-0 flex items-center justify-center font-black text-orange-600 text-sm shadow-sm">
          {getInitials(clan.name)}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-black text-base truncate">
            {clan.name}
          </h2>
          <p className="text-gray-500 text-xs">
            {Number(clan.members.length)} Members
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto py-3 flex flex-col"
        data-ocid="clan_chat.messages_list"
      >
        {allMessages.length === 0 && (
          <div
            className="flex flex-col items-center justify-center flex-1 px-6 text-center"
            data-ocid="clan_chat.empty_state"
          >
            <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center mb-3">
              <Send size={22} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm font-medium">
              No messages yet.
            </p>
            <p className="text-gray-600 text-xs mt-1">Be the first to write!</p>
          </div>
        )}

        {allMessages.map((msg) => (
          <MessageBubble
            key={msg._tempId ?? msg.id.toString()}
            msg={msg}
            isOwn={msg.senderId.toString() === myPrincipalStr}
            members={clan.members}
            onAvatarClick={setViewingProfile}
          />
        ))}
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
        data-ocid="clan_chat.input_bar"
      >
        {/* Image upload button */}
        <button
          type="button"
          data-ocid="clan_chat.image_upload_button"
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
          data-ocid="clan_chat.message_input"
          className="flex-1 min-w-0 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-black placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors shadow-sm"
          style={{
            fontSize: "16px",
            WebkitUserSelect: "text",
            userSelect: "text",
          }}
        />
        <button
          type="button"
          data-ocid="clan_chat.send_button"
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

export default ClanChatView;
