import Principal "mo:core/Principal";
import Types "../types/socials";
import SocialsLib "../lib/socials";

mixin (
  socialsState : Types.SocialsState,
  getName : Principal -> ?Text,
  getAvatarUrl : Principal -> ?Text,
  getLevel : Principal -> Nat,
) {

  public type ClanSummary = Types.ClanSummary;
  public type ClanDetails = Types.ClanDetails;
  public type ClanMessage = Types.ClanMessage;
  public type PrincipalInfo = Types.PrincipalInfo;
  public type JoinMode = Types.JoinMode;

  // ── Clan management ──────────────────────────────────────────────────────

  public shared ({ caller }) func createClan(
    name : Text,
    description : Text,
    joinMode : JoinMode,
    emblemId : Nat,
  ) : async { #ok : Nat; #err : Text } {
    SocialsLib.createClan(socialsState, caller, name, description, joinMode, emblemId);
  };

  public query func searchClans(q : Text) : async [ClanSummary] {
    SocialsLib.searchClans(socialsState, q);
  };

  public query func getAllClans() : async [ClanSummary] {
    SocialsLib.getAllClans(socialsState);
  };

  public query func getClan(clanId : Nat) : async { #ok : ClanDetails; #err : Text } {
    SocialsLib.getClan(socialsState, clanId, getName, getAvatarUrl, getLevel);
  };

  public shared ({ caller }) func joinClan(clanId : Nat) : async { #ok : Text; #err : Text } {
    SocialsLib.joinClan(socialsState, caller, clanId);
  };

  public shared ({ caller }) func leaveClan(clanId : Nat) : async { #ok : Text; #err : Text } {
    SocialsLib.leaveClan(socialsState, caller, clanId);
  };

  public shared ({ caller }) func updateClan(
    clanId : Nat,
    description : Text,
    joinMode : JoinMode,
    emblemId : Nat,
  ) : async { #ok : ClanDetails; #err : Text } {
    SocialsLib.updateClan(socialsState, caller, clanId, description, joinMode, emblemId, getName, getAvatarUrl, getLevel);
  };

  public shared ({ caller }) func deleteClan(clanId : Nat) : async { #ok : Text; #err : Text } {
    SocialsLib.deleteClan(socialsState, caller, clanId);
  };

  // ── Join request management ──────────────────────────────────────────────

  public shared ({ caller }) func getPendingJoinRequests(
    clanId : Nat
  ) : async { #ok : [PrincipalInfo]; #err : Text } {
    SocialsLib.getPendingJoinRequests(socialsState, caller, clanId, getName, getAvatarUrl, getLevel);
  };

  public shared ({ caller }) func approveJoinRequest(
    clanId : Nat,
    userId : Principal,
  ) : async { #ok : Text; #err : Text } {
    SocialsLib.approveJoinRequest(socialsState, caller, clanId, userId);
  };

  public shared ({ caller }) func declineJoinRequest(
    clanId : Nat,
    userId : Principal,
  ) : async { #ok : Text; #err : Text } {
    SocialsLib.declineJoinRequest(socialsState, caller, clanId, userId);
  };

  // ── Clan chat ────────────────────────────────────────────────────────────

  public shared ({ caller }) func sendClanMessage(
    clanId : Nat,
    text : Text,
  ) : async { #ok : ClanMessage; #err : Text } {
    SocialsLib.sendClanMessage(socialsState, caller, clanId, text);
  };

  public query ({ caller }) func getClanMessages(
    clanId : Nat,
    limit : Nat,
    before : ?Nat,
  ) : async { #ok : [ClanMessage]; #err : Text } {
    SocialsLib.getClanMessages(socialsState, caller, clanId, limit, before);
  };

  // ── Friend system ────────────────────────────────────────────────────────

  public shared ({ caller }) func addFriend(userId : Principal) : async { #ok : Text; #err : Text } {
    SocialsLib.addFriend(socialsState, caller, userId);
  };

  public shared ({ caller }) func removeFriend(userId : Principal) : async { #ok : Text; #err : Text } {
    SocialsLib.removeFriend(socialsState, caller, userId);
  };

  public query ({ caller }) func getFriends() : async [PrincipalInfo] {
    SocialsLib.getFriends(socialsState, caller, getName, getAvatarUrl, getLevel);
  };

  public query ({ caller }) func isFriend(userId : Principal) : async Bool {
    SocialsLib.isFriend(socialsState, caller, userId);
  };

};
