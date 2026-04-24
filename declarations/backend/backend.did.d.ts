import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type ApprovalStatus = { 'pending' : null } |
  { 'approved' : null } |
  { 'rejected' : null };
export interface FileMetadata {
  'path' : string,
  'size' : bigint,
  'mimeType' : string,
}
export type HeaderField = [string, string];
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
}
export interface HttpResponse {
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export type StreamingCallback = ActorMethod<
  [StreamingToken],
  StreamingCallbackHttpResponse
>;
export interface StreamingCallbackHttpResponse {
  'token' : [] | [StreamingToken],
  'body' : Uint8Array | number[],
}
export type StreamingStrategy = {
    'Callback' : { 'token' : StreamingToken, 'callback' : [Principal, string] }
  };
export interface StreamingToken { 'resource' : string, 'index' : bigint }
export interface UserInfo {
  'principal' : Principal,
  'role' : UserRole,
  'approval' : ApprovalStatus,
}
export interface UserProfile { 'bio' : string, 'name' : string }
export interface UserProfileWithChangeStatus {
  'bio' : string,
  'name' : string,
  'hasChangedName' : boolean,
}
export type UserRole = { 'admin' : null } |
  { 'user' : null } |
  { 'guest' : null };
export interface _SERVICE {
  'assignRole' : ActorMethod<[Principal, UserRole], undefined>,
  'fileDelete' : ActorMethod<[string], undefined>,
  'fileList' : ActorMethod<[], Array<FileMetadata>>,
  'fileUpload' : ActorMethod<
    [string, string, Uint8Array | number[], boolean],
    undefined
  >,
  'getApprovalStatus' : ActorMethod<[Principal], ApprovalStatus>,
  'getCurrentUserApprovalStatus' : ActorMethod<[], ApprovalStatus>,
  'getCurrentUserProfile' : ActorMethod<[], [] | [UserProfile]>,
  'getCurrentUserProfileWithChangeStatus' : ActorMethod<
    [],
    [] | [UserProfileWithChangeStatus]
  >,
  'getCurrentUserRole' : ActorMethod<[], UserRole>,
  'getLeaderboard' : ActorMethod<[], Array<[string, bigint]>>,
  'getUserProfile' : ActorMethod<[Principal], [] | [UserProfile]>,
  'getUserProfileWithChangeStatus' : ActorMethod<
    [Principal],
    [] | [UserProfileWithChangeStatus]
  >,
  'httpStreamingCallback' : ActorMethod<
    [StreamingToken],
    StreamingCallbackHttpResponse
  >,
  'http_request' : ActorMethod<[HttpRequest], HttpResponse>,
  'initializeAuth' : ActorMethod<[], undefined>,
  'isCurrentUserAdmin' : ActorMethod<[], boolean>,
  'listUsers' : ActorMethod<[], Array<UserInfo>>,
  'saveCurrentUserProfile' : ActorMethod<[UserProfile], undefined>,
  'saveCurrentUserProfileWithChangeStatus' : ActorMethod<
    [UserProfileWithChangeStatus],
    undefined
  >,
  'setApproval' : ActorMethod<[Principal, ApprovalStatus], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
