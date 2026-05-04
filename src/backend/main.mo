import MultiUserSystem "auth-multi-user/management";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import FileStorage "file-storage/file-storage";
import Http "file-storage/http";
import SocialsLib "lib/socials";
import SocialsApi "mixins/socials-api";
import PumpPriceApi "mixins/pump-price-api";





persistent actor {
    // ── Auth state ──────────────────────────────────────────────────────────
    let multiUserState = MultiUserSystem.initState();

    // ── Socials state ────────────────────────────────────────────────────────
    let socialsState = SocialsLib.initState();

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

    // ── Player number counter ─────────────────────────────────────────────────
    // Atomically incremented; assigned once per new profile, never reassigned.
    var nextPlayerNumber : Nat = 1;

    // Separate map for player numbers so lazy migration can assign them
    // without touching immutable UserProfile records.
    let playerNumbers = Map.empty<Principal, Nat>();

    // ── User profiles ────────────────────────────────────────────────────────
    public type UserProfile = {
        name : Text;
        bio : Text;
        profilePictureUrl : ?Text;
        bannerImageUrl : ?Text;
        xUrl : ?Text;
        telegramUrl : ?Text;
        youtubeUrl : ?Text;
        githubUrl : ?Text;
    };

    let userProfiles = Map.empty<Principal, UserProfile>();

    public query ({ caller }) func getCurrentUserProfile() : async ?UserProfile {
        userProfiles.get(caller);
    };

    public query func getUserProfile(user : Principal) : async ?UserProfile {
        userProfiles.get(user);
    };

    // Assign a player number the first time a principal gets a profile.
    func ensurePlayerNumber(principal : Principal) {
        switch (playerNumbers.get(principal)) {
            case (?_) {}; // already assigned
            case null {
                playerNumbers.add(principal, nextPlayerNumber);
                nextPlayerNumber += 1;
            };
        };
    };

    // Build the display name for a principal: custom name if non-empty, else "Player #N".
    // Read-only — never assigns a new number (safe for queries).
    func buildDisplayName(principal : Principal, name : Text) : Text {
        if (name.size() > 0) {
            name
        } else {
            let n = switch (playerNumbers.get(principal)) {
                case (?num) num;
                case null 0; // unregistered principal — shown as generic fallback
            };
            if (n == 0) "Player #?" else "Player #" # n.toText()
        }
    };

    public shared ({ caller }) func saveCurrentUserProfile(profile : UserProfile) : async () {
        if (profile.name.size() > 15) {
            Runtime.trap("Name too long. Maximum 15 characters allowed.");
        };
        ensurePlayerNumber(caller);
        userProfiles.add(caller, profile);
    };

    // ── User profiles with change status ────────────────────────────────────
    public type UserProfileWithChangeStatus = {
        name : Text;
        bio : Text;
        hasChangedName : Bool;
        xUrl : ?Text;
        telegramUrl : ?Text;
        youtubeUrl : ?Text;
        githubUrl : ?Text;
    };

    let userProfilesWithChangeStatus = Map.empty<Principal, UserProfileWithChangeStatus>();

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
        ensurePlayerNumber(caller);
        userProfilesWithChangeStatus.add(caller, profile);
    };

    // ── Player number queries ─────────────────────────────────────────────────

    public query func getPlayerNumber(user : Principal) : async ?Nat {
        playerNumbers.get(user)
    };

    public query func getPlayerDisplayName(user : Principal) : async Text {
        let name = switch (userProfilesWithChangeStatus.get(user)) {
            case (?p) p.name;
            case null switch (userProfiles.get(user)) {
                case (?p) p.name;
                case null "";
            };
        };
        buildDisplayName(user, name)
    };

    // ── Game statistics ──────────────────────────────────────────────────────
    public type GameStatistics = {
        totalChickensShot : Nat;
        goldenChickensShot : Nat;
        fastChickensShot : Nat;
        smallChickensShot : Nat;
        mediumChickensShot : Nat;
        largeChickensShot : Nat;
        totalShotsFired : Nat;
        totalMissedShots : Nat;
        totalScore : Nat;
        totalPlayTimeMinutes : Nat;
        bestSessionChickens : Nat;
        perfectAccuracySessions : Nat;
        highestScore : Nat;
        bestConsecutiveHits : Nat;
        currentAccuracy : Float;
        level : Nat;
    };

    let gameStatistics = Map.empty<Principal, GameStatistics>();

    public shared ({ caller }) func saveGameStatistics(stats : GameStatistics) : async () {
        if (caller.isAnonymous()) {
            Runtime.trap("Anonymous callers cannot save game statistics.");
        };
        // Ensure player number is assigned on first stat save (covers users without a profile)
        ensurePlayerNumber(caller);
        let existing = gameStatistics.get(caller);
        let updatedHighScore = switch (existing) {
            case null stats.highestScore;
            case (?prev) {
                if (stats.highestScore > prev.highestScore) stats.highestScore
                else prev.highestScore;
            };
        };
        gameStatistics.add(caller, { stats with highestScore = updatedHighScore });
    };

    public query func getUserGameStats(userId : Principal) : async ?GameStatistics {
        gameStatistics.get(userId);
    };

    // ── Leaderboard ───────────────────────────────────────────────────────────
    // Returns [(name, score, level)] sorted descending by highestScore.
    // Name is taken from UserProfileWithChangeStatus; falls back to principal text.
    public query func getLeaderboard() : async [(Principal, Text, Nat, Nat)] {
        let entries : [(Principal, GameStatistics)] = gameStatistics.entries().toArray();
        // Filter out anonymous principals — only authenticated players appear on the leaderboard
        let authenticated = entries.filter(
            func((principal, _stats) : (Principal, GameStatistics)) : Bool {
                not principal.isAnonymous()
            }
        );
        // Sort descending by highestScore
        let sorted = authenticated.sort(
            func(a : (Principal, GameStatistics), b : (Principal, GameStatistics)) : { #less; #equal; #greater } {
                let aScore = a.1.highestScore;
                let bScore = b.1.highestScore;
                if (aScore > bScore) #less
                else if (aScore < bScore) #greater
                else #equal;
            }
        );
        sorted.map<(Principal, GameStatistics), (Principal, Text, Nat, Nat)>(
            func((principal, stats) : (Principal, GameStatistics)) : (Principal, Text, Nat, Nat) {
                let rawName = switch (userProfilesWithChangeStatus.get(principal)) {
                    case (?p) p.name;
                    case null switch (userProfiles.get(principal)) {
                        case (?p) p.name;
                        case null "";
                    };
                };
                let name = buildDisplayName(principal, rawName);
                (principal, name, stats.highestScore, stats.level);
            }
        );
    };

    // ── File storage ─────────────────────────────────────────────────────────
    let storage = FileStorage.new();

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

    // ── Socials mixin ─────────────────────────────────────────────────────────
    // Resolver helpers that bridge socials domain with user profile / stats state
    // Returns the resolved display name (Player #N fallback) for socials context.
    func _getName(p : Principal) : ?Text {
        let rawName = switch (userProfilesWithChangeStatus.get(p)) {
            case (?prof) prof.name;
            case null switch (userProfiles.get(p)) {
                case (?prof) prof.name;
                case null "";
            };
        };
        ?buildDisplayName(p, rawName)
    };

    func _getAvatarUrl(p : Principal) : ?Text {
        switch (userProfiles.get(p)) {
            case (?prof) prof.profilePictureUrl;
            case null null;
        };
    };

    func _getLevel(p : Principal) : Nat {
        switch (gameStatistics.get(p)) {
            case (?stats) stats.level;
            case null 0;
        };
    };

    include SocialsApi(socialsState, _getName, _getAvatarUrl, _getLevel);

    // ── Pump.fun price mixin ──────────────────────────────────────────────────
    let pumpPriceState = { var price : Float = 0.0; var change24h : Float = 0.0; var lastUpdated : Int = 0 };
    include PumpPriceApi(pumpPriceState);
};
