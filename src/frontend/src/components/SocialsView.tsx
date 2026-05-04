import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Crown,
  Hash,
  Lock,
  LogIn,
  MessageCircle,
  MessageSquare,
  Pencil,
  Plus,
  Search,
  Shield,
  Trash2,
  UserMinus,
  Users,
  X,
} from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CLAN_EMBLEMS, getEmblem } from "../data/clanEmblems";
import { buildFileUrl } from "../file-storage/FileList";
import { useFileUpload } from "../file-storage/FileUpload";
import {
  type ClanDetails,
  type ClanSummary,
  JoinMode,
  type PrincipalInfo,
  useAllClans,
  useApproveJoinRequest,
  useClanDetails,
  useClanMessages,
  useCreateClan,
  useDeclineJoinRequest,
  useDeleteClan,
  useGetFriends,
  useJoinClan,
  useLeaveClan,
  usePendingJoinRequests,
  useRemoveFriend,
  useSearchClans,
  useSendClanMessage,
  useUpdateClan,
  useUserClans,
} from "../hooks/useQueries";
import DirectMessageChatView from "./DirectMessageChatView";
import PlayerProfileScreen from "./PlayerProfileScreen";

// ─── Image upload constants ────────────────────────────────────────────────────

const IMG_PREFIX = "[img]";
const MAX_IMG_DIMENSION = 1200;
const IMG_QUALITY = 0.75;

async function compressImage(
  file: File,
): Promise<{ blob: Blob; dataUrl: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > MAX_IMG_DIMENSION || height > MAX_IMG_DIMENSION) {
          const ratio = Math.min(
            MAX_IMG_DIMENSION / width,
            MAX_IMG_DIMENSION / height,
          );
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas not available"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", IMG_QUALITY);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Blob conversion failed"));
              return;
            }
            resolve({ blob, dataUrl });
          },
          "image/jpeg",
          IMG_QUALITY,
        );
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── Types ─────────────────────────────────────────────────────────────────────

type SocialsTab = "clans" | "friends";
type ClanSection = "mine" | "search" | "create";
type View =
  | { kind: "clans" }
  | { kind: "clanDetails"; clanId: bigint }
  | { kind: "pendingRequests"; clanId: bigint }
  | { kind: "clanChat"; clan: ClanSummary | ClanDetails }
  | { kind: "memberProfile"; member: PrincipalInfo }
  | {
      kind: "directMessageChat";
      otherPrincipal: Principal;
      otherName: string;
      otherAvatar?: string;
      returnTo: View;
    };

interface SocialsViewProps {
  isAuthenticated: boolean;
}

