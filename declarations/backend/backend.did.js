export const idlFactory = ({ IDL }) => {
  const UserRole = IDL.Variant({
    'admin' : IDL.Null,
    'user' : IDL.Null,
    'guest' : IDL.Null,
  });
  const FileMetadata = IDL.Record({
    'path' : IDL.Text,
    'size' : IDL.Nat,
    'mimeType' : IDL.Text,
  });
  const ApprovalStatus = IDL.Variant({
    'pending' : IDL.Null,
    'approved' : IDL.Null,
    'rejected' : IDL.Null,
  });
  const UserProfile = IDL.Record({ 'bio' : IDL.Text, 'name' : IDL.Text });
  const UserProfileWithChangeStatus = IDL.Record({
    'bio' : IDL.Text,
    'name' : IDL.Text,
    'hasChangedName' : IDL.Bool,
  });
  const StreamingToken = IDL.Record({
    'resource' : IDL.Text,
    'index' : IDL.Nat,
  });
  const StreamingCallbackHttpResponse = IDL.Record({
    'token' : IDL.Opt(StreamingToken),
    'body' : IDL.Vec(IDL.Nat8),
  });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
  });
  const StreamingCallback = IDL.Func(
      [StreamingToken],
      [StreamingCallbackHttpResponse],
      ['query'],
    );
  const StreamingStrategy = IDL.Variant({
    'Callback' : IDL.Record({
      'token' : StreamingToken,
      'callback' : StreamingCallback,
    }),
  });
  const HttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'streaming_strategy' : IDL.Opt(StreamingStrategy),
    'status_code' : IDL.Nat16,
  });
  const UserInfo = IDL.Record({
    'principal' : IDL.Principal,
    'role' : UserRole,
    'approval' : ApprovalStatus,
  });
  return IDL.Service({
    'assignRole' : IDL.Func([IDL.Principal, UserRole], [], []),
    'fileDelete' : IDL.Func([IDL.Text], [], []),
    'fileList' : IDL.Func([], [IDL.Vec(FileMetadata)], ['query']),
    'fileUpload' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Vec(IDL.Nat8), IDL.Bool],
        [],
        [],
      ),
    'getApprovalStatus' : IDL.Func(
        [IDL.Principal],
        [ApprovalStatus],
        ['query'],
      ),
    'getCurrentUserApprovalStatus' : IDL.Func([], [ApprovalStatus], ['query']),
    'getCurrentUserProfile' : IDL.Func([], [IDL.Opt(UserProfile)], ['query']),
    'getCurrentUserProfileWithChangeStatus' : IDL.Func(
        [],
        [IDL.Opt(UserProfileWithChangeStatus)],
        ['query'],
      ),
    'getCurrentUserRole' : IDL.Func([], [UserRole], ['query']),
    'getLeaderboard' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
        ['query'],
      ),
    'getUserProfile' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(UserProfile)],
        ['query'],
      ),
    'getUserProfileWithChangeStatus' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(UserProfileWithChangeStatus)],
        ['query'],
      ),
    'httpStreamingCallback' : IDL.Func(
        [StreamingToken],
        [StreamingCallbackHttpResponse],
        ['query'],
      ),
    'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
    'initializeAuth' : IDL.Func([], [], []),
    'isCurrentUserAdmin' : IDL.Func([], [IDL.Bool], ['query']),
    'listUsers' : IDL.Func([], [IDL.Vec(UserInfo)], ['query']),
    'saveCurrentUserProfile' : IDL.Func([UserProfile], [], []),
    'saveCurrentUserProfileWithChangeStatus' : IDL.Func(
        [UserProfileWithChangeStatus],
        [],
        [],
      ),
    'setApproval' : IDL.Func([IDL.Principal, ApprovalStatus], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
