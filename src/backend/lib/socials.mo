import Types "../types/socials";
import Map "mo:core/Map";
import Set "mo:core/Set";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Text "mo:core/Text";

module {

  public type SocialsState = Types.SocialsState;
  public type Clan = Types.Clan;
  public type ClanMessage = Types.ClanMessage;
  public type ClanSummary = Types.ClanSummary;
  public type ClanDetails = Types.ClanDetails;
  public type PrincipalInfo = Types.PrincipalInfo;
  public type JoinMode = Types.JoinMode;

  // ── State initialization ───────────────────────────────────────────────────

  public func initState() : SocialsState {
    {
      clans = Map.empty<Nat, Clan>();
      clanMessages = Map.empty<Nat, List.List<ClanMessage>>();
      friends = Map.empty<Principal, Set.Set<Principal>>();
      var nextClanId = 1;
      var nextMessageId = 1;
    };
  };

  // ── Helpers ────────────────────────────────────────────────────────────────

  func resolvePrincipalInfo(
    principal : Principal,
    getName : Principal -> ?Text,
    getAvatarUrl : Principal -> ?Text,
    getLevel : Principal -> Nat,
  ) : PrincipalInfo {
    {
      principal;
      name = switch (getName(principal)) { case (?n) n; case null principal.toText() };
      avatarUrl = getAvatarUrl(principal);
      level = getLevel(principal);
    };
  };

  func clanToSummary(clan : Clan) : ClanSummary {
    {
      id = clan.id;
      name = clan.name;
      description = clan.description;
      memberCount = clan.memberIds.size();
      joinMode = clan.joinMode;
      ownerId = clan.ownerId;
    };
  };

  func clanToDetails(
    clan : Clan,
    getName : Principal -> ?Text,
    getAvatarUrl : Principal -> ?Text,
    getLevel : Principal -> Nat,
  ) : ClanDetails {
    let members = clan.memberIds.toArray().map(
      func(p : Principal) : PrincipalInfo { resolvePrincipalInfo(p, getName, getAvatarUrl, getLevel) }
    );
    {
      id = clan.id;
      name = clan.name;
      description = clan.description;
      ownerId = clan.ownerId;
      joinMode = clan.joinMode;
      members;
      pendingCount = clan.pendingRequestIds.size();
      createdAt = clan.createdAt;
    };
  };

  // ── Clan management ────────────────────────────────────────────────────────

  public func createClan(
    state : SocialsState,
    caller : Principal,
    name : Text,
    description : Text,
    joinMode : JoinMode,
  ) : { #ok : Nat; #err : Text } {
    if (name.size() == 0) return #err("Clan name cannot be empty");
    let id = state.nextClanId;
    state.nextClanId += 1;
    let members = Set.empty<Principal>();
    members.add(caller);
    let clan : Clan = {
      id;
      var name;
      var description;
      ownerId = caller;
      var joinMode;
      memberIds = members;
      pendingRequestIds = Set.empty<Principal>();
      createdAt = Time.now();
    };
    state.clans.add(id, clan);
    #ok(id);
  };

  public func searchClans(state : SocialsState, searchText : Text) : [ClanSummary] {
    let lower = searchText.toLower();
    state.clans.values()
      .filter(func(clan : Clan) : Bool {
        clan.name.toLower().contains(#text lower)
      })
      .map(func(clan : Clan) : ClanSummary { clanToSummary(clan) })
      .toArray();
  };

  public func getAllClans(state : SocialsState) : [ClanSummary] {
    state.clans.values()
      .map(func(clan : Clan) : ClanSummary { clanToSummary(clan) })
      .toArray();
  };

  public func getClan(
    state : SocialsState,
    clanId : Nat,
    getName : Principal -> ?Text,
    getAvatarUrl : Principal -> ?Text,
    getLevel : Principal -> Nat,
  ) : { #ok : ClanDetails; #err : Text } {
    switch (state.clans.get(clanId)) {
      case null #err("Clan not found");
      case (?clan) #ok(clanToDetails(clan, getName, getAvatarUrl, getLevel));
    };
  };

  public func joinClan(
    state : SocialsState,
    caller : Principal,
    clanId : Nat,
  ) : { #ok : Text; #err : Text } {
    switch (state.clans.get(clanId)) {
      case null #err("Clan not found");
      case (?clan) {
        if (clan.memberIds.contains(caller)) return #err("Already a member");
        switch (clan.joinMode) {
          case (#open) {
            clan.pendingRequestIds.remove(caller);
            clan.memberIds.add(caller);
            #ok("Joined clan successfully");
          };
          case (#requestRequired) {
            if (clan.pendingRequestIds.contains(caller)) return #err("Join request already pending");
            clan.pendingRequestIds.add(caller);
            #ok("Join request sent");
          };
        };
      };
    };
  };

  public func leaveClan(
    state : SocialsState,
    caller : Principal,
    clanId : Nat,
  ) : { #ok : Text; #err : Text } {
    switch (state.clans.get(clanId)) {
      case null #err("Clan not found");
      case (?clan) {
        if (not clan.memberIds.contains(caller)) return #err("Not a member");
        if (Principal.equal(clan.ownerId, caller)) return #err("Owner cannot leave clan — delete it instead");
        clan.memberIds.remove(caller);
        #ok("Left clan successfully");
      };
    };
  };

  public func deleteClan(
    state : SocialsState,
    caller : Principal,
    clanId : Nat,
  ) : { #ok : Text; #err : Text } {
    switch (state.clans.get(clanId)) {
      case null #err("Clan not found");
      case (?clan) {
        if (not Principal.equal(clan.ownerId, caller)) return #err("Not authorized");
        state.clans.remove(clanId);
        state.clanMessages.remove(clanId);
        #ok("Clan deleted successfully");
      };
    };
  };

  // ── Join request management ────────────────────────────────────────────────

  public func getPendingJoinRequests(
    state : SocialsState,
    caller : Principal,
    clanId : Nat,
    getName : Principal -> ?Text,
    getAvatarUrl : Principal -> ?Text,
    getLevel : Principal -> Nat,
  ) : { #ok : [PrincipalInfo]; #err : Text } {
    switch (state.clans.get(clanId)) {
      case null #err("Clan not found");
      case (?clan) {
        if (not Principal.equal(clan.ownerId, caller)) return #err("Not authorized");
        let infos = clan.pendingRequestIds.toArray().map(
          func(p : Principal) : PrincipalInfo { resolvePrincipalInfo(p, getName, getAvatarUrl, getLevel) }
        );
        #ok(infos);
      };
    };
  };

  public func approveJoinRequest(
    state : SocialsState,
    caller : Principal,
    clanId : Nat,
    userId : Principal,
  ) : { #ok : Text; #err : Text } {
    switch (state.clans.get(clanId)) {
      case null #err("Clan not found");
      case (?clan) {
        if (not Principal.equal(clan.ownerId, caller)) return #err("Not authorized");
        if (not clan.pendingRequestIds.contains(userId)) return #err("No pending request from this user");
        clan.pendingRequestIds.remove(userId);
        clan.memberIds.add(userId);
        #ok("Join request approved");
      };
    };
  };

  public func declineJoinRequest(
    state : SocialsState,
    caller : Principal,
    clanId : Nat,
    userId : Principal,
  ) : { #ok : Text; #err : Text } {
    switch (state.clans.get(clanId)) {
      case null #err("Clan not found");
      case (?clan) {
        if (not Principal.equal(clan.ownerId, caller)) return #err("Not authorized");
        if (not clan.pendingRequestIds.contains(userId)) return #err("No pending request from this user");
        clan.pendingRequestIds.remove(userId);
        #ok("Join request declined");
      };
    };
  };

  // ── Clan chat ──────────────────────────────────────────────────────────────

  public func sendClanMessage(
    state : SocialsState,
    caller : Principal,
    clanId : Nat,
    text : Text,
  ) : { #ok : ClanMessage; #err : Text } {
    switch (state.clans.get(clanId)) {
      case null #err("Clan not found");
      case (?clan) {
        if (not clan.memberIds.contains(caller)) return #err("Not a member");
        let id = state.nextMessageId;
        state.nextMessageId += 1;
        let msg : ClanMessage = {
          id;
          clanId;
          senderId = caller;
          text;
          timestamp = Time.now();
        };
        let msgs = switch (state.clanMessages.get(clanId)) {
          case (?existing) existing;
          case null {
            let newList = List.empty<ClanMessage>();
            state.clanMessages.add(clanId, newList);
            newList;
          };
        };
        msgs.add(msg);
        #ok(msg);
      };
    };
  };

  public func getClanMessages(
    state : SocialsState,
    caller : Principal,
    clanId : Nat,
    limit : Nat,
    before : ?Nat,
  ) : { #ok : [ClanMessage]; #err : Text } {
    switch (state.clans.get(clanId)) {
      case null #err("Clan not found");
      case (?clan) {
        if (not clan.memberIds.contains(caller)) return #err("Not a member");
        let allMsgs : [ClanMessage] = switch (state.clanMessages.get(clanId)) {
          case null [];
          case (?msgs) msgs.toArray();
        };
        // Filter by before id, then take newest-first
        let filtered = switch (before) {
          case null allMsgs;
          case (?beforeId) allMsgs.filter(func(m : ClanMessage) : Bool { m.id < beforeId });
        };
        let reversed = filtered.reverse();
        let count = if (limit < reversed.size()) limit else reversed.size();
        #ok(reversed.sliceToArray(0, count));
      };
    };
  };

  // ── Friend system ──────────────────────────────────────────────────────────

  public func addFriend(
    state : SocialsState,
    caller : Principal,
    userId : Principal,
  ) : { #ok : Text; #err : Text } {
    if (Principal.equal(caller, userId)) return #err("Cannot add yourself as a friend");
    // Add userId to caller's friend set
    let callerFriends = switch (state.friends.get(caller)) {
      case (?s) s;
      case null {
        let s = Set.empty<Principal>();
        state.friends.add(caller, s);
        s;
      };
    };
    if (callerFriends.contains(userId)) return #err("Already friends");
    callerFriends.add(userId);
    // Add caller to userId's friend set (bidirectional)
    let userFriends = switch (state.friends.get(userId)) {
      case (?s) s;
      case null {
        let s = Set.empty<Principal>();
        state.friends.add(userId, s);
        s;
      };
    };
    userFriends.add(caller);
    #ok("Friend added successfully");
  };

  public func removeFriend(
    state : SocialsState,
    caller : Principal,
    userId : Principal,
  ) : { #ok : Text; #err : Text } {
    switch (state.friends.get(caller)) {
      case null #err("Not friends");
      case (?callerFriends) {
        if (not callerFriends.contains(userId)) return #err("Not friends");
        callerFriends.remove(userId);
        // Remove caller from userId's set too (bidirectional)
        switch (state.friends.get(userId)) {
          case null {};
          case (?userFriends) userFriends.remove(caller);
        };
        #ok("Friend removed successfully");
      };
    };
  };

  public func getFriends(
    state : SocialsState,
    caller : Principal,
    getName : Principal -> ?Text,
    getAvatarUrl : Principal -> ?Text,
    getLevel : Principal -> Nat,
  ) : [PrincipalInfo] {
    switch (state.friends.get(caller)) {
      case null [];
      case (?friendSet) {
        friendSet.toArray().map(
          func(p : Principal) : PrincipalInfo { resolvePrincipalInfo(p, getName, getAvatarUrl, getLevel) }
        );
      };
    };
  };

  public func isFriend(
    state : SocialsState,
    caller : Principal,
    userId : Principal,
  ) : Bool {
    switch (state.friends.get(caller)) {
      case null false;
      case (?friendSet) friendSet.contains(userId);
    };
  };

};