const SocialsView: React.FC<SocialsViewProps> = ({ isAuthenticated }) => {
  const [activeTab, setActiveTab] = useState<SocialsTab>("clans");
  const [clanSection, setClanSection] = useState<ClanSection>("mine");
  const [view, setView] = useState<View>({ kind: "clans" });
  const { login, loginStatus, identity } = useInternetIdentity();
  const isLoggingIn = loginStatus === "logging-in";
  const myPrincipal = identity?.getPrincipal() ?? null;

  if (!isAuthenticated) {
    return (
      <div className="absolute inset-0 bg-black overflow-y-auto pb-32">
        <div className="container mx-auto px-4 py-6">
          {/* Blurred header preview */}
          <div className="mb-6">
            <div
              className="bg-white rounded-xl p-4 shadow-xl border border-gray-200 opacity-60"
              style={{ filter: "blur(2px)" }}
            >
              <div className="flex items-center justify-center mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 mr-4 shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight">
                  SOCIALS
                </h1>
              </div>
              <p className="text-center text-gray-600 font-medium">
                Join clans, add friends, and chat with the community
              </p>
            </div>
          </div>

          {/* Login overlay */}
          <div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            style={{ background: "rgba(0,0,0,0.55)" }}
            data-ocid="socials.login_prompt"
          >
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-md mx-auto">
              <div className="flex items-center justify-center p-6 border-b border-gray-200">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 mr-4 shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-black text-black">SOCIALS</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-lg leading-relaxed text-center mb-6">
                  Sign in to join clans, add friends, and chat with other
                  players.
                </p>
                <button
                  type="button"
                  onClick={() => login()}
                  disabled={isLoggingIn}
                  className="w-full flex items-center justify-center font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  data-ocid="socials.login_button"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 mr-3" />
                      <span>Login with Internet Identity</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view.kind === "clanDetails") {
    return (
      <div
        className="fixed inset-0 flex flex-col bg-black"
        style={{ paddingBottom: "60px" }}
        data-ocid="socials.clan_details.page"
      >
        <ClanDetailsView
          clanId={view.clanId}
          myPrincipal={myPrincipal}
          onBack={() => setView({ kind: "clans" })}
          onOpenChat={(clan) => setView({ kind: "clanChat", clan })}
          onOpenPending={(id) =>
            setView({ kind: "pendingRequests", clanId: id })
          }
          onOpenMember={(member) => setView({ kind: "memberProfile", member })}
        />
      </div>
    );
  }

  if (view.kind === "pendingRequests") {
    return (
      <div
        className="fixed inset-0 flex flex-col bg-black"
        style={{ paddingBottom: "60px" }}
        data-ocid="socials.pending_requests.page"
      >
        <PendingRequestsView
          clanId={view.clanId}
          onBack={() => setView({ kind: "clanDetails", clanId: view.clanId })}
        />
      </div>
    );
  }

  if (view.kind === "clanChat") {
    const clan = view.clan;
    const clanId = clan.id;
    return (
      <div
        className="fixed inset-0 flex flex-col bg-black"
        style={{ paddingBottom: "60px" }}
        data-ocid="socials.clan_chat.page"
      >
        <InlineClanChat
          clan={clan}
          myPrincipal={myPrincipal}
          onBack={() => setView({ kind: "clanDetails", clanId })}
          onOpenMemberProfile={(member) =>
            setView({ kind: "memberProfile", member })
          }
        />
      </div>
    );
  }

  if (view.kind === "memberProfile") {
    return (
      <div
        className="fixed inset-0 flex flex-col bg-black"
        style={{ paddingBottom: "60px" }}
        data-ocid="socials.member_profile.page"
      >
        <MemberProfileView
          member={view.member}
          myPrincipal={myPrincipal}
          onBack={() => setView({ kind: "clans" })}
          onOpenDM={(userId, userName) =>
            setView({
              kind: "directMessageChat",
              otherPrincipal: userId,
              otherName: userName,
              returnTo: view,
            })
          }
        />
      </div>
    );
  }

  if (view.kind === "directMessageChat") {
    return (
      <DirectMessageChatView
        otherPrincipal={view.otherPrincipal}
        otherName={view.otherName}
        otherAvatar={view.otherAvatar}
        onBack={() => setView(view.returnTo)}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden bg-black"
      style={{ paddingBottom: "60px" }}
      data-ocid="socials.page"
    >
      {/* Header */}
      <div className="flex items-center justify-center px-4 pt-5 pb-4 border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
            <Users size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            SOCIALS
          </h1>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex mx-4 mt-4 mb-1 rounded-xl overflow-hidden border border-gray-800 shrink-0">
        {(["clans", "friends"] as SocialsTab[]).map((tab) => {
          const isActive = activeTab === tab;
          const Icon = tab === "clans" ? Shield : Users;
          const label = tab === "clans" ? "Clans" : "Friends";
          return (
            <button
              key={tab}
              type="button"
              data-ocid={`socials.${tab}_tab`}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all duration-200 ${
                isActive
                  ? "bg-white text-black border-b-2 border-orange-500"
                  : "bg-black text-gray-500 hover:text-gray-300"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === "clans" ? (
          <ClansPanel
            section={clanSection}
            onSectionChange={setClanSection}
            myPrincipal={myPrincipal}
            onOpenClan={(id) => setView({ kind: "clanDetails", clanId: id })}
            onClanCreated={() => setClanSection("mine")}
            onOpenDM={(userId, userName) =>
              setView({
                kind: "directMessageChat",
                otherPrincipal: userId,
                otherName: userName,
                returnTo: { kind: "clans" },
              })
            }
          />
        ) : (
          <FriendsPanel
            onOpenProfile={(m) => setView({ kind: "memberProfile", member: m })}
          />
        )}
      </div>
    </div>
  );
};

// ─── Clans Panel ──────────────────────────────────────────────────────────────

interface ClansPanelProps {
  section: ClanSection;
  onSectionChange: (s: ClanSection) => void;
  myPrincipal: Principal | null;
  onOpenClan: (id: bigint) => void;
  onClanCreated: () => void;
  onOpenDM: (userId: Principal, userName: string) => void;
}

const ClansPanel: React.FC<ClansPanelProps> = ({
  section,
  onSectionChange,
  myPrincipal,
  onOpenClan,
  onClanCreated,
  onOpenDM,
}) => {
  const { data: userClans } = useUserClans(myPrincipal);
  const isInClan = (userClans ?? []).length > 0;

  const tabs: { id: ClanSection; label: string; icon: React.ElementType }[] = [
    { id: "mine", label: "My Clan", icon: Shield },
    { id: "search", label: "Search", icon: Search },
    ...(!isInClan
      ? [{ id: "create" as ClanSection, label: "Create", icon: Plus }]
      : []),
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 px-4 pt-3 pb-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            data-ocid={`socials.clan_${id}_tab`}
            onClick={() => onSectionChange(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
              section === id
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600"
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>
      <div className="flex-1 px-4 pb-4">
        {section === "mine" && (
          <MyClansSection
            myPrincipal={myPrincipal}
            onOpenClan={onOpenClan}
            onGoSearch={() => onSectionChange("search")}
            onGoCreate={() => onSectionChange("create")}
            onOpenDM={onOpenDM}
          />
        )}
        {section === "search" && (
          <SearchClansSection
            myPrincipal={myPrincipal}
            onOpenClan={onOpenClan}
          />
        )}
        {section === "create" && !isInClan && (
          <CreateClanSection onCreated={onClanCreated} />
        )}
      </div>
    </div>
  );
};

// ─── My Clan ─────────────────────────────────────────────────────────────────

interface MyClansProps {
  myPrincipal: Principal | null;
  onOpenClan: (id: bigint) => void;
  onGoSearch: () => void;
  onGoCreate: () => void;
  onOpenDM: (userId: Principal, userName: string) => void;
}

const MyClansSection: React.FC<MyClansProps> = ({
  myPrincipal,
  onOpenClan,
  onGoSearch,
  onGoCreate,
  onOpenDM,
}) => {
  const { data: myClans, isLoading, error } = useUserClans(myPrincipal);

  if (isLoading) {
    return (
      <div
        className="flex flex-col gap-3 pt-2"
        data-ocid="socials.my_clans.loading_state"
      >
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-20 rounded-xl bg-white border border-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="text-center py-8 text-red-500 text-sm font-medium"
        data-ocid="socials.my_clans.error_state"
      >
        Error loading clan
      </div>
    );
  }

  if (!myClans || myClans.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-12 text-center"
        data-ocid="socials.my_clans.empty_state"
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 mb-4">
          <Shield size={28} className="text-gray-400" />
        </div>
        <h3 className="text-white font-black text-lg mb-2">No Clan Yet</h3>
        <p className="text-gray-400 text-sm max-w-xs mb-6">
          You are not in a clan yet. Search for an existing clan or create your
          own!
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onGoSearch}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-xs font-bold hover:border-orange-300 hover:text-orange-600 transition-colors shadow-sm"
          >
            <Search size={13} />
            Search
          </button>
          <button
            type="button"
            onClick={onGoCreate}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md"
          >
            <Plus size={13} />
            Create
          </button>
        </div>
      </div>
    );
  }

  // User is in a clan — show it inline with all details expanded
  const clan = myClans[0];
  return (
    <div className="flex flex-col gap-3 pt-2" data-ocid="socials.my_clans.list">
      <MyClanInlineDetails
        clanId={clan.id}
        myPrincipal={myPrincipal}
        onOpenChat={() => onOpenClan(clan.id)}
        onOpenPending={() => onOpenClan(clan.id)}
        onOpenDM={onOpenDM}
      />
    </div>
  );
};

// ─── My Clan Inline Details (expanded, no navigation needed) ─────────────────

interface MyClanInlineDetailsProps {
  clanId: bigint;
  myPrincipal: Principal | null;
  onOpenChat: () => void;
  onOpenPending: () => void;
  onOpenDM: (userId: Principal, userName: string) => void;
}

const MyClanInlineDetails: React.FC<MyClanInlineDetailsProps> = ({
  clanId,
  myPrincipal,
  onOpenChat,
  onOpenPending,
  onOpenDM,
}) => {
  const { data: clan, isLoading, error } = useClanDetails(clanId);
  const leaveClan = useLeaveClan();
  const deleteClan = useDeleteClan();
  const updateClan = useUpdateClan();
  const [memberProfileOpen, setMemberProfileOpen] =
    useState<PrincipalInfo | null>(null);

  // Edit form state
  const [editOpen, setEditOpen] = useState(false);
  const [editDescription, setEditDescription] = useState("");
  const [editJoinMode, setEditJoinMode] = useState<JoinMode>(JoinMode.open);
  const [editEmblemId, setEditEmblemId] = useState(1);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (isLoading) {
    return (
      <div
        className="flex flex-col gap-3"
        data-ocid="socials.my_clan_inline.loading_state"
      >
        <div className="h-32 rounded-xl bg-white border border-gray-200 animate-pulse" />
        <div className="h-20 rounded-xl bg-white border border-gray-200 animate-pulse" />
      </div>
    );
  }

  if (error || !clan) {
    return (
      <div
        className="text-center py-8 text-red-500 text-sm font-medium"
        data-ocid="socials.my_clan_inline.error_state"
      >
        Clan could not be loaded
      </div>
    );
  }

  if (memberProfileOpen) {
    return (
      <MemberProfileView
        member={memberProfileOpen}
        myPrincipal={myPrincipal}
        onBack={() => setMemberProfileOpen(null)}
        onOpenDM={onOpenDM}
      />
    );
  }

  const myText = myPrincipal?.toText() ?? "";
  const isOwner = clan.ownerId.toText() === myText;
  const isOpen = clan.joinMode === JoinMode.open;
  const detailEmblem = getEmblem(clan.emblemId);

  const openEdit = () => {
    setEditDescription(clan.description ?? "");
    setEditJoinMode(clan.joinMode);
    setEditEmblemId(Number(clan.emblemId));
    setSaveSuccess(false);
    updateClan.reset();
    setEditOpen(true);
  };

  const handleSave = () => {
    updateClan.mutate(
      {
        clanId: clan.id,
        description: editDescription.trim(),
        joinMode: editJoinMode,
        emblemId: editEmblemId,
      },
      {
        onSuccess: () => {
          setSaveSuccess(true);
          setTimeout(() => {
            setEditOpen(false);
            setSaveSuccess(false);
          }, 1200);
        },
      },
    );
  };

  // ── Inline edit form ────────────────────────────────────────────────────────
  if (editOpen) {
    return (
      <div className="flex flex-col gap-3" data-ocid="socials.edit_clan.panel">
        <div className="rounded-xl bg-white border border-gray-200 shadow-xl p-5 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600">
              <Pencil size={16} className="text-white" />
            </div>
            <h3 className="text-black font-black text-base flex-1">
              Edit Clan
            </h3>
            <button
              type="button"
              data-ocid="socials.edit_clan.close_button"
              onClick={() => setEditOpen(false)}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          {/* Clan Name — read-only */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Clan Name
              </span>
              <Lock size={10} className="text-gray-400" />
              <span className="text-[10px] text-gray-400 font-medium">
                cannot be changed
              </span>
            </div>
            <div className="px-3 py-2.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-400 text-sm select-none cursor-not-allowed">
              {clan.name}
            </div>
          </div>

          {/* Emblem Picker */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              Clan Emblem
            </p>
            <div
              className="grid grid-cols-5 gap-2"
              data-ocid="socials.edit_clan.emblem_picker"
            >
              {CLAN_EMBLEMS.map((emblem) => {
                const isSelected = emblem.id === editEmblemId;
                return (
                  <button
                    key={emblem.id}
                    type="button"
                    data-ocid={`socials.edit_clan.emblem_${emblem.id}`}
                    onClick={() => setEditEmblemId(emblem.id)}
                    aria-label={`Select ${emblem.name} emblem`}
                    className={`relative flex items-center justify-center rounded-xl overflow-hidden transition-all duration-200 aspect-square ${
                      isSelected
                        ? "ring-2 ring-orange-500 scale-105 shadow-lg shadow-orange-200"
                        : "hover:scale-105 hover:ring-2 hover:ring-orange-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <emblem.Svg size={56} />
                    {isSelected && (
                      <div className="absolute inset-0 rounded-xl ring-2 ring-orange-500 pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 text-center">
              Selected:{" "}
              <span className="text-orange-600 font-semibold">
                {getEmblem(editEmblemId).name}
              </span>
            </p>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-clan-desc"
              className="text-xs font-bold text-gray-600 uppercase tracking-wider"
            >
              Description
            </label>
            <textarea
              id="edit-clan-desc"
              placeholder="What is your clan about?"
              value={editDescription}
              maxLength={120}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={2}
              data-ocid="socials.edit_clan.description_textarea"
              className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-black placeholder-gray-400 text-sm focus:outline-none focus:border-orange-400 transition-colors resize-none"
            />
          </div>

          {/* Join Mode */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              Join Mode
            </span>
            <div className="flex gap-2">
              {(
                [
                  { mode: JoinMode.open, label: "🔓 Open to all" },
                  {
                    mode: JoinMode.requestRequired,
                    label: "📩 Request required",
                  },
                ] as { mode: JoinMode; label: string }[]
              ).map(({ mode, label }) => (
                <button
                  key={mode}
                  type="button"
                  data-ocid={`socials.edit_clan.join_mode_${mode}`}
                  onClick={() => setEditJoinMode(mode)}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 border ${
                    editJoinMode === mode
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 border-orange-500 text-white shadow-md"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:border-orange-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              type="button"
              data-ocid="socials.edit_clan.cancel_button"
              onClick={() => setEditOpen(false)}
              disabled={updateClan.isPending}
              className="flex-1 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-bold hover:border-orange-300 hover:text-orange-600 transition-colors disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="button"
              data-ocid="socials.edit_clan.save_button"
              disabled={updateClan.isPending || saveSuccess}
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-bold transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {updateClan.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving…
                </>
              ) : saveSuccess ? (
                <>
                  <Check size={15} />
                  Saved!
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>

          {updateClan.isError && (
            <p
              className="text-xs text-red-500 text-center -mt-2"
              data-ocid="socials.edit_clan.error_state"
            >
              {updateClan.error instanceof Error
                ? updateClan.error.message
                : "Error saving changes"}
            </p>
          )}
          {saveSuccess && (
            <p
              className="text-xs text-green-600 text-center -mt-2 font-medium"
              data-ocid="socials.edit_clan.success_state"
            >
              Clan updated successfully!
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-3"
      data-ocid="socials.my_clan_inline.panel"
    >
      {/* Clan Info Card */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-xl p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-orange-200">
            <detailEmblem.Svg size={56} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-black font-black text-lg">{clan.name}</h2>
              {isOwner && (
                <span className="flex items-center gap-1 text-xs text-orange-600 font-bold">
                  <Crown size={11} />
                  Founder
                </span>
              )}
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  isOpen
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {isOpen ? "Open" : "Request Required"}
              </span>
            </div>
            {clan.description && (
              <p className="text-gray-600 text-sm mt-1 break-words">
                {clan.description}
              </p>
            )}
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Users size={11} />
                {clan.members.length}/50 Members
              </span>
              {isOwner && clan.pendingCount > 0 && (
                <span className="flex items-center gap-1 text-orange-600 font-bold">
                  {clan.pendingCount.toString()} pending
                </span>
              )}
            </div>
          </div>
          {/* Edit button — founder only */}
          {isOwner && (
            <button
              type="button"
              data-ocid="socials.my_clan_inline.edit_button"
              onClick={openEdit}
              aria-label="Edit clan"
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-orange-100 hover:text-orange-600 text-gray-500 transition-colors border border-gray-200 hover:border-orange-300 shrink-0"
            >
              <Pencil size={14} />
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <button
            type="button"
            data-ocid="socials.my_clan_inline.chat_button"
            onClick={onOpenChat}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-bold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle size={15} />
            Chat
          </button>
          {isOwner && clan.pendingCount > 0 && (
            <button
              type="button"
              data-ocid="socials.my_clan_inline.pending_button"
              onClick={onOpenPending}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-bold hover:border-orange-300 hover:text-orange-600 transition-colors"
            >
              <Users size={15} />
              Requests ({clan.pendingCount.toString()})
            </button>
          )}
          {isOwner ? (
            <button
              type="button"
              data-ocid="socials.my_clan_inline.delete_button"
              disabled={deleteClan.isPending}
              onClick={() => deleteClan.mutate(clan.id)}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-red-200 text-red-500 text-sm font-bold hover:bg-red-50 transition-colors disabled:opacity-40"
            >
              <Trash2 size={15} />
              {deleteClan.isPending ? "…" : "Delete"}
            </button>
          ) : (
            <button
              type="button"
              data-ocid="socials.my_clan_inline.leave_button"
              disabled={leaveClan.isPending}
              onClick={() => leaveClan.mutate(clan.id)}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-red-200 text-red-500 text-sm font-bold hover:bg-red-50 transition-colors disabled:opacity-40"
            >
              <UserMinus size={15} />
              {leaveClan.isPending ? "…" : "Leave"}
            </button>
          )}
        </div>
      </div>

      {/* Members — always expanded, no toggle */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
          <Users size={14} className="text-orange-500 shrink-0" />
          <h3 className="text-xs font-black text-black uppercase tracking-wider">
            Members
          </h3>
          <span className="ml-auto text-xs font-bold text-gray-500">
            {clan.members.length}/50
          </span>
        </div>
        <div
          className="flex flex-col divide-y divide-gray-100"
          data-ocid="socials.my_clan_inline.members_list"
        >
          {clan.members.map((member, i) => {
            const isOwnerRow =
              member.principal.toText() === clan.ownerId.toText();
            const initials = (member.name || "??").slice(0, 2).toUpperCase();
            return (
              <button
                key={member.principal.toText()}
                type="button"
                data-ocid={`socials.my_clan_inline.member.${i + 1}`}
                onClick={() => setMemberProfileOpen(member)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors text-left w-full"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-orange-100 text-orange-600 font-black text-xs shrink-0 border border-orange-200">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-black text-sm font-bold truncate">
                      {member.name || "Player #?"}
                    </span>
                    {isOwnerRow && (
                      <Crown size={11} className="text-orange-500 shrink-0" />
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    Level {member.level.toString()}
                  </span>
                </div>
                <ChevronRight size={14} className="text-gray-300 shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Clan Card ────────────────────────────────────────────────────────────────

interface ClanCardProps {
  clan: ClanSummary;
  index: number;
  myPrincipal: Principal | null;
  onClick: () => void;
  actionLabel?: string;
  onAction?: () => void;
  actionLoading?: boolean;
  isMember?: boolean;
}

const ClanCard: React.FC<ClanCardProps> = ({
  clan,
  index,
  myPrincipal,
  onClick,
  actionLabel,
  onAction,
  actionLoading,
  isMember,
}) => {
  const isOwner = myPrincipal
    ? clan.ownerId.toText() === myPrincipal.toText()
    : false;
  const isOpen = clan.joinMode === JoinMode.open;
  const emblem = getEmblem(clan.emblemId);

  return (
    <button
      type="button"
      data-ocid={`socials.clan_card.item.${index}`}
      className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-200 cursor-pointer w-full text-left"
      onClick={onClick}
      aria-label={`Open clan ${clan.name}`}
    >
      <div className="flex items-center justify-center w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-orange-200">
        <emblem.Svg size={44} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-black text-sm truncate">
            {clan.name}
          </span>
          {isOwner && <Crown size={11} className="text-orange-500 shrink-0" />}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Users size={10} />
            {clan.memberCount.toString()}/50 Members
          </span>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              isOpen
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {isOpen ? "Open" : "Request Required"}
          </span>
        </div>
      </div>
      {actionLabel && onAction ? (
        <button
          type="button"
          data-ocid={`socials.clan_action_button.${index}`}
          onClick={(e) => {
            e.stopPropagation();
            onAction();
          }}
          disabled={actionLoading || isMember}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 shrink-0 ${
            isMember
              ? "bg-gray-100 text-gray-400 cursor-default"
              : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105 active:scale-95 disabled:opacity-40"
          }`}
        >
          {actionLoading ? "…" : isMember ? "Member" : actionLabel}
        </button>
      ) : (
        <ChevronRight size={16} className="text-gray-300 shrink-0" />
      )}
    </button>
  );
};

// ─── Search Clans ─────────────────────────────────────────────────────────────

interface SearchClansProps {
  myPrincipal: Principal | null;
  onOpenClan: (id: bigint) => void;
}

const BROWSE_MAX = 30;

function getRandomSample(arr: ClanSummary[], n: number): ClanSummary[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n).sort((a, b) => a.name.localeCompare(b.name));
}

const SearchClansSection: React.FC<SearchClansProps> = ({
  myPrincipal,
  onOpenClan,
}) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const joinClan = useJoinClan();
  const { data: userClans } = useUserClans(myPrincipal);
  const { data: allClans, isLoading: allClansLoading } = useAllClans();

  // Random seed fixed on mount — re-randomises each time the component mounts
  const mountSeed = useRef(Math.random());

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 350);
    return () => clearTimeout(t);
  }, [query]);

  const { data: searchResults, isLoading: searchLoading } =
    useSearchClans(debouncedQuery);

  const memberClanIds = new Set((userClans ?? []).map((c) => c.id.toString()));
  const isSearching = debouncedQuery.trim().length > 0;

  // Stable random sample, recomputed only when allClans data arrives.
  // mountSeed.current is captured once so the sample stays fixed while browsing.
  const browseClansSample = useMemo(() => {
    if (!allClans || allClans.length === 0) return [];
    void mountSeed.current; // captured once on mount; stable across re-renders
    return getRandomSample(allClans, BROWSE_MAX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allClans]);

  return (
    <div className="flex flex-col gap-3 pt-2">
      {/* Search input */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search clan name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          data-ocid="socials.clan_search_input"
          className="w-full pl-9 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-black placeholder-gray-400 text-sm focus:outline-none focus:border-orange-400 transition-colors shadow-sm"
          style={{ fontSize: "16px" }}
        />
      </div>

      {/* ── Browse Clans (shown when search bar is empty) ── */}
      {!isSearching &&
        (allClansLoading ? (
          <div
            className="flex flex-col gap-2"
            data-ocid="socials.clan_browse.loading_state"
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 rounded-xl bg-white border border-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : browseClansSample.length === 0 ? (
          <div
            className="text-center py-8 text-gray-500 text-sm"
            data-ocid="socials.clan_browse.empty_state"
          >
            No clans yet — be the first to create one!
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-1">
              <Hash size={12} className="text-gray-500 shrink-0" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Discover Clans
                {allClans && allClans.length > BROWSE_MAX && (
                  <span className="ml-1 font-normal normal-case tracking-normal">
                    — showing {BROWSE_MAX} of {allClans.length} randomly
                  </span>
                )}
              </span>
            </div>
            <div
              className="flex flex-col gap-2"
              data-ocid="socials.clan_browse.list"
            >
              {browseClansSample.map((clan, i) => (
                <ClanCard
                  key={clan.id.toString()}
                  clan={clan}
                  index={i + 1}
                  myPrincipal={myPrincipal}
                  onClick={() => onOpenClan(clan.id)}
                  actionLabel={
                    clan.joinMode === JoinMode.open ? "Join" : "Request"
                  }
                  isMember={memberClanIds.has(clan.id.toString())}
                  actionLoading={joinClan.isPending}
                  onAction={() => joinClan.mutate(clan.id)}
                />
              ))}
            </div>
          </div>
        ))}

      {/* ── Search Results (shown when query is typed) ── */}
      {isSearching &&
        (searchLoading ? (
          <div
            className="flex flex-col gap-2"
            data-ocid="socials.clan_search.loading_state"
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 rounded-xl bg-white border border-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : !searchResults || searchResults.length === 0 ? (
          <div
            className="text-center py-8 text-gray-500 text-sm"
            data-ocid="socials.clan_search.empty_state"
          >
            No clan found
          </div>
        ) : (
          <div
            className="flex flex-col gap-2"
            data-ocid="socials.clan_search.list"
          >
            {searchResults.map((clan, i) => (
              <ClanCard
                key={clan.id.toString()}
                clan={clan}
                index={i + 1}
                myPrincipal={myPrincipal}
                onClick={() => onOpenClan(clan.id)}
                actionLabel={
                  clan.joinMode === JoinMode.open ? "Join" : "Request"
                }
                isMember={memberClanIds.has(clan.id.toString())}
                actionLoading={joinClan.isPending}
                onAction={() => joinClan.mutate(clan.id)}
              />
            ))}
          </div>
        ))}

      {joinClan.isError && (
        <div
          className="text-xs text-red-500 text-center font-medium"
          data-ocid="socials.clan_search.error_state"
        >
          {joinClan.error instanceof Error &&
          joinClan.error.message.toLowerCase().includes("clanfull")
            ? "This clan is full (50/50 members)."
            : joinClan.error instanceof Error
              ? joinClan.error.message
              : "Error joining"}
        </div>
      )}
    </div>
  );
};

// ─── Create Clan ──────────────────────────────────────────────────────────────

const CreateClanSection: React.FC<{ onCreated: () => void }> = ({
  onCreated,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [joinMode, setJoinMode] = useState<JoinMode>(JoinMode.open);
  const [selectedEmblemId, setSelectedEmblemId] = useState(1);
  const createClan = useCreateClan();
  const canSubmit = name.trim().length >= 3;

  const handleSubmit = () => {
    if (!canSubmit) return;
    createClan.mutate(
      {
        name: name.trim(),
        description: description.trim(),
        joinMode,
        emblemId: selectedEmblemId,
      },
      {
        onSuccess: () => {
          setName("");
          setDescription("");
          setSelectedEmblemId(1);
          onCreated();
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="rounded-xl bg-white border border-gray-200 shadow-xl p-5 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600">
            <Plus size={18} className="text-white" />
          </div>
          <h3 className="text-black font-black text-base">Create New Clan</h3>
        </div>

        {/* Emblem Picker */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
            Choose Your Clan Emblem
          </p>
          <div
            className="grid grid-cols-5 gap-2"
            data-ocid="socials.create_clan.emblem_picker"
          >
            {CLAN_EMBLEMS.map((emblem) => {
              const isSelected = emblem.id === selectedEmblemId;
              return (
                <button
                  key={emblem.id}
                  type="button"
                  data-ocid={`socials.create_clan.emblem_${emblem.id}`}
                  onClick={() => setSelectedEmblemId(emblem.id)}
                  aria-label={`Select ${emblem.name} emblem`}
                  className={`relative flex items-center justify-center rounded-xl overflow-hidden transition-all duration-200 aspect-square ${
                    isSelected
                      ? "ring-2 ring-orange-500 scale-105 shadow-lg shadow-orange-200"
                      : "hover:scale-105 hover:ring-2 hover:ring-orange-300 opacity-70 hover:opacity-100"
                  }`}
                >
                  <emblem.Svg size={56} />
                  {isSelected && (
                    <div className="absolute inset-0 rounded-xl ring-2 ring-orange-500 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-gray-500 text-center">
            Selected:{" "}
            <span className="text-orange-600 font-semibold">
              {getEmblem(selectedEmblemId).name}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="create-clan-name"
            className="text-xs font-bold text-gray-600 uppercase tracking-wider"
          >
            Clan Name *
          </label>
          <input
            id="create-clan-name"
            type="text"
            placeholder="e.g. ChickenElite"
            value={name}
            maxLength={24}
            onChange={(e) => setName(e.target.value)}
            data-ocid="socials.create_clan.name_input"
            className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-black placeholder-gray-400 text-sm focus:outline-none focus:border-orange-400 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="create-clan-desc"
            className="text-xs font-bold text-gray-600 uppercase tracking-wider"
          >
            Description (optional)
          </label>
          <textarea
            id="create-clan-desc"
            placeholder="What is your clan about?"
            value={description}
            maxLength={120}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            data-ocid="socials.create_clan.description_textarea"
            className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-black placeholder-gray-400 text-sm focus:outline-none focus:border-orange-400 transition-colors resize-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
            Join Mode
          </span>
          <div className="flex gap-2">
            {(
              [
                { mode: JoinMode.open, label: "🔓 Open to all" },
                {
                  mode: JoinMode.requestRequired,
                  label: "📩 Request required",
                },
              ] as { mode: JoinMode; label: string }[]
            ).map(({ mode, label }) => (
              <button
                key={mode}
                type="button"
                data-ocid={`socials.create_clan.join_mode_${mode}`}
                onClick={() => setJoinMode(mode)}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 border ${
                  joinMode === mode
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 border-orange-500 text-white shadow-md"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:border-orange-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            {joinMode === JoinMode.open
              ? "Anyone can join immediately."
              : "You will receive a request and can approve or decline."}
          </p>
        </div>
        <button
          type="button"
          data-ocid="socials.create_clan.submit_button"
          disabled={!canSubmit || createClan.isPending}
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl font-black text-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {createClan.isPending ? "Creating…" : "Create Clan"}
        </button>
        {!canSubmit && name.length > 0 && (
          <p
            className="text-xs text-orange-600 text-center -mt-2"
            data-ocid="socials.create_clan.field_error"
          >
            Name must be at least 3 characters
          </p>
        )}
        {createClan.isError && (
          <p
            className="text-xs text-red-500 text-center -mt-2"
            data-ocid="socials.create_clan.error_state"
          >
            {createClan.error instanceof Error
              ? createClan.error.message
              : "Error creating"}
          </p>
        )}
      </div>
    </div>
  );
};

// ─── Clan Details View ────────────────────────────────────────────────────────

interface ClanDetailsViewProps {
  clanId: bigint;
  myPrincipal: Principal | null;
  onBack: () => void;
  onOpenChat: (clan: ClanDetails) => void;
  onOpenPending: (id: bigint) => void;
  onOpenMember: (member: PrincipalInfo) => void;
}

const ClanDetailsView: React.FC<ClanDetailsViewProps> = ({
  clanId,
  myPrincipal,
  onBack,
  onOpenChat,
  onOpenPending,
  onOpenMember,
}) => {
  const { data: clan, isLoading, error } = useClanDetails(clanId);
  const leaveClan = useLeaveClan();
  const deleteClan = useDeleteClan();

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col">
        <ScreenHeader title="Clan" onBack={onBack} />
        <div className="flex-1 flex items-center justify-center">
          <div
            className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"
            data-ocid="socials.clan_details.loading_state"
          />
        </div>
      </div>
    );
  }

  if (error || !clan) {
    return (
      <div className="flex-1 flex flex-col">
        <ScreenHeader title="Clan" onBack={onBack} />
        <div
          className="flex-1 flex items-center justify-center text-red-500 text-sm font-medium"
          data-ocid="socials.clan_details.error_state"
        >
          Clan could not be loaded
        </div>
      </div>
    );
  }

  const myText = myPrincipal?.toText() ?? "";
  const isOwner = clan.ownerId.toText() === myText;
  const isMember = clan.members.some((m) => m.principal.toText() === myText);
  const isOpen = clan.joinMode === JoinMode.open;
  const detailEmblem = getEmblem(clan.emblemId);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ScreenHeader title={clan.name} onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Clan Info Card */}
        <div className="mt-3 rounded-xl bg-white border border-gray-200 shadow-xl p-4">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-orange-200">
              <detailEmblem.Svg size={56} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-black font-black text-lg">{clan.name}</h2>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isOpen
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {isOpen ? "Open" : "Request Required"}
                </span>
              </div>
              {clan.description && (
                <p className="text-gray-600 text-sm mt-1 break-words">
                  {clan.description}
                </p>
              )}
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Users size={11} />
                  {clan.members.length}/50 Members
                </span>
                {isOwner && clan.pendingCount > 0 && (
                  <span className="flex items-center gap-1 text-orange-600 font-bold">
                    {clan.pendingCount.toString()} pending
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            {(isMember || isOwner) && (
              <button
                type="button"
                data-ocid="socials.clan_details.chat_button"
                onClick={() => onOpenChat(clan)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-bold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageSquare size={15} />
                Chat
              </button>
            )}
            {isOwner && clan.pendingCount > 0 && (
              <button
                type="button"
                data-ocid="socials.clan_details.pending_button"
                onClick={() => onOpenPending(clan.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-bold hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                <Users size={15} />
                Requests ({clan.pendingCount.toString()})
              </button>
            )}
            {isOwner && (
              <button
                type="button"
                data-ocid="socials.clan_details.delete_button"
                disabled={deleteClan.isPending}
                onClick={() =>
                  deleteClan.mutate(clan.id, { onSuccess: onBack })
                }
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-red-200 text-red-500 text-sm font-bold hover:bg-red-50 transition-colors disabled:opacity-40"
              >
                <Trash2 size={15} />
                {deleteClan.isPending ? "…" : "Delete"}
              </button>
            )}
            {!isOwner && isMember && (
              <button
                type="button"
                data-ocid="socials.clan_details.leave_button"
                disabled={leaveClan.isPending}
                onClick={() => leaveClan.mutate(clan.id, { onSuccess: onBack })}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-red-200 text-red-500 text-sm font-bold hover:bg-red-50 transition-colors disabled:opacity-40"
              >
                <UserMinus size={15} />
                {leaveClan.isPending ? "…" : "Leave"}
              </button>
            )}
          </div>
        </div>

        {/* Members */}
        <div className="mt-3">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-1">
            Members ({clan.members.length}/50)
          </h3>
          <div
            className="flex flex-col gap-1.5"
            data-ocid="socials.clan_details.members_list"
          >
            {clan.members.map((member, i) => (
              <MemberRow
                key={member.principal.toText()}
                member={member}
                index={i + 1}
                isOwner={member.principal.toText() === clan.ownerId.toText()}
                onClick={() => onOpenMember(member)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Member Row ───────────────────────────────────────────────────────────────

interface MemberRowProps {
  member: PrincipalInfo;
  index: number;
  isOwner?: boolean;
  onClick?: () => void;
}

const MemberRow: React.FC<MemberRowProps> = ({
  member,
  index,
  isOwner,
  onClick,
}) => {
  const initials = (member.name || "??").slice(0, 2).toUpperCase();
  return (
    <div
      data-ocid={`socials.member_row.item.${index}`}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm ${
        onClick
          ? "cursor-pointer hover:shadow-md hover:border-orange-300 transition-all"
          : ""
      }`}
    >
      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-orange-100 text-orange-600 font-black text-xs shrink-0 border border-orange-200">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-black text-sm font-bold truncate">
            {member.name || "Player #?"}
          </span>
          {isOwner && <Crown size={11} className="text-orange-500 shrink-0" />}
        </div>
        <span className="text-xs text-gray-500">
          Level {member.level.toString()}
        </span>
      </div>
      {onClick && <ChevronRight size={14} className="text-gray-300 shrink-0" />}
    </div>
  );
};

// ─── Pending Requests View ────────────────────────────────────────────────────

const PendingRequestsView: React.FC<{ clanId: bigint; onBack: () => void }> = ({
  clanId,
  onBack,
}) => {
  const { data: pending, isLoading } = usePendingJoinRequests(clanId);
  const approve = useApproveJoinRequest();
  const decline = useDeclineJoinRequest();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ScreenHeader title="Pending Requests" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {isLoading ? (
          <div
            className="flex items-center justify-center py-12"
            data-ocid="socials.pending_requests.loading_state"
          >
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !pending || pending.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-12 text-center"
            data-ocid="socials.pending_requests.empty_state"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 border border-green-200 mb-3">
              <Check size={24} className="text-green-600" />
            </div>
            <p className="text-white font-bold mb-1">All done</p>
            <p className="text-gray-500 text-sm">No pending requests</p>
          </div>
        ) : (
          <div
            className="flex flex-col gap-2 pt-3"
            data-ocid="socials.pending_requests.list"
          >
            {pending.map((user, i) => (
              <div
                key={user.principal.toText()}
                data-ocid={`socials.pending_request.item.${i + 1}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 shadow-sm"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-100 text-orange-600 font-black text-xs shrink-0 border border-orange-200">
                  {(user.name || "??").slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-black text-sm font-bold truncate">
                    {user.name || "Player #?"}
                  </div>
                  <div className="text-xs text-gray-500">
                    Level {user.level.toString()}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    data-ocid={`socials.pending_request.approve_button.${i + 1}`}
                    disabled={approve.isPending || decline.isPending}
                    onClick={() =>
                      approve.mutate({ clanId, userId: user.principal })
                    }
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-green-100 border border-green-200 text-green-700 text-xs font-bold hover:bg-green-200 transition-colors disabled:opacity-40"
                  >
                    <Check size={13} />
                    Approve
                  </button>
                  <button
                    type="button"
                    data-ocid={`socials.pending_request.decline_button.${i + 1}`}
                    disabled={approve.isPending || decline.isPending}
                    onClick={() =>
                      decline.mutate({ clanId, userId: user.principal })
                    }
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-red-200 text-red-500 text-xs font-bold hover:bg-red-50 transition-colors disabled:opacity-40"
                  >
                    <X size={13} />
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Inline Clan Chat ─────────────────────────────────────────────────────────

interface InlineClanChatProps {
  clan: ClanSummary | ClanDetails;
  myPrincipal: Principal | null;
  onBack: () => void;
  onOpenMemberProfile: (member: PrincipalInfo) => void;
}

interface OptimisticMessage {
  id: string;
  text: string;
  senderId: string;
  timestamp: number;
}

const InlineClanChat: React.FC<InlineClanChatProps> = ({
  clan,
  myPrincipal,
  onBack,
  onOpenMemberProfile,
}) => {
  const clanId = clan.id;
  const chatEmblem = getEmblem((clan as { emblemId?: bigint }).emblemId);
  const { data: messages } = useClanMessages(clanId);
  const sendMessage = useSendClanMessage();
  const { uploadFile } = useFileUpload();
  const [text, setText] = useState("");
  const [optimistic, setOptimistic] = useState<OptimisticMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const members: PrincipalInfo[] =
    "members" in clan ? (clan as ClanDetails).members : [];

  const resolveName = (principal: Principal): string => {
    const found = members.find(
      (m) => m.principal.toText() === principal.toText(),
    );
    return found?.name || "Player #?";
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional scroll-on-messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, optimistic]);

  useEffect(() => {
    if (!messages || messages.length === 0) return;
    setOptimistic((prev) =>
      prev.filter(
        (opt) =>
          !messages.some(
            (m) =>
              m.text === opt.text &&
              m.senderId.toText() === opt.senderId &&
              Number(m.timestamp) / 1_000_000 > opt.timestamp - 10_000,
          ),
      ),
    );
  }, [messages]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || !myPrincipal) return;
    setOptimistic((prev) => [
      ...prev,
      {
        id: `opt-${Date.now()}`,
        text: trimmed,
        senderId: myPrincipal.toText(),
        timestamp: Date.now(),
      },
    ]);
    setText("");
    sendMessage.mutate({ clanId, text: trimmed });
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

      // Optimistic preview immediately
      const localImgUrl = compressed.dataUrl;
      setOptimistic((prev) => [
        ...prev,
        {
          id: `opt-img-${tempId}`,
          text: `${IMG_PREFIX}${localImgUrl}`,
          senderId: myPrincipal.toText(),
          timestamp: tempId,
        },
      ]);

      // Upload in background
      try {
        const path = `chat-images/${clanId.toString()}-${tempId}.jpg`;
        const arrayBuffer = await compressed.blob.arrayBuffer();
        const uint8 = new Uint8Array(arrayBuffer);
        await uploadFile(path, "image/jpeg", uint8);
        const remoteUrl = await buildFileUrl(path);
        const finalText = `${IMG_PREFIX}${remoteUrl}`;

        // Remove optimistic and send real message
        setOptimistic((prev) =>
          prev.filter((m) => m.id !== `opt-img-${tempId}`),
        );
        sendMessage.mutate({ clanId, text: finalText });
      } catch {
        // Mark as failed by removing (silently)
        setOptimistic((prev) =>
          prev.filter((m) => m.id !== `opt-img-${tempId}`),
        );
      }
    },
    [myPrincipal, clanId, uploadFile, sendMessage],
  );

  const myText = myPrincipal?.toText() ?? "";

  type MsgItem = {
    id: string;
    text: string;
    senderId: string;
    senderName: string;
    timestamp: number;
    pending: boolean;
    memberInfo: PrincipalInfo | null;
  };

  const confirmed: MsgItem[] = (messages ?? []).map((m) => ({
    id: m.id.toString(),
    text: m.text,
    senderId: m.senderId.toText(),
    senderName: resolveName(m.senderId),
    timestamp: Number(m.timestamp) / 1_000_000,
    pending: false,
    memberInfo:
      members.find((mb) => mb.principal.toText() === m.senderId.toText()) ??
      null,
  }));

  const optItems: MsgItem[] = optimistic.map((o) => ({
    id: o.id,
    text: o.text,
    senderId: o.senderId,
    senderName: "You",
    timestamp: o.timestamp,
    pending: true,
    memberInfo: null,
  }));

  const allMessages = [...confirmed, ...optItems].sort(
    (a, b) => a.timestamp - b.timestamp,
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-gray-800 shrink-0">
        <button
          type="button"
          data-ocid="socials.back_button"
          onClick={onBack}
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-gray-200 text-black hover:border-orange-400 transition-colors shadow-sm"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center justify-center w-9 h-9 rounded-xl overflow-hidden border border-orange-200 shrink-0">
          <chatEmblem.Svg size={36} />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-black text-white truncate">
            {clan.name}
          </h1>
          <p className="text-xs text-gray-500">
            Clan Chat ·{" "}
            {"members" in clan
              ? (clan as ClanDetails).members.length
              : (clan as ClanSummary).memberCount.toString()}
            /50 members
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2"
        data-ocid="socials.clan_chat.messages_list"
      >
        {allMessages.length === 0 && (
          <div
            className="flex flex-col items-center justify-center flex-1 py-12 text-center"
            data-ocid="socials.clan_chat.empty_state"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 mb-3">
              <MessageSquare size={22} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">
              No messages yet. Be the first!
            </p>
          </div>
        )}
        {allMessages.map((msg) => {
          const isMe = msg.senderId === myText;
          const initials = (msg.senderName || "??").slice(0, 2).toUpperCase();
          return (
            <div
              key={msg.id}
              data-ocid={`socials.clan_chat.message.${msg.id}`}
              className={`flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}
            >
              <button
                type="button"
                aria-label={`Open ${msg.senderName}'s profile`}
                onClick={() => {
                  if (!isMe && msg.memberInfo)
                    onOpenMemberProfile(msg.memberInfo);
                }}
                className={`flex items-center justify-center w-8 h-8 rounded-xl bg-orange-100 text-orange-600 font-black text-xs shrink-0 self-end border border-orange-200 ${
                  !isMe && msg.memberInfo
                    ? "cursor-pointer hover:border-orange-400 transition-colors"
                    : "cursor-default"
                }`}
              >
                {initials}
              </button>
              <div
                className={`flex flex-col max-w-[72%] ${isMe ? "items-end" : "items-start"}`}
              >
                {!isMe && (
                  <span className="text-xs text-orange-500 font-semibold mb-0.5 px-1">
                    {msg.senderName}
                  </span>
                )}
                <div
                  className={`px-3 py-2 rounded-2xl text-sm shadow-sm overflow-hidden ${
                    isMe
                      ? `bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-br-sm ${msg.pending ? "opacity-60" : ""}`
                      : "bg-white border border-gray-200 text-black rounded-bl-sm"
                  }`}
                >
                  {msg.text.startsWith(IMG_PREFIX) ? (
                    <img
                      src={msg.text.slice(IMG_PREFIX.length)}
                      alt="Shared by user"
                      className="max-w-full rounded-lg object-cover"
                      style={{ maxHeight: 200 }}
                    />
                  ) : (
                    <span
                      style={{
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                      }}
                    >
                      {msg.text}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-gray-500 mt-0.5 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
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

      {/* Input */}
      <div className="px-3 pb-2 pt-2 border-t border-gray-800 flex gap-2 items-center shrink-0">
        {/* Image upload button */}
        <button
          type="button"
          data-ocid="socials.clan_chat.image_upload_button"
          onClick={handleImageButtonClick}
          aria-label="Upload image"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md transition-all duration-200 hover:scale-110 active:scale-95 shrink-0"
        >
          <Plus size={18} />
        </button>
        <input
          type="text"
          placeholder="Type a message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          maxLength={500}
          data-ocid="socials.clan_chat.message_input"
          className="flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors shadow-sm"
          style={{ fontSize: "16px" }}
        />
        <button
          type="button"
          data-ocid="socials.clan_chat.send_button"
          disabled={!text.trim()}
          onClick={handleSend}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white disabled:opacity-40 hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all shadow-md"
        >
          <MessageSquare size={16} />
        </button>
      </div>
    </div>
  );
};

// ─── Member Profile View ──────────────────────────────────────────────────────
// Unified design — delegates entirely to PlayerProfileScreen

interface MemberProfileViewProps {
  member: PrincipalInfo;
  myPrincipal: Principal | null;
  onBack: () => void;
  onOpenDM?: (userId: Principal, userName: string) => void;
}

const MemberProfileView: React.FC<MemberProfileViewProps> = ({
  member,
  myPrincipal,
  onBack,
  onOpenDM,
}) => {
  const isOwnProfile = myPrincipal?.toText() === member.principal.toText();
  return (
    <PlayerProfileScreen
      principal={member.principal}
      fallbackName={member.name}
      fallbackLevel={Number(member.level)}
      isOwnProfile={isOwnProfile}
      onBack={onBack}
      onOpenDM={isOwnProfile ? undefined : onOpenDM}
    />
  );
};

// ─── Friends Panel ────────────────────────────────────────────────────────────

const FriendsPanel: React.FC<{ onOpenProfile: (m: PrincipalInfo) => void }> = ({
  onOpenProfile,
}) => {
  const { data: friends, isLoading } = useGetFriends();

  if (isLoading) {
    return (
      <div
        className="flex flex-col gap-3 px-4 pt-4"
        data-ocid="socials.friends.loading_state"
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 rounded-xl bg-white border border-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!friends || friends.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-10 px-6 text-center"
        data-ocid="socials.friends.empty_state"
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 mb-4">
          <Users size={28} className="text-gray-400" />
        </div>
        <h3 className="text-white font-black text-lg mb-2">Friends</h3>
        <p className="text-gray-500 text-sm max-w-xs mb-6">
          No friends yet. Click on a player in Clan Chat and add them as a
          friend.
        </p>
        <div className="rounded-xl bg-white border border-gray-200 shadow-xl p-4 w-full max-w-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
              <Hash size={12} className="text-white" />
            </div>
            <span className="text-xs font-bold text-black uppercase tracking-wider">
              How it works
            </span>
          </div>
          <ol className="text-left space-y-2">
            {[
              "Join a clan or create one",
              "Open the clan chat",
              "Tap on a player name",
              'Click "Add Friend"',
            ].map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-2 text-xs text-gray-600"
              >
                <span className="text-orange-500 font-black shrink-0">
                  {i + 1}.
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-2 px-4 pt-4 pb-4"
      data-ocid="socials.friends.list"
    >
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1 mb-1">
        {friends.length} Friends
      </p>
      {friends.map((friend, i) => (
        <MemberRow
          key={friend.principal.toText()}
          member={friend}
          index={i + 1}
          onClick={() => onOpenProfile(friend)}
        />
      ))}
    </div>
  );
};

// ─── Shared ───────────────────────────────────────────────────────────────────

const ScreenHeader: React.FC<{ title: string; onBack: () => void }> = ({
  title,
  onBack,
}) => (
  <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-gray-800 shrink-0">
    <button
      type="button"
      data-ocid="socials.back_button"
      onClick={onBack}
      className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-gray-200 text-black hover:border-orange-400 transition-colors shadow-sm"
    >
      <ArrowLeft size={18} />
    </button>
    <h1 className="text-lg font-black text-white truncate flex-1">{title}</h1>
  </div>
);

export default SocialsView;
