import BaseToCore "BaseToCore";
import OrderedMap "mo:base/OrderedMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Map "mo:core/Map";

module {
  type UserProfile = {
    name : Text;
    bio : Text;
  };

  type UserProfileWithChangeStatus = {
    name : Text;
    bio : Text;
    hasChangedName : Bool;
  };

  type UserRole = {
    #admin;
    #user;
    #guest;
  };

  type ApprovalStatus = {
    #approved;
    #rejected;
    #pending;
  };

  type OldAsset = {
    mimeType : Text;
    chunks : [Blob];
  };

  type OldFileStorage = {
    var assets : OrderedMap.Map<Text, OldAsset>;
    var pending : OrderedMap.Map<Text, OldAsset>;
  };

  type NewAsset = {
    mimeType : Text;
    chunks : [Blob];
  };

  type NewFileStorage = {
    var assets : Map.Map<Text, NewAsset>;
    var pending : Map.Map<Text, NewAsset>;
  };

  type OldMultiUserState = {
    var adminAssigned : Bool;
    var userRoles : OrderedMap.Map<Principal, UserRole>;
    var approvalStatus : OrderedMap.Map<Principal, ApprovalStatus>;
  };

  type NewMultiUserState = {
    var adminAssigned : Bool;
    var userRoles : Map.Map<Principal, UserRole>;
    var approvalStatus : Map.Map<Principal, ApprovalStatus>;
  };

  type OldActor = {
    multiUserState : OldMultiUserState;
    var userProfiles : OrderedMap.Map<Principal, UserProfile>;
    var storage : OldFileStorage;
    var userProfilesWithChangeStatus : OrderedMap.Map<Principal, UserProfileWithChangeStatus>;
  };

  type NewActor = {
    multiUserState : NewMultiUserState;
    var userProfiles : Map.Map<Principal, UserProfile>;
    var storage : NewFileStorage;
    var userProfilesWithChangeStatus : Map.Map<Principal, UserProfileWithChangeStatus>;
  };

  public func run(old : OldActor) : NewActor {
    {
      multiUserState = {
        var adminAssigned = old.multiUserState.adminAssigned;
        var userRoles = BaseToCore.migrateOrderedMap<Principal, UserRole>(old.multiUserState.userRoles);
        var approvalStatus = BaseToCore.migrateOrderedMap<Principal, ApprovalStatus>(old.multiUserState.approvalStatus);
      };
      var userProfiles = BaseToCore.migrateOrderedMap<Principal, UserProfile>(old.userProfiles);
      var storage = {
        var assets = BaseToCore.migrateOrderedMap<Text, OldAsset>(old.storage.assets);
        var pending = BaseToCore.migrateOrderedMap<Text, OldAsset>(old.storage.pending);
      };
      var userProfilesWithChangeStatus = BaseToCore.migrateOrderedMap<Principal, UserProfileWithChangeStatus>(old.userProfilesWithChangeStatus);
    };
  };
};
