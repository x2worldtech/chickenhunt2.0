import Http "http";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

module {
    type Asset = {
        mimeType : Text;
        chunks : [Blob];
    };

    public type FileStorage = {
        var assets : Map.Map<Text, Asset>;
        var pending : Map.Map<Text, Asset>;
    };

    public func new() : FileStorage {
        {
            var assets = Map.empty<Text, Asset>();
            var pending = Map.empty<Text, Asset>();
        };
    };

    public type FileMetadata = {
        path : Text;
        mimeType : Text;
        size : Nat;
    };

    public func list(storage : FileStorage) : [FileMetadata] {
        storage.assets.entries().map<(Text, Asset), FileMetadata>(
            func((path, asset)) {
                let size = asset.chunks.foldLeft<Nat>(0, func(sum, chunk) { sum + chunk.size() });
                { path; mimeType = asset.mimeType; size };
            }
        ).toArray();
    };

    public func upload(storage : FileStorage, path : Text, mimeType : Text, chunk : Blob, complete : Bool) {
        let chunks = switch (storage.pending.get(path)) {
            case null [chunk];
            case (?old) old.chunks.concat([chunk]);
        };
        let combined = { mimeType; chunks };
        if (complete) {
            storage.pending.remove(path);
            storage.assets.add(path, combined);
        } else {
            storage.pending.add(path, combined);
        };
    };

    public func delete(storage : FileStorage, path : Text) {
        storage.assets.remove(path);
        storage.pending.remove(path);
    };

    let skipCertificate = ("IC-Certificate", "skip");

    let notFound : Http.HttpResponse = {
        status_code = 404;
        headers = [
            ("Content-Type", "text/html"),
            skipCertificate
        ];
        body = "<h1>404 - Not Found</h1>";
        streaming_strategy = null;
    };

    public func fileRequest(storage : FileStorage, request : Http.HttpRequest, callback : Http.StreamingCallback) : Http.HttpResponse {
        let path = switch (Text.stripStart(request.url, #char('/'))) {
            case null request.url;
            case (?stripped) stripped;
        };
        switch (storage.assets.get(path)) {
            case null notFound;
            case (?asset) {
                let streamingStrategy = if (asset.chunks.size() == 1) {
                    null;
                } else {
                    let token = {
                        resource = path;
                        index = 1;
                    };
                    ?(#Callback({ callback; token }));
                };
                let firstChunk = asset.chunks[0];
                return {
                    status_code = 200;
                    headers = [
                        ("Content-Type", asset.mimeType),
                        ("Cache-Control", "public, max-age=31536000, immutable"),
                        skipCertificate
                    ];
                    body = firstChunk;
                    streaming_strategy = streamingStrategy;
                };
            };
        };
    };

    public func httpStreamingCallback(storage : FileStorage, token : Http.StreamingToken) : Http.StreamingCallbackHttpResponse {
        let path = token.resource;
        let asset = switch (storage.assets.get(path)) {
            case null Runtime.trap("Invalid resource");
            case (?asset) asset;
        };
        let nextChunk = asset.chunks[token.index];
        let nextToken = if (token.index + 1 < asset.chunks.size()) {
            ?{
                resource = path;
                index = token.index + 1;
            };
        } else {
            null;
        };
        {
            body = nextChunk;
            token = nextToken;
        };
    };
};
