import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Blob "mo:core/Blob";

mixin (
  pumpPrice : { var price : Float; var change24h : Float; var lastUpdated : Int }
) {

  public type PumpPriceData = { price : Float; change24h : Float; lastUpdated : Int };

  type HttpHeader = { name : Text; value : Text };
  type HttpResponseRaw = { status : Nat; headers : [HttpHeader]; body : Blob };

  let IC = actor "aaaaa-aa" : actor {
    http_request : {
      url : Text;
      max_response_bytes : ?Nat64;
      headers : [HttpHeader];
      body : ?Blob;
      method : { #get; #post; #head };
      transform : ?{
        function : shared query HttpResponseRaw -> async HttpResponseRaw;
        context : Blob;
      };
    } -> async HttpResponseRaw;
  };

  // Transform: strip headers, return body only (required for http_request transform)
  public query func transformPumpResponse(raw : HttpResponseRaw) : async HttpResponseRaw {
    { raw with headers = [] };
  };

  // Parse a Float from a decimal string like "0.001234" or "-5.67" or "1.2e-4"
  func _parseFloat(s : Text) : ?Float {
    if (s == "" or s == "-") return null;
    let neg = s.startsWith(#text "-");
    let abs = if (neg) {
      switch (s.stripStart(#text "-")) { case (?t) t; case null s };
    } else s;

    // Split on 'e'/'E' for scientific notation
    let eParts = abs.split(#text "e").toArray();
    let eParts2 = if (eParts.size() == 1) abs.split(#text "E").toArray() else eParts;
    let mantissa = eParts2[0];
    let expStr : ?Text = if (eParts2.size() > 1) ?eParts2[1] else null;

    // Split mantissa on '.'
    let dotParts = mantissa.split(#text ".").toArray();
    let intPart = dotParts[0];
    let fracPart = if (dotParts.size() > 1) dotParts[1] else "";

    let intVal : Nat = switch (Nat.fromText(intPart)) {
      case (?n) n;
      case null { if (intPart == "") 0 else return null };
    };
    var result : Float = intVal.toFloat();

    // Add fractional part
    if (fracPart.size() > 0) {
      switch (Nat.fromText(fracPart)) {
        case (?frac) {
          var divisor : Float = 1.0;
          var i : Nat = 0;
          while (i < fracPart.size()) {
            divisor := divisor * 10.0;
            i += 1;
          };
          result := result + frac.toFloat() / divisor;
        };
        case null return null;
      };
    };

    // Apply exponent
    switch (expStr) {
      case (?eStr) {
        let eNeg = eStr.startsWith(#text "-");
        let eAbs = switch (eStr.stripStart(#text "-")) { case (?t) t; case null eStr };
        let eAbsP = switch (eAbs.stripStart(#text "+")) { case (?t) t; case null eAbs };
        switch (Nat.fromText(eAbsP)) {
          case (?exp) {
            var mult : Float = 1.0;
            var j : Nat = 0;
            while (j < exp) {
              mult := mult * 10.0;
              j += 1;
            };
            result := if (eNeg) result / mult else result * mult;
          };
          case null {};
        };
      };
      case null {};
    };

    ?(if (neg) -result else result);
  };

  // Extract the first numeric value appearing after `key` in a JSON string
  func _extractFloat(json : Text, key : Text) : ?Float {
    let parts = json.split(#text key).toArray();
    if (parts.size() < 2) return null;
    let afterKey = parts[1];
    var numStr = "";
    var started = false;
    label scan for (c in afterKey.toIter()) {
      if (c == '-' and not started) {
        numStr := "-";
        started := true;
      } else if (c >= '0' and c <= '9') {
        numStr := numStr # Text.fromChar(c);
        started := true;
      } else if (c == '.' and started) {
        numStr := numStr # ".";
      } else if ((c == 'e' or c == 'E') and started) {
        numStr := numStr # Text.fromChar(c);
      } else if ((c == '+' or c == '-') and started and
                 (numStr.endsWith(#text "e") or numStr.endsWith(#text "E"))) {
        numStr := numStr # Text.fromChar(c);
      } else if (started) {
        break scan;
      };
    };
    _parseFloat(numStr);
  };

  // Fetch live PUMP token price from CoinGecko; caches result in injected state
  public func getPumpFunPrice() : async PumpPriceData {
    let url = "https://api.coingecko.com/api/v3/simple/price?ids=pump-fun&vs_currencies=usd&include_24hr_change=true";
    try {
      let resp = await IC.http_request({
        url;
        max_response_bytes = ?2048;
        headers = [{ name = "Accept"; value = "application/json" }];
        body = null;
        method = #get;
        transform = ?{
          function = transformPumpResponse;
          context = Blob.fromArray([]);
        };
      });
      switch (resp.body.decodeUtf8()) {
        case null {};
        case (?bodyText) {
          switch (_extractFloat(bodyText, "\"usd\":")) {
            case (?p) pumpPrice.price := p;
            case null {};
          };
          switch (_extractFloat(bodyText, "\"usd_24h_change\":")) {
            case (?c) pumpPrice.change24h := c;
            case null {};
          };
          pumpPrice.lastUpdated := Time.now();
        };
      };
    } catch (_) {};
    { price = pumpPrice.price; change24h = pumpPrice.change24h; lastUpdated = pumpPrice.lastUpdated };
  };

  // Return cached price without making a new API call
  public query func getCachedPumpFunPrice() : async PumpPriceData {
    { price = pumpPrice.price; change24h = pumpPrice.change24h; lastUpdated = pumpPrice.lastUpdated };
  };
};
