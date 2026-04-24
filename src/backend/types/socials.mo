import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Set "mo:core/Set";
import List "mo:core/List";

module {

  // ── Join mode for clans ────────────────────────────────────────────────────
  public type JoinMode = {
    #open;
    #requestRequired;
  };

  // ── Core clan entity (internal, mutable fields) ───────────────────────────
  public type Clan = {
    id : Nat;
    var name : Text;
    var description : Text;
    ownerId : Principal;
    var joinMode : JoinMode;
    var emblemId : Nat;
    memberIds : Set.Set<Principal>;
    pendingRequestIds : Set.Set<Principal>;
    createdAt : Int;
  };

  // ── Clan message entity ────────────────────────────────────────────────────
  public type ClanMessage = {
    id : Nat;
    clanId : Nat;
    senderId : Principal;
    text : Text;
    timestamp : Int;
  };

  // ── Shared/public types (no var, no mutable containers) ───────────────────

  public type PrincipalInfo = {
    principal : Principal;
    name : Text;
    avatarUrl : ?Text;
    level : Nat;
  };

  public type ClanSummary = {
    id : Nat;
    name : Text;
    description : Text;
    memberCount : Nat;
    maxMembers : Nat;
    joinMode : JoinMode;
    ownerId : Principal;
    emblemId : Nat;
  };

  public type ClanDetails = {
    id : Nat;
    name : Text;
    description : Text;
    ownerId : Principal;
    joinMode : JoinMode;
    members : [PrincipalInfo];
    memberCount : Nat;
    maxMembers : Nat;
    pendingCount : Nat;
    createdAt : Int;
    emblemId : Nat;
  };

  // ── State containers ───────────────────────────────────────────────────────

  public type SocialsState = {
    clans : Map.Map<Nat, Clan>;
    // clanId -> List of messages
    clanMessages : Map.Map<Nat, List.List<ClanMessage>>;
    // principal -> set of friend principals (bidirectional)
    friends : Map.Map<Principal, Set.Set<Principal>>;
    var nextClanId : Nat;
    var nextMessageId : Nat;
  };

};
