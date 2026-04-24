import Cycles "mo:base/ExperimentalCycles";
import Nat "mo:base/Nat";
import MultiUserSystem "auth-multi-user/management";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import FileStorage "file-storage/file-storage";
import Http "file-storage/http";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Migration "migration";

(with migration = Migration.run)
persistent actor Main {
    
    let multiUserState = MultiUserSystem.initState();

    
    public shared ({ caller }) func initializeAuth() : async () {
        MultiUserSystem.initializeAuth(multiUserState, caller);
    };

    public query ({ caller }) func getCurrentUserRole() : async MultiUserSystem.UserRole {
        MultiUserSystem.getUserRole(multiUserState, caller);
    };

    public query ({ caller }) func isCurrentUserAdmin() : async Bool {
        MultiUserSystem.isAdmin(multiUserState, caller);
    };

    
    public shared ({ caller }) func assignRole(user : Principal, newRole : MultiUserSystem.UserRole) : async () {
        MultiUserSystem.assignRole(multiUserState, caller, user, newRole);
    };

    
    public shared ({ caller }) func setApproval(user : Principal, approval : MultiUserSystem.ApprovalStatus) : async () {
        MultiUserSystem.setApproval(multiUserState, caller, user, approval);
    };

    public query ({ caller }) func getApprovalStatus(user : Principal) : async MultiUserSystem.ApprovalStatus {
        MultiUserSystem.getApprovalStatus(multiUserState, user);
    };

    public query ({ caller }) func getCurrentUserApprovalStatus() : async MultiUserSystem.ApprovalStatus {
        MultiUserSystem.getApprovalStatus(multiUserState, caller);
    };

    
    public query ({ caller }) func listUsers() : async [MultiUserSystem.UserInfo] {
        MultiUserSystem.listUsers(multiUserState, caller);
    };

    public type UserProfile = {
        name : Text;
        bio : Text;
        
    };

    var userProfiles = Map.empty<Principal, UserProfile>();

    public query ({ caller }) func getCurrentUserProfile() : async ?UserProfile {
        userProfiles.get(caller);
    };

    public query func getUserProfile(user : Principal) : async ?UserProfile {
        userProfiles.get(user);
    };

    public shared ({ caller }) func saveCurrentUserProfile(profile : UserProfile) : async () {
        if (profile.name.size() > 15) {
            Runtime.trap("Name too long. Maximum 15 characters allowed.");
        };
        userProfiles.add(caller, profile);
    };

    
    var storage = FileStorage.new();

    public query func fileList() : async [FileStorage.FileMetadata] {
        FileStorage.list(storage);
    };

    public func fileUpload(path : Text, mimeType : Text, chunk : Blob, complete : Bool) : async () {
        FileStorage.upload(storage, path, mimeType, chunk, complete);
    };

    public func fileDelete(path : Text) : async () {
        FileStorage.delete(storage, path);
    };

    public query func http_request(request : Http.HttpRequest) : async Http.HttpResponse {
        FileStorage.fileRequest(storage, request, httpStreamingCallback);
    };

    public query func httpStreamingCallback(token : Http.StreamingToken) : async Http.StreamingCallbackHttpResponse {
        FileStorage.httpStreamingCallback(storage, token);
    };

    
    public type UserProfileWithChangeStatus = {
        name : Text;
        bio : Text;
        hasChangedName : Bool;
    };

    var userProfilesWithChangeStatus = Map.empty<Principal, UserProfileWithChangeStatus>();

    public query ({ caller }) func getCurrentUserProfileWithChangeStatus() : async ?UserProfileWithChangeStatus {
        userProfilesWithChangeStatus.get(caller);
    };

    public query func getUserProfileWithChangeStatus(user : Principal) : async ?UserProfileWithChangeStatus {
        userProfilesWithChangeStatus.get(user);
    };

    public shared ({ caller }) func saveCurrentUserProfileWithChangeStatus(profile : UserProfileWithChangeStatus) : async () {
        if (profile.name.size() > 15) {
            Runtime.trap("Name too long. Maximum 15 characters allowed.");
        };
        userProfilesWithChangeStatus.add(caller, profile);
    };

    public query func getLeaderboard() : async [(Text, Nat)] {
        let entries = userProfilesWithChangeStatus.entries().toArray();
        let sorted = entries.sort<(Principal, UserProfileWithChangeStatus)>(
            func(a, b) {
                let aScore = 0;
                let bScore = 0;
                if (aScore > bScore) #less else if (aScore < bScore) #greater else #equal;
            },
        );
        sorted.map<(Principal, UserProfileWithChangeStatus), (Text, Nat)>(
            func((_, profile)) { (profile.name, 0) },
        );
    };

type __CAFFEINE_STORAGE_RefillInformation = {
    proposed_top_up_amount: ?Nat;
};

type __CAFFEINE_STORAGE_RefillResult = {
    success: ?Bool;
    topped_up_amount: ?Nat;
};

    public shared (msg) func __CAFFEINE_STORAGE_refillCashier(refill_information: ?__CAFFEINE_STORAGE_RefillInformation) : async __CAFFEINE_STORAGE_RefillResult {
    let cashier = Principal.fromText("72ch2-fiaaa-aaaar-qbsvq-cai");
    
    assert (cashier == msg.caller);
    
    let current_balance = Cycles.balance();
    let reserved_cycles : Nat = 400_000_000_000;
    
    let current_free_cycles_count : Nat = Nat.sub(current_balance, reserved_cycles);
    
    let cycles_to_send : Nat = switch (refill_information) {
        case null { current_free_cycles_count };
        case (?info) {
            switch (info.proposed_top_up_amount) {
                case null { current_free_cycles_count };
                case (?proposed) { Nat.min(proposed, current_free_cycles_count) };
            }
        };
    };

    let target_canister = actor(cashier.toText()) : actor {
        account_top_up_v1 : ({ account : Principal }) -> async ();
    };
    
    let current_principal = Principal.fromActor(Main);
    
    await (with cycles = cycles_to_send) target_canister.account_top_up_v1({ account = current_principal });
    
    return {
        success = ?true;
        topped_up_amount = ?cycles_to_send;
    };
};
};
