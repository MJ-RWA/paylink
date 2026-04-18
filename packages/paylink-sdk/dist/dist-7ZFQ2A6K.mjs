import {
  __publicField
} from "./chunk-TJFISUBQ.mjs";

// ../../node_modules/.pnpm/@cartridge+controller@0.13._18d4e200fd1ab02c88452163c6ea4a3b/node_modules/@cartridge/controller/dist/index.js
import { WalletAccount as Sn, constants as ge, num as Bt, shortString as ft } from "starknet";

// ../../node_modules/.pnpm/@cartridge+controller@0.13._18d4e200fd1ab02c88452163c6ea4a3b/node_modules/@cartridge/controller/dist/index-BBfUA93L.js
import { shortString as b, constants as _, CallData as j, addAddressPadding as T, getChecksumAddress as f, hash as y, typedData as I, TypedDataRevision as N } from "starknet";
var Q = "0.13.11";
var E = {
  version: Q
};
var h = [
  "metamask",
  "rabby",
  "phantom-evm"
];
var k = [
  "argent",
  "braavos",
  "phantom",
  "base"
];
var C = [
  ...h,
  ...k
];
var D = [
  "google",
  "webauthn",
  "discord",
  "walletconnect",
  "password",
  "sms"
];
var G = [
  ...D,
  ...C
];
var V = [
  ...D,
  ...h
];
var Y = /* @__PURE__ */ ((a) => (a.SUCCESS = "SUCCESS", a.NOT_CONNECTED = "NOT_CONNECTED", a.ERROR = "ERROR", a.CANCELED = "CANCELED", a.USER_INTERACTION_REQUIRED = "USER_INTERACTION_REQUIRED", a))(Y || {});
var w = /* @__PURE__ */ ((a) => (a.PAYMASTER = "PAYMASTER", a.CREDITS = "CREDITS", a))(w || {});
var S = /* @__PURE__ */ new Set([
  "contracts",
  "messages",
  "target",
  "method",
  "name",
  "description",
  "types",
  "domain",
  "primaryType"
]);
function O(a) {
  if (!S.has(a))
    throw new Error(`Invalid property name: ${a}`);
}
function c(a, e) {
  return O(e), a[e];
}
function F(a) {
  return g(a).map((e) => ({
    entrypoint: e.entrypoint,
    contractAddress: T(e.contractAddress),
    calldata: j.toHex(e.calldata)
  }));
}
function $(a, e) {
  const s = b.decodeShortString(e), d = a.chains?.[s];
  if (d?.policies)
    return R(d.policies);
}
function R(a) {
  return Array.isArray(a) ? a.reduce(
    (e, s) => {
      if (c(s, "target")) {
        const t = f(
          c(s, "target")
        ), d = c(s, "method"), o = c(
          e,
          "contracts"
        ), r = {
          name: L(d),
          entrypoint: d,
          description: c(s, "description")
        };
        if (t in o) {
          const l = g(o[t].methods);
          o[t] = {
            methods: [...l, r]
          };
        } else
          o[t] = {
            methods: [r]
          };
      } else
        c(e, "messages").push(s);
      return e;
    },
    { contracts: {}, messages: [] }
  ) : a;
}
function J(a) {
  return [
    ...Object.entries(a.contracts ?? {}).sort(([e], [s]) => e.toLowerCase().localeCompare(s.toLowerCase())).flatMap(
      ([e, { methods: s }]) => g(s).slice().sort((t, d) => t.entrypoint.localeCompare(d.entrypoint)).map((t) => {
        if (t.entrypoint === "approve") {
          if ("spender" in t && "amount" in t && t.spender && t.amount)
            return {
              target: f(e),
              spender: t.spender,
              amount: String(t.amount)
            };
          console.warn(
            `[DEPRECATED] Approve method without spender and amount fields will be rejected in future versions. Please update your preset or policies to include both 'spender' and 'amount' fields for approve calls on contract ${e}. Example: { entrypoint: "approve", spender: "0x...", amount: "0x..." }`
          );
        }
        return {
          target: f(e),
          method: y.getSelectorFromName(t.entrypoint),
          authorized: !!t.authorized
        };
      })
    ),
    ...(a.messages ?? []).map((e) => {
      const s = I.getStructHash(
        e.types,
        "StarknetDomain",
        e.domain,
        N.ACTIVE
      ), t = I.getTypeHash(
        e.types,
        e.primaryType,
        N.ACTIVE
      );
      return {
        scope_hash: y.computePoseidonHash(s, t),
        authorized: !!e.authorized
      };
    }).sort(
      (e, s) => e.scope_hash.toString().localeCompare(s.scope_hash.toString())
    )
  ];
}
function g(a) {
  return Array.isArray(a) ? a : [a];
}
function L(a) {
  return a.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/_/g, " ").toLowerCase().replace(/^\w/, (e) => e.toUpperCase());
}
function X(a) {
  const e = a.pathname.split("/");
  if (!(a.hostname === "api.cartridge.gg")) {
    if (typeof XMLHttpRequest > "u")
      return console.warn(
        `Cannot make synchronous HTTP call in Node.js environment for ${a.toString()}`
      ), b.encodeShortString("LOCALHOST");
    const t = new XMLHttpRequest();
    t.open("POST", a.toString(), false), t.setRequestHeader("Content-Type", "application/json");
    const d = JSON.stringify({
      jsonrpc: "2.0",
      method: "starknet_chainId",
      params: [],
      id: 1
    });
    try {
      if (t.send(d), t.status === 200) {
        const o = JSON.parse(t.responseText);
        if (o.result)
          return o.result;
      }
      throw new Error(
        `Failed to get chain ID from ${a.toString()}: ${t.status} ${t.statusText}`
      );
    } catch (o) {
      throw new Error(`Failed to connect to ${a.toString()}: ${o}`);
    }
  }
  if (e.includes("starknet")) {
    if (e.includes("mainnet"))
      return _.StarknetChainId.SN_MAIN;
    if (e.includes("sepolia"))
      return _.StarknetChainId.SN_SEPOLIA;
  } else if (e.length >= 3) {
    const t = e[2];
    if (e.includes("katana"))
      return b.encodeShortString(
        `WP_${t.toUpperCase().replace(/-/g, "_")}`
      );
    if (e.includes("mainnet"))
      return b.encodeShortString(
        `GG_${t.toUpperCase().replace(/-/g, "_")}`
      );
  }
  throw new Error(`Chain ${a.toString()} not supported`);
}
function K(a) {
  try {
    const e = new URL(a, window.location.origin);
    if (e.protocol === "http:" || e.protocol === "https:")
      return e.href;
  } catch {
  }
  return "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
}
var q = "https://x.cartridge.gg";
var ee = "https://api.cartridge.gg";
var M = class _M extends Error {
  constructor() {
    super("Not ready to connect"), Object.setPrototypeOf(this, _M.prototype);
  }
};
var m = class _m extends Error {
  constructor(e, s) {
    super(e), this.cause = s, this.name = "HeadlessAuthenticationError", Object.setPrototypeOf(this, _m.prototype);
  }
};
var A = class _A extends m {
  constructor(e) {
    super(`Invalid credentials provided for type: ${e}`), this.name = "InvalidCredentialsError", Object.setPrototypeOf(this, _A.prototype);
  }
};
var x = class _x extends Error {
  constructor(e) {
    super(`Operation "${e}" is not supported in headless mode`), this.name = "HeadlessModeNotSupportedError", Object.setPrototypeOf(this, _x.prototype);
  }
};
var v = {
  ACCOUNTS: "accounts"
};
var P = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDgwMCA4MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2RfNTExMl83ODIpIj4KPHBhdGggZD0iTTQ2OS4yMzYgNzBDNDgyLjM5IDcwIDQ5My4wNTMgODAuNjYzIDQ5My4wNTMgOTMuODE2NFYxNDcuMTQ3TDUxNS4zMzggMTQ3LjE0N0w1MTUuNDI4IDE0Ny4xNDdMNTE1LjU1NCAxNDcuMTQ3TDUxNS44MjYgMTQ3LjE0OUM1MTYuMDE2IDE0Ny4xNTEgNTE2LjIyNSAxNDcuMTUzIDUxNi40NTEgMTQ3LjE1N0M1MTYuOTA0IDE0Ny4xNjQgNTE3LjQyOCAxNDcuMTc2IDUxOC4wMiAxNDcuMTk1QzUxOS4yMDEgMTQ3LjIzNCA1MjAuNjYgMTQ3LjMwNCA1MjIuMzYxIDE0Ny40MjRDNTI1Ljc0MSAxNDcuNjYzIDUzMC4xODUgMTQ4LjExNCA1MzUuMzYzIDE0OC45NjlDNTQ1LjAwMSAxNTAuNTYyIDU1OC41NTYgMTUzLjc4IDU3Mi45MTggMTYwLjYwM0w3MzAuNDIgMjI2LjY3MUw3MzIuMTAxIDIyNy41MDVDNzcxLjc4NyAyNDcuMTc3IDc4OS45OTMgMjg2LjI5NiA3ODkuOTkzIDMyMi4wMzZWNTg1Ljg2NUM3ODkuOTkzIDU4Ni4wNTQgNzg5Ljk5NCA1ODYuMjU0IDc4OS45OTQgNTg2LjQ2M0w3ODkuOTk2IDU4Ni45MTNDNzkwLjAzOCA1OTcuMDk2IDc5MC4xNjEgNjI2Ljk5NiA3NjQuMjMxIDY1Mi44MjNMNzE0Ljc2IDcwMi4wOTVMNzE0LjY0MSA3MDIuMjE1QzcwNC42MDEgNzEyLjI3NSA2OTIuMTIzIDcyMC42NTIgNjc2LjI4NCA3MjQuODc5QzY2NC4zOSA3MjguMDU0IDY1Mi44MjcgNzI3Ljk2NiA2NDguNjM3IDcyNy45MzRMNjQ4LjYxOSA3MjcuOTMzQzY0OC40MDkgNzI3LjkzMiA2NDguMjE5IDcyNy45MyA2NDguMDQ3IDcyNy45M0w2NDcuNzUyIDcyNy45MjlINDgwLjcyMUM0NzQuMDk0IDcyNy45MjkgNDY4LjcyMSA3MjIuNTU2IDQ2OC43MjEgNzE1LjkyOVY2NjguMzg4SDMyOC41ODZDMzI4LjU4NiA2NzIuNjI5IDMyOC41NzIgNjk4LjA1MiAzMjguNTYxIDcxNS45NDRDMzI4LjU1NyA3MjIuNTY5IDMyMy4xODYgNzI3LjkyOSAzMTYuNTYxIDcyNy45MjlIMTUyLjI0NkMxNTIuMTA0IDcyNy45MjkgMTUxLjk0MiA3MjcuOTI5IDE1MS43NjIgNzI3LjkzMUwxNTEuMzYyIDcyNy45MzRDMTQ3LjE3MiA3MjcuOTY2IDEzNS42MDkgNzI4LjA1NCAxMjMuNzE0IDcyNC44NzlDMTA3Ljg3MyA3MjAuNjUxIDk1LjM5MzggNzEyLjI3MiA4NS4zNTI5IDcwMi4yMUw4NS4yMzg2IDcwMi4wOTVMMzUuNjcgNjUyLjcyNUwzNS41NzIzIDY1Mi42MjdDOS44NjI0MiA2MjYuNzggOS45NjY3IDU5Ny4xODUgMTAuMDAzIDU4Ni44NzRDMTAuMDA0MyA1ODYuNTEzIDEwLjAwNTUgNTg2LjE3NyAxMC4wMDU1IDU4NS44NjVWMzIyLjAzNkMxMC4wMDU1IDI4Ni40MyAyOC4xNjYyIDI0Ny4xOTkgNjcuODk3NyAyMjcuNTA1TDY5LjU3OSAyMjYuNjcxTDIyNy4wODEgMTYwLjYwM0MyNDEuNDQzIDE1My43OCAyNTQuOTk4IDE1MC41NjIgMjY0LjYzNiAxNDguOTY5QzI2OS44MTQgMTQ4LjExNCAyNzQuMjU4IDE0Ny42NjMgMjc3LjYzOCAxNDcuNDI0QzI3OS4zMzggMTQ3LjMwNCAyODAuNzk4IDE0Ny4yMzQgMjgxLjk3OSAxNDcuMTk1QzI4Mi41NzEgMTQ3LjE3NiAyODMuMDk1IDE0Ny4xNjQgMjgzLjU0NyAxNDcuMTU3TDI4My45MTcgMTQ3LjE1MkwyODQuMTczIDE0Ny4xNDlMMjg0LjQ0NSAxNDcuMTQ3TDI4NC41NzEgMTQ3LjE0N0wyODQuNjYgMTQ3LjE0N0wzMDYuOTQyIDE0Ny4xNDdWOTMuODE2NEMzMDYuOTQyIDgwLjY2MyAzMTcuNjA1IDcwIDMzMC43NTggNzBINDY5LjIzNloiIGZpbGw9IiMxOTFBMUEiLz4KPHBhdGggZD0iTTM2Ni40ODMgMTI5LjU0SDQzMy41MTJWMjA2LjY4N0gzNjYuNDgzVjEyOS41NFoiIGZpbGw9IiNGQkNCNEEiLz4KPHBhdGggZD0iTTI2OS4wMSA2MDIuNDI5SDE0NC4wMDhDMTM1Ljc2OCA2MDIuNDI5IDEzNS43NjggNTk0LjE0NiAxMzUuNzY4IDU5NC4xNDZWMjgwLjg1QzEzNS43NjggMjgwLjg1IDEzNS43NjggMjcyLjY0NCAxNDQuMDA4IDI3Mi42NDRIMzY2LjQ4M0wzNjYuNDgzIDIwNi42ODdIMjg0LjY5QzI4NC42OSAyMDYuNjg3IDI2OC4xMzQgMjA2LjY4NyAyNTEuNTc5IDIxNC44OTNMOTQuMzQxNCAyODAuODVDNzcuNzg2MSAyODkuMDU3IDY5LjU0NjkgMzA1LjYyMyA2OS41NDY5IDMyMi4wMzVWNTg1Ljg2M0M2OS41NDY5IDU5NC4xNDcgNjkuNTQ2OSA2MDIuMzUzIDc3Ljc4NjEgNjEwLjYzNkwxMjcuNDUyIDY2MC4xMDRDMTM1LjY5MSA2NjguMzg3IDE0MS45MjggNjY4LjM4NyAxNTIuMjQ3IDY2OC4zODdIMjY5LjAyOUMyNjkuMDM3IDY0OC4zNCAyNjkuMDQ2IDYyNC42NTUgMjY5LjA1NCA2MDIuODg3SDUyOC4wMTNWNjY4LjM4N0g2NDcuNzUzQzY1OC4wNzEgNjY4LjM4NyA2NjQuMzA4IDY2OC4zODcgNjcyLjU0NyA2NjAuMTA0TDcyMi4yMTMgNjEwLjYzNkM3MzAuNDUzIDYwMi40MjkgNzMwLjQ1MyA1OTQuMTQ3IDczMC40NTMgNTg1Ljg2M1YzMjIuMDM1QzczMC40NTMgMzA1LjU0NiA3MjIuMjEzIDI4OS4wNTcgNzA1LjY1OCAyODAuODVMNTQ4LjQyMSAyMTQuODkzQzUzMS44NjUgMjA2LjY4NyA1MTUuMzEgMjA2LjY4NyA1MTUuMzEgMjA2LjY4N0g0MzMuNTEyTDQzMy41MTIgMjcyLjY0NEg2NTYuMDY5QzY2NC4zMDggMjcyLjY0NCA2NjQuMzA4IDI4MC44NSA2NjQuMzA4IDI4MC44NVY1OTQuMTQ2QzY2NC4zMDggNTk0LjE0NiA2NjQuMzA4IDYwMi40MjkgNjU2LjA2OSA2MDIuNDI5SDUyOC4yNjJWNTM3LjM5NkgyNjkuMDc1QzI2OS4wNzUgNTQzLjcwNyAyNjkuMDE3IDU5Ni45MTIgMjY5LjAxIDYwMi40MjlaIiBmaWxsPSIjRkJDQjRBIi8+CjxwYXRoIGQ9Ik0yNjkuMDA5IDQzNi4xNzJINTI4LjI2MlYzNzAuNjgxSDI2OS4wNzVDMjY5LjA3NSAzNzcuMzczIDI2OS4wMDkgNDM2Ljc4OCAyNjkuMDA5IDQzNi4xNzJaIiBmaWxsPSIjRkJDQjRBIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZF81MTEyXzc4MiIgeD0iLTQiIHk9IjAiIHdpZHRoPSI4MDgiIGhlaWdodD0iODA4IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHk9IjQiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJvdXQiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvd181MTEyXzc4MiIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvd181MTEyXzc4MiIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K";
function B() {
}
var U = class {
  constructor() {
    __publicField(this, "m_lastPromise", Promise.resolve());
  }
  /**
   * Acquire lock
   * @param [bypass=false] option to skip lock acquisition
   */
  async obtain(e = false) {
    let s = B;
    if (e) return s;
    const t = this.m_lastPromise;
    return this.m_lastPromise = new Promise((d) => s = d), await t, s;
  }
};
var H = new U();
var te = class {
  constructor() {
    __publicField(this, "id", "controller");
    __publicField(this, "name", "Controller");
    __publicField(this, "version", E.version);
    __publicField(this, "icon", P);
    __publicField(this, "account");
    __publicField(this, "subscriptions", []);
    __publicField(this, "_probePromise", null);
    __publicField(this, "request", async (e) => {
      switch (e.type) {
        case "wallet_getPermissions":
          return await this.safeProbe(), this.account ? [v.ACCOUNTS] : [];
        case "wallet_requestAccounts": {
          if (this.account)
            return [this.account.address];
          const t = e.params && e.params.silent_mode;
          return this.account = await this.safeProbe(), !this.account && !t && (this.account = await this.connect()), this.account ? [this.account.address] : [];
        }
        case "wallet_watchAsset":
          throw {
            code: 63,
            message: "An unexpected error occurred",
            data: "wallet_watchAsset not implemented"
          };
        case "wallet_addStarknetChain": {
          let t = e.params;
          return this.addStarknetChain(t);
        }
        case "wallet_switchStarknetChain": {
          let t = e.params;
          return this.switchStarknetChain(t.chainId);
        }
        case "wallet_requestChainId":
          if (!this.account)
            throw {
              code: 63,
              message: "An unexpected error occurred",
              data: "Account not initialized"
            };
          return await this.account.getChainId();
        case "wallet_deploymentData":
          throw {
            code: 63,
            message: "An unexpected error occurred",
            data: "wallet_deploymentData not implemented"
          };
        case "wallet_addInvokeTransaction":
          if (!this.account)
            throw {
              code: 63,
              message: "An unexpected error occurred",
              data: "Account not initialized"
            };
          let s = e.params;
          return await this.account.execute(
            s.calls.map((t) => ({
              contractAddress: t.contract_address,
              entrypoint: t.entry_point,
              calldata: t.calldata
            }))
          );
        case "wallet_addDeclareTransaction":
          throw {
            code: 63,
            message: "An unexpected error occurred",
            data: "wallet_addDeclareTransaction not implemented"
          };
        case "wallet_signTypedData": {
          if (!this.account)
            throw {
              code: 63,
              message: "An unexpected error occurred",
              data: "Account not initialized"
            };
          return await this.account.signMessage(e.params);
        }
        case "wallet_supportedSpecs":
          return [];
        case "wallet_supportedWalletApi":
          return [];
        default:
          throw {
            code: 63,
            message: "An unexpected error occurred",
            data: `Unknown RPC call type: ${e.type}`
          };
      }
    });
    __publicField(this, "on", (e, s) => {
      if (e !== "accountsChanged" && e !== "networkChanged")
        throw new Error(`Unknown event: ${e}`);
      this.subscriptions.push({ type: e, handler: s });
    });
    __publicField(this, "off", (e, s) => {
      if (e !== "accountsChanged" && e !== "networkChanged")
        throw new Error(`Unknown event: ${e}`);
      const t = this.subscriptions.findIndex(
        (d) => d.type === e && d.handler === s
      );
      t >= 0 && this.subscriptions.splice(t, 1);
    });
  }
  async safeProbe() {
    if (this.account)
      return this.account;
    if (this._probePromise)
      return this._probePromise;
    const e = await H.obtain();
    return await new Promise(async (s) => {
      try {
        this._probePromise = this.probe();
        const t = await this._probePromise;
        s(t);
      } finally {
        this._probePromise = null;
      }
    }).finally(() => {
      e();
    });
  }
  emitNetworkChanged(e) {
    this.subscriptions.filter((s) => s.type === "networkChanged").forEach((s) => {
      s.handler(e);
    });
  }
  emitAccountsChanged(e) {
    this.subscriptions.filter((s) => s.type === "accountsChanged").forEach((s) => {
      s.handler(e);
    });
  }
};
function oe(a) {
  return {
    verified: false,
    contracts: a.contracts ? Object.fromEntries(
      Object.entries(a.contracts).map(([e, s]) => [
        e,
        {
          ...s,
          methods: s.methods.map((t) => ({
            ...t,
            authorized: true
          }))
        }
      ])
    ) : void 0,
    messages: a.messages?.map((e) => ({
      ...e,
      authorized: true
    }))
  };
}
var W = [
  {
    name: "Wrapped BTC",
    symbol: "WBTC",
    decimals: 8,
    l2_token_address: "0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac",
    sort_order: 0,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/7dcb2db2-a7a7-44af-660b-8262e057a100/logo"
  },
  {
    name: "USD Coin (Ethereum)",
    symbol: "USDC.e",
    decimals: 6,
    l2_token_address: "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    sort_order: 5,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e5aaa970-a998-47e8-bd43-4a3b56b87200/logo"
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    l2_token_address: "0x033068f6539f8e6e6b131e6b2b814e6c34a5224bc66947c47dab9dfee93b35fb",
    sort_order: 8,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e5aaa970-a998-47e8-bd43-4a3b56b87200/logo"
  },
  {
    name: "LUSD Stablecoin",
    symbol: "LUSD",
    decimals: 18,
    l2_token_address: "0x070a76fd48ca0ef910631754d77dd822147fe98a569b826ec85e3c33fde586ac",
    sort_order: 3,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/dc0ae733-5498-4afa-f475-48dba677aa00/logo"
  },
  {
    name: "Tether USD",
    symbol: "USDT",
    decimals: 6,
    l2_token_address: "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
    sort_order: 6,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/c8a721d1-07c3-46e4-ab4e-523977c30b00/logo"
  },
  {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
    l2_token_address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    sort_order: 3,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e07829b7-0382-4e03-7ecd-a478c5aa9f00/logo"
  },
  {
    name: "Dai Stablecoin",
    symbol: "DAIv0",
    decimals: 18,
    l2_token_address: "0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3",
    sort_order: 4,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/919e761b-56f7-4f53-32aa-5e066f7f6200/logo"
  },
  {
    name: "Dai Stablecoin",
    symbol: "DAI",
    decimals: 18,
    l2_token_address: "0x05574eb6b8789a91466f902c380d978e472db68170ff82a5b650b95a58ddf4ad",
    sort_order: 5,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/919e761b-56f7-4f53-32aa-5e066f7f6200/logo"
  },
  {
    name: "Legacy Starknet Wrapped Staked Ether",
    symbol: "wstETH-legacy",
    decimals: 18,
    l2_token_address: "0x042b8f0484674ca266ac5d08e4ac6a3fe65bd3129795def2dca5c34ecc5f96d2",
    sort_order: 1,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/26162dcc-29c2-4f5e-3acd-5e6be1f07a00/logo"
  },
  {
    name: "Wrapped Staked Ether",
    symbol: "wstETH",
    decimals: 18,
    l2_token_address: "0x0057912720381af14b0e5c87aa4718ed5e527eab60b3801ebf702ab09139e38b",
    sort_order: 1,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/dbbcbdea-1a92-437d-3701-4a5ee129d000/logo"
  },
  {
    name: "Rocket Pool ETH",
    symbol: "rETH",
    decimals: 18,
    l2_token_address: "0x0319111a5037cbec2b3e638cc34a3474e2d2608299f3e62866e9cc683208c610",
    sort_order: 1,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/c9f2d6fe-fbc6-4384-0990-923dfcb7a200/logo"
  },
  {
    name: "LORDS",
    symbol: "LORDS",
    decimals: 18,
    l2_token_address: "0x0124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49",
    sort_order: 1,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/a3bfe959-50c4-4f89-0aef-b19207d82a00/logo"
  },
  {
    name: "R Stablecoin",
    symbol: "R",
    decimals: 18,
    l2_token_address: "0x01fa2fb85f624600112040e1f3a848f53a37ed5a7385810063d5fe6887280333",
    sort_order: 3,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/77612e4e-f7ee-4dba-2066-af321843ef00/logo"
  },
  {
    name: "Frax",
    symbol: "FRAX",
    decimals: 18,
    l2_token_address: "0x009c6b4fb13dfaa025c1383ed6190af8ed8cbb09d9588a3bb020feb152442406",
    sort_order: 1,
    total_supply: 649462235,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/eeaf0779-e492-474c-ef19-b27843525600/logo"
  },
  {
    name: "Frax Share",
    symbol: "FXS",
    decimals: 18,
    l2_token_address: "0x0058efd0e73c33a848ffaa88738d128ebf0af98ea78cf3c14dc757bb02d39ffb",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/98bea621-1e4f-4d63-9689-bdaef0d56500/logo"
  },
  {
    name: "Staked Frax Ether",
    symbol: "sfrxETH",
    decimals: 18,
    l2_token_address: "0x04578fffc279e61b5cb0267a5f8e24b6089d40f93158fbbad2cb23b8622c9233",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/cd6fe18a-25db-4de9-758a-daf3b364ea00/logo"
  },
  {
    name: "Uniswap",
    symbol: "UNI",
    decimals: 18,
    l2_token_address: "0x049210ffc442172463f3177147c1aeaa36c51d152c1b0630f2364c300d4f48ee",
    sort_order: 1,
    total_supply: 1e9,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/361b018e-bd53-4019-27c8-7cf8d9031b00/logo"
  },
  {
    name: "Paper",
    symbol: "PAPER",
    decimals: 18,
    l2_token_address: "0x0410466536b5ae074f7fea81e5533b8134a9fa08b3dd077dd9db08f64997d113",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/811f019a-0461-4cff-6c1e-442102863f00/logo"
  },
  {
    name: "StarkPepe",
    symbol: "xSPEPE",
    decimals: 18,
    l2_token_address: "0x06f15ec4b6ff0b7f7a216c4b2ccdefc96cbf114d6242292ca82971592f62273b",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    disabled: true
  },
  {
    name: "Starknet Token",
    symbol: "STRK",
    decimals: 18,
    l2_token_address: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
    sort_order: 2,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/1b126320-367c-48ed-cf5a-ba7580e49600/logo"
  },
  {
    name: "zkLend Token",
    symbol: "ZEND",
    decimals: 18,
    l2_token_address: "0x00585c32b625999e6e5e78645ff8df7a9001cf5cf3eb6b80ccdd16cb64bd3a34",
    sort_order: 1,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/95515b0e-1230-4158-10f1-56888f613c00/logo"
  },
  {
    name: "Ekubo Protocol",
    symbol: "EKUBO",
    decimals: 18,
    l2_token_address: "0x075afe6402ad5a5c20dd25e10ec3b3986acaa647b77e4ae24b0cbc9a54a27a87",
    sort_order: 2,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/634d9c36-2f0b-4781-93e6-72d701b5af00/logo"
  },
  {
    name: "SOCKS",
    symbol: "SOCKS",
    decimals: 18,
    l2_token_address: "0x023ed2ba4fb5709302c5dfd739fa7613359042f143286c115b6c7f7dc2601015",
    sort_order: 1,
    total_supply: 1e11,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/2db5a2a6-c98e-4b80-35e0-31b489132100/logo"
  },
  {
    name: "Nostra",
    symbol: "NSTR",
    decimals: 18,
    l2_token_address: "0x00c530f2c0aa4c16a0806365b0898499fba372e5df7a7172dc6fe9ba777e8007",
    sort_order: 1,
    total_supply: 1e8,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/a45c2224-17a7-4269-ea7e-3924e9755800/logo"
  },
  {
    name: "Carmine",
    symbol: "CRM",
    decimals: 18,
    l2_token_address: "0x51c4b1fe3bf6774b87ad0b15ef5d1472759076e42944fff9b9f641ff13e5bbe",
    sort_order: 1,
    total_supply: 1e8,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/6ab817f1-8075-4a94-6e14-f112f1f89d00/logo"
  },
  {
    name: "Cash",
    symbol: "CASH",
    decimals: 18,
    l2_token_address: "0x0498edfaf50ca5855666a700c25dd629d577eb9afccdf3b5977aec79aee55ada",
    sort_order: 4,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/6bd6d156-f509-4b51-5dfc-3ee566143600/logo",
    hidden: false
  },
  {
    name: "Nums",
    symbol: "NUMS",
    decimals: 18,
    l2_token_address: "0xe5f10eddc01699dc899a30dbc3c9858148fa4aa0a47c0ffd85f887ffc4653e",
    sort_order: 1,
    total_supply: 1,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/90868d05-cb75-4c42-278c-5a540db2cf00/logo"
  },
  {
    name: "Nums",
    symbol: "NUMS",
    decimals: 18,
    l2_token_address: "0x2e82800f97afded96e8e88f9788f2d8f097edb04c9e9b920ceb1ec11f265158",
    sort_order: 1,
    total_supply: 1,
    hidden: true,
    logo_url: "https://nums.gg/assets/token-nums.svg"
  },
  {
    name: "vNums",
    symbol: "vNUMS",
    decimals: 18,
    l2_token_address: "0x6622cf22b64731ed444dbb07f4041268c503fa9573649571bfdfabe90c6ec2",
    sort_order: 1,
    total_supply: 1,
    hidden: true,
    logo_url: "https://nums.gg/assets/token-vnums.svg"
  },
  {
    name: "Flip",
    symbol: "FLIP",
    decimals: 18,
    l2_token_address: "0x01bfe97d729138fc7c2d93c77d6d1d8a24708d5060608017d9b384adf38f04c7",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/275f0fa8-a691-471c-ace6-0eb0315dde00/logo"
  },
  {
    name: "Eternum Stone",
    symbol: "STONE",
    decimals: 18,
    l2_token_address: "0x439a1c010e3e1bb2d43d43411000893c0042bd88f6c701611a0ea914d426da4",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/932e7f83-a4c2-40f0-3048-35af3b194100/logo"
  },
  {
    name: "Eternum Coal",
    symbol: "COAL",
    decimals: 18,
    l2_token_address: "0xce635e3f241b0ae78c46a929d84a9101910188f9c4024eaa7559556503c31a",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/cf2ee180-06bf-4443-e3aa-724d7c28e800/logo"
  },
  {
    name: "Eternum Wood",
    symbol: "WOOD",
    decimals: 18,
    l2_token_address: "0x40d8907cec0f7ae9c364dfb12485a1314d84c129bf1898d2f3d4b7fcc7d44f4",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/1db5f954-c1ef-447e-9f8f-05bd9f3b2b00/logo"
  },
  {
    name: "Eternum Copper",
    symbol: "COPPER",
    decimals: 18,
    l2_token_address: "0x66ed5c928ee027a9419ace1cbea8389885161db5572a7c5c4fef2310e9bf494",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/6bbcdcc9-6146-404d-9501-92a664cf3100/logo"
  },
  {
    name: "Eternum Ironwood",
    symbol: "IRONWOOD",
    decimals: 18,
    l2_token_address: "0x1720cf6318bff45e62acc588680ae3cd4d5f8465b1d52cb710533c9299b031a",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/5af7c03b-e4ae-4aee-eba4-a4e2160a1d00/logo"
  },
  {
    name: "Eternum Obsidian",
    symbol: "OBSIDIAN",
    decimals: 18,
    l2_token_address: "0x3b6448d09dcd023507376402686261f5d6739455fa02f804907b066e488da66",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/8be9bc66-486b-4181-6804-725a1db8ad00/logo"
  },
  {
    name: "Eternum Gold",
    symbol: "GOLD",
    decimals: 18,
    l2_token_address: "0xdff9dca192609c4e86ab3be22c7ec1e968876c992d21986f3c542be97fa2f",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/fb9e90f7-3c2f-4c64-7e43-c3f694f35e00/logo"
  },
  {
    name: "Eternum Silver",
    symbol: "SILVER",
    decimals: 18,
    l2_token_address: "0x6fe21d2d4a8a05bdb70f09c9250af9870020d5dcc35f410b4a39d6605c3e353",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e443afeb-850b-46a0-a7ba-a473306d6b00/logo"
  },
  {
    name: "Eternum Mithral",
    symbol: "MITHRAL",
    decimals: 18,
    l2_token_address: "0x67ba235c569c23877064b2ac6ebd4d79f32d3c00f5fab8e28a3b5700b957f6",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/33dc517f-8a66-45eb-f2c5-de5388e47500/logo"
  },
  {
    name: "Eternum Alchemical Silver",
    symbol: "ALCHEMICALSILVER",
    decimals: 18,
    l2_token_address: "0x3956a5301e99522038a2e7dcb9c2a89bf087ffa79310ee0a508b5538efd8ddd",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/3d2e0fd8-4af8-49a0-4bdb-691a4d6ef800/logo"
  },
  {
    name: "Eternum Cold Iron",
    symbol: "COLDIRON",
    decimals: 18,
    l2_token_address: "0x555d713e59d4ff96b7960447e9bc9e79bfdeab5b0eea74e3df81bce61cfbc77",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/878c0d8a-8e2c-4281-0896-9cbbb2ef9400/logo"
  },
  {
    name: "Eternum Deep Crystal",
    symbol: "DEEPCRYSTAL",
    decimals: 18,
    l2_token_address: "0x1d655ac834d38df7921074fc1588411e202b1af83307cbd996983aff52db3a8",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/1c2c954f-448c-476b-a4a6-19b52efe3e00/logo"
  },
  {
    name: "Eternum Ruby",
    symbol: "RUBY",
    decimals: 18,
    l2_token_address: "0x3d9b66720959d0e7687b898292c10e62e78626f2dba5e1909961a2ce3f86612",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/6a45b34d-3bfe-4994-45b0-f2bee8abac00/logo"
  },
  {
    name: "Eternum Diamonds",
    symbol: "DIAMONDS",
    decimals: 18,
    l2_token_address: "0xe03ea8ae385f64754820af5c01c36abf1b8130dd6797d3fd9d430e4114e876",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/b1fa609d-8799-4754-cdea-ab69514ca700/logo"
  },
  {
    name: "Eternum Hartwood",
    symbol: "HARTWOOD",
    decimals: 18,
    l2_token_address: "0x5620aa7170cd66dbcbc37d03087bfe4633ffef91d3e4d97b501de906004f79b",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/27e37e85-91bd-4ee1-0552-1e0795077400/logo"
  },
  {
    name: "Eternum Ignium",
    symbol: "IGNIUM",
    decimals: 18,
    l2_token_address: "0x625c1f789b03ebebc7a9322366f38ebad1f693b84b2abd8cb8f5b2748b0cdd5",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/58591e20-24fb-4353-417a-81d877a5a200/logo"
  },
  {
    name: "Eternum Twilight Quartz",
    symbol: "TWILIGHTQUARTZ",
    decimals: 18,
    l2_token_address: "0x35e24c02409c3cfe8d5646399a62c4d102bb782938d5f5180e92c9c62d3faf7",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/2f8cb892-e82a-4af3-bd09-316061faec00/logo"
  },
  {
    name: "Eternum True Ice",
    symbol: "TRUEICE",
    decimals: 18,
    l2_token_address: "0x4485f5a6e16562e1c761cd348e63256d00389e3ddf4f5d98afe7ab44c57c481",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/fe4bfc17-6553-4dc5-58d2-f452b4aa8a00/logo"
  },
  {
    name: "Eternum Adamantine",
    symbol: "ADAMANTINE",
    decimals: 18,
    l2_token_address: "0x367f838f85a2f5e1580d6f011e4476f581083314cff8721ba3dda9706076eed",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/13bd026b-3612-480e-0119-04cf4c505a00/logo"
  },
  {
    name: "Eternum Sapphire",
    symbol: "SAPPHIRE",
    decimals: 18,
    l2_token_address: "0x2f8dd022568af8f9f718aa37707a9b858529db56910633a160456838b6cbcbc",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/0ebf555f-e732-4054-f8e5-55b2ed49ba00/logo"
  },
  {
    name: "Eternum Ethereal Silica",
    symbol: "ETHEREALSILICA",
    decimals: 18,
    l2_token_address: "0x68b6e23cbbd58a644700f55e96c83580921e9f521b6e5175396b53ba7910e7d",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/f02a5b43-bfcf-408c-7d1b-fcfe68b02d00/logo"
  },
  {
    name: "Eternum Dragon Hide",
    symbol: "DRAGONHIDE",
    decimals: 18,
    l2_token_address: "0x3bf856515bece3c93f5061b7941b8645f817a0acab93c758b8c7b4bc0afa3c6",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/e74955fc-5c8a-4dff-4882-a49a46a5a800/logo"
  },
  {
    name: "Eternum Ancient Fragment",
    symbol: "ANCIENTFRAGMENT",
    decimals: 18,
    l2_token_address: "0x0695b08ecdfdd828c2e6267da62f59e6d7543e690ef56a484df25c8566b332a5",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/9af855b7-4790-4390-9466-6bed4481ab00/logo"
  },
  {
    name: "Eternum Donkey",
    symbol: "DONKEY",
    decimals: 18,
    l2_token_address: "0x264be95a4a2ace20add68cb321acdccd2f9f8440ee1c7abd85da44ddab01085",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/20817378-a45e-4521-f464-10f6dd13c500/logo"
  },
  {
    name: "Eternum Knight",
    symbol: "KNIGHT",
    decimals: 18,
    l2_token_address: "0xac965f9e67164723c16735a9da8dbc9eb8e43b1bd0323591e87c056badf606",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/8787ed1f-af5c-4873-c01a-55f05e999a00/logo"
  },
  {
    name: "Eternum Crossbowman",
    symbol: "CROSSBOWMAN",
    decimals: 18,
    l2_token_address: "0x67e4ac00a241be06ba6afc11fa2715ec7da0c42c05a67ef6ecfcfeda725aaa8",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/dec7f31b-4b1d-46bb-4fca-c0253cf55a00/logo"
  },
  {
    name: "Eternum Paladin",
    symbol: "PALADIN",
    decimals: 18,
    l2_token_address: "0x3bc86299bee061c7c8d7546ccb62b9daf9bffc653b1508facb722c6593874bc",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/7d2cd5a5-f38a-49f6-11f8-ba3b59a59e00/logo"
  },
  {
    name: "Eternum Wheat",
    symbol: "WHEAT",
    decimals: 18,
    l2_token_address: "0x57a3f1ee475e072ce3be41785c0e889b7295d7a0dcc22b992c5b9408dbeb280",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/c338b6a8-77c4-4dd6-34f5-1af0d3fb1e00/logo"
  },
  {
    name: "Eternum Fish",
    symbol: "FISH",
    decimals: 18,
    l2_token_address: "0x27719173cfe10f1aa38d2aaed0a075b6077290f1e817aa3485d2b828394f4d9",
    sort_order: 1,
    total_supply: null,
    hidden: true,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/6deef27f-df40-4248-4e1b-ed1d79a3f000/logo"
  },
  {
    name: "Fools",
    symbol: "FOOLS",
    decimals: 18,
    l2_token_address: "0x068a7a07e08fc3e723a878223d00f669106780d5ea6665eb15d893476d47bf3b",
    sort_order: 1,
    total_supply: null,
    logo_url: "https://assets.underware.gg/pistols/fools.svg"
  },
  {
    name: "Fame",
    symbol: "FAME",
    decimals: 18,
    l2_token_address: "0x02549653a4ae1ff8d04a20b8820a49cbe97486c536ec0e4c8f68aa33d80067cf",
    sort_order: 1,
    total_supply: null,
    logo_url: "https://assets.underware.gg/pistols/fame.svg"
  },
  {
    name: "Survivor",
    symbol: "SURVIVOR",
    decimals: 18,
    l2_token_address: "0x042dd777885ad2c116be96d4d634abc90a26a790ffb5871e037dd5ae7d2ec86b",
    sort_order: 2,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/399cb277-f675-4efe-97fb-fac94a236a00/logo"
  },
  {
    name: "Dungeon Ticket",
    symbol: "TICKET",
    decimals: 18,
    l2_token_address: "0x035f581b050a39958b7188ab5c75daaa1f9d3571a0c032203038c898663f31f8",
    sort_order: 1,
    total_supply: null,
    logo_url: "	https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/f96b51e2-e978-42e2-c67a-e84159015000/logo"
  },
  {
    name: "Standard Weighted Adalian Yield",
    symbol: "SWAY",
    decimals: 6,
    l2_token_address: "0x004878d1148318a31829523ee9c6a5ee563af6cd87f90a30809e5b0d27db8a9b",
    sort_order: 1,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/dd43c15d-80bf-4298-7620-abc12d474f00/logo"
  },
  {
    name: "Corpse",
    symbol: "CORPSE",
    decimals: 18,
    l2_token_address: "0x0103eafe79f8631932530cc687dfcdeb013c883a82619ebf81be393e2953a87a",
    sort_order: 2,
    total_supply: null,
    logo_url: "https://lootsurvivor.io/images/corpse-token.png"
  },
  {
    name: "Extra Life",
    symbol: "XLIFE",
    decimals: 18,
    l2_token_address: "0x016dea82a6588ca9fb7200125fa05631b1c1735a313e24afe9c90301e441a796",
    sort_order: 2,
    total_supply: null,
    logo_url: "https://lootsurvivor.io/images/life-potion.png"
  },
  {
    name: "Attack",
    symbol: "ATTACK",
    decimals: 18,
    l2_token_address: "0x016f9def00daef9f1874dd932b081096f50aec2fe61df31a81bc5707a7522443",
    sort_order: 2,
    total_supply: null,
    logo_url: "https://lootsurvivor.io/images/attack-potion.png"
  },
  {
    name: "Skull",
    symbol: "SKULL",
    decimals: 18,
    l2_token_address: "0x01c3c8284d7eed443b42f47e764032a56eaf50a9079d67993b633930e3689814",
    sort_order: 2,
    total_supply: null,
    logo_url: "https://lootsurvivor.io/images/skull-token.png"
  },
  {
    name: "LayerZero",
    symbol: "ZRO",
    decimals: 18,
    l2_token_address: "0x01e77aec81ef65db5fb788a5a04fd9d23f6f4c860eb2fb0e99ace5c45b021071",
    sort_order: 0,
    total_supply: null,
    logo_url: "https://assets.coingecko.com/coins/images/28206/standard/ftxG9_TJ_400x400.jpeg"
  },
  {
    name: "Shiba Inu",
    symbol: "SHIB",
    decimals: 18,
    l2_token_address: "0x02119755fad7cbf637d80cae5d3e8e12487befe6653ddd04432a73f6f569f46b",
    sort_order: 0,
    total_supply: null,
    logo_url: "https://assets.coingecko.com/coins/images/11939/standard/shiba.png"
  },
  {
    name: "Endur xSTRK",
    symbol: "xSTRK",
    decimals: 18,
    l2_token_address: "0x028d709c875c0ceac3dce7065bec5328186dc89fe254527084d1689910954b0a",
    sort_order: 1,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/c1f44170-c1b0-4531-3d3b-5f0bacfe1300/logo"
  },
  {
    name: "Revive",
    symbol: "REVIVE",
    decimals: 18,
    l2_token_address: "0x029023e0a455d19d6887bc13727356070089527b79e6feb562ffe1afd6711dbe",
    sort_order: 2,
    total_supply: null,
    logo_url: "https://lootsurvivor.io/images/revive-potion.png"
  },
  {
    name: "Yield BTC.B",
    symbol: "YBTC.B",
    decimals: 8,
    l2_token_address: "0x02cab84694e1be6af2ce65b1ae28a76009e8ec99ec4bc17047386abf20cbb688",
    sort_order: 0,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/21264f6b-bd3e-4bef-b54d-78d268dcce00/logo"
  },
  {
    name: "Aave Token",
    symbol: "AAVE",
    decimals: 18,
    l2_token_address: "0x02f5eb9a4f77b6c7c83488418e77329d31eb43219745959948a0fce9580905d9",
    sort_order: 0,
    total_supply: null,
    logo_url: "https://assets.coingecko.com/coins/images/12645/standard/aave-token-round.png?1720472354"
  },
  {
    name: "Uncap USD",
    symbol: "USDU",
    decimals: 18,
    l2_token_address: "0x02f94539f80158f9a48a7acf3747718dfbec9b6f639e2742c1fb44ae7ab5aa04",
    sort_order: 4,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/1cf94983-68e7-42e3-61c4-081d61d57700/logo"
  },
  {
    name: "Arbitrum",
    symbol: "ARB",
    decimals: 18,
    l2_token_address: "0x03070d5cbd310edc0b2cfe8b11d132e67718b16c7fbfd536ee74ec54a4307ba2",
    sort_order: 0,
    total_supply: null,
    logo_url: "https://assets.coingecko.com/coins/images/16547/standard/arb.jpg"
  },
  {
    name: "Lombard Staked Bitcoin",
    symbol: "LBTC",
    decimals: 8,
    l2_token_address: "0x036834a40984312f7f7de8d31e3f6305b325389eaeea5b1c0664b2fb936461a4",
    sort_order: 0,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/d57a3c6e-83fc-47c6-2a2b-df3a9c216100/logo"
  },
  {
    name: "Jupiter",
    symbol: "JUP",
    decimals: 6,
    l2_token_address: "0x03a292bd498266ac4b05d93cc2df5cd7883c0684faabff182ab568d566a3c151",
    sort_order: 0,
    total_supply: null,
    logo_url: "https://assets.coingecko.com/coins/images/34188/standard/jup.png"
  },
  {
    name: "DOG GO TO THE MOON",
    symbol: "DOG",
    decimals: 5,
    l2_token_address: "0x040e81cfeb176bfdbc5047bbc55eb471cfab20a6b221f38d8fda134e1bfffca4",
    sort_order: 2,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/43bf2a37-d5a4-40e3-45a6-2488108b0c00/logo"
  },
  {
    name: "Endur xtBTC",
    symbol: "xtBTC",
    decimals: 18,
    l2_token_address: "0x043a35c1425a0125ef8c171f1a75c6f31ef8648edcc8324b55ce1917db3f9b91",
    sort_order: 0,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/b9ad718c-d6bb-45d5-d1f9-a8ae911efb00/logo"
  },
  {
    name: "Dungeon Ticket",
    symbol: "DTICKET",
    decimals: 18,
    l2_token_address: "0x0452810188c4cb3aebd63711a3b445755bc0d6c4f27b923fdd99b1a118858136",
    sort_order: 1,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/f96b51e2-e978-42e2-c67a-e84159015000/logo"
  },
  {
    name: "FBTC",
    symbol: "FBTC",
    decimals: 8,
    l2_token_address: "0x046e4e83fe6a22f243f73d0f2e4cdbc4e9ebd868050e9f7e9cbd90f1436d8b44",
    sort_order: 0,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/3b069b84-9881-47c9-d51b-d43259f80200/logo"
  },
  {
    name: "AUSD0",
    symbol: "AUSD0",
    decimals: 6,
    l2_token_address: "0x04887629c229b4ee8e82f3db4cddeb1b2c0f084d46f229672623bd1282df5931",
    sort_order: 4,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/88b2405d-cff2-4cae-db42-2965fc3f9400/logo"
  },
  {
    name: "Poison",
    symbol: "POISON",
    decimals: 18,
    l2_token_address: "0x049eaed2a1ba2f2eb6ac2661ffd2d79231cdd7d5293d9448df49c5986c9897ae",
    sort_order: 2,
    total_supply: null,
    logo_url: "https://lootsurvivor.io/images/poison-potion.png"
  },
  {
    name: "Midas Re7 Yield",
    symbol: "mRe7YIELD",
    decimals: 18,
    l2_token_address: "0x04be8945e61dc3e19ebadd1579a6bd53b262f51ba89e6f8b0c4bc9a7e3c633fc",
    sort_order: 3,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/f11b3823-25da-4e95-811f-c0bc8fd4db00/logo"
  },
  {
    name: "Threshold tBTC",
    symbol: "tBTC",
    decimals: 18,
    l2_token_address: "0x04daa17763b286d1e59b97c283c0b8c949994c361e426a28f743c67bdfe9a32f",
    sort_order: 0,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/9e04d713-fc0e-4e96-342b-0334f5133b00/logo"
  },
  {
    name: "Midas Re7 BTC",
    symbol: "mRe7BTC",
    decimals: 18,
    l2_token_address: "0x04e4fb1a9ca7e84bae609b9dc0078ad7719e49187ae7e425bb47d131710eddac",
    sort_order: 0,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/3a62ecee-1e58-45d3-9862-3ce90dff1900/logo"
  },
  {
    name: "Endur xsBTC",
    symbol: "xsBTC",
    decimals: 18,
    l2_token_address: "0x0580f3dc564a7b82f21d40d404b3842d490ae7205e6ac07b1b7af2b4a5183dc9",
    sort_order: 0,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/b978fbfd-4aa0-4a56-5402-47857c921e00/logo"
  },
  {
    name: "Solv BTC",
    symbol: "SolvBTC",
    decimals: 18,
    l2_token_address: "0x0593e034dda23eea82d2ba9a30960ed42cf4a01502cc2351dc9b9881f9931a68",
    sort_order: 0,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/b510231d-c479-4f22-eda5-0457222e7e00/logo"
  },
  {
    name: "Endur xWBTC",
    symbol: "xWBTC",
    decimals: 8,
    l2_token_address: "0x06a567e68c805323525fe1649adb80b03cddf92c23d2629a6779f54192dffc13",
    sort_order: 0,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/6d2f83ef-6bd6-44af-dd34-9076eeae5e00/logo"
  },
  {
    name: "Fartcoin",
    symbol: "Fartcoin",
    decimals: 6,
    l2_token_address: "0x06e0e0117b742747452601f9f14576eb9d71b326379a1794bb51d9adbce3dbd3",
    sort_order: 0,
    total_supply: null,
    logo_url: "https://assets.coingecko.com/coins/images/50891/standard/fart.jpg"
  },
  {
    name: "Official Trump",
    symbol: "TRUMP",
    decimals: 6,
    l2_token_address: "0x07380caa64fdf27501afad0bd93c89d1e83a081a553af89bbeffb28dae8d8916",
    sort_order: 0,
    total_supply: null,
    logo_url: "https://assets.coingecko.com/coins/images/53746/standard/trump.png"
  },
  {
    name: "Bonk",
    symbol: "BONK",
    decimals: 5,
    l2_token_address: "0x074238dfa02063792077820584c925b679a013cbab38e5ca61af5627d1eda736",
    sort_order: 1,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/05c7a597-ea71-4129-6bf0-ad2d18cb1200/logo"
  },
  {
    name: "Endur xLBTC",
    symbol: "xLBTC",
    decimals: 8,
    l2_token_address: "0x07dd3c80de9fcc5545f0cb83678826819c79619ed7992cc06ff81fc67cd2efe0",
    sort_order: 0,
    total_supply: null,
    logo_url: "https://imagedelivery.net/0xPAQaDtnQhBs8IzYRIlNg/1d016787-181b-4373-4aa5-962adddc6c00/logo"
  }
];
var z = {
  theme: {
    name: "Cartridge",
    icon: "icon.svg"
  }
};
var u = "https://static.cartridge.gg/presets";
async function p() {
  try {
    const a = await fetch(`${u}/index.json`);
    if (!a.ok)
      throw new Error(`Failed to load configs index: ${a.statusText}`);
    return await a.json();
  } catch (a) {
    return console.error("Error loading configs index:", a), { configs: [], baseUrl: u };
  }
}
async function se() {
  return (await p()).configs;
}
async function de(a) {
  try {
    const t = `${(await p()).baseUrl || u}/${a}`, d = await fetch(`${t}/config.json`);
    if (!d.ok)
      throw new Error(
        `Failed to load config ${a}: ${d.statusText}`
      );
    const o = await d.json();
    if (o && o.theme) {
      o.theme.icon && !o.theme.icon.startsWith("http") && (o.theme.icon = `${t}/${o.theme.icon}`), o.theme.cover && (typeof o.theme.cover == "string" ? o.theme.cover.startsWith("http") || (o.theme.cover = `${t}/${o.theme.cover}`) : (o.theme.cover.light && !o.theme.cover.light.startsWith("http") && (o.theme.cover.light = `${t}/${o.theme.cover.light}`), o.theme.cover.dark && !o.theme.cover.dark.startsWith("http") && (o.theme.cover.dark = `${t}/${o.theme.cover.dark}`)));
      const r = (l) => {
        if (l) {
          for (const n in l)
            if (l[n])
              for (const i in l[n])
                l[n][i] && !l[n][i].startsWith("http") && (l[n][i] = `${t}/${l[n][i]}`);
        }
      };
      if (o.theme.optimizedIcon && r(o.theme.optimizedIcon), o.theme.optimizedCover)
        if (typeof o.theme.optimizedCover == "string")
          o.theme.optimizedCover.startsWith("http") || (o.theme.optimizedCover = `${t}/${o.theme.optimizedCover}`);
        else if (o.theme.optimizedCover.light || o.theme.optimizedCover.dark) {
          const l = o.theme.optimizedCover;
          l.light && r(l.light), l.dark && r(l.dark);
        } else
          r(o.theme.optimizedCover);
    }
    return o;
  } catch (e) {
    return console.error(`Error loading config ${a}:`, e), null;
  }
}
async function le() {
  const a = await p(), e = a.configs, s = a.baseUrl || u, t = {};
  return await Promise.all(
    e.map(async (d) => {
      try {
        const o = await fetch(`${s}/${d}/config.json`);
        if (o.ok) {
          const r = await o.json();
          t[d] = r;
        }
      } catch (o) {
        console.error(`Error loading config ${d}:`, o);
      }
    })
  ), t;
}
z.theme.icon = "https://static.cartridge.gg/presets/cartridge/icon.svg";
var re = W;
var ne = z.theme;

// ../../node_modules/.pnpm/@cartridge+controller@0.13._18d4e200fd1ab02c88452163c6ea4a3b/node_modules/@cartridge/controller/dist/index.js
var Tn = "standard:connect";
var Nn = "standard:disconnect";
var Bn = "standard:events";
var Un = "0.1.1";
function Mn() {
  return Un;
}
var ie = class _ie extends Error {
  constructor(e, n = {}) {
    const r = (() => {
      if (n.cause instanceof _ie) {
        if (n.cause.details)
          return n.cause.details;
        if (n.cause.shortMessage)
          return n.cause.shortMessage;
      }
      return n.cause?.message ? n.cause.message : n.details;
    })(), s = n.cause instanceof _ie && n.cause.docsPath || n.docsPath, o = `https://oxlib.sh${s ?? ""}`, a = [
      e || "An error occurred.",
      ...n.metaMessages ? ["", ...n.metaMessages] : [],
      ...r || s ? [
        "",
        r ? `Details: ${r}` : void 0,
        s ? `See: ${o}` : void 0
      ] : []
    ].filter((l) => typeof l == "string").join(`
`);
    super(a, n.cause ? { cause: n.cause } : void 0), Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    }), Object.defineProperty(this, "docs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    }), Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    }), Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    }), Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseError"
    }), Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: `ox@${Mn()}`
    }), this.cause = n.cause, this.details = r, this.docs = o, this.docsPath = s, this.shortMessage = e;
  }
  walk(e) {
    return Ot(this, e);
  }
};
function Ot(t, e) {
  return e?.(t) ? t : t && typeof t == "object" && "cause" in t && t.cause ? Ot(t.cause, e) : e ? null : t;
}
function Rn(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function pt(t) {
  if (!Number.isSafeInteger(t) || t < 0)
    throw new Error("positive integer expected, got " + t);
}
function me(t, ...e) {
  if (!Rn(t))
    throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(t.length))
    throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
}
function wt(t, e = true) {
  if (t.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (e && t.finished)
    throw new Error("Hash#digest() has already been called");
}
function On(t, e) {
  me(t);
  const n = e.outputLen;
  if (t.length < n)
    throw new Error("digestInto() expects output buffer of length at least " + n);
}
function Fn(t) {
  return new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4));
}
function Ft(...t) {
  for (let e = 0; e < t.length; e++)
    t[e].fill(0);
}
var zn = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function jn(t) {
  return t << 24 & 4278190080 | t << 8 & 16711680 | t >>> 8 & 65280 | t >>> 24 & 255;
}
function Hn(t) {
  for (let e = 0; e < t.length; e++)
    t[e] = jn(t[e]);
  return t;
}
var gt = zn ? (t) => t : Hn;
function Wn(t) {
  if (typeof t != "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(t));
}
function zt(t) {
  return typeof t == "string" && (t = Wn(t)), me(t), t;
}
var qn = class {
};
function Vn(t) {
  const e = (r) => t().update(zt(r)).digest(), n = t();
  return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = () => t(), e;
}
var fe = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var mt = /* @__PURE__ */ BigInt(32);
function Dn(t, e = false) {
  return e ? { h: Number(t & fe), l: Number(t >> mt & fe) } : { h: Number(t >> mt & fe) | 0, l: Number(t & fe) | 0 };
}
function Zn(t, e = false) {
  const n = t.length;
  let r = new Uint32Array(n), s = new Uint32Array(n);
  for (let i = 0; i < n; i++) {
    const { h: o, l: a } = Dn(t[i], e);
    [r[i], s[i]] = [o, a];
  }
  return [r, s];
}
var Kn = (t, e, n) => t << n | e >>> 32 - n;
var Xn = (t, e, n) => e << n | t >>> 32 - n;
var Gn = (t, e, n) => e << n - 32 | t >>> 64 - n;
var Yn = (t, e, n) => t << n - 32 | e >>> 64 - n;
var Jn = BigInt(0);
var ee2 = BigInt(1);
var Qn = BigInt(2);
var er = BigInt(7);
var tr = BigInt(256);
var nr = BigInt(113);
var jt = [];
var Ht = [];
var Wt = [];
for (let t = 0, e = ee2, n = 1, r = 0; t < 24; t++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], jt.push(2 * (5 * r + n)), Ht.push((t + 1) * (t + 2) / 2 % 64);
  let s = Jn;
  for (let i = 0; i < 7; i++)
    e = (e << ee2 ^ (e >> er) * nr) % tr, e & Qn && (s ^= ee2 << (ee2 << /* @__PURE__ */ BigInt(i)) - ee2);
  Wt.push(s);
}
var qt = Zn(Wt, true);
var rr = qt[0];
var sr = qt[1];
var yt = (t, e, n) => n > 32 ? Gn(t, e, n) : Kn(t, e, n);
var Ct = (t, e, n) => n > 32 ? Yn(t, e, n) : Xn(t, e, n);
function ir(t, e = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - e; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = t[o] ^ t[o + 10] ^ t[o + 20] ^ t[o + 30] ^ t[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, l = (o + 2) % 10, c2 = n[l], d = n[l + 1], h2 = yt(c2, d, 1) ^ n[a], u2 = Ct(c2, d, 1) ^ n[a + 1];
      for (let f2 = 0; f2 < 50; f2 += 10)
        t[o + f2] ^= h2, t[o + f2 + 1] ^= u2;
    }
    let s = t[2], i = t[3];
    for (let o = 0; o < 24; o++) {
      const a = Ht[o], l = yt(s, i, a), c2 = Ct(s, i, a), d = jt[o];
      s = t[d], i = t[d + 1], t[d] = l, t[d + 1] = c2;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++)
        n[a] = t[o + a];
      for (let a = 0; a < 10; a++)
        t[o + a] ^= ~n[(a + 2) % 10] & n[(a + 4) % 10];
    }
    t[0] ^= rr[r], t[1] ^= sr[r];
  }
  Ft(n);
}
var Je = class _Je extends qn {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(e, n, r, s = false, i = 24) {
    if (super(), this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, this.enableXOF = false, this.blockLen = e, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, pt(r), !(0 < e && e < 200))
      throw new Error("only keccak-f1600 function is supported");
    this.state = new Uint8Array(200), this.state32 = Fn(this.state);
  }
  clone() {
    return this._cloneInto();
  }
  keccak() {
    gt(this.state32), ir(this.state32, this.rounds), gt(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(e) {
    wt(this), e = zt(e), me(e);
    const { blockLen: n, state: r } = this, s = e.length;
    for (let i = 0; i < s; ) {
      const o = Math.min(n - this.pos, s - i);
      for (let a = 0; a < o; a++)
        r[this.pos++] ^= e[i++];
      this.pos === n && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state: e, suffix: n, pos: r, blockLen: s } = this;
    e[r] ^= n, (n & 128) !== 0 && r === s - 1 && this.keccak(), e[s - 1] ^= 128, this.keccak();
  }
  writeInto(e) {
    wt(this, false), me(e), this.finish();
    const n = this.state, { blockLen: r } = this;
    for (let s = 0, i = e.length; s < i; ) {
      this.posOut >= r && this.keccak();
      const o = Math.min(r - this.posOut, i - s);
      e.set(n.subarray(this.posOut, this.posOut + o), s), this.posOut += o, s += o;
    }
    return e;
  }
  xofInto(e) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(e);
  }
  xof(e) {
    return pt(e), this.xofInto(new Uint8Array(e));
  }
  digestInto(e) {
    if (On(e, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(e), this.destroy(), e;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true, Ft(this.state);
  }
  _cloneInto(e) {
    const { blockLen: n, suffix: r, outputLen: s, rounds: i, enableXOF: o } = this;
    return e || (e = new _Je(n, r, s, o, i)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = i, e.suffix = r, e.outputLen = s, e.enableXOF = o, e.destroyed = this.destroyed, e;
  }
};
var or = (t, e, n) => Vn(() => new Je(e, t, n));
var ar = or(1, 136, 256 / 8);
var cr = "#__bigint";
function lr(t, e, n) {
  return JSON.stringify(t, (r, s) => typeof s == "bigint" ? s.toString() + cr : s, n);
}
function dr(t, e = {}) {
  const { strict: n = false } = e;
  if (!t)
    throw new bt(t);
  if (typeof t != "string")
    throw new bt(t);
  if (n && !/^0x[0-9a-fA-F]*$/.test(t))
    throw new kt(t);
  if (!t.startsWith("0x"))
    throw new kt(t);
}
function Vt(t, e = {}) {
  const { strict: n = false } = e;
  try {
    return dr(t, { strict: n }), true;
  } catch {
    return false;
  }
}
var bt = class extends ie {
  constructor(e) {
    super(`Value \`${typeof e == "object" ? lr(e) : e}\` of type \`${typeof e}\` is an invalid hex type.`, {
      metaMessages: ['Hex types must be represented as `"0x${string}"`.']
    }), Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.InvalidHexTypeError"
    });
  }
};
var kt = class extends ie {
  constructor(e) {
    super(`Value \`${e}\` is an invalid hex value.`, {
      metaMessages: [
        'Hex values must start with `"0x"` and contain only hexadecimal characters (0-9, a-f, A-F).'
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.InvalidHexValueError"
    });
  }
};
var hr = "starknet:";
var ur = class extends Error {
  constructor(e) {
    super(e), this.name = "StarknetChainError";
  }
};
var fr = [
  "starknet:0x534e5f4d41494e",
  // mainnet
  "starknet:0x534e5f5345504f4c4941"
  // sepolia
];
function Dt(t) {
  const e = t.split(":");
  return e.length !== 2 || e[0] !== "starknet" ? false : Vt(e[1]);
}
function Zt(t) {
  if (!Vt(t))
    throw new ur(`Invalid Starknet chain id: ${t}`);
  return `${hr}${t}`;
}
var pr = "starknet:walletApi";
var Qe = (t, e, n) => {
  if (!e.has(t))
    throw TypeError("Cannot " + n);
};
var E2 = (t, e, n) => (Qe(t, e, "read from private field"), n ? n.call(t) : e.get(t));
var B2 = (t, e, n) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, n);
};
var ye = (t, e, n, r) => (Qe(t, e, "write to private field"), e.set(t, n), n);
var P2 = (t, e, n) => (Qe(t, e, "access private method"), n);
var z2;
var L2;
var Oe;
var Fe;
var ze;
var D2;
var J2;
var je;
var Kt;
var oe2;
var Ee;
var He;
var Xt;
var We;
var Gt;
var Ce;
var et;
var qe;
var Yt;
var tt;
var Jt;
var wr = class {
  constructor(e) {
    this.injected = e, B2(this, D2), B2(this, je), B2(this, oe2), B2(this, He), B2(this, We), B2(this, Ce), B2(this, qe), B2(this, tt), B2(this, z2, {}), B2(this, L2, null), B2(this, Oe, async ({ silent: n }) => {
      if (!E2(this, L2)) {
        const r = await this.injected.request({
          type: "wallet_requestAccounts",
          params: {
            silent_mode: n
          }
        });
        if (r.length === 0)
          return { accounts: [] };
        await P2(this, Ce, et).call(this, r);
      }
      return { accounts: this.accounts };
    }), B2(this, Fe, async () => {
      P2(this, oe2, Ee).call(this);
    }), B2(this, ze, (n, r) => (E2(this, z2)[n] || (E2(this, z2)[n] = []), E2(this, z2)[n].push(r), () => P2(this, je, Kt).call(this, n, r))), this.injected.on("accountsChanged", P2(this, He, Xt).bind(this)), this.injected.on("networkChanged", P2(this, We, Gt).bind(this));
  }
  get version() {
    return "1.0.0";
  }
  get name() {
    return this.injected.name;
  }
  get icon() {
    return typeof this.injected.icon == "string" ? this.injected.icon : this.injected.icon.light;
  }
  get features() {
    return {
      [Tn]: {
        version: "1.0.0",
        connect: E2(this, Oe).bind(this)
      },
      [Nn]: {
        version: "1.0.0",
        disconnect: E2(this, Fe).bind(this)
      },
      [Bn]: {
        version: "1.0.0",
        on: E2(this, ze).bind(this)
      },
      [pr]: {
        version: "1.0.0",
        request: P2(this, qe, Yt).bind(this),
        walletVersion: this.injected.version
      }
    };
  }
  get chains() {
    return fr.slice();
  }
  get accounts() {
    return E2(this, L2) ? [
      {
        address: E2(this, L2).address,
        publicKey: new Uint8Array(),
        chains: [E2(this, L2).chain],
        features: []
      }
    ] : [];
  }
};
z2 = /* @__PURE__ */ new WeakMap();
L2 = /* @__PURE__ */ new WeakMap();
Oe = /* @__PURE__ */ new WeakMap();
Fe = /* @__PURE__ */ new WeakMap();
ze = /* @__PURE__ */ new WeakMap();
D2 = /* @__PURE__ */ new WeakSet();
J2 = function(t, ...e) {
  if (E2(this, z2)[t])
    for (const n of E2(this, z2)[t])
      n.apply(null, e);
};
je = /* @__PURE__ */ new WeakSet();
Kt = function(t, e) {
  E2(this, z2)[t] = E2(this, z2)[t]?.filter(
    (n) => e !== n
  );
};
oe2 = /* @__PURE__ */ new WeakSet();
Ee = function() {
  E2(this, L2) && (ye(this, L2, null), P2(this, D2, J2).call(this, "change", { accounts: this.accounts }));
};
He = /* @__PURE__ */ new WeakSet();
Xt = async function(t) {
  if (!t || t.length === 0) {
    P2(this, oe2, Ee).call(this);
    return;
  }
  E2(this, L2) && await P2(this, Ce, et).call(this, t);
};
We = /* @__PURE__ */ new WeakSet();
Gt = function(t, e) {
  if (!t) {
    P2(this, oe2, Ee).call(this);
    return;
  }
  if (!E2(this, L2))
    return;
  const n = Zt(t);
  if (!Dt(n))
    throw new Error(`Invalid Starknet chain: ${n}`);
  if (e?.length > 0) {
    const [r] = e;
    ye(this, L2, { address: r, chain: n }), P2(this, D2, J2).call(this, "change", { accounts: this.accounts });
  } else
    ye(this, L2, { address: E2(this, L2)?.address, chain: n }), P2(this, D2, J2).call(this, "change", { accounts: this.accounts });
};
Ce = /* @__PURE__ */ new WeakSet();
et = async function(t) {
  if (t.length === 0)
    return;
  const [e] = t;
  if (E2(this, L2)?.chain)
    E2(this, L2).address = e, P2(this, D2, J2).call(this, "change", { accounts: this.accounts });
  else {
    const n = await P2(this, tt, Jt).call(this);
    ye(this, L2, { address: e, chain: n }), P2(this, D2, J2).call(this, "change", { accounts: this.accounts });
  }
};
qe = /* @__PURE__ */ new WeakSet();
Yt = function(...t) {
  return this.injected.request(...t);
};
tt = /* @__PURE__ */ new WeakSet();
Jt = async function() {
  const t = await this.injected.request({
    type: "wallet_requestChainId"
  }), e = Zt(t);
  if (!Dt(e))
    throw new Error(`Invalid Starknet chain: ${e}`);
  return e;
};
var _e = class extends Sn {
  constructor(e, n, r, s, i, o) {
    super({
      provider: { nodeUrl: n },
      walletProvider: e,
      address: r
    });
    __publicField(this, "keychain");
    __publicField(this, "modal");
    __publicField(this, "options");
    this.keychain = s, this.options = i, this.modal = o;
  }
  /**
   * Invoke execute function in account contract
   *
   * @param calls the invocation object or an array of them, containing:
   * - contractAddress - the address of the contract
   * - entrypoint - the entrypoint of the contract
   * - calldata - (defaults to []) the calldata
   * - signature - (defaults to []) the signature
   * @param abis (optional) the abi of the contract for better displaying
   *
   * @returns response from addTransaction
   */
  async execute(e) {
    return e = g(e), new Promise(async (n, r) => {
      const s = await this.keychain.execute(
        e,
        void 0,
        void 0,
        false,
        this.options?.feeSource
      );
      if (s.code === Y.SUCCESS) {
        n(s);
        return;
      }
      if (this.options?.propagateSessionErrors && s.code !== Y.USER_INTERACTION_REQUIRED) {
        r(s.error);
        return;
      }
      const i = this.options?.errorDisplayMode || "modal", o = s.error, a = s.code === Y.USER_INTERACTION_REQUIRED;
      if (i === "silent" && !a) {
        console.warn(
          "[Cartridge Controller] Transaction failed silently:",
          o
        ), r(o);
        return;
      }
      if (i === "notification" && !a) {
        const { toast: c2 } = await Promise.resolve().then(() => Ai);
        let d = false, h2;
        h2 = c2({
          variant: "error",
          message: o?.message || "Transaction failed",
          duration: 1e4,
          onClick: () => {
            d = true, h2 && h2(), this.modal.open(), this.keychain.execute(e, void 0, void 0, true, o).then((u2) => {
              u2.code === Y.SUCCESS ? (n(u2), this.modal.close()) : r(u2.error);
            });
          }
        }), setTimeout(() => {
          d || r(o);
        }, 10100);
        return;
      }
      this.modal.open();
      const l = await this.keychain.execute(
        e,
        void 0,
        void 0,
        true,
        o
      );
      if (l.code === Y.SUCCESS) {
        n(l), this.modal.close();
        return;
      }
      r(l.error);
    });
  }
  /**
   * Sign an JSON object for off-chain usage with the starknet private key and return the signature
   * This adds a message prefix so it cant be interchanged with transactions
   *
   * @param json - JSON object to be signed
   * @returns the signature of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  async signMessage(e) {
    return new Promise(async (n, r) => {
      const s = await this.keychain.signMessage(e, "", true);
      if (!("code" in s)) {
        n(s);
        return;
      }
      this.modal.open();
      const i = await this.keychain.signMessage(e, "", false);
      "code" in i ? r(i.error) : n(i), this.modal.close();
    });
  }
};
var O2;
(function(t) {
  t.Call = "call", t.Reply = "reply", t.Syn = "syn", t.SynAck = "synAck", t.Ack = "ack";
})(O2 || (O2 = {}));
var q2;
(function(t) {
  t.Fulfilled = "fulfilled", t.Rejected = "rejected";
})(q2 || (q2 = {}));
var ae;
(function(t) {
  t.ConnectionDestroyed = "ConnectionDestroyed", t.ConnectionTimeout = "ConnectionTimeout", t.NoIframeSrc = "NoIframeSrc";
})(ae || (ae = {}));
var Ve;
(function(t) {
  t.DataCloneError = "DataCloneError";
})(Ve || (Ve = {}));
var H2;
(function(t) {
  t.Message = "message";
})(H2 || (H2 = {}));
var gr = (t, e) => {
  const n = [];
  let r = false;
  return {
    destroy(s) {
      r || (r = true, e(`${t}: Destroying connection`), n.forEach((i) => {
        i(s);
      }));
    },
    onDestroy(s) {
      r ? s() : n.push(s);
    }
  };
};
var mr = (t) => (...e) => {
  t && console.log("[Penpal]", ...e);
};
var yr = {
  "http:": "80",
  "https:": "443"
};
var Cr = /^(https?:)?\/\/([^/:]+)?(:(\d+))?/;
var br = ["file:", "data:"];
var kr = (t) => {
  if (t && br.find((a) => t.startsWith(a)))
    return "null";
  const e = document.location, n = Cr.exec(t);
  let r, s, i;
  n ? (r = n[1] ? n[1] : e.protocol, s = n[2], i = n[4]) : (r = e.protocol, s = e.hostname, i = e.port);
  const o = i && i !== yr[r] ? `:${i}` : "";
  return `${r}//${s}${o}`;
};
var xt = ({ name: t, message: e, stack: n }) => ({
  name: t,
  message: e,
  stack: n
});
var xr = (t) => {
  const e = new Error();
  return Object.keys(t).forEach((n) => e[n] = t[n]), e;
};
var vr = (t, e, n) => {
  const { localName: r, local: s, remote: i, originForSending: o, originForReceiving: a } = t;
  let l = false;
  const c2 = (d) => {
    if (d.source !== i || d.data.penpal !== O2.Call)
      return;
    if (a !== "*" && d.origin !== a) {
      n(`${r} received message from origin ${d.origin} which did not match expected origin ${a}`);
      return;
    }
    const h2 = d.data, { methodName: u2, args: f2, id: w2 } = h2;
    n(`${r}: Received ${u2}() call`);
    const C2 = (m2) => (T2) => {
      if (n(`${r}: Sending ${u2}() reply`), l) {
        n(`${r}: Unable to send ${u2}() reply due to destroyed connection`);
        return;
      }
      const b2 = {
        penpal: O2.Reply,
        id: w2,
        resolution: m2,
        returnValue: T2
      };
      m2 === q2.Rejected && T2 instanceof Error && (b2.returnValue = xt(T2), b2.returnValueIsError = true);
      try {
        i.postMessage(b2, o);
      } catch (g2) {
        if (g2.name === Ve.DataCloneError) {
          const $2 = {
            penpal: O2.Reply,
            id: w2,
            resolution: q2.Rejected,
            returnValue: xt(g2),
            returnValueIsError: true
          };
          i.postMessage($2, o);
        }
        throw g2;
      }
    };
    new Promise((m2) => m2(e[u2].call(e, d.origin).apply(e, f2))).then(C2(q2.Fulfilled), C2(q2.Rejected));
  };
  return s.addEventListener(H2.Message, c2), () => {
    l = true, s.removeEventListener(H2.Message, c2);
  };
};
var Er = 0;
var Ar = () => ++Er;
var Qt = ".";
var en = (t) => t ? t.split(Qt) : [];
var Sr = (t) => t.join(Qt);
var $r = (t, e) => {
  const n = en(e || "");
  return n.push(t), Sr(n);
};
var Lr = (t, e, n) => {
  const r = en(e);
  return r.reduce((s, i, o) => (typeof s[i] > "u" && (s[i] = {}), o === r.length - 1 && (s[i] = n), s[i]), t), t;
};
var tn = (t, e) => {
  const n = {};
  return Object.keys(t).forEach((r) => {
    const s = t[r], i = $r(r, e);
    typeof s == "object" && Object.assign(n, tn(s, i)), typeof s == "function" && (n[i] = s);
  }), n;
};
var _r = (t) => {
  const e = {};
  for (const n in t)
    Lr(e, n, t[n]);
  return e;
};
var Pr = (t, e, n, r, s) => {
  const { localName: i, local: o, remote: a, originForSending: l, originForReceiving: c2 } = e;
  let d = false;
  s(`${i}: Connecting call sender`);
  const h2 = (f2) => (...w2) => {
    s(`${i}: Sending ${f2}() call`);
    let C2;
    try {
      a.closed && (C2 = true);
    } catch {
      C2 = true;
    }
    if (C2 && r(), d) {
      const m2 = new Error(`Unable to send ${f2}() call due to destroyed connection`);
      throw m2.code = ae.ConnectionDestroyed, m2;
    }
    return new Promise((m2, T2) => {
      const b2 = Ar(), g2 = (_2) => {
        if (_2.source !== a || _2.data.penpal !== O2.Reply || _2.data.id !== b2)
          return;
        if (c2 !== "*" && _2.origin !== c2) {
          s(`${i} received message from origin ${_2.origin} which did not match expected origin ${c2}`);
          return;
        }
        const k2 = _2.data;
        s(`${i}: Received ${f2}() reply`), o.removeEventListener(H2.Message, g2);
        let X2 = k2.returnValue;
        k2.returnValueIsError && (X2 = xr(X2)), (k2.resolution === q2.Fulfilled ? m2 : T2)(X2);
      };
      o.addEventListener(H2.Message, g2);
      const $2 = {
        penpal: O2.Call,
        id: b2,
        methodName: f2,
        args: w2
      };
      a.postMessage($2, l);
    });
  }, u2 = n.reduce((f2, w2) => (f2[w2] = h2(w2), f2), {});
  return Object.assign(t, _r(u2)), () => {
    d = true;
  };
};
var Ir = (t, e, n, r, s) => {
  const { destroy: i, onDestroy: o } = r;
  let a, l;
  const c2 = {};
  return (d) => {
    if (e !== "*" && d.origin !== e) {
      s(`Parent: Handshake - Received ACK message from origin ${d.origin} which did not match expected origin ${e}`);
      return;
    }
    s("Parent: Handshake - Received ACK");
    const h2 = {
      localName: "Parent",
      local: window,
      remote: d.source,
      originForSending: n,
      originForReceiving: e
    };
    a && a(), a = vr(h2, t, s), o(a), l && l.forEach((f2) => {
      delete c2[f2];
    }), l = d.data.methodNames;
    const u2 = Pr(c2, h2, l, i, s);
    return o(u2), c2;
  };
};
var Tr = (t, e, n, r) => (s) => {
  if (!s.source)
    return;
  if (n !== "*" && s.origin !== n) {
    t(`Parent: Handshake - Received SYN message from origin ${s.origin} which did not match expected origin ${n}`);
    return;
  }
  t("Parent: Handshake - Received SYN, responding with SYN-ACK");
  const i = {
    penpal: O2.SynAck,
    methodNames: Object.keys(e)
  };
  s.source.postMessage(i, r);
};
var Nr = 6e4;
var Br = (t, e) => {
  const { destroy: n, onDestroy: r } = e, s = setInterval(() => {
    t.isConnected || (clearInterval(s), n());
  }, Nr);
  r(() => {
    clearInterval(s);
  });
};
var Ur = (t, e) => {
  let n;
  return t !== void 0 && (n = window.setTimeout(() => {
    const r = new Error(`Connection timed out after ${t}ms`);
    r.code = ae.ConnectionTimeout, e(r);
  }, t)), () => {
    clearTimeout(n);
  };
};
var Mr = (t) => {
  if (!t.src && !t.srcdoc) {
    const e = new Error("Iframe must have src or srcdoc property defined.");
    throw e.code = ae.NoIframeSrc, e;
  }
};
var Rr = (t) => {
  let { iframe: e, methods: n = {}, childOrigin: r, timeout: s, debug: i = false } = t;
  const o = mr(i), a = gr("Parent", o), { onDestroy: l, destroy: c2 } = a;
  r || (Mr(e), r = kr(e.src));
  const d = r === "null" ? "*" : r, h2 = tn(n), u2 = Tr(o, h2, r, d), f2 = Ir(h2, r, d, a, o);
  return {
    promise: new Promise((C2, m2) => {
      const T2 = Ur(s, c2), b2 = (g2) => {
        if (!(g2.source !== e.contentWindow || !g2.data)) {
          if (g2.data.penpal === O2.Syn) {
            u2(g2);
            return;
          }
          if (g2.data.penpal === O2.Ack) {
            const $2 = f2(g2);
            $2 && (T2(), C2($2));
            return;
          }
        }
      };
      window.addEventListener(H2.Message, b2), o("Parent: Awaiting handshake"), Br(e, a), l((g2) => {
        window.removeEventListener(H2.Message, b2), g2 && m2(g2);
      });
    }),
    destroy() {
      c2();
    }
  };
};
var Or = /* @__PURE__ */ new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);
function nn(t) {
  const e = t.toLowerCase();
  return Or.has(e) || e.endsWith(".localhost");
}
function Fr(t) {
  if (t.username || t.password)
    throw new Error("Invalid keychain iframe URL: credentials are not allowed");
  if (t.protocol !== "https:" && !(t.protocol === "http:" && nn(t.hostname)))
    throw new Error(
      "Invalid keychain iframe URL: only https:// or local http:// URLs are allowed"
    );
}
function zr(t) {
  const e = [
    "publickey-credentials-create *",
    "publickey-credentials-get *",
    "clipboard-write",
    "geolocation *",
    "payment *"
  ];
  return nn(t.hostname) && e.push("local-network-access *"), e.join("; ");
}
var jr = class {
  constructor({
    id: e,
    url: n,
    onClose: r,
    onConnect: s,
    methods: i = {}
  }) {
    __publicField(this, "url");
    __publicField(this, "iframe");
    __publicField(this, "container");
    __publicField(this, "onClose");
    __publicField(this, "closeTimeout");
    if (typeof document > "u" || typeof window > "u")
      return;
    this.url = n, Fr(n);
    const o = document.head, a = document.createElement("meta");
    a.name = "viewport", a.id = "controller-viewport", a.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, interactive-widget=resizes-content", o.appendChild(a);
    const l = document.createElement("iframe");
    l.src = n.toString(), l.id = e, l.style.border = "none", l.sandbox.add("allow-forms"), l.sandbox.add("allow-popups"), l.sandbox.add("allow-popups-to-escape-sandbox"), l.sandbox.add("allow-scripts"), l.sandbox.add("allow-same-origin"), l.allow = zr(n), l.referrerPolicy = "no-referrer", l.style.scrollbarWidth = "none", l.style.setProperty("-ms-overflow-style", "none"), l.style.setProperty("-webkit-scrollbar", "none"), document.hasStorageAccess && l.sandbox.add("allow-storage-access-by-user-activation");
    const c2 = document.createElement("div");
    c2.id = "controller", c2.style.position = "fixed", c2.style.height = "100%", c2.style.width = "100%", c2.style.top = "0", c2.style.left = "0", c2.style.zIndex = "10000", c2.style.backgroundColor = "rgba(0,0,0,0.6)", c2.style.display = "none", c2.style.alignItems = "center", c2.style.justifyContent = "center", c2.style.transition = "opacity 0.2s ease", c2.style.opacity = "0", c2.style.pointerEvents = "auto", c2.style.overscrollBehaviorY = "contain", c2.style.scrollbarWidth = "none", c2.style.setProperty("-ms-overflow-style", "none"), c2.style.setProperty("-webkit-scrollbar", "none"), c2.appendChild(l), c2.addEventListener(
      "touchstart",
      (u2) => {
        u2.touches.length > 1 && u2.preventDefault();
      },
      { passive: false }
    ), c2.addEventListener(
      "touchmove",
      (u2) => {
        u2.touches.length > 1 && u2.preventDefault();
      },
      { passive: false }
    ), c2.addEventListener(
      "touchend",
      (u2) => {
        u2.touches.length > 1 && u2.preventDefault();
      },
      { passive: false }
    ), this.iframe = l, this.container = c2, Rr({
      iframe: this.iframe,
      childOrigin: n.origin,
      methods: {
        open: (u2) => () => this.open(),
        close: (u2) => () => this.close(),
        reload: (u2) => () => window.location.reload(),
        ...i
      }
    }).promise.then(s).catch((u2) => {
      console.error("Failed to establish secure keychain iframe connection", {
        error: u2,
        childOrigin: n.origin
      });
    }), this.resize(), window.addEventListener("resize", () => this.resize());
    const d = new MutationObserver(() => {
      if (typeof document > "u") return;
      const u2 = document.getElementById("controller");
      document.body && e === "controller-keychain" && !u2 && (document.body.appendChild(c2), d.disconnect());
    });
    d.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
    const h2 = document.getElementById("controller");
    document.body && e === "controller-keychain" && !h2 && document.body.appendChild(c2), this.onClose = r;
  }
  open() {
    !this.container || typeof document > "u" || !document.body || (this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = void 0), document.body.style.overflow = "hidden", this.container.style.display = "flex", requestAnimationFrame(() => {
      this.container && (this.container.style.opacity = "1");
    }));
  }
  close() {
    !this.container || typeof document > "u" || !document.body || (this.onClose?.(), document.body.style.overflow = "auto", this.container.style.opacity = "0", this.closeTimeout = setTimeout(() => {
      this.container && (this.container.style.display = "none"), this.closeTimeout = void 0;
    }, 200));
  }
  sendBackward() {
    this.container && (this.container.style.zIndex = "9999");
  }
  sendForward() {
    this.container && (this.container.style.zIndex = "10000");
  }
  resize() {
    if (!(!this.iframe || typeof window > "u")) {
      if (this.iframe.style.userSelect = "none", window.innerWidth < 768) {
        this.iframe.style.height = "100%", this.iframe.style.width = "100%", this.iframe.style.borderRadius = "0";
        return;
      }
      this.iframe.style.height = "600px", this.iframe.style.width = "432px", this.iframe.style.borderRadius = "8px";
    }
  }
  isOpen() {
    return this.container?.style.display !== "none";
  }
};
var Hr = "6.13.7";
function vt(t, e, n) {
  for (let r in e) {
    let s = e[r];
    Object.defineProperty(t, r, { enumerable: true, value: s, writable: false });
  }
}
function G2(t) {
  if (t == null)
    return "null";
  if (Array.isArray(t))
    return "[ " + t.map(G2).join(", ") + " ]";
  if (t instanceof Uint8Array) {
    const e = "0123456789abcdef";
    let n = "0x";
    for (let r = 0; r < t.length; r++)
      n += e[t[r] >> 4], n += e[t[r] & 15];
    return n;
  }
  if (typeof t == "object" && typeof t.toJSON == "function")
    return G2(t.toJSON());
  switch (typeof t) {
    case "boolean":
    case "symbol":
      return t.toString();
    case "bigint":
      return BigInt(t).toString();
    case "number":
      return t.toString();
    case "string":
      return JSON.stringify(t);
    case "object": {
      const e = Object.keys(t);
      return e.sort(), "{ " + e.map((n) => `${G2(n)}: ${G2(t[n])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function Wr(t, e, n) {
  let r = t;
  {
    const i = [];
    if (n) {
      if ("message" in n || "code" in n || "name" in n)
        throw new Error(`value will overwrite populated values: ${G2(n)}`);
      for (const o in n) {
        if (o === "shortMessage")
          continue;
        const a = n[o];
        i.push(o + "=" + G2(a));
      }
    }
    i.push(`code=${e}`), i.push(`version=${Hr}`), i.length && (t += " (" + i.join(", ") + ")");
  }
  let s;
  switch (e) {
    case "INVALID_ARGUMENT":
      s = new TypeError(t);
      break;
    case "NUMERIC_FAULT":
    case "BUFFER_OVERRUN":
      s = new RangeError(t);
      break;
    default:
      s = new Error(t);
  }
  return vt(s, { code: e }), n && Object.assign(s, n), s.shortMessage == null && vt(s, { shortMessage: r }), s;
}
function qr(t, e, n, r) {
  if (!t)
    throw Wr(e, n, r);
}
function te2(t, e, n, r) {
  qr(t, e, "INVALID_ARGUMENT", { argument: n, value: r });
}
["NFD", "NFC", "NFKD", "NFKC"].reduce((t, e) => {
  try {
    if ("test".normalize(e) !== "test")
      throw new Error("bad");
    if (e === "NFD" && "\xE9".normalize("NFD") !== "e\u0301")
      throw new Error("broken");
    t.push(e);
  } catch {
  }
  return t;
}, []);
function Vr(t, e, n) {
  if (t instanceof Uint8Array)
    return t;
  if (typeof t == "string" && t.match(/^0x(?:[0-9a-f][0-9a-f])*$/i)) {
    const r = new Uint8Array((t.length - 2) / 2);
    let s = 2;
    for (let i = 0; i < r.length; i++)
      r[i] = parseInt(t.substring(s, s + 2), 16), s += 2;
    return r;
  }
  te2(false, "invalid BytesLike value", e || "value", t);
}
function nt(t, e) {
  return Vr(t, e);
}
var Et = "0123456789abcdef";
function Dr(t) {
  const e = nt(t);
  let n = "0x";
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    n += Et[(s & 240) >> 4] + Et[s & 15];
  }
  return n;
}
var rn = false;
var sn = function(t) {
  return ar(t);
};
var on = sn;
function ce(t) {
  const e = nt(t, "data");
  return Dr(on(e));
}
ce._ = sn;
ce.lock = function() {
  rn = true;
};
ce.register = function(t) {
  if (rn)
    throw new TypeError("keccak256 is locked");
  on = t;
};
Object.freeze(ce);
var Zr = BigInt(0);
var Kr = BigInt(36);
function At(t) {
  t = t.toLowerCase();
  const e = t.substring(2).split(""), n = new Uint8Array(40);
  for (let s = 0; s < 40; s++)
    n[s] = e[s].charCodeAt(0);
  const r = nt(ce(n));
  for (let s = 0; s < 40; s += 2)
    r[s >> 1] >> 4 >= 8 && (e[s] = e[s].toUpperCase()), (r[s >> 1] & 15) >= 8 && (e[s + 1] = e[s + 1].toUpperCase());
  return "0x" + e.join("");
}
var rt = {};
for (let t = 0; t < 10; t++)
  rt[String(t)] = String(t);
for (let t = 0; t < 26; t++)
  rt[String.fromCharCode(65 + t)] = String(10 + t);
var St = 15;
function Xr(t) {
  t = t.toUpperCase(), t = t.substring(4) + t.substring(0, 2) + "00";
  let e = t.split("").map((r) => rt[r]).join("");
  for (; e.length >= St; ) {
    let r = e.substring(0, St);
    e = parseInt(r, 10) % 97 + e.substring(r.length);
  }
  let n = String(98 - parseInt(e, 10) % 97);
  for (; n.length < 2; )
    n = "0" + n;
  return n;
}
var Gr = (function() {
  const t = {};
  for (let e = 0; e < 36; e++) {
    const n = "0123456789abcdefghijklmnopqrstuvwxyz"[e];
    t[n] = BigInt(e);
  }
  return t;
})();
function Yr(t) {
  t = t.toLowerCase();
  let e = Zr;
  for (let n = 0; n < t.length; n++)
    e = e * Kr + Gr[t[n]];
  return e;
}
function F2(t) {
  if (te2(typeof t == "string", "invalid address", "address", t), t.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    t.startsWith("0x") || (t = "0x" + t);
    const e = At(t);
    return te2(!t.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || e === t, "bad address checksum", "address", t), e;
  }
  if (t.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    te2(t.substring(2, 4) === Xr(t), "bad icap checksum", "address", t);
    let e = Yr(t.substring(4)).toString(16);
    for (; e.length < 40; )
      e = "0" + e;
    return At("0x" + e);
  }
  te2(false, "invalid address", "address", t);
}
var Jr = class {
  constructor() {
    __publicField(this, "type", "argent");
    __publicField(this, "platform", "starknet");
    __publicField(this, "wallet");
    __publicField(this, "account");
    __publicField(this, "connectedAccounts", []);
    __publicField(this, "accountChangeListener");
  }
  isAvailable() {
    return typeof window < "u" && !!window.starknet_argentX;
  }
  getInfo() {
    const e = this.isAvailable();
    return {
      type: this.type,
      available: e,
      version: e ? window.starknet_argentX?.version || "Unknown" : void 0,
      chainId: e ? window.starknet_argentX?.chainId : void 0,
      name: "Argent",
      platform: this.platform
    };
  }
  async connect() {
    if (this.account)
      return { success: true, wallet: this.type, account: this.account };
    try {
      if (!this.isAvailable())
        throw new Error("Argent is not available");
      const e = window.starknet_argentX;
      if (!e)
        throw new Error("No wallet found");
      const n = await e.request({
        type: "wallet_requestAccounts",
        params: { silent_mode: false }
      });
      if (!n || n.length === 0)
        throw new Error("No accounts found");
      return this.removeAccountChangeListener(), this.wallet = e, this.account = n[0], this.connectedAccounts = n, this.setupAccountChangeListener(), { success: true, wallet: this.type, account: this.account };
    } catch (e) {
      return console.error("Error connecting to Argent:", e), {
        success: false,
        wallet: this.type,
        error: e.message || "Unknown error"
      };
    }
  }
  getConnectedAccounts() {
    return this.connectedAccounts;
  }
  async signTypedData(e) {
    try {
      if (!this.isAvailable() || !this.wallet)
        throw new Error("Argent is not connected");
      const n = await this.wallet.request({
        type: "wallet_signTypedData",
        params: e
      });
      return { success: true, wallet: this.type, result: n };
    } catch (n) {
      return console.error("Error signing typed data with Argent:", n), {
        success: false,
        wallet: this.type,
        error: n.message || "Unknown error"
      };
    }
  }
  async sendTransaction(e) {
    if (!this.wallet)
      throw new Error("No wallet found");
    try {
      const n = await this.wallet.request({
        type: "wallet_addInvokeTransaction",
        params: {
          calls: e
        }
      });
      return {
        success: true,
        wallet: this.type,
        result: n
      };
    } catch (n) {
      return console.error("Error sending transaction with Argent:", n), {
        success: false,
        wallet: this.type,
        error: n.message || "Unknown error"
      };
    }
  }
  async switchChain(e) {
    if (!this.wallet)
      throw new Error("No wallet found");
    return await this.wallet.request({
      type: "wallet_switchStarknetChain",
      params: {
        chainId: e
      }
    });
  }
  async getBalance(e) {
    try {
      if (!this.isAvailable() || !this.wallet)
        throw new Error("Argent is not connected");
      return {
        success: true,
        wallet: this.type,
        result: "Implement based on Argent API"
      };
    } catch (n) {
      return console.error("Error getting balance from Argent:", n), {
        success: false,
        wallet: this.type,
        error: n.message || "Unknown error"
      };
    }
  }
  async waitForTransaction(e, n) {
    return {
      success: false,
      wallet: this.type,
      error: "waitForTransaction not supported for Argent wallet"
    };
  }
  setupAccountChangeListener() {
    this.wallet && (this.accountChangeListener = (e) => {
      e && e.length > 0 ? (this.account = e[0], this.connectedAccounts = e) : (this.account = void 0, this.connectedAccounts = []);
    }, this.wallet.on("accountsChanged", this.accountChangeListener));
  }
  removeAccountChangeListener() {
    this.wallet && this.accountChangeListener && (this.wallet.off("accountsChanged", this.accountChangeListener), this.accountChangeListener = void 0);
  }
  disconnect() {
    this.removeAccountChangeListener(), this.wallet = void 0, this.account = void 0, this.connectedAccounts = [];
  }
};
function Qr(t) {
  if (typeof window > "u")
    return;
  const e = (n) => t(n.detail);
  return window.addEventListener("eip6963:announceProvider", e), window.dispatchEvent(new CustomEvent("eip6963:requestProvider")), () => window.removeEventListener("eip6963:announceProvider", e);
}
function es() {
  const t = /* @__PURE__ */ new Set();
  let e = [];
  const n = () => Qr((s) => {
    e.some(({ info: i }) => i.uuid === s.info.uuid) || (e = [...e, s], t.forEach((i) => i(e, { added: [s] })));
  });
  let r = n();
  return {
    _listeners() {
      return t;
    },
    clear() {
      t.forEach((s) => s([], { removed: [...e] })), e = [];
    },
    destroy() {
      this.clear(), t.clear(), r?.();
    },
    findProvider({ rdns: s }) {
      return e.find((i) => i.info.rdns === s);
    },
    getProviders() {
      return e;
    },
    reset() {
      this.clear(), r?.(), r = n();
    },
    subscribe(s, { emitImmediately: i } = {}) {
      return t.add(s), i && s(e, { added: e }), () => t.delete(s);
    }
  };
}
var ts = {
  "0x1": "ethereum",
  // ethereum mainnet
  "0xaa36a7": "ethereum",
  // ethereum sepolia
  "0x14a34": "base",
  // base mainnet
  "0x2105": "base",
  // base sepolia
  "0x66eee": "arbitrum",
  // arbitrum mainnet
  "0xa4b1": "arbitrum",
  // arbitrum sepolia
  "0xa": "optimism",
  // op mainnet
  "0xaa37dc": "optimism",
  // op sepolia
  [ge.StarknetChainId.SN_MAIN]: "starknet",
  [ge.StarknetChainId.SN_SEPOLIA]: "starknet"
};
var Pe = (t) => {
  const e = Bt.toHex(t), n = ts[e];
  return n || console.warn(`Unknown chain ID: ${e}`), n;
};
var Ie;
function ns() {
  return Ie || (Ie = es()), Ie;
}
var Ae = class {
  constructor() {
    __publicField(this, "platform");
    __publicField(this, "account");
    __publicField(this, "provider");
    __publicField(this, "connectedAccounts", []);
    __publicField(this, "initialized", false);
    this.initializeIfAvailable();
  }
  getProvider() {
    const e = ns().findProvider({ rdns: this.rdns });
    return e && (this.provider = e), this.provider;
  }
  getEthereumProvider() {
    const e = this.getProvider();
    return e ? e.provider : this.getFallbackProvider();
  }
  /**
   * Fallback provider detection when EIP-6963 announcement is missed.
   * Subclasses can override to provide wallet-specific fallback logic.
   */
  getFallbackProvider() {
    return null;
  }
  initializeIfAvailable() {
    this.getProvider() && !this.initialized && (this.initialized = true, this.initializeProvider());
  }
  initializeProvider() {
    const e = this.getProvider();
    e && (e.provider.request({
      method: "eth_accounts"
    }).then((n) => {
      this.connectedAccounts = n.map(F2), n.length > 0 && (this.account = F2(n[0]));
    }).catch(console.error), e.provider.request({
      method: "eth_chainId"
    }).then((n) => {
      this.platform = Pe(n);
    }).catch(console.error), e.provider?.on("chainChanged", (n) => {
      this.platform = Pe(n);
    }), e.provider?.on("accountsChanged", (n) => {
      n && (this.connectedAccounts = n.map((r) => F2(r)), this.account = n.length > 0 ? F2(n[0]) : void 0);
    }));
  }
  isAvailable() {
    const e = this.getProvider();
    return e && !this.initialized && this.initializeIfAvailable(), e ? true : typeof window < "u" && !!this.getFallbackProvider();
  }
  getInfo() {
    const e = this.isAvailable();
    return {
      type: this.type,
      available: e,
      version: e ? window.ethereum?.version || "Unknown" : void 0,
      chainId: e ? window.ethereum?.chainId : void 0,
      name: this.displayName,
      platform: this.platform,
      connectedAccounts: this.connectedAccounts
    };
  }
  getConnectedAccounts() {
    return this.connectedAccounts;
  }
  async connect(e) {
    if (e && this.connectedAccounts.includes(F2(e)) && (this.account = F2(e)), this.account)
      return { success: true, wallet: this.type, account: this.account };
    try {
      if (!this.isAvailable())
        throw new Error(`${this.displayName} is not available`);
      const n = this.getEthereumProvider();
      if (!n)
        throw new Error(`${this.displayName} provider not found`);
      const r = await n.request({
        method: "eth_requestAccounts"
      });
      if (r && r.length > 0)
        return this.account = F2(r[0]), this.connectedAccounts = r.map(F2), this.getProvider() || (this.provider = {
          info: {
            uuid: `${this.rdns}-fallback`,
            name: this.displayName,
            icon: "data:image/svg+xml;base64,",
            rdns: this.rdns
          },
          provider: n
        }, this.initializeIfAvailable()), { success: true, wallet: this.type, account: this.account };
      throw new Error("No accounts found");
    } catch (n) {
      return console.error(`Error connecting to ${this.displayName}:`, n), {
        success: false,
        wallet: this.type,
        error: n.message || "Unknown error"
      };
    }
  }
  async signTransaction(e) {
    try {
      if (!this.isAvailable() || !this.account)
        throw new Error(`${this.displayName} is not connected`);
      const n = this.getEthereumProvider();
      if (!n)
        throw new Error(`${this.displayName} is not connected`);
      const r = await n.request({
        method: "eth_sendTransaction",
        params: [e]
      });
      return { success: true, wallet: this.type, result: r };
    } catch (n) {
      return console.error(
        `Error signing transaction with ${this.displayName}:`,
        n
      ), {
        success: false,
        wallet: this.type,
        error: n.message || "Unknown error"
      };
    }
  }
  async signMessage(e, n) {
    try {
      if (!this.isAvailable() || !this.account)
        throw new Error(`${this.displayName} is not connected`);
      const r = this.getEthereumProvider();
      if (!r)
        throw new Error(`${this.displayName} provider not found`);
      const s = await r.request({
        method: "personal_sign",
        params: [e, n || this.account]
      });
      return { success: true, wallet: this.type, result: s };
    } catch (r) {
      return console.error(`Error signing message with ${this.displayName}:`, r), {
        success: false,
        wallet: this.type,
        error: r.message || "Unknown error"
      };
    }
  }
  async signTypedData(e) {
    try {
      if (!this.isAvailable() || !this.account)
        throw new Error(`${this.displayName} is not connected`);
      const n = this.getEthereumProvider();
      if (!n)
        throw new Error(`${this.displayName} is not connected`);
      const r = await n.request({
        method: "eth_signTypedData_v4",
        params: [this.account, JSON.stringify(e)]
      });
      return { success: true, wallet: this.type, result: r };
    } catch (n) {
      return console.error(
        `Error signing typed data with ${this.displayName}:`,
        n
      ), {
        success: false,
        wallet: this.type,
        error: n.message || "Unknown error"
      };
    }
  }
  async sendTransaction(e) {
    try {
      if (!this.isAvailable() || !this.account)
        throw new Error(`${this.displayName} is not connected`);
      const n = this.getEthereumProvider();
      if (!n)
        throw new Error(`${this.displayName} is not connected`);
      const r = await n.request({
        method: "eth_sendTransaction",
        params: [e]
      });
      return { success: true, wallet: this.type, result: r };
    } catch (n) {
      return console.error(
        `Error sending transaction with ${this.displayName}:`,
        n
      ), {
        success: false,
        wallet: this.type,
        error: n.message || "Unknown error"
      };
    }
  }
  async switchChain(e) {
    try {
      if (!this.isAvailable())
        throw new Error(`${this.displayName} is not available`);
      const n = this.getEthereumProvider();
      if (!n)
        throw new Error(`${this.displayName} is not connected`);
      try {
        return await n.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: e }]
        }), this.platform = Pe(e), true;
      } catch (r) {
        throw r.code === 4902 && console.warn(`Chain not added to ${this.displayName}`), r;
      }
    } catch (n) {
      return console.error(`Error switching chain for ${this.displayName}:`, n), false;
    }
  }
  async getBalance(e) {
    try {
      if (!this.isAvailable() || !this.account)
        throw new Error(`${this.displayName} is not connected`);
      if (e)
        return {
          success: false,
          wallet: this.type,
          error: "Not implemented for ERC20"
        };
      {
        const n = this.getEthereumProvider();
        if (!n)
          throw new Error(`${this.displayName} is not connected`);
        const r = await n.request({
          method: "eth_getBalance",
          params: [this.account, "latest"]
        });
        return { success: true, wallet: this.type, result: r };
      }
    } catch (n) {
      return console.error(`Error getting balance from ${this.displayName}:`, n), {
        success: false,
        wallet: this.type,
        error: n.message || "Unknown error"
      };
    }
  }
  async waitForTransaction(e, n = 6e4) {
    try {
      if (!this.isAvailable())
        throw new Error(`${this.displayName} is not connected`);
      const r = this.getEthereumProvider();
      if (!r)
        throw new Error(`${this.displayName} is not connected`);
      const s = Date.now(), i = 1e3;
      for (; Date.now() - s < n; ) {
        const o = await r.request({
          method: "eth_getTransactionReceipt",
          params: [e]
        });
        if (o)
          return {
            success: true,
            wallet: this.type,
            result: o
          };
        await new Promise((a) => setTimeout(a, i));
      }
      throw new Error("Transaction confirmation timed out");
    } catch (r) {
      return console.error(
        `Error waiting for transaction with ${this.displayName}:`,
        r
      ), {
        success: false,
        wallet: this.type,
        error: r.message || "Unknown error"
      };
    }
  }
};
var rs = class extends Ae {
  constructor() {
    super(...arguments);
    __publicField(this, "type", "base");
    __publicField(this, "rdns", "com.coinbase.wallet");
    __publicField(this, "displayName", "Base Wallet");
  }
};
var ss = class extends Ae {
  constructor() {
    super(...arguments);
    __publicField(this, "type", "metamask");
    __publicField(this, "rdns", "io.metamask");
    __publicField(this, "displayName", "MetaMask");
  }
  getFallbackProvider() {
    return window.ethereum?.isMetaMask ? window.ethereum : null;
  }
};
function st(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function an(t, ...e) {
  if (!st(t))
    throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(t.length))
    throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
}
function cn(t, e) {
  return Array.isArray(e) ? e.length === 0 ? true : t ? e.every((n) => typeof n == "string") : e.every((n) => Number.isSafeInteger(n)) : false;
}
function is(t) {
  if (typeof t != "function")
    throw new Error("function expected");
  return true;
}
function Q2(t, e) {
  if (typeof e != "string")
    throw new Error(`${t}: string expected`);
  return true;
}
function le2(t) {
  if (!Number.isSafeInteger(t))
    throw new Error(`invalid integer: ${t}`);
}
function be(t) {
  if (!Array.isArray(t))
    throw new Error("array expected");
}
function ke(t, e) {
  if (!cn(true, e))
    throw new Error(`${t}: array of strings expected`);
}
function ln(t, e) {
  if (!cn(false, e))
    throw new Error(`${t}: array of numbers expected`);
}
// @__NO_SIDE_EFFECTS__
function it(...t) {
  const e = (i) => i, n = (i, o) => (a) => i(o(a)), r = t.map((i) => i.encode).reduceRight(n, e), s = t.map((i) => i.decode).reduce(n, e);
  return { encode: r, decode: s };
}
// @__NO_SIDE_EFFECTS__
function ot(t) {
  const e = typeof t == "string" ? t.split("") : t, n = e.length;
  ke("alphabet", e);
  const r = new Map(e.map((s, i) => [s, i]));
  return {
    encode: (s) => (be(s), s.map((i) => {
      if (!Number.isSafeInteger(i) || i < 0 || i >= n)
        throw new Error(`alphabet.encode: digit index outside alphabet "${i}". Allowed: ${t}`);
      return e[i];
    })),
    decode: (s) => (be(s), s.map((i) => {
      Q2("alphabet.decode", i);
      const o = r.get(i);
      if (o === void 0)
        throw new Error(`Unknown letter: "${i}". Allowed: ${t}`);
      return o;
    }))
  };
}
// @__NO_SIDE_EFFECTS__
function at(t = "") {
  return Q2("join", t), {
    encode: (e) => (ke("join.decode", e), e.join(t)),
    decode: (e) => (Q2("join.decode", e), e.split(t))
  };
}
// @__NO_SIDE_EFFECTS__
function os(t, e = "=") {
  return le2(t), Q2("padding", e), {
    encode(n) {
      for (ke("padding.encode", n); n.length * t % 8; )
        n.push(e);
      return n;
    },
    decode(n) {
      ke("padding.decode", n);
      let r = n.length;
      if (r * t % 8)
        throw new Error("padding: invalid, string should have whole number of bytes");
      for (; r > 0 && n[r - 1] === e; r--)
        if ((r - 1) * t % 8 === 0)
          throw new Error("padding: invalid, string has too much padding");
      return n.slice(0, r);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function as(t) {
  return is(t), { encode: (e) => e, decode: (e) => t(e) };
}
function $t(t, e, n) {
  if (e < 2)
    throw new Error(`convertRadix: invalid from=${e}, base cannot be less than 2`);
  if (n < 2)
    throw new Error(`convertRadix: invalid to=${n}, base cannot be less than 2`);
  if (be(t), !t.length)
    return [];
  let r = 0;
  const s = [], i = Array.from(t, (a) => {
    if (le2(a), a < 0 || a >= e)
      throw new Error(`invalid integer: ${a}`);
    return a;
  }), o = i.length;
  for (; ; ) {
    let a = 0, l = true;
    for (let c2 = r; c2 < o; c2++) {
      const d = i[c2], h2 = e * a, u2 = h2 + d;
      if (!Number.isSafeInteger(u2) || h2 / e !== a || u2 - d !== h2)
        throw new Error("convertRadix: carry overflow");
      const f2 = u2 / n;
      a = u2 % n;
      const w2 = Math.floor(f2);
      if (i[c2] = w2, !Number.isSafeInteger(w2) || w2 * n + a !== u2)
        throw new Error("convertRadix: carry overflow");
      if (l)
        w2 ? l = false : r = c2;
      else continue;
    }
    if (s.push(a), l)
      break;
  }
  for (let a = 0; a < t.length - 1 && t[a] === 0; a++)
    s.push(0);
  return s.reverse();
}
var dn = (t, e) => e === 0 ? t : dn(e, t % e);
var xe = /* @__NO_SIDE_EFFECTS__ */ (t, e) => t + (e - dn(t, e));
var Te = /* @__PURE__ */ (() => {
  let t = [];
  for (let e = 0; e < 40; e++)
    t.push(2 ** e);
  return t;
})();
function Lt(t, e, n, r) {
  if (be(t), e <= 0 || e > 32)
    throw new Error(`convertRadix2: wrong from=${e}`);
  if (n <= 0 || n > 32)
    throw new Error(`convertRadix2: wrong to=${n}`);
  if (/* @__PURE__ */ xe(e, n) > 32)
    throw new Error(`convertRadix2: carry overflow from=${e} to=${n} carryBits=${/* @__PURE__ */ xe(e, n)}`);
  let s = 0, i = 0;
  const o = Te[e], a = Te[n] - 1, l = [];
  for (const c2 of t) {
    if (le2(c2), c2 >= o)
      throw new Error(`convertRadix2: invalid data word=${c2} from=${e}`);
    if (s = s << e | c2, i + e > 32)
      throw new Error(`convertRadix2: carry overflow pos=${i} from=${e}`);
    for (i += e; i >= n; i -= n)
      l.push((s >> i - n & a) >>> 0);
    const d = Te[i];
    if (d === void 0)
      throw new Error("invalid carry");
    s &= d - 1;
  }
  if (s = s << n - i & a, !r && i >= e)
    throw new Error("Excess padding");
  if (!r && s > 0)
    throw new Error(`Non-zero padding: ${s}`);
  return r && i > 0 && l.push(s >>> 0), l;
}
// @__NO_SIDE_EFFECTS__
function cs(t) {
  le2(t);
  const e = 2 ** 8;
  return {
    encode: (n) => {
      if (!st(n))
        throw new Error("radix.encode input should be Uint8Array");
      return $t(Array.from(n), e, t);
    },
    decode: (n) => (ln("radix.decode", n), Uint8Array.from($t(n, t, e)))
  };
}
// @__NO_SIDE_EFFECTS__
function hn(t, e = false) {
  if (le2(t), t <= 0 || t > 32)
    throw new Error("radix2: bits should be in (0..32]");
  if (/* @__PURE__ */ xe(8, t) > 32 || /* @__PURE__ */ xe(t, 8) > 32)
    throw new Error("radix2: carry overflow");
  return {
    encode: (n) => {
      if (!st(n))
        throw new Error("radix2.encode input should be Uint8Array");
      return Lt(Array.from(n), 8, t, !e);
    },
    decode: (n) => (ln("radix2.decode", n), Uint8Array.from(Lt(n, t, 8, e)))
  };
}
var ls = typeof Uint8Array.from([]).toBase64 == "function" && typeof Uint8Array.fromBase64 == "function";
var ds = ls ? {
  encode(t) {
    return an(t), t.toBase64();
  },
  decode(t) {
    return Q2("base64", t), Uint8Array.fromBase64(t, { lastChunkHandling: "strict" });
  }
} : /* @__PURE__ */ it(/* @__PURE__ */ hn(6), /* @__PURE__ */ ot("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), /* @__PURE__ */ os(6), /* @__PURE__ */ at(""));
var hs = /* @__NO_SIDE_EFFECTS__ */ (t) => /* @__PURE__ */ it(/* @__PURE__ */ cs(58), /* @__PURE__ */ ot(t), /* @__PURE__ */ at(""));
var De = /* @__PURE__ */ hs("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
var us = {
  encode: (t) => new TextDecoder().decode(t),
  decode: (t) => new TextEncoder().encode(t)
};
var fs = typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function";
var ps = {
  encode(t) {
    return an(t), t.toHex();
  },
  decode(t) {
    return Q2("hex", t), Uint8Array.fromHex(t);
  }
};
var Ne = fs ? ps : /* @__PURE__ */ it(/* @__PURE__ */ hn(4), /* @__PURE__ */ ot("0123456789abcdef"), /* @__PURE__ */ at(""), /* @__PURE__ */ as((t) => {
  if (typeof t != "string" || t.length % 2 !== 0)
    throw new TypeError(`hex.decode: expected string, got ${typeof t} with length ${t.length}`);
  return t.toLowerCase();
}));
function Ze(t, e) {
  if (t.length !== e.length)
    return false;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e[n])
      return false;
  return true;
}
function j2(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
var un = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength);
function K2(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
function M2(t) {
  return Number.isSafeInteger(t);
}
var fn = (t) => {
  if (t !== null && typeof t != "string" && !U2(t) && !j2(t) && !M2(t))
    throw new Error(`lengthCoder: expected null | number | Uint8Array | CoderType, got ${t} (${typeof t})`);
  return {
    encodeStream(e, n) {
      if (t === null)
        return;
      if (U2(t))
        return t.encodeStream(e, n);
      let r;
      if (typeof t == "number" ? r = t : typeof t == "string" && (r = Z.resolve(e.stack, t)), typeof r == "bigint" && (r = Number(r)), r === void 0 || r !== n)
        throw e.err(`Wrong length: ${r} len=${t} exp=${n} (${typeof n})`);
    },
    decodeStream(e) {
      let n;
      if (U2(t) ? n = Number(t.decodeStream(e)) : typeof t == "number" ? n = t : typeof t == "string" && (n = Z.resolve(e.stack, t)), typeof n == "bigint" && (n = Number(n)), typeof n != "number")
        throw e.err(`Wrong length: ${n}`);
      return n;
    }
  };
};
var S2 = {
  BITS: 32,
  FULL_MASK: -1 >>> 0,
  // 1<<32 will overflow
  len: (t) => Math.ceil(t / 32),
  create: (t) => new Uint32Array(S2.len(t)),
  clean: (t) => t.fill(0),
  debug: (t) => Array.from(t).map((e) => (e >>> 0).toString(2).padStart(32, "0")),
  checkLen: (t, e) => {
    if (S2.len(e) !== t.length)
      throw new Error(`wrong length=${t.length}. Expected: ${S2.len(e)}`);
  },
  chunkLen: (t, e, n) => {
    if (e < 0)
      throw new Error(`wrong pos=${e}`);
    if (e + n > t)
      throw new Error(`wrong range=${e}/${n} of ${t}`);
  },
  set: (t, e, n, r = true) => !r && (t[e] & n) !== 0 ? false : (t[e] |= n, true),
  pos: (t, e) => ({
    chunk: Math.floor((t + e) / 32),
    mask: 1 << 32 - (t + e) % 32 - 1
  }),
  indices: (t, e, n = false) => {
    S2.checkLen(t, e);
    const { FULL_MASK: r, BITS: s } = S2, i = s - e % s, o = i ? r >>> i << i : r, a = [];
    for (let l = 0; l < t.length; l++) {
      let c2 = t[l];
      if (n && (c2 = ~c2), l === t.length - 1 && (c2 &= o), c2 !== 0)
        for (let d = 0; d < s; d++) {
          const h2 = 1 << s - d - 1;
          c2 & h2 && a.push(l * s + d);
        }
    }
    return a;
  },
  range: (t) => {
    const e = [];
    let n;
    for (const r of t)
      n === void 0 || r !== n.pos + n.length ? e.push(n = { pos: r, length: 1 }) : n.length += 1;
    return e;
  },
  rangeDebug: (t, e, n = false) => `[${S2.range(S2.indices(t, e, n)).map((r) => `(${r.pos}/${r.length})`).join(", ")}]`,
  setRange: (t, e, n, r, s = true) => {
    S2.chunkLen(e, n, r);
    const { FULL_MASK: i, BITS: o } = S2, a = n % o ? Math.floor(n / o) : void 0, l = n + r, c2 = l % o ? Math.floor(l / o) : void 0;
    if (a !== void 0 && a === c2)
      return S2.set(t, a, i >>> o - r << o - r - n, s);
    if (a !== void 0 && !S2.set(t, a, i >>> n % o, s))
      return false;
    const d = a !== void 0 ? a + 1 : n / o, h2 = c2 !== void 0 ? c2 : l / o;
    for (let u2 = d; u2 < h2; u2++)
      if (!S2.set(t, u2, i, s))
        return false;
    return !(c2 !== void 0 && a !== c2 && !S2.set(t, c2, i << o - l % o, s));
  }
};
var Z = {
  /**
   * Internal method for handling stack of paths (debug, errors, dynamic fields via path)
   * This is looks ugly (callback), but allows us to force stack cleaning by construction (.pop always after function).
   * Also, this makes impossible:
   * - pushing field when stack is empty
   * - pushing field inside of field (real bug)
   * NOTE: we don't want to do '.pop' on error!
   */
  pushObj: (t, e, n) => {
    const r = { obj: e };
    t.push(r), n((s, i) => {
      r.field = s, i(), r.field = void 0;
    }), t.pop();
  },
  path: (t) => {
    const e = [];
    for (const n of t)
      n.field !== void 0 && e.push(n.field);
    return e.join("/");
  },
  err: (t, e, n) => {
    const r = new Error(`${t}(${Z.path(e)}): ${typeof n == "string" ? n : n.message}`);
    return n instanceof Error && n.stack && (r.stack = n.stack), r;
  },
  resolve: (t, e) => {
    const n = e.split("/"), r = t.map((o) => o.obj);
    let s = 0;
    for (; s < n.length && n[s] === ".."; s++)
      r.pop();
    let i = r.pop();
    for (; s < n.length; s++) {
      if (!i || i[n[s]] === void 0)
        return;
      i = i[n[s]];
    }
    return i;
  }
};
var ct = class _ct {
  constructor(e, n = {}, r = [], s = void 0, i = 0) {
    this.pos = 0, this.bitBuf = 0, this.bitPos = 0, this.data = e, this.opts = n, this.stack = r, this.parent = s, this.parentOffset = i, this.view = un(e);
  }
  /** Internal method for pointers. */
  _enablePointers() {
    if (this.parent)
      return this.parent._enablePointers();
    this.bs || (this.bs = S2.create(this.data.length), S2.setRange(this.bs, this.data.length, 0, this.pos, this.opts.allowMultipleReads));
  }
  markBytesBS(e, n) {
    return this.parent ? this.parent.markBytesBS(this.parentOffset + e, n) : !n || !this.bs ? true : S2.setRange(this.bs, this.data.length, e, n, false);
  }
  markBytes(e) {
    const n = this.pos;
    this.pos += e;
    const r = this.markBytesBS(n, e);
    if (!this.opts.allowMultipleReads && !r)
      throw this.err(`multiple read pos=${this.pos} len=${e}`);
    return r;
  }
  pushObj(e, n) {
    return Z.pushObj(this.stack, e, n);
  }
  readView(e, n) {
    if (!Number.isFinite(e))
      throw this.err(`readView: wrong length=${e}`);
    if (this.pos + e > this.data.length)
      throw this.err("readView: Unexpected end of buffer");
    const r = n(this.view, this.pos);
    return this.markBytes(e), r;
  }
  // read bytes by absolute offset
  absBytes(e) {
    if (e > this.data.length)
      throw new Error("Unexpected end of buffer");
    return this.data.subarray(e);
  }
  finish() {
    if (!this.opts.allowUnreadBytes) {
      if (this.bitPos)
        throw this.err(`${this.bitPos} bits left after unpack: ${Ne.encode(this.data.slice(this.pos))}`);
      if (this.bs && !this.parent) {
        const e = S2.indices(this.bs, this.data.length, true);
        if (e.length) {
          const n = S2.range(e).map(({ pos: r, length: s }) => `(${r}/${s})[${Ne.encode(this.data.subarray(r, r + s))}]`).join(", ");
          throw this.err(`unread byte ranges: ${n} (total=${this.data.length})`);
        } else
          return;
      }
      if (!this.isEnd())
        throw this.err(`${this.leftBytes} bytes ${this.bitPos} bits left after unpack: ${Ne.encode(this.data.slice(this.pos))}`);
    }
  }
  // User methods
  err(e) {
    return Z.err("Reader", this.stack, e);
  }
  offsetReader(e) {
    if (e > this.data.length)
      throw this.err("offsetReader: Unexpected end of buffer");
    return new _ct(this.absBytes(e), this.opts, this.stack, this, e);
  }
  bytes(e, n = false) {
    if (this.bitPos)
      throw this.err("readBytes: bitPos not empty");
    if (!Number.isFinite(e))
      throw this.err(`readBytes: wrong length=${e}`);
    if (this.pos + e > this.data.length)
      throw this.err("readBytes: Unexpected end of buffer");
    const r = this.data.subarray(this.pos, this.pos + e);
    return n || this.markBytes(e), r;
  }
  byte(e = false) {
    if (this.bitPos)
      throw this.err("readByte: bitPos not empty");
    if (this.pos + 1 > this.data.length)
      throw this.err("readBytes: Unexpected end of buffer");
    const n = this.data[this.pos];
    return e || this.markBytes(1), n;
  }
  get leftBytes() {
    return this.data.length - this.pos;
  }
  get totalBytes() {
    return this.data.length;
  }
  isEnd() {
    return this.pos >= this.data.length && !this.bitPos;
  }
  // bits are read in BE mode (left to right): (0b1000_0000).readBits(1) == 1
  bits(e) {
    if (e > 32)
      throw this.err("BitReader: cannot read more than 32 bits in single call");
    let n = 0;
    for (; e; ) {
      this.bitPos || (this.bitBuf = this.byte(), this.bitPos = 8);
      const r = Math.min(e, this.bitPos);
      this.bitPos -= r, n = n << r | this.bitBuf >> this.bitPos & 2 ** r - 1, this.bitBuf &= 2 ** this.bitPos - 1, e -= r;
    }
    return n >>> 0;
  }
  find(e, n = this.pos) {
    if (!j2(e))
      throw this.err(`find: needle is not bytes! ${e}`);
    if (this.bitPos)
      throw this.err("findByte: bitPos not empty");
    if (!e.length)
      throw this.err("find: needle is empty");
    for (let r = n; (r = this.data.indexOf(e[0], r)) !== -1; r++) {
      if (r === -1 || this.data.length - r < e.length)
        return;
      if (Ze(e, this.data.subarray(r, r + e.length)))
        return r;
    }
  }
};
var ws = class {
  constructor(e = []) {
    this.pos = 0, this.buffers = [], this.ptrs = [], this.bitBuf = 0, this.bitPos = 0, this.viewBuf = new Uint8Array(8), this.finished = false, this.stack = e, this.view = un(this.viewBuf);
  }
  pushObj(e, n) {
    return Z.pushObj(this.stack, e, n);
  }
  writeView(e, n) {
    if (this.finished)
      throw this.err("buffer: finished");
    if (!M2(e) || e > 8)
      throw new Error(`wrong writeView length=${e}`);
    n(this.view), this.bytes(this.viewBuf.slice(0, e)), this.viewBuf.fill(0);
  }
  // User methods
  err(e) {
    if (this.finished)
      throw this.err("buffer: finished");
    return Z.err("Reader", this.stack, e);
  }
  bytes(e) {
    if (this.finished)
      throw this.err("buffer: finished");
    if (this.bitPos)
      throw this.err("writeBytes: ends with non-empty bit buffer");
    this.buffers.push(e), this.pos += e.length;
  }
  byte(e) {
    if (this.finished)
      throw this.err("buffer: finished");
    if (this.bitPos)
      throw this.err("writeByte: ends with non-empty bit buffer");
    this.buffers.push(new Uint8Array([e])), this.pos++;
  }
  finish(e = true) {
    if (this.finished)
      throw this.err("buffer: finished");
    if (this.bitPos)
      throw this.err("buffer: ends with non-empty bit buffer");
    const n = this.buffers.concat(this.ptrs.map((i) => i.buffer)), r = n.map((i) => i.length).reduce((i, o) => i + o, 0), s = new Uint8Array(r);
    for (let i = 0, o = 0; i < n.length; i++) {
      const a = n[i];
      s.set(a, o), o += a.length;
    }
    for (let i = this.pos, o = 0; o < this.ptrs.length; o++) {
      const a = this.ptrs[o];
      s.set(a.ptr.encode(i), a.pos), i += a.buffer.length;
    }
    if (e) {
      this.buffers = [];
      for (const i of this.ptrs)
        i.buffer.fill(0);
      this.ptrs = [], this.finished = true, this.bitBuf = 0;
    }
    return s;
  }
  bits(e, n) {
    if (n > 32)
      throw this.err("writeBits: cannot write more than 32 bits in single call");
    if (e >= 2 ** n)
      throw this.err(`writeBits: value (${e}) >= 2**bits (${n})`);
    for (; n; ) {
      const r = Math.min(n, 8 - this.bitPos);
      this.bitBuf = this.bitBuf << r | e >> n - r, this.bitPos += r, n -= r, e &= 2 ** n - 1, this.bitPos === 8 && (this.bitPos = 0, this.buffers.push(new Uint8Array([this.bitBuf])), this.pos++);
    }
  }
};
var Ke = (t) => Uint8Array.from(t).reverse();
function gs(t, e, n) {
  if (n) {
    const r = 2n ** (e - 1n);
    if (t < -r || t >= r)
      throw new Error(`value out of signed bounds. Expected ${-r} <= ${t} < ${r}`);
  } else if (0n > t || t >= 2n ** e)
    throw new Error(`value out of unsigned bounds. Expected 0 <= ${t} < ${2n ** e}`);
}
function pn(t) {
  return {
    // NOTE: we cannot export validate here, since it is likely mistake.
    encodeStream: t.encodeStream,
    decodeStream: t.decodeStream,
    size: t.size,
    encode: (e) => {
      const n = new ws();
      return t.encodeStream(n, e), n.finish();
    },
    decode: (e, n = {}) => {
      const r = new ct(e, n), s = t.decodeStream(r);
      return r.finish(), s;
    }
  };
}
function wn(t, e) {
  if (!U2(t))
    throw new Error(`validate: invalid inner value ${t}`);
  if (typeof e != "function")
    throw new Error("validate: fn should be function");
  return pn({
    size: t.size,
    encodeStream: (n, r) => {
      let s;
      try {
        s = e(r);
      } catch (i) {
        throw n.err(i);
      }
      t.encodeStream(n, s);
    },
    decodeStream: (n) => {
      const r = t.decodeStream(n);
      try {
        return e(r);
      } catch (s) {
        throw n.err(s);
      }
    }
  });
}
var I2 = (t) => {
  const e = pn(t);
  return t.validate ? wn(e, t.validate) : e;
};
var Se = (t) => K2(t) && typeof t.decode == "function" && typeof t.encode == "function";
function U2(t) {
  return K2(t) && Se(t) && typeof t.encodeStream == "function" && typeof t.decodeStream == "function" && (t.size === void 0 || M2(t.size));
}
function ms() {
  return {
    encode: (t) => {
      if (!Array.isArray(t))
        throw new Error("array expected");
      const e = {};
      for (const n of t) {
        if (!Array.isArray(n) || n.length !== 2)
          throw new Error("array of two elements expected");
        const r = n[0], s = n[1];
        if (e[r] !== void 0)
          throw new Error(`key(${r}) appears twice in struct`);
        e[r] = s;
      }
      return e;
    },
    decode: (t) => {
      if (!K2(t))
        throw new Error(`expected plain object, got ${t}`);
      return Object.entries(t);
    }
  };
}
var ys = {
  encode: (t) => {
    if (typeof t != "bigint")
      throw new Error(`expected bigint, got ${typeof t}`);
    if (t > BigInt(Number.MAX_SAFE_INTEGER))
      throw new Error(`element bigger than MAX_SAFE_INTEGER=${t}`);
    return Number(t);
  },
  decode: (t) => {
    if (!M2(t))
      throw new Error("element is not a safe integer");
    return BigInt(t);
  }
};
function Cs(t) {
  if (!K2(t))
    throw new Error("plain object expected");
  return {
    encode: (e) => {
      if (!M2(e) || !(e in t))
        throw new Error(`wrong value ${e}`);
      return t[e];
    },
    decode: (e) => {
      if (typeof e != "string")
        throw new Error(`wrong value ${typeof e}`);
      return t[e];
    }
  };
}
function bs(t, e = false) {
  if (!M2(t))
    throw new Error(`decimal/precision: wrong value ${t}`);
  if (typeof e != "boolean")
    throw new Error(`decimal/round: expected boolean, got ${typeof e}`);
  const n = 10n ** BigInt(t);
  return {
    encode: (r) => {
      if (typeof r != "bigint")
        throw new Error(`expected bigint, got ${typeof r}`);
      let s = (r < 0n ? -r : r).toString(10), i = s.length - t;
      i < 0 && (s = s.padStart(s.length - i, "0"), i = 0);
      let o = s.length - 1;
      for (; o >= i && s[o] === "0"; o--)
        ;
      let a = s.slice(0, i), l = s.slice(i, o + 1);
      return a || (a = "0"), r < 0n && (a = "-" + a), l ? `${a}.${l}` : a;
    },
    decode: (r) => {
      if (typeof r != "string")
        throw new Error(`expected string, got ${typeof r}`);
      if (r === "-0")
        throw new Error("negative zero is not allowed");
      let s = false;
      if (r.startsWith("-") && (s = true, r = r.slice(1)), !/^(0|[1-9]\d*)(\.\d+)?$/.test(r))
        throw new Error(`wrong string value=${r}`);
      let i = r.indexOf(".");
      i = i === -1 ? r.length : i;
      const o = r.slice(0, i), a = r.slice(i + 1).replace(/0+$/, ""), l = BigInt(o) * n;
      if (!e && a.length > t)
        throw new Error(`fractional part cannot be represented with this precision (num=${r}, prec=${t})`);
      const c2 = Math.min(a.length, t), d = BigInt(a.slice(0, c2)) * 10n ** BigInt(t - c2), h2 = l + d;
      return s ? -h2 : h2;
    }
  };
}
function ks(t) {
  if (!Array.isArray(t))
    throw new Error(`expected array, got ${typeof t}`);
  for (const e of t)
    if (!Se(e))
      throw new Error(`wrong base coder ${e}`);
  return {
    encode: (e) => {
      for (const n of t) {
        const r = n.encode(e);
        if (r !== void 0)
          return r;
      }
      throw new Error(`match/encode: cannot find match in ${e}`);
    },
    decode: (e) => {
      for (const n of t) {
        const r = n.decode(e);
        if (r !== void 0)
          return r;
      }
      throw new Error(`match/decode: cannot find match in ${e}`);
    }
  };
}
var xs = (t) => {
  if (!Se(t))
    throw new Error("BaseCoder expected");
  return { encode: t.decode, decode: t.encode };
};
var ne2 = { dict: ms, numberBigint: ys, tsEnum: Cs, decimal: bs, match: ks, reverse: xs };
var vs = (t, e = false, n = false, r = true) => {
  if (!M2(t))
    throw new Error(`bigint/size: wrong value ${t}`);
  if (typeof e != "boolean")
    throw new Error(`bigint/le: expected boolean, got ${typeof e}`);
  if (typeof n != "boolean")
    throw new Error(`bigint/signed: expected boolean, got ${typeof n}`);
  if (typeof r != "boolean")
    throw new Error(`bigint/sized: expected boolean, got ${typeof r}`);
  const s = BigInt(t), i = 2n ** (8n * s - 1n);
  return I2({
    size: r ? t : void 0,
    encodeStream: (o, a) => {
      n && a < 0 && (a = a | i);
      const l = [];
      for (let d = 0; d < t; d++)
        l.push(Number(a & 255n)), a >>= 8n;
      let c2 = new Uint8Array(l).reverse();
      if (!r) {
        let d = 0;
        for (d = 0; d < c2.length && c2[d] === 0; d++)
          ;
        c2 = c2.subarray(d);
      }
      o.bytes(e ? c2.reverse() : c2);
    },
    decodeStream: (o) => {
      const a = o.bytes(r ? t : Math.min(t, o.leftBytes)), l = e ? a : Ke(a);
      let c2 = 0n;
      for (let d = 0; d < l.length; d++)
        c2 |= BigInt(l[d]) << 8n * BigInt(d);
      return n && c2 & i && (c2 = (c2 ^ i) - i), c2;
    },
    validate: (o) => {
      if (typeof o != "bigint")
        throw new Error(`bigint: invalid value: ${o}`);
      return gs(o, 8n * s, !!n), o;
    }
  });
};
var v2 = /* @__PURE__ */ vs(8, true);
var Es = (t, e) => I2({
  size: t,
  encodeStream: (n, r) => n.writeView(t, (s) => e.write(s, r)),
  decodeStream: (n) => n.readView(t, e.read),
  validate: (n) => {
    if (typeof n != "number")
      throw new Error(`viewCoder: expected number, got ${typeof n}`);
    return e.validate && e.validate(n), n;
  }
});
var gn = (t, e, n) => {
  const r = t * 8, s = 2 ** (r - 1), i = (l) => {
    if (!M2(l))
      throw new Error(`sintView: value is not safe integer: ${l}`);
    if (l < -s || l >= s)
      throw new Error(`sintView: value out of bounds. Expected ${-s} <= ${l} < ${s}`);
  }, o = 2 ** r, a = (l) => {
    if (!M2(l))
      throw new Error(`uintView: value is not safe integer: ${l}`);
    if (0 > l || l >= o)
      throw new Error(`uintView: value out of bounds. Expected 0 <= ${l} < ${o}`);
  };
  return Es(t, {
    write: n.write,
    read: n.read,
    validate: e ? i : a
  });
};
var ve = /* @__PURE__ */ gn(4, false, {
  read: (t, e) => t.getUint32(e, true),
  write: (t, e) => t.setUint32(0, e, true)
});
var N2 = /* @__PURE__ */ gn(1, false, {
  read: (t, e) => t.getUint8(e),
  write: (t, e) => t.setUint8(0, e)
});
var Xe = /* @__PURE__ */ I2({
  size: 1,
  encodeStream: (t, e) => t.byte(e ? 1 : 0),
  decodeStream: (t) => {
    const e = t.byte();
    if (e !== 0 && e !== 1)
      throw t.err(`bool: invalid value ${e}`);
    return e === 1;
  },
  validate: (t) => {
    if (typeof t != "boolean")
      throw new Error(`bool: invalid value ${t}`);
    return t;
  }
});
var $e = (t, e = false) => {
  if (typeof e != "boolean")
    throw new Error(`bytes/le: expected boolean, got ${typeof e}`);
  const n = fn(t), r = j2(t);
  return I2({
    size: typeof t == "number" ? t : void 0,
    encodeStream: (s, i) => {
      r || n.encodeStream(s, i.length), s.bytes(e ? Ke(i) : i), r && s.bytes(t);
    },
    decodeStream: (s) => {
      let i;
      if (r) {
        const o = s.find(t);
        if (!o)
          throw s.err("bytes: cannot find terminator");
        i = s.bytes(o - s.pos), s.bytes(t.length);
      } else
        i = s.bytes(t === null ? s.leftBytes : n.decodeStream(s));
      return e ? Ke(i) : i;
    },
    validate: (s) => {
      if (!j2(s))
        throw new Error(`bytes: invalid value ${s}`);
      return s;
    }
  });
};
var As = (t, e = false) => wn(Ss($e(t, e), us), (n) => {
  if (typeof n != "string")
    throw new Error(`expected string, got ${typeof n}`);
  return n;
});
function Ss(t, e) {
  if (!U2(t))
    throw new Error(`apply: invalid inner value ${t}`);
  if (!Se(e))
    throw new Error(`apply: invalid base value ${t}`);
  return I2({
    size: t.size,
    encodeStream: (n, r) => {
      let s;
      try {
        s = e.decode(r);
      } catch (i) {
        throw n.err("" + i);
      }
      return t.encodeStream(n, s);
    },
    decodeStream: (n) => {
      const r = t.decodeStream(n);
      try {
        return e.encode(r);
      } catch (s) {
        throw n.err("" + s);
      }
    }
  });
}
function se2(t, e, n) {
  if (!U2(t) || !U2(e))
    throw new Error(`optional: invalid flag or inner value flag=${t} inner=${e}`);
  return I2({
    size: n !== void 0 && t.size && e.size ? t.size + e.size : void 0,
    encodeStream: (r, s) => {
      t.encodeStream(r, !!s), s ? e.encodeStream(r, s) : n !== void 0 && e.encodeStream(r, n);
    },
    decodeStream: (r) => {
      if (t.decodeStream(r))
        return e.decodeStream(r);
      n !== void 0 && e.decodeStream(r);
    }
  });
}
function $s(t) {
  return I2({
    encodeStream: (e, n) => {
      if (n !== t)
        throw new Error(`constant: invalid value ${n} (exp: ${t})`);
    },
    decodeStream: (e) => t
  });
}
function Ls(t) {
  let e = 0;
  for (const n of t) {
    if (n.size === void 0)
      return;
    if (!M2(n.size))
      throw new Error(`sizeof: wrong element size=${e}`);
    e += n.size;
  }
  return e;
}
function p2(t) {
  if (!K2(t))
    throw new Error(`struct: expected plain object, got ${t}`);
  for (const e in t)
    if (!U2(t[e]))
      throw new Error(`struct: field ${e} is not CoderType`);
  return I2({
    size: Ls(Object.values(t)),
    encodeStream: (e, n) => {
      e.pushObj(n, (r) => {
        for (const s in t)
          r(s, () => t[s].encodeStream(e, n[s]));
      });
    },
    decodeStream: (e) => {
      const n = {};
      return e.pushObj(n, (r) => {
        for (const s in t)
          r(s, () => n[s] = t[s].decodeStream(e));
      }), n;
    },
    validate: (e) => {
      if (typeof e != "object" || e === null)
        throw new Error(`struct: invalid value ${e}`);
      return e;
    }
  });
}
function we(t, e) {
  if (!U2(e))
    throw new Error(`array: invalid inner value ${e}`);
  const n = fn(typeof t == "string" ? `../${t}` : t);
  return I2({
    size: typeof t == "number" && e.size ? t * e.size : void 0,
    encodeStream: (r, s) => {
      const i = r;
      i.pushObj(s, (o) => {
        j2(t) || n.encodeStream(r, s.length);
        for (let a = 0; a < s.length; a++)
          o(`${a}`, () => {
            const l = s[a], c2 = r.pos;
            if (e.encodeStream(r, l), j2(t)) {
              if (t.length > i.pos - c2)
                return;
              const d = i.finish(false).subarray(c2, i.pos);
              if (Ze(d.subarray(0, t.length), t))
                throw i.err(`array: inner element encoding same as separator. elm=${l} data=${d}`);
            }
          });
      }), j2(t) && r.bytes(t);
    },
    decodeStream: (r) => {
      const s = [];
      return r.pushObj(s, (i) => {
        if (t === null)
          for (let o = 0; !r.isEnd() && (i(`${o}`, () => s.push(e.decodeStream(r))), !(e.size && r.leftBytes < e.size)); o++)
            ;
        else if (j2(t))
          for (let o = 0; ; o++) {
            if (Ze(r.bytes(t.length, true), t)) {
              r.bytes(t.length);
              break;
            }
            i(`${o}`, () => s.push(e.decodeStream(r)));
          }
        else {
          let o;
          i("arrayLen", () => o = n.decodeStream(r));
          for (let a = 0; a < o; a++)
            i(`${a}`, () => s.push(e.decodeStream(r)));
        }
      }), s;
    },
    validate: (r) => {
      if (!Array.isArray(r))
        throw new Error(`array: invalid value ${r}`);
      return r;
    }
  });
}
function lt(t, e) {
  if (!U2(t))
    throw new Error(`map: invalid inner value ${t}`);
  if (!K2(e))
    throw new Error("map: variants should be plain object");
  const n = /* @__PURE__ */ new Map();
  for (const r in e)
    n.set(e[r], r);
  return I2({
    size: t.size,
    encodeStream: (r, s) => t.encodeStream(r, e[s]),
    decodeStream: (r) => {
      const s = t.decodeStream(r), i = n.get(s);
      if (i === void 0)
        throw r.err(`Enum: unknown value: ${s} ${Array.from(n.keys())}`);
      return i;
    },
    validate: (r) => {
      if (typeof r != "string")
        throw new Error(`map: invalid value ${r}`);
      if (!(r in e))
        throw new Error(`Map: unknown variant: ${r}`);
      return r;
    }
  });
}
function _s(t, e) {
  if (!U2(t))
    throw new Error(`tag: invalid tag value ${t}`);
  if (!K2(e))
    throw new Error("tag: variants should be plain object");
  for (const n in e)
    if (!U2(e[n]))
      throw new Error(`tag: variant ${n} is not CoderType`);
  return I2({
    size: t.size,
    encodeStream: (n, r) => {
      const { TAG: s, data: i } = r, o = e[s];
      t.encodeStream(n, s), o.encodeStream(n, i);
    },
    decodeStream: (n) => {
      const r = t.decodeStream(n), s = e[r];
      if (!s)
        throw n.err(`Tag: invalid tag ${r}`);
      return { TAG: r, data: s.decodeStream(n) };
    },
    validate: (n) => {
      const { TAG: r } = n;
      if (!e[r])
        throw new Error(`Tag: invalid tag ${r.toString()}`);
      return n;
    }
  });
}
var Ps = (t) => 0;
function Be(t, e) {
  return e % t === 0 ? 0 : t - e % t;
}
function mn(t, e, n) {
  if (!U2(e))
    throw new Error(`padRight: invalid inner value ${e}`);
  if (!M2(t) || t <= 0)
    throw new Error(`padLeft: wrong blockSize=${t}`);
  if (n !== void 0 && typeof n != "function")
    throw new Error(`padRight: wrong padFn=${typeof n}`);
  const r = n || Ps;
  return I2({
    size: e.size ? e.size + Be(t, e.size) : void 0,
    encodeStream: (s, i) => {
      const o = s, a = o.pos;
      e.encodeStream(s, i);
      const l = Be(t, o.pos - a);
      for (let c2 = 0; c2 < l; c2++)
        s.byte(r(c2));
    },
    decodeStream: (s) => {
      const i = s.pos, o = e.decodeStream(s);
      return s.bytes(Be(t, s.pos - i)), o;
    }
  });
}
var Is = 9;
var Ue = ne2.decimal(Is);
var re2 = I2({
  encodeStream: (t, e) => {
    if (!e)
      return t.byte(0);
    for (; e; e >>= 7)
      t.bits(e > 127 ? 1 : 0, 1), t.bits(e & 127, 7);
  },
  decodeStream: (t) => {
    let e = 0;
    for (let n = 0; !t.isEnd(); n++) {
      const r = !t.bits(1);
      if (e |= t.bits(7) << n * 7, r)
        break;
    }
    return e;
  }
});
var pe = As(mn(8, ve, void 0));
var Ts = () => {
  const t = $e(32);
  return I2({
    size: t.size,
    encodeStream: (e, n) => t.encodeStream(e, De.decode(n)),
    decodeStream: (e) => De.encode(t.decodeStream(e))
  });
};
var y2 = Ts();
var Ns = p2({
  requiredSignatures: N2,
  readSigned: N2,
  readUnsigned: N2,
  keys: we(re2, y2),
  blockhash: y2,
  instructions: we(re2, p2({ programIdx: N2, keys: we(re2, N2), data: $e(re2) }))
});
function Bs(t) {
  if (De.decode(t).length !== 32)
    throw new Error("Invalid Solana address");
}
var Us = (t, e, n, r, s) => ({
  sign: t < e,
  write: t < e - n || t >= e && t < s - r
});
var _t = p2({
  signatures: we(re2, $e(64)),
  msg: Ns
});
var Ge = I2({
  encodeStream: (t, e) => {
    const { msg: n, signatures: r } = e, s = {}, i = (h2, u2, f2) => {
      let w2 = s[h2] || (s[h2] = { sign: false, write: false });
      w2.write || (w2.write = f2), w2.sign || (w2.sign = u2);
    };
    i(n.feePayer, true, true);
    for (let h2 of n.instructions)
      for (let u2 of h2.keys)
        i(u2.address, u2.sign, u2.write);
    for (let h2 of n.instructions)
      i(h2.program, false, false);
    const o = Object.keys(s), a = [
      n.feePayer,
      ...o.filter((h2) => s[h2].sign && s[h2].write && h2 !== n.feePayer),
      ...o.filter((h2) => s[h2].sign && !s[h2].write),
      ...o.filter((h2) => !s[h2].sign && s[h2].write),
      ...o.filter((h2) => !s[h2].sign && !s[h2].write)
    ];
    let l = 0, c2 = 0, d = 0;
    for (let h2 of a)
      s[h2].sign && l++, !s[h2].write && (s[h2].sign ? c2++ : d++);
    _t.encodeStream(t, {
      signatures: a.filter((h2) => s[h2].sign).map((h2) => r[h2] || new Uint8Array(64)),
      msg: {
        requiredSignatures: l,
        readSigned: c2,
        readUnsigned: d,
        keys: a,
        // indexOf potentially can be slow, but for most tx there will be ~3-5 keys, so doesn't matter much
        instructions: n.instructions.map((h2) => ({
          programIdx: a.indexOf(h2.program),
          keys: h2.keys.map((u2) => a.indexOf(u2.address)),
          data: h2.data
        })),
        blockhash: n.blockhash
      }
    });
  },
  decodeStream: (t) => {
    const { signatures: e, msg: n } = _t.decodeStream(t);
    if (e.length !== n.requiredSignatures)
      throw new Error("SOL.tx: wrong signatures length");
    if (n.keys.length < e.length)
      throw new Error("SOL.tx: invalid keys length");
    const r = {};
    for (let i = 0; i < e.length; i++)
      r[n.keys[i]] = e[i];
    let s = [];
    for (let i = 0; i < n.keys.length; i++)
      s.push({
        address: n.keys[i],
        ...Us(i, n.requiredSignatures, n.readSigned, n.readUnsigned, n.keys.length)
      });
    if (!s.length)
      throw new Error("SOL.tx: empty accounts array");
    return {
      msg: {
        feePayer: s[0].address,
        blockhash: n.blockhash,
        instructions: n.instructions.map((i) => ({
          program: s[i.programIdx].address,
          keys: i.keys.map((o) => s[o]),
          data: i.data
        }))
      },
      signatures: r
    };
  }
});
var Pt = {};
function dt(t, e, n) {
  if (Pt[t])
    throw new Error("SOL: program for this address already defined");
  const r = lt(e, Object.keys(n).reduce((a, l, c2) => ({ ...a, [l]: c2 }), {})), s = Object.keys(n).reduce((a, l) => ({ ...a, [l]: n[l].coder }), {}), i = _s(r, s);
  Pt[t] = (a, l) => {
    if (a.program !== t)
      throw new Error("SOL.parseInstruction: Wrong instruction program address");
    const { TAG: c2, data: d } = i.decode(a.data), h2 = { type: c2, info: d }, u2 = Object.keys(n[c2].keys);
    if (u2.length !== a.keys.length)
      throw new Error("SOL.parseInstruction: Keys length mismatch");
    for (let f2 = 0; f2 < u2.length; f2++) {
      const w2 = u2[f2];
      if (n[c2].keys[w2].address) {
        if (n[c2].keys[w2].address !== a.keys[f2].address)
          throw new Error(`SOL.parseInstruction(${t}/${c2}): Invalid constant address for key exp=${n[c2].keys[w2].address} got=${a.keys[f2].address}`);
        continue;
      }
      h2.info[u2[f2]] = a.keys[f2].address;
    }
    return n[c2].hint && (h2.hint = n[c2].hint(d, l)), h2;
  };
  const o = {};
  for (const a in n)
    o[a] = (l) => ({
      program: t,
      data: i.encode({ TAG: a, data: l }),
      keys: Object.keys(n[a].keys).map((c2) => {
        let { sign: d, write: h2, address: u2 } = n[a].keys[c2];
        return u2 || (u2 = l[c2]), Bs(u2), { address: u2, sign: d, write: h2 };
      })
    });
  return o;
}
var Me = "SysvarRecentB1ockHashes11111111111111111111";
var V2 = "SysvarRent111111111111111111111111111111111";
var yn = "11111111111111111111111111111111";
var Cn = dt(yn, ve, {
  createAccount: {
    coder: p2({ lamports: v2, space: v2, owner: y2 }),
    keys: {
      source: { sign: true, write: true },
      newAccount: { sign: true, write: true }
    },
    hint: (t) => `Create new account=${t.newAccount} with balance of ${Ue.encode(t.lamports)} and owner program ${t.owner}, using funding account ${t.source}`
  },
  assign: {
    coder: p2({ owner: y2 }),
    keys: { account: { sign: true, write: true } },
    hint: (t) => `Assign account=${t.account} to owner program=${t.owner}`
  },
  transfer: {
    coder: p2({ lamports: v2 }),
    keys: { source: { sign: true, write: true }, destination: { sign: false, write: true } },
    hint: (t) => `Transfer ${Ue.encode(t.lamports)} SOL from ${t.source} to ${t.destination}`
  },
  createAccountWithSeed: {
    coder: p2({
      base: y2,
      seed: pe,
      lamports: v2,
      space: v2,
      owner: y2
    }),
    keys: {
      source: { sign: true, write: true },
      newAccount: { sign: false, write: true },
      base: { sign: true, write: false }
    }
  },
  advanceNonce: {
    coder: p2({}),
    keys: {
      nonceAccount: { sign: false, write: true },
      _recent_bh: { address: Me, sign: false, write: false },
      nonceAuthority: { sign: true, write: false }
    },
    hint: (t) => `Consume nonce in nonce account=${t.nonceAccount} (owner: ${t.nonceAuthority})`
  },
  withdrawFromNonce: {
    coder: p2({ lamports: v2 }),
    keys: {
      nonceAccount: { sign: false, write: true },
      destination: { sign: false, write: true },
      _recent_bh: { address: Me, sign: false, write: false },
      _rent: { address: V2, sign: false, write: false },
      nonceAuthority: { sign: true, write: false }
    },
    hint: (t) => `Withdraw ${Ue.encode(t.lamports)} SOL from nonce account=${t.nonceAccount} (owner: ${t.nonceAuthority}) to ${t.destination}`
  },
  initializeNonce: {
    coder: p2({ nonceAuthority: y2 }),
    keys: {
      nonceAccount: { sign: false, write: true },
      _recent_bh: { address: Me, sign: false, write: false },
      _rent: { address: V2, sign: false, write: false }
    }
  },
  authorizeNonce: {
    coder: p2({ newAuthorized: y2 }),
    keys: {
      nonceAccount: { sign: false, write: true },
      nonceAuthority: { sign: true, write: false }
    },
    hint: (t) => `Change owner of nonce account=${t.nonceAccount} from ${t.nonceAuthority} to ${t.newAuthorized}`
  },
  allocate: {
    coder: p2({ space: v2 }),
    keys: {
      account: { sign: true, write: true }
    }
  },
  allocateWithSeed: {
    coder: p2({
      base: y2,
      seed: pe,
      space: v2,
      owner: y2
    }),
    keys: {
      account: { sign: false, write: true },
      base: { sign: true, write: false }
    }
  },
  assignWithSeed: {
    coder: p2({
      base: y2,
      seed: pe,
      owner: y2
    }),
    keys: {
      account: { sign: false, write: true },
      base: { sign: true, write: false }
    }
  },
  transferWithSeed: {
    coder: p2({
      lamports: v2,
      sourceSeed: pe,
      sourceOwner: y2
    }),
    keys: {
      source: { sign: false, write: true },
      sourceBase: { sign: true, write: false },
      destination: { sign: false, write: true }
    }
  }
});
var bn = (t) => {
};
bn(Cn.transfer);
bn(Cn.advanceNonce);
var Ms = lt(N2, {
  MintTokens: 0,
  FreezeAccount: 1,
  AccountOwner: 2,
  CloseAccount: 3
});
var W2 = (t, e) => e[t]?.symbol || t;
var kn = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
dt(kn, N2, {
  initializeMint: {
    coder: p2({
      decimals: N2,
      mintAuthority: y2,
      freezeAuthority: se2(Xe, y2, "11111111111111111111111111111111")
    }),
    keys: {
      mint: { sign: false, write: true },
      _rent: { address: V2, sign: false, write: false }
    }
  },
  initializeAccount: {
    coder: p2({}),
    keys: {
      account: { sign: false, write: true },
      mint: { sign: false, write: false },
      owner: { sign: false, write: false },
      _rent: { address: V2, sign: false, write: false }
    },
    hint: (t, e) => `Initialize token account=${t.account} with owner=${t.owner} token=${W2(t.mint, e)}`
  },
  // TODO: multisig support?
  initializeMultisig: {
    coder: p2({ m: N2 }),
    keys: {
      account: { sign: false, write: true },
      _rent: { address: V2, sign: false, write: false }
    },
    hint: (t, e) => `Initialize multi-sig token account=${t.account} with signatures=${t.m}`
  },
  transfer: {
    coder: p2({ amount: v2 }),
    keys: {
      source: { sign: false, write: true },
      destination: { sign: false, write: true },
      owner: { sign: true, write: false }
    },
    hint: (t, e) => `Transfer ${t.amount} from token account=${t.source} of owner=${t.owner} to ${t.destination}`
  },
  approve: {
    coder: p2({ amount: v2 }),
    keys: {
      account: { sign: false, write: true },
      delegate: { sign: false, write: false },
      owner: { sign: true, write: false }
    },
    hint: (t, e) => `Approve authority of delegate=${t.delegate} over tokens on account=${t.account} on behalf of owner=${t.owner}`
  },
  revoke: {
    coder: p2({}),
    keys: {
      account: { sign: false, write: true },
      owner: { sign: true, write: false }
    },
    hint: (t, e) => `Revoke delegate's authority over tokens on account=${t.account} on behalf of owner=${t.owner}`
  },
  setAuthority: {
    coder: p2({
      authorityType: Ms,
      newAuthority: se2(Xe, y2, "11111111111111111111111111111111")
    }),
    keys: {
      account: { sign: false, write: true },
      currentAuthority: { sign: true, write: false }
    },
    hint: (t, e) => `Sets a new authority=${t.newAuthority} of a mint or account=${t.account}. Current authority=${t.currentAuthority}. Authority Type: ${t.authorityType}`
  },
  mintTo: {
    coder: p2({ amount: v2 }),
    keys: {
      mint: { sign: false, write: true },
      dest: { sign: false, write: true },
      authority: { sign: true, write: false }
    }
  },
  burn: {
    coder: p2({ amount: v2 }),
    keys: {
      account: { sign: false, write: true },
      mint: { sign: false, write: true },
      owner: { sign: true, write: false }
    },
    hint: (t, e) => `Burn ${t.amount} tokens from account=${t.account} of owner=${t.owner} mint=${t.mint}`
  },
  closeAccount: {
    coder: p2({}),
    keys: {
      account: { sign: false, write: true },
      dest: { sign: false, write: true },
      owner: { sign: true, write: false }
    },
    hint: (t, e) => `Close token account=${t.account} of owner=${t.owner}, transferring all its SOL to destionation account=${t.dest}`
  },
  freezeAccount: {
    coder: p2({}),
    keys: {
      account: { sign: false, write: true },
      mint: { sign: false, write: true },
      authority: { sign: true, write: false }
    },
    hint: (t, e) => `Freeze token account=${t.account} of mint=${t.mint} using freeze_authority=${t.authority}`
  },
  thawAccount: {
    coder: p2({}),
    keys: {
      account: { sign: false, write: true },
      mint: { sign: false, write: false },
      authority: { sign: true, write: false }
    },
    hint: (t, e) => `Thaw a frozne token account=${t.account} of mint=${t.mint} using freeze_authority=${t.authority}`
  },
  transferChecked: {
    coder: p2({ amount: v2, decimals: N2 }),
    keys: {
      source: { sign: false, write: true },
      mint: { sign: false, write: false },
      destination: { sign: false, write: true },
      owner: { sign: true, write: false }
    },
    hint: (t, e) => `Transfer ${ne2.decimal(t.decimals).encode(t.amount)} ${W2(t.mint, e)} from token account=${t.source} of owner=${t.owner} to ${t.destination}`
  },
  approveChecked: {
    coder: p2({ amount: v2, decimals: N2 }),
    keys: {
      source: { sign: false, write: true },
      mint: { sign: false, write: false },
      delegate: { sign: false, write: false },
      owner: { sign: true, write: false }
    },
    hint: (t, e) => `Approve delgate=${t.delegate} authority on behalf account=${t.source} owner=${t.owner} over ${ne2.decimal(t.decimals).encode(t.amount)} ${W2(t.mint, e)}`
  },
  mintToChecked: {
    coder: p2({ amount: v2, decimals: N2 }),
    keys: {
      mint: { sign: false, write: true },
      dest: { sign: false, write: true },
      authority: { sign: true, write: false }
    },
    hint: (t, e) => `Mint new tokens (${ne2.decimal(t.decimals).encode(t.amount)} ${W2(t.mint, e)}) to account=${t.dest} using authority=${t.authority}`
  },
  burnChecked: {
    coder: p2({ amount: v2, decimals: N2 }),
    keys: {
      mint: { sign: false, write: true },
      account: { sign: false, write: true },
      owner: { sign: true, write: false }
    },
    hint: (t, e) => `Burn tokens (${ne2.decimal(t.decimals).encode(t.amount)} ${W2(t.mint, e)}) on account=${t.account} of owner=${t.owner}`
  },
  initializeAccount2: {
    coder: p2({ owner: y2 }),
    keys: {
      account: { sign: false, write: true },
      mint: { sign: false, write: false },
      _rent: { address: V2, sign: false, write: false }
    },
    hint: (t, e) => `Initialize token account=${t.account} with owner=${t.owner} token=${W2(t.mint, e)}`
  },
  syncNative: {
    coder: p2({}),
    keys: { nativeAccount: { sign: false, write: true } },
    hint: (t) => `Sync SOL balance for wrapped account ${t.nativeAccount}`
  }
});
p2({
  version: ve,
  state: ve,
  authority: y2,
  nonce: y2,
  lamportPerSignature: v2
});
var Rs = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
dt(Rs, $s(0), {
  create: {
    coder: p2({}),
    keys: {
      source: { sign: true, write: true },
      account: { sign: false, write: true },
      wallet: { sign: false, write: false },
      mint: { sign: false, write: false },
      _sys: { address: yn, sign: false, write: false },
      _token: { address: kn, sign: false, write: false },
      _rent: { address: V2, sign: false, write: false }
    },
    hint: (t, e) => `Initialize associated token account=${t.account} with owner=${t.wallet} for token=${W2(t.mint, e)}, payed by ${t.source}`
  }
});
var Re = mn(4, Xe, () => 0);
p2({
  mint: y2,
  owner: y2,
  amount: v2,
  delegate: se2(Re, y2, "11111111111111111111111111111111"),
  state: lt(N2, {
    uninitialized: 0,
    initialized: 1,
    frozen: 2
  }),
  isNative: se2(Re, v2, 0n),
  delegateAmount: v2,
  closeAuthority: se2(Re, y2, "11111111111111111111111111111111")
});
function It(t, e, n) {
  if (!e.length)
    throw new Error("SOLPublic: empty instructions array");
  return ds.encode(Ge.encode({
    msg: { feePayer: t, blockhash: n, instructions: e },
    signatures: {}
  }));
}
function Os(t) {
  if (t.length >= 255)
    throw new TypeError("Alphabet too long");
  const e = new Uint8Array(256);
  for (let c2 = 0; c2 < e.length; c2++)
    e[c2] = 255;
  for (let c2 = 0; c2 < t.length; c2++) {
    const d = t.charAt(c2), h2 = d.charCodeAt(0);
    if (e[h2] !== 255)
      throw new TypeError(d + " is ambiguous");
    e[h2] = c2;
  }
  const n = t.length, r = t.charAt(0), s = Math.log(n) / Math.log(256), i = Math.log(256) / Math.log(n);
  function o(c2) {
    if (c2 instanceof Uint8Array || (ArrayBuffer.isView(c2) ? c2 = new Uint8Array(c2.buffer, c2.byteOffset, c2.byteLength) : Array.isArray(c2) && (c2 = Uint8Array.from(c2))), !(c2 instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (c2.length === 0)
      return "";
    let d = 0, h2 = 0, u2 = 0;
    const f2 = c2.length;
    for (; u2 !== f2 && c2[u2] === 0; )
      u2++, d++;
    const w2 = (f2 - u2) * i + 1 >>> 0, C2 = new Uint8Array(w2);
    for (; u2 !== f2; ) {
      let b2 = c2[u2], g2 = 0;
      for (let $2 = w2 - 1; (b2 !== 0 || g2 < h2) && $2 !== -1; $2--, g2++)
        b2 += 256 * C2[$2] >>> 0, C2[$2] = b2 % n >>> 0, b2 = b2 / n >>> 0;
      if (b2 !== 0)
        throw new Error("Non-zero carry");
      h2 = g2, u2++;
    }
    let m2 = w2 - h2;
    for (; m2 !== w2 && C2[m2] === 0; )
      m2++;
    let T2 = r.repeat(d);
    for (; m2 < w2; ++m2)
      T2 += t.charAt(C2[m2]);
    return T2;
  }
  function a(c2) {
    if (typeof c2 != "string")
      throw new TypeError("Expected String");
    if (c2.length === 0)
      return new Uint8Array();
    let d = 0, h2 = 0, u2 = 0;
    for (; c2[d] === r; )
      h2++, d++;
    const f2 = (c2.length - d) * s + 1 >>> 0, w2 = new Uint8Array(f2);
    for (; d < c2.length; ) {
      const b2 = c2.charCodeAt(d);
      if (b2 > 255)
        return;
      let g2 = e[b2];
      if (g2 === 255)
        return;
      let $2 = 0;
      for (let _2 = f2 - 1; (g2 !== 0 || $2 < u2) && _2 !== -1; _2--, $2++)
        g2 += n * w2[_2] >>> 0, w2[_2] = g2 % 256 >>> 0, g2 = g2 / 256 >>> 0;
      if (g2 !== 0)
        throw new Error("Non-zero carry");
      u2 = $2, d++;
    }
    let C2 = f2 - u2;
    for (; C2 !== f2 && w2[C2] === 0; )
      C2++;
    const m2 = new Uint8Array(h2 + (f2 - C2));
    let T2 = h2;
    for (; C2 !== f2; )
      m2[T2++] = w2[C2++];
    return m2;
  }
  function l(c2) {
    const d = a(c2);
    if (d)
      return d;
    throw new Error("Non-base" + n + " character");
  }
  return {
    encode: o,
    decodeUnsafe: a,
    decode: l
  };
}
var Fs = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
Os(Fs);
var ht = class _ht {
  constructor() {
    __publicField(this, "_transaction");
    __publicField(this, "signatures", []);
    __publicField(this, "feePayer");
    __publicField(this, "recentBlockhash");
    __publicField(this, "_instructions");
    this._instructions = [];
  }
  add(...e) {
    return this._instructions.push(...e), this;
  }
  static from(e) {
    const n = e instanceof Uint8Array ? e : new Uint8Array(e), r = Ge.decode(n), s = new _ht();
    return s._transaction = r, s;
  }
  serialize(e) {
    if (this._transaction)
      return Buffer.from(Ge.encode(this._transaction));
    if (!this.feePayer || !this.recentBlockhash)
      throw new Error("Transaction requires feePayer and recentBlockhash");
    const n = It(
      this.feePayer.toString(),
      this._instructions,
      this.recentBlockhash
    );
    return Buffer.from(n, "hex");
  }
  serializeMessage() {
    if (!this.feePayer || !this.recentBlockhash)
      throw new Error("Transaction requires feePayer and recentBlockhash");
    const e = It(
      this.feePayer.toString(),
      this._instructions,
      this.recentBlockhash
    );
    return Buffer.from(e, "hex");
  }
};
var zs = class {
  constructor() {
    __publicField(this, "type", "phantom");
    __publicField(this, "platform", "solana");
    __publicField(this, "account");
    __publicField(this, "connectedAccounts", []);
  }
  getProvider() {
    if (typeof window > "u")
      throw new Error("Not ready");
    const e = window.solana;
    if (!e?.isPhantom)
      throw new Error("Phantom is not available");
    return e;
  }
  isAvailable() {
    return typeof window < "u" && !!window.solana?.isPhantom;
  }
  getInfo() {
    const e = this.isAvailable();
    return {
      type: this.type,
      available: e,
      version: "Unknown",
      name: "Phantom",
      platform: this.platform
    };
  }
  async connect() {
    if (this.account)
      return { success: true, wallet: this.type, account: this.account };
    try {
      if (!this.isAvailable())
        throw new Error("Phantom is not available");
      const e = await this.getProvider().connect();
      if (e.publicKey)
        return this.account = e.publicKey.toString(), { success: true, wallet: this.type, account: this.account };
      throw new Error("No accounts found");
    } catch (e) {
      return console.error("Error connecting to Phantom:", e), {
        success: false,
        wallet: this.type,
        error: e.message || "Unknown error"
      };
    }
  }
  getConnectedAccounts() {
    return this.connectedAccounts;
  }
  async signMessage(e) {
    try {
      if (!this.isAvailable() || !this.account)
        throw new Error("Phantom is not connected");
      const n = new TextEncoder().encode(e), r = await this.getProvider().signMessage(
        n,
        "utf8"
      );
      return { success: true, wallet: this.type, result: r };
    } catch (n) {
      return console.error("Error signing message with Phantom:", n), {
        success: false,
        wallet: this.type,
        error: n.message || "Unknown error"
      };
    }
  }
  async sendTransaction(e) {
    if (!this.isAvailable() || !this.account)
      throw new Error("Phantom is not connected");
    try {
      const n = ht.from(e), s = await this.getProvider().signAndSendTransaction(n);
      return {
        success: true,
        wallet: this.type,
        result: s
      };
    } catch (n) {
      return console.error("Error sending transaction with Phantom:", n), {
        success: false,
        wallet: this.type,
        error: n.message || "Unknown error"
      };
    }
  }
  async switchChain(e) {
    return console.warn("Chain switching not supported for Phantom"), false;
  }
  async getBalance(e) {
    try {
      if (!this.isAvailable() || !this.account)
        throw new Error("Phantom is not connected");
      return {
        success: true,
        wallet: this.type,
        result: "Implement based on Phantom API"
      };
    } catch (n) {
      return console.error("Error getting balance from Phantom:", n), {
        success: false,
        wallet: this.type,
        error: n.message || "Unknown error"
      };
    }
  }
  async waitForTransaction(e, n) {
    return {
      success: false,
      wallet: this.type,
      error: "waitForTransaction not supported for Phantom wallet"
    };
  }
};
var js = class extends Ae {
  constructor() {
    super(...arguments);
    __publicField(this, "type", "phantom-evm");
    __publicField(this, "rdns", "app.phantom");
    __publicField(this, "displayName", "Phantom");
  }
  getFallbackProvider() {
    return window.phantom?.ethereum ?? null;
  }
};
var Hs = class extends Ae {
  constructor() {
    super(...arguments);
    __publicField(this, "type", "rabby");
    __publicField(this, "rdns", "io.rabby");
    __publicField(this, "displayName", "Rabby");
  }
};
var Ws = class {
  constructor() {
    __publicField(this, "type", "braavos");
    __publicField(this, "platform", "starknet");
    __publicField(this, "wallet");
    __publicField(this, "account");
    __publicField(this, "connectedAccounts", []);
    __publicField(this, "accountChangeListener");
  }
  isAvailable() {
    return typeof window < "u" && !!window.starknet_braavos;
  }
  getInfo() {
    const e = this.isAvailable();
    return {
      type: this.type,
      available: e,
      version: e ? window.starknet_braavos?.version || "Unknown" : void 0,
      chainId: e ? window.starknet_braavos?.chainId : void 0,
      name: "Braavos",
      platform: this.platform
    };
  }
  async connect() {
    if (this.account)
      return { success: true, wallet: this.type, account: this.account };
    try {
      if (!this.isAvailable())
        throw new Error("Braavos is not available");
      const e = window.starknet_braavos;
      if (!e)
        throw new Error("No wallet found");
      const n = await e.request({
        type: "wallet_requestAccounts",
        params: { silent_mode: false }
      });
      if (!n || n.length === 0)
        throw new Error("No accounts found");
      return this.removeAccountChangeListener(), this.wallet = e, this.account = n[0], this.connectedAccounts = n, this.setupAccountChangeListener(), { success: true, wallet: this.type, account: this.account };
    } catch (e) {
      return console.error("Error connecting to Braavos:", e), {
        success: false,
        wallet: this.type,
        error: e.message || "Unknown error"
      };
    }
  }
  getConnectedAccounts() {
    return this.connectedAccounts;
  }
  async signTypedData(e) {
    try {
      if (!this.isAvailable() || !this.wallet)
        throw new Error("Braavos is not connected");
      const n = await this.wallet.request({
        type: "wallet_signTypedData",
        params: e
      });
      return { success: true, wallet: this.type, result: n };
    } catch (n) {
      return console.error("Error signing typed data with Braavos:", n), {
        success: false,
        wallet: this.type,
        error: n.message || "Unknown error"
      };
    }
  }
  async sendTransaction(e) {
    if (!this.wallet)
      throw new Error("No wallet found");
    try {
      const n = await this.wallet.request({
        type: "wallet_addInvokeTransaction",
        params: {
          calls: e
        }
      });
      return {
        success: true,
        wallet: this.type,
        result: n
      };
    } catch (n) {
      return console.error("Error sending transaction with Braavos:", n), {
        success: false,
        wallet: this.type,
        error: n.message || "Unknown error"
      };
    }
  }
  async switchChain(e) {
    if (!this.wallet)
      throw new Error("No wallet found");
    return await this.wallet.request({
      type: "wallet_switchStarknetChain",
      params: {
        chainId: e
      }
    });
  }
  async getBalance(e) {
    try {
      if (!this.isAvailable() || !this.wallet)
        throw new Error("Braavos is not connected");
      return {
        success: true,
        wallet: this.type,
        result: "Implement based on Braavos API"
      };
    } catch (n) {
      return console.error("Error getting balance from Braavos:", n), {
        success: false,
        wallet: this.type,
        error: n.message || "Unknown error"
      };
    }
  }
  async waitForTransaction(e, n) {
    return {
      success: false,
      wallet: this.type,
      error: "waitForTransaction not supported for Braavos wallet"
    };
  }
  setupAccountChangeListener() {
    this.wallet && (this.accountChangeListener = (e) => {
      e && e.length > 0 ? (this.account = e[0], this.connectedAccounts = e) : (this.account = void 0, this.connectedAccounts = []);
    }, this.wallet.on("accountsChanged", this.accountChangeListener));
  }
  removeAccountChangeListener() {
    this.wallet && this.accountChangeListener && (this.wallet.off("accountsChanged", this.accountChangeListener), this.accountChangeListener = void 0);
  }
  disconnect() {
    this.removeAccountChangeListener(), this.wallet = void 0, this.account = void 0, this.connectedAccounts = [];
  }
};
var qs = class {
  constructor() {
    __publicField(this, "walletAdapters");
    if (this.walletAdapters = /* @__PURE__ */ new Map(), typeof window > "u")
      return;
    const e = new ss();
    this.walletAdapters.set("metamask", e);
    const n = new zs();
    this.walletAdapters.set("phantom", n);
    const r = new js();
    this.walletAdapters.set("phantom-evm", r);
    const s = new Jr();
    this.walletAdapters.set("argent", s);
    const i = new Ws();
    this.walletAdapters.set("braavos", i);
    const o = new Hs();
    this.walletAdapters.set("rabby", o);
    const a = new rs();
    this.walletAdapters.set("base", a), window.wallet_bridge = this;
  }
  getIFrameMethods() {
    return {
      externalDetectWallets: (e) => () => this.detectWallets(),
      externalConnectWallet: (e) => (n) => this.connectWallet(n),
      externalSignMessage: (e) => (n, r) => this.signMessage(n, r),
      externalSignTypedData: (e) => (n, r) => this.signTypedData(n, r),
      externalSendTransaction: (e) => (n, r) => this.sendTransaction(n, r),
      externalGetBalance: (e) => (n, r) => this.getBalance(n, r),
      externalSwitchChain: (e) => (n, r) => this.switchChain(n, r),
      externalWaitForTransaction: (e) => (n, r, s) => this.waitForTransaction(n, r, s)
    };
  }
  async detectWallets() {
    return Array.from(this.walletAdapters.values()).map(
      (n) => n.getInfo()
    );
  }
  getWalletAdapterByType(e) {
    const n = this.walletAdapters.get(e);
    if (!n)
      throw new Error(`Unsupported wallet type: ${e}`);
    return n;
  }
  handleError(e, n, r, s) {
    const i = n instanceof Error ? n.message : "Unknown error";
    let o = "unknown";
    if (typeof e == "string") {
      const a = this.getConnectedWalletAdapter(e);
      o = s ?? a?.type ?? e;
    } else
      o = e;
    return console.error(`Error ${r} with ${e} wallet:`, n), {
      success: false,
      wallet: o,
      error: i
    };
  }
  async connectWallet(e) {
    try {
      const r = await this.getWalletAdapterByType(e).connect();
      if (r.success && r.account)
        console.log(
          `Wallet ${e} connected with address ${r.account}`
        );
      else if (r.success && !r.account)
        return console.error(
          `Wallet ${e} connected successfully but did not provide an address.`
        ), {
          ...r,
          success: false,
          error: "Wallet connected but address not found."
        };
      return r;
    } catch (n) {
      return this.handleError(e, n, "connecting to");
    }
  }
  getConnectedWalletAdapter(e) {
    let n, r;
    try {
      r = F2(e);
    } catch {
      if (n = this.walletAdapters.get(e), !n)
        throw new Error(`Wallet ${e} is not connected or supported`);
      return n;
    }
    if (n = this.walletAdapters.values().find((s) => s.getConnectedAccounts().includes(r)), !n)
      throw new Error(`No wallet found with connected address ${e}`);
    return n;
  }
  async signMessage(e, n) {
    let r;
    try {
      if (r = this.getConnectedWalletAdapter(e), !r.signMessage)
        throw new Error(
          `Wallet type ${r.type} (identifier: ${e}) does not support signing messages`
        );
      return await r.signMessage(n, e);
    } catch (s) {
      return this.handleError(
        e,
        s,
        "signing message with",
        r?.type
      );
    }
  }
  async signTypedData(e, n) {
    let r;
    try {
      if (r = this.getConnectedWalletAdapter(e), !r.signTypedData)
        throw new Error(
          `Wallet type ${r.type} (identifier: ${e}) does not support signing typed data`
        );
      return await r.signTypedData(n);
    } catch (s) {
      return this.handleError(
        e,
        s,
        "signing typed data with",
        r?.type
      );
    }
  }
  async sendTransaction(e, n) {
    let r;
    try {
      return r = this.getConnectedWalletAdapter(e), await r.sendTransaction(n);
    } catch (s) {
      return this.handleError(
        e,
        s,
        "sending transaction with",
        r?.type
      );
    }
  }
  async getBalance(e, n) {
    let r;
    try {
      return r = this.getConnectedWalletAdapter(e), await r.getBalance(n);
    } catch (s) {
      return this.handleError(
        e,
        s,
        "getting balance from",
        r?.type
      );
    }
  }
  async switchChain(e, n) {
    try {
      return await this.getConnectedWalletAdapter(e).switchChain(n);
    } catch (r) {
      return console.error(`Error switching chain for ${e} wallet:`, r), false;
    }
  }
  async waitForTransaction(e, n, r) {
    let s;
    try {
      return s = this.getConnectedWalletAdapter(e), await s.waitForTransaction(n, r);
    } catch (i) {
      return this.handleError(
        e,
        i,
        "waiting for transaction with",
        s?.type
      );
    }
  }
};
var Vs = 200;
var Ds = class extends jr {
  constructor({
    url: e,
    policies: n,
    version: r,
    slot: s,
    namespace: i,
    tokens: o,
    preset: a,
    shouldOverridePresetPolicies: l,
    rpcUrl: c2,
    ref: d,
    refGroup: h2,
    needsSessionCreation: u2,
    username: f2,
    onSessionCreated: w2,
    onStarterpackPlay: C2,
    encryptedBlob: m2,
    propagateSessionErrors: T2,
    errorDisplayMode: b2,
    webauthnPopup: g2,
    ...$2
  }) {
    let _2;
    const k2 = new URL(e ?? q), X2 = new qs();
    T2 && k2.searchParams.set("propagate_error", "true"), b2 && k2.searchParams.set("error_display_mode", b2), r && k2.searchParams.set("v", encodeURIComponent(r)), s && k2.searchParams.set("ps", encodeURIComponent(s)), i && k2.searchParams.set("ns", encodeURIComponent(i)), o?.erc20 && k2.searchParams.set(
      "erc20",
      encodeURIComponent(o.erc20.toString())
    ), c2 && k2.searchParams.set("rpc_url", encodeURIComponent(c2)), d && k2.searchParams.set("ref", encodeURIComponent(d)), h2 && k2.searchParams.set("ref_group", encodeURIComponent(h2)), u2 && k2.searchParams.set("needs_session_creation", "true"), f2 && k2.searchParams.set("username", encodeURIComponent(f2)), a && k2.searchParams.set("preset", a), l && k2.searchParams.set("should_override_preset_policies", "true"), g2 && k2.searchParams.set("webauthn_popup", "true"), (!a || l) && n ? k2.searchParams.set(
      "policies",
      encodeURIComponent(JSON.stringify(n))
    ) : a && n && console.warn(
      "[Controller] Both `preset` and `policies` provided to ControllerProvider. Policies are ignored when preset is set. Use `shouldOverridePresetPolicies: true` to override."
    ), m2 && (k2.hash = `kc=${encodeURIComponent(m2)}`);
    super({
      ...$2,
      id: "controller-keychain",
      url: k2,
      methods: {
        ...X2.getIFrameMethods(),
        // Expose callback for keychain to notify parent that session was created and storage access granted
        onSessionCreated: (he) => () => w2?.(),
        onStarterpackPlay: (he) => async () => {
          _2 && await _2();
        }
      }
    });
    __publicField(this, "walletBridge");
    __publicField(this, "onStarterpackPlay");
    this.walletBridge = X2, this.onStarterpackPlay = C2, _2 = async () => {
      this.close();
      const he = this.onStarterpackPlay;
      if (this.onStarterpackPlay = void 0, !!he) {
        await new Promise(
          (Le) => setTimeout(Le, Vs)
        );
        try {
          he();
        } catch (Le) {
          console.error("Failed to run starterpack play callback:", Le);
        }
      }
    }, typeof window < "u" && (window.external_wallets = this.walletBridge);
  }
  getWalletBridge() {
    return this.walletBridge;
  }
  setOnStarterpackPlay(e) {
    this.onStarterpackPlay = e;
  }
};
var Y2 = /* @__PURE__ */ new Map();
var Zs = `${ee}/query`;
async function xn(t) {
  if (!t.addresses?.length && !t.usernames?.length)
    return { results: [] };
  const e = await fetch(`${ee}/lookup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(t)
  });
  if (!e.ok)
    throw new Error(`HTTP error! status: ${e.status}`);
  return e.json();
}
async function Ks(t) {
  const e = await fetch(Zs, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        query LookupSigners($username: String!) {
          account(username: $username) {
            username
            controllers(first: 1) {
              edges {
                node {
                  signers {
                    isOriginal
                    isRevoked
                    metadata {
                      __typename
                      ... on Eip191Credentials {
                        eip191 {
                          provider
                          ethAddress
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: { username: t }
    })
  });
  if (!e.ok)
    throw new Error(`HTTP error! status: ${e.status}`);
  return e.json();
}
function Xs(t) {
  const e = t.toLowerCase();
  if (vn.includes(e))
    return e;
}
var vn = [
  "google",
  "webauthn",
  "discord",
  "walletconnect",
  "password",
  "sms",
  "metamask",
  "rabby",
  "phantom-evm"
].filter(
  (t) => V.includes(t)
);
function Gs(t, e) {
  if (!t || t.length === 0)
    return [];
  const n = e === ge.StarknetChainId.SN_MAIN, r = t.filter(
    (i) => !i.isRevoked && (n || i.isOriginal)
  ), s = /* @__PURE__ */ new Set();
  for (const i of r)
    switch (i.metadata.__typename) {
      case "WebauthnCredentials":
        s.add("webauthn");
        break;
      case "PasswordCredentials":
        s.add("password");
        break;
      case "Eip191Credentials":
        i.metadata.eip191?.forEach((o) => {
          const a = Xs(o.provider);
          a && s.add(a);
        });
        break;
    }
  return vn.filter((i) => s.has(i));
}
async function Ys(t, e) {
  const n = await Ks(t);
  if (n.errors?.length)
    throw new Error(n.errors[0].message || "Lookup query failed");
  const r = n.data?.account;
  if (!r)
    return {
      username: t,
      exists: false,
      signers: []
    };
  const s = r.controllers?.edges?.[0]?.node, i = Gs(
    s?.signers ?? void 0,
    e
  );
  return {
    username: r.username,
    exists: true,
    signers: i
  };
}
async function Li(t) {
  const e = t.filter((n) => !Y2.has(n));
  return e.length > 0 && (await xn({ usernames: e })).results.forEach((r) => {
    Y2.set(r.username, r.addresses[0]);
  }), new Map(
    t.map((n) => [n, Y2.get(n)]).filter((n) => n[1] !== void 0)
  );
}
async function _i(t) {
  t = t.map(Bt.toHex);
  const e = t.filter((n) => !Y2.has(n));
  return e.length > 0 && (await xn({
    addresses: e
  })).results.forEach((r) => {
    Y2.set(r.addresses[0], r.username);
  }), new Map(
    t.map((n) => [n, Y2.get(n)]).filter((n) => n[1] !== void 0)
  );
}
function Js(t) {
  if (!t || t.trim() === "")
    return { isValid: false, error: "Redirect URL is empty" };
  let e;
  try {
    e = new URL(t);
  } catch {
    return {
      isValid: false,
      error: "Invalid URL format"
    };
  }
  if (!["http:", "https:"].includes(e.protocol))
    return {
      isValid: false,
      error: `Protocol "${e.protocol}" is not allowed. Only http: and https: are supported.`
    };
  if (!e.hostname || e.hostname === "")
    return {
      isValid: false,
      error: "URL must have a valid hostname"
    };
  if (typeof window < "u") {
    const r = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1", s = e.hostname === "localhost" || e.hostname === "127.0.0.1";
    if (!r && s)
      return {
        isValid: false,
        error: "Cannot redirect to localhost from production"
      };
  }
  return { isValid: true };
}
var Pi = class extends te {
  constructor(e = {}) {
    super();
    __publicField(this, "keychain");
    __publicField(this, "options");
    __publicField(this, "iframes");
    __publicField(this, "selectedChain");
    __publicField(this, "chains");
    __publicField(this, "referral");
    __publicField(this, "encryptedBlob");
    const r = [...[
      { rpcUrl: "https://api.cartridge.gg/x/starknet/sepolia/rpc/v0_9" },
      { rpcUrl: "https://api.cartridge.gg/x/starknet/mainnet/rpc/v0_9" }
    ], ...e.chains || []], s = e.defaultChainId || ge.StarknetChainId.SN_MAIN;
    this.selectedChain = s, this.chains = /* @__PURE__ */ new Map();
    const i = typeof window < "u" ? new URLSearchParams(window.location.search) : null;
    if (this.referral = {
      ref: i?.get("ref") ?? void 0,
      refGroup: i?.get("ref_group") ?? void 0
    }, this.options = { ...e, chains: r, defaultChainId: s }, typeof window < "u" && typeof localStorage < "u") {
      const o = i?.get("controller_standalone");
      o === "1" && sessionStorage.setItem("controller_standalone", "1");
      const a = i?.get("lastUsedConnector");
      if (a && localStorage.setItem("lastUsedConnector", a), window.location.hash) {
        const c2 = new URLSearchParams(window.location.hash.slice(1)).get("kc");
        c2 && (this.encryptedBlob = c2);
      }
      if (i && window.history?.replaceState) {
        let l = false;
        o && (i.delete("controller_standalone"), l = true), a && (i.delete("lastUsedConnector"), l = true);
        let c2 = window.location.hash;
        if (c2) {
          const d = new URLSearchParams(c2.slice(1));
          d.has("kc") && (d.delete("kc"), c2 = d.toString() ? `#${d.toString()}` : "", l = true);
        }
        if (l) {
          const d = window.location.pathname + (i.toString() ? "?" + i.toString() : "") + c2;
          window.history.replaceState({}, "", d);
        }
      }
    }
    this.initializeChains(r), this.iframes = {
      keychain: e.lazyload ? void 0 : this.createKeychainIframe()
    }, typeof window < "u" && (window.starknet_controller = this);
  }
  isReady() {
    return !!this.keychain;
  }
  async logout() {
    if (!this.keychain) {
      console.error(new M().message);
      return;
    }
    try {
      await this.disconnect(), document.querySelectorAll('iframe[id^="controller-"]').forEach((n) => {
        const r = n.parentElement;
        r && (r.style.opacity = "0", setTimeout(() => {
          r.style.display = "none";
        }, 200));
      }), document.body && (document.body.style.overflow = "auto"), window.location.reload();
    } catch (e) {
      throw console.error("Logout failed:", e), e;
    }
  }
  async probe() {
    if (this.iframes) {
      try {
        if (this.iframes.keychain || (this.iframes.keychain = this.createKeychainIframe()), await this.waitForKeychain(), !this.keychain) {
          console.error(new M().message);
          return;
        }
        const e = await this.keychain.probe(this.rpcUrl());
        let n = e?.rpcUrl || this.rpcUrl();
        this.account = new _e(
          this,
          n,
          e.address,
          this.keychain,
          this.options,
          this.iframes.keychain
        );
      } catch (e) {
        console.error(e);
        return;
      }
      return this.account;
    }
  }
  async connect(e) {
    const n = Array.isArray(e) ? void 0 : e, r = n?.username && n?.signer ? {
      username: n.username,
      signer: n.signer,
      password: n.password
    } : void 0;
    if (this.iframes) {
      if (this.account)
        return this.account;
      if (this.iframes.keychain || (this.iframes.keychain = this.createKeychainIframe()), await this.waitForKeychain(), !this.keychain || !this.iframes.keychain) {
        console.error(new M().message);
        return;
      }
      try {
        if (r) {
          const o = await this.keychain.connect({
            username: r.username,
            signer: r.signer,
            password: r.password
          });
          if (o.code !== Y.SUCCESS)
            throw new m(
              "message" in o && o.message ? o.message : "Headless authentication failed"
            );
          if (this.account)
            return this.account;
          const a = "address" in o && o.address ? o.address : null;
          if (!a)
            throw new m(
              "Headless authentication failed"
            );
          return this.account = new _e(
            this,
            this.rpcUrl(),
            a,
            this.keychain,
            this.options,
            this.iframes.keychain
          ), this.emitAccountsChanged([a]), this.account;
        }
        r || this.iframes.keychain.open();
        const s = Array.isArray(e) ? e : n?.signupOptions ?? this.options.signupOptions;
        let i = await this.keychain.connect({
          signupOptions: s
        });
        if (i.code !== Y.SUCCESS)
          throw new Error(i.message);
        return i = i, this.account = new _e(
          this,
          this.rpcUrl(),
          i.address,
          this.keychain,
          this.options,
          this.iframes.keychain
        ), this.account;
      } catch (s) {
        if (r) {
          if (s instanceof m)
            throw s;
          const i = s instanceof Error ? s.message : typeof s == "object" && s && "message" in s ? String(s.message) : "Headless authentication failed";
          throw new m(i);
        }
        console.log(s);
      } finally {
        r || this.iframes.keychain.close();
      }
    }
  }
  async switchStarknetChain(e) {
    if (!this.iframes)
      return false;
    if (!this.keychain || !this.iframes.keychain)
      return console.error(new M().message), false;
    const n = this.selectedChain;
    try {
      this.selectedChain = e, await this.keychain.switchChain(this.rpcUrl());
    } catch (r) {
      return console.error(r), this.selectedChain = n, false;
    }
    return this.emitNetworkChanged(e), true;
  }
  addStarknetChain(e) {
    return Promise.resolve(true);
  }
  async disconnect() {
    this.account = void 0;
    try {
      if (typeof localStorage < "u") {
        localStorage.removeItem("lastUsedConnector");
        for (let e = localStorage.length - 1; e >= 0; e--) {
          const n = localStorage.key(e);
          n?.startsWith("@cartridge/") && localStorage.removeItem(n);
        }
      }
    } catch {
    }
    if (!this.keychain) {
      console.error(new M().message);
      return;
    }
    await this.keychain.disconnect(), this.close(), this.emitAccountsChanged([]);
  }
  async openProfile(e = "inventory") {
    if (!this.iframes)
      return;
    if (!this.keychain || !this.iframes.keychain) {
      console.error(new M().message);
      return;
    }
    if (!this.account) {
      console.error("Account is not ready");
      return;
    }
    const n = await this.keychain.username(), r = [];
    this.options.slot && r.push(`ps=${this.options.slot}`), await this.keychain.navigate(
      `/account/${n}/${e}?${r.join("&")}`
    ), this.iframes.keychain.open();
  }
  async openProfileTo(e) {
    if (!this.iframes)
      return;
    if (!this.keychain || !this.iframes.keychain) {
      console.error(new M().message);
      return;
    }
    if (!this.account) {
      console.error("Account is not ready");
      return;
    }
    const n = await this.keychain.username(), r = [];
    this.options.slot && r.push(`ps=${this.options.slot}`), await this.keychain.navigate(
      `/account/${n}/${e}?${r.join("&")}`
    ), this.iframes.keychain.open();
  }
  async openProfileAt(e) {
    if (this.iframes) {
      if (!this.keychain || !this.iframes.keychain) {
        console.error(new M().message);
        return;
      }
      if (!this.account) {
        console.error("Account is not ready");
        return;
      }
      await this.keychain.navigate(e), this.iframes.keychain.open();
    }
  }
  openSettings() {
    if (this.iframes) {
      if (!this.keychain || !this.iframes.keychain) {
        console.error(new M().message);
        return;
      }
      this.iframes.keychain.open(), this.keychain.openSettings();
    }
  }
  async close() {
    !this.iframes || !this.iframes.keychain || this.iframes.keychain.close();
  }
  async updateSession(e = {}) {
    if (!e.policies && !e.preset)
      throw new Error("Either `policies` or `preset` must be provided");
    if (this.iframes) {
      if (this.iframes.keychain || (this.iframes.keychain = this.createKeychainIframe()), await this.waitForKeychain(), !this.keychain || !this.iframes.keychain) {
        console.error(new M().message);
        return;
      }
      this.iframes.keychain.open();
      try {
        const n = await this.keychain.updateSession(
          e.policies,
          e.preset
        );
        if (n.code !== Y.SUCCESS)
          throw new Error(n.message);
        return n;
      } catch (n) {
        console.error(n);
      } finally {
        this.iframes.keychain.close();
      }
    }
  }
  revoke(e, n) {
    return this.keychain ? this.keychain.revoke(e) : (console.error(new M().message), null);
  }
  rpcUrl() {
    const e = this.chains.get(this.selectedChain);
    if (!e) {
      const n = Array.from(this.chains.keys()).map(
        (r) => ft.decodeShortString(r)
      );
      throw new Error(
        `Chain not found: ${ft.decodeShortString(this.selectedChain)}. Available chains: ${n.join(", ")}`
      );
    }
    return e.rpcUrl;
  }
  username() {
    if (!this.keychain) {
      console.error(new M().message);
      return;
    }
    return this.keychain.username();
  }
  async openLocationPrompt(e) {
    if (!this.iframes)
      return;
    if (!this.keychain || !this.iframes.keychain) {
      console.error(new M().message);
      return;
    }
    const n = this.keychain.openLocationPrompt(e);
    this.iframes.keychain.open();
    try {
      return await n;
    } finally {
      this.iframes.keychain.close();
    }
  }
  async lookupUsername(e) {
    const n = e.trim();
    if (!n)
      throw new Error("Username is required");
    return Ys(n, this.selectedChain);
  }
  openPurchaseCredits() {
    if (this.iframes) {
      if (!this.keychain || !this.iframes.keychain) {
        console.error(new M().message);
        return;
      }
      this.keychain.navigate("/purchase/credits").then(() => {
        this.iframes.keychain?.open();
      });
    }
  }
  async openBundle(e, n, r) {
    if (!this.iframes)
      return;
    if (!this.keychain || !this.iframes.keychain) {
      console.error(new M().message);
      return;
    }
    const { onPurchaseComplete: s, ...i } = r ?? {};
    this.iframes.keychain.setOnStarterpackPlay(s);
    const o = Object.keys(i).length > 0 ? i : void 0;
    await this.keychain.openBundle(e, n, o), this.iframes.keychain?.open();
  }
  async openStarterPack(e, n) {
    if (!this.iframes)
      return;
    if (!this.keychain || !this.iframes.keychain) {
      console.error(new M().message);
      return;
    }
    const { onPurchaseComplete: r, ...s } = n ?? {};
    this.iframes.keychain.setOnStarterpackPlay(r);
    const i = Object.keys(s).length > 0 ? s : void 0;
    await this.keychain.openStarterPack(e, i), this.iframes.keychain?.open();
  }
  async openExecute(e, n) {
    if (!this.iframes)
      return;
    if (!this.keychain || !this.iframes.keychain) {
      console.error(new M().message);
      return;
    }
    let r = this.selectedChain;
    n && this.switchStarknetChain(n), this.iframes.keychain.open();
    const s = await this.keychain.execute(e, void 0, void 0, true);
    return this.iframes.keychain.close(), n && this.switchStarknetChain(r), {
      status: !(s && (s.code === Y.NOT_CONNECTED || s.code === Y.CANCELED)),
      transactionHash: s?.transaction_hash
    };
  }
  async delegateAccount() {
    return this.keychain ? await this.keychain.delegateAccount() : (console.error(new M().message), null);
  }
  /**
   * Returns a wallet standard interface for the controller.
   * This allows using the controller with libraries that expect the wallet standard interface.
   */
  asWalletStandard() {
    typeof window < "u" && console.warn(
      "Casting Controller to WalletWithStarknetFeatures is an experimental feature. Please report any issues at https://github.com/cartridge-gg/controller/issues"
    );
    const e = this, n = new wr(e), r = {
      "standard:disconnect": {
        version: "1.0.0",
        disconnect: async () => {
          await n.features["standard:disconnect"].disconnect(), await e.disconnect();
        }
      }
    };
    return {
      get version() {
        return n.version;
      },
      get name() {
        return n.name;
      },
      get icon() {
        return n.icon;
      },
      get chains() {
        return n.chains;
      },
      get accounts() {
        return n.accounts;
      },
      get features() {
        return { ...n.features, ...r };
      }
    };
  }
  /**
   * Opens the keychain in standalone mode (first-party context) for authentication.
   * This establishes first-party storage, enabling seamless iframe access across all games.
   * @param options - Configuration for redirect after authentication
   */
  open(e = {}) {
    if (typeof window > "u") {
      console.error("open can only be called in browser context");
      return;
    }
    const n = new URL(this.options.url || q), r = e.redirectUrl || window.location.href, s = Js(r);
    if (!s.isValid) {
      console.error(
        `Invalid redirect URL: ${s.error}`,
        `URL: ${r}`
      );
      return;
    }
    n.searchParams.set("redirect_url", r), this.options.preset && n.searchParams.set("preset", this.options.preset), this.options.slot && n.searchParams.set("ps", this.options.slot), this.options.namespace && n.searchParams.set("ns", this.options.namespace), this.options.tokens?.erc20 && n.searchParams.set(
      "erc20",
      this.options.tokens.erc20.toString()
    ), this.rpcUrl() && n.searchParams.set("rpc_url", this.rpcUrl()), window.location.href = n.toString();
  }
  initializeChains(e) {
    for (const n of e)
      try {
        const r = new URL(n.rpcUrl), s = X(r);
        this.chains.set(s, n);
      } catch (r) {
        throw console.error(`Failed to parse chainId for ${n.rpcUrl}:`, r), r;
      }
    this.chains.has(this.selectedChain) || console.warn(
      `Selected chain ${this.selectedChain} not found in configured chains. Available chains: ${Array.from(this.chains.keys()).join(", ")}`
    );
  }
  createKeychainIframe() {
    const e = typeof window < "u" && typeof sessionStorage < "u" && sessionStorage.getItem("controller_standalone") === "1", r = (typeof window < "u" ? new URLSearchParams(window.location.search) : void 0)?.get("username") ?? void 0, s = this.encryptedBlob;
    e && sessionStorage.removeItem("controller_standalone"), s && (this.encryptedBlob = void 0);
    const i = new Ds({
      ...this.options,
      rpcUrl: this.rpcUrl(),
      onClose: () => {
        this.keychain?.reset?.();
      },
      onConnect: (o) => {
        this.keychain = o;
      },
      version: Q,
      ref: this.referral.ref,
      refGroup: this.referral.refGroup,
      needsSessionCreation: e,
      encryptedBlob: s ?? void 0,
      username: r,
      onSessionCreated: async () => {
        const o = this.account?.address, a = await this.probe();
        a?.address && a.address !== o && this.emitAccountsChanged([a.address]);
      }
    });
    return e && setTimeout(() => {
      i.open();
    }, 100), i;
  }
  waitForKeychain({
    timeout: e = 5e4,
    interval: n = 100
  } = {}) {
    return new Promise((r, s) => {
      const i = Date.now(), o = setInterval(() => {
        if (Date.now() - i > e) {
          clearInterval(o), s(new Error("Timeout waiting for keychain"));
          return;
        }
        this.keychain && (clearInterval(o), r());
      }, n);
    });
  }
};
var x2 = "cartridge-toast-container";
var Qs = 3e3;
var ei = "bottom-right";
var En = "cartridge-toast-show";
function ut() {
  try {
    return typeof window < "u" && window.self !== window.top;
  } catch {
    return true;
  }
}
function ti() {
  if (typeof document > "u")
    return null;
  if (ut())
    try {
      if (window.parent && window.parent.document)
        return window.parent.document;
    } catch (t) {
      return console.warn("Failed to access parent document:", t), null;
    }
  return document;
}
function ni(t, e) {
  let n = t.getElementById(x2);
  return n || (n = t.createElement("div"), n.id = x2, t.body && t.body.appendChild(n)), n.className = e, n;
}
function ri(t) {
  t.classList.add("closing"), setTimeout(() => {
    t.parentNode && t.parentNode.removeChild(t);
  }, 200);
}
function si(t) {
  if (t.getElementById("cartridge-toast-styles"))
    return;
  const e = t.createElement("style");
  e.id = "cartridge-toast-styles", e.textContent = ii(), t.head.appendChild(e);
}
function ii() {
  return `
    #${x2} {
      position: fixed;
      z-index: 999999;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;
    }

    #${x2}.top-left {
      top: 20px;
      left: 20px;
      align-items: flex-start;
    }

    #${x2}.top-right {
      top: 20px;
      right: 20px;
      align-items: flex-end;
    }

    #${x2}.top-center {
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      align-items: center;
    }

    #${x2}.bottom-left {
      bottom: 20px;
      left: 20px;
      align-items: flex-start;
    }

    #${x2}.bottom-right {
      bottom: 20px;
      right: 20px;
      align-items: flex-end;
    }

    #${x2}.bottom-center {
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      align-items: center;
    }

    .cartridge-toast {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
      display: flex;
      align-items: center;
      animation: cartridge-toast-slide-in 0.3s ease-out;
      overflow: hidden;
      pointer-events: auto;
    }

    #${x2}.top-right .cartridge-toast,
    #${x2}.bottom-right .cartridge-toast {
      align-self: flex-end;
    }

    #${x2}.top-left .cartridge-toast,
    #${x2}.bottom-left .cartridge-toast {
      align-self: flex-start;
    }

    #${x2}.top-center .cartridge-toast,
    #${x2}.bottom-center .cartridge-toast {
      align-self: center;
    }

    @keyframes cartridge-toast-slide-in {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .cartridge-toast.closing {
      animation: cartridge-toast-slide-out 0.2s ease-in forwards;
    }

    @keyframes cartridge-toast-slide-out {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(10px);
      }
    }

    @media (max-width: 640px) {
      .cartridge-toast {
        min-width: calc(100vw - 40px);
        max-width: calc(100vw - 40px);
      }

      #${x2}.top-left,
      #${x2}.top-right,
      #${x2}.top-center {
        top: 10px;
        left: 20px;
        right: 20px;
        transform: none;
        align-items: stretch;
      }

      #${x2}.bottom-left,
      #${x2}.bottom-right,
      #${x2}.bottom-center {
        bottom: 10px;
        left: 20px;
        right: 20px;
        transform: none;
        align-items: stretch;
      }
    }
  `;
}
var de2 = (t = false) => {
  const e = document.createElement("div");
  e.id = "close-button", e.style.display = "flex", e.style.alignItems = "center", e.style.justifyContent = "center";
  const n = document.createElement("button");
  n.className = t ? "cartridge-close-button translucent" : "cartridge-close-button";
  const r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  r.setAttribute("width", "20"), r.setAttribute("height", "20"), r.setAttribute("viewBox", "0 0 20 20"), r.setAttribute("fill", "none"), r.style.pointerEvents = "none";
  const s = document.createElementNS("http://www.w3.org/2000/svg", "path");
  s.setAttribute(
    "d",
    "M15.5465 14.343C15.8881 14.6837 15.8881 15.2364 15.5465 15.5772C15.2049 15.9179 14.6506 15.9178 14.309 15.5772L10.0006 11.2484L5.66162 15.5757C5.32001 15.9164 4.76575 15.9164 4.4241 15.5757C4.08245 15.235 4.08249 14.6822 4.4241 14.3415L8.76455 10.0157L4.4229 5.65573C4.08128 5.31504 4.08128 4.76227 4.4229 4.42155C4.76451 4.08082 5.31877 4.08086 5.66042 4.42155L10.0006 8.78299L14.3396 4.45573C14.6812 4.11504 15.2355 4.11504 15.5771 4.45573C15.9188 4.79642 15.9187 5.34918 15.5771 5.68991L11.2367 10.0157L15.5465 14.343Z"
  ), s.setAttribute("class", "cartridge-close-icon"), r.appendChild(s), n.appendChild(r), n.style.display = "flex", n.style.alignItems = "center", n.style.justifyContent = "center", n.style.border = "none", n.style.background = "transparent", n.style.cursor = "pointer", n.style.borderRadius = "4px", n.style.padding = "10px", n.style.gap = "4px", n.style.transition = "background-color 0.2s ease";
  const i = e.ownerDocument;
  if (!i.getElementById("cartridge-close-button-style")) {
    const o = i.createElement("style");
    o.id = "cartridge-close-button-style", o.textContent = `
      .cartridge-close-button .cartridge-close-icon {
        fill: rgba(0, 0, 0, 0.48);
        transition: fill 0.2s ease;
      }

      .cartridge-close-button:not(.translucent):hover {
        background-color: #181c19;
      }

      .cartridge-close-button:not(.translucent):hover .cartridge-close-icon {
        fill: rgba(255, 255, 255, 0.72);
      }

      .cartridge-close-button.translucent .cartridge-close-icon {
        fill: rgba(0, 0, 0, 0.48);
      }

      .cartridge-close-button.translucent:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }

      .cartridge-close-button.translucent:hover .cartridge-close-icon {
        fill: rgba(0, 0, 0, 0.72);
      }

      .cartridge-close-button:active {
        transform: scale(0.95);
      }
    `, i.head.appendChild(o);
  }
  return e.appendChild(n), e;
};
function oi(t) {
  if (t.getElementById("cartridge-toast-error-styles"))
    return;
  const e = t.createElement("style");
  e.id = "cartridge-toast-error-styles", e.textContent = `
    /* Error Toast */
    .cartridge-toast.error {
      background-color: #E66666;
      border-radius: 8px;
      width: 360px;
      display: flex;
      align-items: flex-start;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      transition: background-color 0.2s ease, transform 0.1s ease;
    }

    /* Clickable state */
    .cartridge-toast.error[style*="cursor: pointer"]:hover {
      background-color: #D85555;
      transform: translateY(-2px);
    }

    .cartridge-toast.error[style*="cursor: pointer"]:active {
      transform: translateY(0);
    }

    .cartridge-toast.error .label-bar {
      display: flex;
      padding: 12px 12px 16px 12px;
      align-items: center;
      gap: 8px;
      flex: 1 0 0;
    }

    .cartridge-toast.error .label-bar .label-container {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .cartridge-toast.error .label-bar .icon-container {
      width: 24px;
      height: 24px;
      aspect-ratio: 1/1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }

    .cartridge-toast.error .label-bar p {
      color: #0F1410;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
    }

    .cartridge-toast.error .close-button-container {
      display: flex;
      padding: 4px;
      align-items: center;
      gap: 10px;
    }

    .cartridge-toast.error {
      position: relative;
      overflow: hidden;
    }
  `, t.head.appendChild(e);
}
function ai(t) {
  const e = document.createElement("div");
  e.className = "cartridge-toast error";
  const n = document.createElement("div");
  n.className = "label-bar", e.appendChild(n);
  const r = document.createElement("div");
  r.className = "label-container", n.appendChild(r);
  const s = document.createElement("div");
  s.className = "icon-container", s.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.79313 0.326989L17.673 8.20771C18.109 8.6437 18.109 9.35713 17.673 9.79229L9.79229 17.673C9.3563 18.109 8.6437 18.109 8.20771 17.673L0.326989 9.79229C-0.108996 9.35713 -0.108996 8.6437 0.326989 8.20771L8.20856 0.326989C8.64454 -0.108996 9.35715 -0.108996 9.79313 0.326989ZM8.26159 4.84378C8.26159 4.37794 8.63953 4 9.10537 4C9.57121 4 9.94915 4.3797 9.94915 4.84378V9.34394C9.94915 9.80978 9.57121 10.1877 9.13701 10.1877C8.70282 10.1877 8.26159 9.81154 8.26159 9.34394V4.84378ZM9.10537 13.5628C8.49503 13.5628 8.00002 13.0678 8.00002 12.4575C8.00002 11.8472 8.49468 11.3521 9.10537 11.3521C9.71605 11.3521 10.2107 11.8472 10.2107 12.4575C10.2093 13.0671 9.71711 13.5628 9.10537 13.5628Z" fill="#0F1410"/>
  </svg>
`, r.appendChild(s);
  const i = document.createElement("p");
  i.className = "content", i.textContent = t.message || "Error", r.appendChild(i);
  const o = document.createElement("div");
  o.className = "close-button-container";
  const a = de2(true);
  return o.appendChild(a), e.appendChild(o), e;
}
function ci(t) {
  if (t.getElementById("cartridge-toast-transaction-styles"))
    return;
  const e = t.createElement("style");
  e.id = "cartridge-toast-transaction-styles", e.textContent = `
    /* Transaction Toast */
    .cartridge-toast.transaction {
      background-color: #161A17;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
    }

    /* Expanded State */
    .cartridge-toast.transaction.expanded {
      width: 360px;
    }

    .cartridge-toast.transaction.expanded .toast-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      gap: 8px;
      box-sizing: border-box;
    }

    .cartridge-toast.transaction.expanded .label-bar {
      display: flex;
      align-items: center;
      padding: 12px;
      gap: 8px;
      flex: 1 0 0;
    }

    .cartridge-toast.transaction.expanded .label-bar .label-container {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .cartridge-toast.transaction.expanded .label-bar .icon-container {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cartridge-toast.transaction.expanded .label-bar p.status {
      color: #FFF;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      margin: 0;
    }

    .cartridge-toast.transaction.expanded .label-bar .activity-feed-container {
      display: flex;
      padding: 2px;
      align-items: center;
      border-radius: 2px;
      background: rgba(0, 0, 0, 0.08);
    }

    .cartridge-toast.transaction.expanded .label-bar .activity-icon {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cartridge-toast.transaction.expanded .label-bar .activity-label-container {
      display: flex;
      padding: 0 2px;
      justify-content: center;
      align-items: center;
    }

    .cartridge-toast.transaction.expanded .label-bar span.activity-label {
      color: #3F3;
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
    }

    .cartridge-toast.transaction.expanded .close-button-container {
      display: flex;
      align-items: center;
    }

    /* Progress Bar - will be added dynamically */
    .cartridge-toast.transaction .cartridge-toast-progress-bar {
      background: rgba(255, 255, 255, 0.1);
    }

    .cartridge-toast.transaction .cartridge-toast-progress-bar-fill {
      background: #3F3;
    }

    /* Collapsed State */
    .cartridge-toast.transaction.collapsed {
      display: inline-flex;
      padding: 10px;
      align-items: center;
      justify-content: center;
    }

    .cartridge-toast.transaction.collapsed .collapsed-icon {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Spinner Animation */
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .cartridge-toast.transaction .icon-container.spinning,
    .cartridge-toast.transaction .collapsed-icon.spinning {
      animation: spin 1s linear infinite;
    }
  `, t.head.appendChild(e);
}
function li(t) {
  const e = document.createElement("div");
  if (e.className = `cartridge-toast transaction ${t.isExpanded ? "expanded" : "collapsed"}`, t.isExpanded) {
    const n = document.createElement("div");
    n.className = "toast-content";
    const r = document.createElement("div");
    r.className = "label-bar";
    const s = document.createElement("div");
    s.className = "label-container";
    const i = document.createElement("div");
    i.className = "icon-container", t.status === "confirming" ? (i.classList.add("spinning"), i.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M11.1111 5.77756C11.1111 5.28673 11.5083 4.88867 12 4.88867C15.9278 4.88867 19.1111 8.07201 19.1111 11.9998C19.1111 13.2942 18.7639 14.5109 18.1583 15.5553C17.9139 15.9803 17.3694 16.1276 16.9194 15.8803C16.5194 15.6359 16.375 15.0914 16.6194 14.6414C17.0722 13.8831 17.3333 12.972 17.3333 11.9748C17.3333 9.03034 14.9444 6.64145 12 6.64145C11.5083 6.64145 11.1111 6.26839 11.1111 5.75256V5.77756Z" fill="white"/>
          <path opacity="0.25" d="M11.975 6.66645C9.03058 6.66645 6.64169 9.03034 6.64169 11.9998C6.64169 14.9442 9.03058 17.3331 11.975 17.3331C13.9472 17.3331 15.6472 16.2914 16.5806 14.7331L16.5834 14.7359C16.3917 15.1498 16.5417 15.647 16.9195 15.8803C17.3695 16.1276 17.9139 15.9803 18.1584 15.5553C18.1639 15.547 18.1695 15.5387 18.1722 15.5303C16.9472 17.6692 14.6417 19.1109 12 19.1109C8.07225 19.1109 4.88892 15.9276 4.88892 11.9998C4.88892 8.07201 8.07225 4.88867 12 4.88867C11.5084 4.88867 11.1111 5.28673 11.1111 5.77756C11.1111 6.26839 11.5084 6.66645 12 6.66645H11.975Z" fill="white" fill-opacity="0.64"/>
        </svg>
      `) : i.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M8.36382 18.5465L4 14.1827L5.45427 12.7284L8.36382 15.638L18.5457 5.45508L20 6.91032L8.36382 18.5465Z" fill="#33FF33"/>
        </svg>
      `;
    const o = document.createElement("p");
    if (o.className = "status", o.textContent = t.status === "confirming" ? "Confirming" : "Confirmed", s.appendChild(i), s.appendChild(o), t.label) {
      const c2 = document.createElement("div");
      c2.className = "activity-feed-container";
      const d = document.createElement("div");
      d.className = "activity-icon", d.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M7.985 4.0002C8.23167 3.99353 8.45 4.1552 8.515 4.39353L9.74833 8.91353L10.0433 8.32353C10.2233 7.96187 10.5933 7.73353 10.9967 7.73353H12.8C13.095 7.73353 13.3333 7.97187 13.3333 8.26687C13.3333 8.56187 13.095 8.8002 12.8 8.8002H10.9967L10.0767 10.6385C9.97833 10.8369 9.76667 10.9519 9.54667 10.9302C9.32667 10.9085 9.14333 10.7535 9.085 10.5402L8.06167 6.78853L6.92167 12.1119C6.87 12.3519 6.66333 12.5252 6.41833 12.5335C6.17333 12.5419 5.955 12.3819 5.88833 12.1469L4.93167 8.8002H3.2C2.905 8.8002 2.66667 8.56187 2.66667 8.26687C2.66667 7.97187 2.905 7.73353 3.2 7.73353H4.93167C5.40833 7.73353 5.82667 8.04853 5.95667 8.50687L6.32667 9.8002L7.47833 4.42187C7.53 4.18187 7.74 4.00687 7.985 4.0002Z" fill="#33FF33"/>
        </svg>
      `;
      const h2 = document.createElement("div");
      h2.className = "activity-label-container";
      const u2 = document.createElement("span");
      u2.className = "activity-label", u2.textContent = t.label, h2.appendChild(u2), c2.appendChild(d), c2.appendChild(h2), s.appendChild(c2);
    }
    r.appendChild(s), n.appendChild(r);
    const a = document.createElement("div");
    a.className = "close-button-container";
    const l = de2();
    a.appendChild(l), n.appendChild(a), e.appendChild(n);
  } else {
    const n = document.createElement("div");
    n.className = "collapsed-icon", t.status === "confirming" ? (n.classList.add("spinning"), n.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M12.9629 6.74016C12.9629 6.16752 13.4264 5.70312 14 5.70312C18.5824 5.70312 22.2963 9.41701 22.2963 13.9994C22.2963 15.5096 21.8912 16.9291 21.1847 18.1476C20.8995 18.6434 20.2643 18.8152 19.7393 18.5267C19.2727 18.2416 19.1041 17.6064 19.3893 17.0814C19.9176 16.1966 20.2222 15.1337 20.2222 13.9703C20.2222 10.5351 17.4352 7.74803 14 7.74803C13.4264 7.74803 12.9629 7.3128 12.9629 6.711V6.74016Z" fill="white"/>
          <path opacity="0.25" d="M13.9709 7.7772C10.5357 7.7772 7.74864 10.5351 7.74864 13.9994C7.74864 17.4346 10.5357 20.2216 13.9709 20.2216C16.2718 20.2216 18.2551 19.0064 19.344 17.1883L19.3473 17.1916C19.1236 17.6744 19.2986 18.2545 19.7394 18.5267C20.2644 18.8152 20.8996 18.6434 21.1848 18.1476C21.1912 18.1378 21.1977 18.1281 21.201 18.1184C19.7718 20.6138 17.082 22.2957 14 22.2957C9.41762 22.2957 5.70374 18.5818 5.70374 13.9994C5.70374 9.41701 9.41762 5.70312 14 5.70312C13.4264 5.70312 12.963 6.16752 12.963 6.74016C12.963 7.3128 13.4264 7.7772 14 7.7772H13.9709Z" fill="white" fill-opacity="0.64"/>
        </svg>
      `) : n.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M9.75779 21.6366L4.66667 16.5455L6.36332 14.8489L9.75779 18.2433L21.6367 6.36328L23.3333 8.06107L9.75779 21.6366Z" fill="#33FF33"/>
        </svg>
      `, e.appendChild(n);
  }
  return e;
}
function di(t) {
  if (t.getElementById("cartridge-toast-network-switch-styles"))
    return;
  const e = t.createElement("style");
  e.id = "cartridge-toast-network-switch-styles", e.textContent = `
    /* Network Switch Toast */
    .cartridge-toast.network-switch {
      background-color: #161A17;
      border-radius: 8px;
      width: 360px;
      padding: 14px;
      gap: 12px;
    }

    .cartridge-toast.network-switch p.content {
      color: #ffffff;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 142.857% */
    }
  `, t.head.appendChild(e);
}
function hi(t) {
  const e = document.createElement("div");
  e.className = "cartridge-toast network-switch";
  const n = document.createElement(t.networkIcon ? "img" : "div");
  n.className = "icon", n.style.width = "24px", n.style.height = "24px", n.style.aspectRatio = "1/1", t.networkIcon ? (n.src = K(t.networkIcon), n.alt = t.networkName) : (n.style.backgroundColor = "#161A17", n.innerHTML = t.networkName.charAt(0).toUpperCase(), n.style.color = "#ffffff", n.style.fontWeight = "600", n.style.fontSize = "12px", n.style.lineHeight = "16px", n.style.textAlign = "center", n.style.textTransform = "uppercase", n.style.borderRadius = "4px", n.style.padding = "4px");
  const r = document.createElement("p");
  return r.className = "content", r.textContent = `Switched to ${t.networkName}`, e.appendChild(n), e.appendChild(r), e;
}
function ui(t) {
  if (t.getElementById("cartridge-toast-achievement-styles"))
    return;
  const e = t.createElement("style");
  e.id = "cartridge-toast-achievement-styles", e.textContent = `
    /* Achievement Toast */
    .cartridge-toast.achievement {
      background-color: #161A17;
      border-radius: 8px;
      width: 360px;
      padding: 12px;
      padding-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
      min-height: 52px;
      box-sizing: border-box;
    }

    .cartridge-toast.achievement .image-content-container {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
    }

    .cartridge-toast.achievement .image {
      width: 30px;
      height: 30px;
      aspect-ratio: 1/1;
    }

    .cartridge-toast.achievement .image-container {
      display: flex;
      padding: 5px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 4px;
      background: #161A17;
    }

    .cartridge-toast.achievement .content {
      display: flex;
      height: 40px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 2px;
    }

    .cartridge-toast.achievement .title {
      color: #FFF;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
    }

    .cartridge-toast.achievement .subtitle {
      color: #808080;
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
    }

    .cartridge-toast.achievement .xp-section-container {
      display: flex;
      padding: 10px;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    .cartridge-toast.achievement .xp-section {
      display: flex;
      align-items: center;
      gap: 2px;
      align-self: stretch;
    }

    .cartridge-toast.achievement .xp-section .xp-icon {
      width: 20px;
      height: 20px;
      aspect-ratio: 1/1;
    }

    .cartridge-toast.achievement .xp-section .xp-amount {
      color: #FFF;
      /* Inter/Regular 14px */
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 142.857% */
    }
  `, t.head.appendChild(e);
}
function fi(t) {
  const e = document.createElement("div");
  e.className = "cartridge-toast achievement";
  const n = document.createElement("div");
  n.className = "image-content-container";
  const r = document.createElement("div");
  r.className = "image-container";
  const s = pi(t.isDraft);
  s.className = "image", r.appendChild(s);
  const i = document.createElement("div");
  i.className = "content";
  const o = document.createElement("p");
  o.className = "title", o.textContent = t.title;
  const a = document.createElement("p");
  a.className = "subtitle", a.textContent = t.subtitle || "Earned!", i.appendChild(o), i.appendChild(a), n.appendChild(r), n.appendChild(i);
  const l = document.createElement("div");
  l.className = "xp-section-container";
  const c2 = document.createElement("div");
  c2.className = "xp-section";
  const d = wi(!t.isDraft);
  d.setAttribute("class", "xp-icon"), c2.appendChild(d);
  const h2 = document.createElement("span");
  h2.className = "xp-amount", h2.textContent = `${t.xpAmount}`, c2.appendChild(h2), l.appendChild(c2);
  const u2 = de2(false);
  return e.appendChild(n), e.appendChild(l), e.appendChild(u2), e;
}
var pi = (t = false) => {
  const e = document.createElement("div"), n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  switch (n.setAttribute("width", "34"), n.setAttribute("height", "34"), n.setAttribute("viewBox", "0 0 30 30"), n.style.width = "100%", n.style.height = "100%", t) {
    case true:
      n.innerHTML = `
        <path d="M26.25 5.15625C26.25 10.1484 22.5322 14.2749 17.7158 14.9121C17.4038 12.5654 16.3711 10.4473 14.8462 8.79053C16.5293 5.78467 19.7461 3.75 23.4375 3.75H24.8438C25.6216 3.75 26.25 4.37842 26.25 5.15625ZM3.75 7.96875C3.75 7.19092 4.37842 6.5625 5.15625 6.5625H6.5625C11.9985 6.5625 16.4062 10.9702 16.4062 16.4062V17.8125V24.8438C16.4062 25.6216 15.7778 26.25 15 26.25C14.2222 26.25 13.5938 25.6216 13.5938 24.8438V17.8125C8.15771 17.8125 3.75 13.4048 3.75 7.96875Z" fill="#33FF33"/>
      `;
      break;
    default:
      n.innerHTML = `
        <path d="M9.559 6.47461C9.73478 6.23633 10.016 6.0918 10.3129 6.0918H19.688C19.9848 6.0918 20.2661 6.23242 20.4419 6.47461L24.8169 12.4121C25.0825 12.7715 25.0552 13.2676 24.7583 13.5996L15.6957 23.5997C15.5161 23.795 15.2661 23.9083 15.0004 23.9083C14.7348 23.9083 14.4848 23.795 14.3051 23.5997L5.24257 13.5996C4.94179 13.2676 4.91835 12.7715 5.18398 12.4121L9.559 6.47461ZM11.0629 8.02931C10.934 8.12696 10.8988 8.30275 10.9809 8.43946L13.2231 12.1739L7.47305 12.6543C7.31289 12.666 7.18789 12.8028 7.18789 12.9668C7.18789 13.1309 7.31289 13.2637 7.47305 13.2793L14.9731 13.9043C14.9887 13.9043 15.0082 13.9043 15.0239 13.9043L22.5239 13.2793C22.6841 13.2676 22.8091 13.1309 22.8091 12.9668C22.8091 12.8028 22.6841 12.67 22.5239 12.6543L16.7778 12.1778L19.02 8.44337C19.102 8.30665 19.0669 8.12696 18.9379 8.03321C18.809 7.93946 18.6294 7.95509 18.52 8.07228L15.0004 11.8809L11.4809 8.06837C11.3715 7.95118 11.1918 7.93556 11.0629 8.02931Z" fill="#D3A4E5"/>
      `;
  }
  return e.appendChild(n), e;
};
var wi = (t) => {
  const e = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  switch (e.setAttribute("width", "12"), e.setAttribute("height", "12"), e.setAttribute("viewBox", "0 0 20 20"), t) {
    case true:
      e.innerHTML = `
          <path d="M15 12.5C15.125 12.5 15.2373 12.5781 15.2815 12.6953L15.8333 14.1667L17.3046 14.7184C17.4218 14.7627 17.5 14.875 17.5 15C17.5 15.125 17.4218 15.2373 17.3046 15.2816L15.8333 15.8333L15.2815 17.3047C15.2373 17.4219 15.125 17.5 15 17.5C14.875 17.5 14.7627 17.4219 14.7184 17.3047L14.1666 15.8333L12.6953 15.2816C12.5781 15.2373 12.5 15.125 12.5 15C12.5 14.875 12.5781 14.7627 12.6953 14.7184L14.1666 14.1667L14.7184 12.6953C14.7627 12.5781 14.875 12.5 15 12.5Z" fill="white"/>
          <path d="M8.33492 3.33333C8.55184 3.33333 8.75177 3.45943 8.84273 3.65885L10.6217 7.51139C10.6632 7.60119 10.7353 7.67335 10.8252 7.71484L14.6744 9.49056C14.8739 9.58152 15 9.78146 15 9.99837C14.9999 10.2152 14.8738 10.4144 14.6744 10.5054L10.8219 12.2852C10.7321 12.3267 10.66 12.3988 10.6184 12.4886L8.83866 16.3411C8.74772 16.5405 8.54853 16.6666 8.33167 16.6667C8.11475 16.6667 7.91482 16.5406 7.82385 16.3411L6.04814 12.4919C6.00665 12.402 5.93449 12.3299 5.84469 12.2884L1.99215 10.5094C1.79272 10.4185 1.66663 10.222 1.66663 10.0016C1.66667 9.78126 1.79276 9.58151 1.99215 9.49056L5.84143 7.71159C5.93113 7.67013 6.00335 7.59781 6.04488 7.50814L7.82792 3.65885C7.91887 3.45947 8.11805 3.33338 8.33492 3.33333Z" fill="white"/>
          <path d="M15 2.5C15.125 2.5 15.2373 2.57812 15.2815 2.69531L15.8333 4.16667L17.3046 4.71842C17.4218 4.7627 17.5 4.875 17.5 5C17.5 5.125 17.4218 5.2373 17.3046 5.28158L15.8333 5.83333L15.2815 7.30469C15.2373 7.42188 15.125 7.5 15 7.5C14.875 7.5 14.7627 7.42188 14.7184 7.30469L14.1666 5.83333L12.6953 5.28158C12.5781 5.2373 12.5 5.125 12.5 5C12.5 4.875 12.5781 4.7627 12.6953 4.71842L14.1666 4.16667L14.7184 2.69531C14.7627 2.57812 14.875 2.5 15 2.5Z" fill="white"/>
    `;
      break;
    default:
      e.innerHTML = `
          <path d="M10.4094 15.4897C10.411 15.4905 10.4126 15.4914 10.4143 15.4922L10.4314 15.4995C10.6358 15.6012 10.726 15.8431 10.6397 16.0537L10.6356 16.0635C10.6329 16.0701 10.6305 16.0772 10.6275 16.0838L10.5087 16.3418C10.495 16.3716 10.478 16.3992 10.4598 16.4256C10.4582 16.428 10.4558 16.4306 10.4541 16.4329C10.4476 16.4421 10.4389 16.4494 10.4322 16.4582C10.4242 16.4681 10.4164 16.4781 10.4078 16.4875C10.402 16.4939 10.3962 16.5004 10.3907 16.507C10.3874 16.5102 10.3843 16.5136 10.3809 16.5168C10.3787 16.5181 10.377 16.5201 10.3752 16.5216C10.373 16.5236 10.3701 16.5246 10.3679 16.5265C10.3542 16.5386 10.3395 16.5492 10.3247 16.5599C10.303 16.5758 10.2802 16.5897 10.2564 16.6022C10.2458 16.6077 10.2356 16.6137 10.2246 16.6185C10.2214 16.6199 10.218 16.6215 10.2149 16.6234C10.2122 16.6245 10.2095 16.6255 10.2067 16.6266C10.201 16.6289 10.1954 16.6294 10.1897 16.6315C10.1684 16.6393 10.1468 16.6459 10.1246 16.651C10.1207 16.6519 10.1169 16.6529 10.1132 16.6543C10.1085 16.6552 10.104 16.6567 10.0993 16.6576C10.0969 16.6576 10.0944 16.658 10.092 16.6584C10.0653 16.6629 10.0382 16.6651 10.0106 16.6657C10.0076 16.6657 10.0047 16.6673 10.0017 16.6673L10 16.6665L9.99841 16.6673C9.99542 16.6673 9.99245 16.6657 9.98946 16.6657C9.96191 16.6651 9.93482 16.6629 9.90808 16.6584C9.90541 16.6579 9.90266 16.6577 9.89994 16.6576C9.89527 16.6567 9.89075 16.6553 9.88611 16.6543C9.88265 16.653 9.87909 16.6519 9.87553 16.651C9.85329 16.6459 9.83172 16.6393 9.81042 16.6315C9.80464 16.6294 9.79825 16.6289 9.79252 16.6266C9.7898 16.6255 9.78709 16.6245 9.78438 16.6234C9.78147 16.6216 9.77852 16.6199 9.77543 16.6185C9.76453 16.6137 9.75425 16.6077 9.74369 16.6022C9.71984 16.5897 9.69713 16.5758 9.67533 16.5599C9.66058 16.5492 9.64588 16.5386 9.6322 16.5265C9.63002 16.5246 9.62704 16.5236 9.62488 16.5216C9.62295 16.5199 9.6207 16.5182 9.61837 16.5168C9.61499 16.5136 9.6119 16.5102 9.6086 16.507L9.56791 16.4582C9.56115 16.4494 9.55246 16.4421 9.54594 16.4329C9.54426 16.4306 9.54187 16.428 9.54024 16.4256C9.52204 16.3992 9.50507 16.3716 9.49141 16.3418L9.37179 16.0838C9.36875 16.0772 9.36715 16.0701 9.36446 16.0635L9.35958 16.0537C9.27358 15.8434 9.36397 15.6014 9.56791 15.4995L9.58582 15.4922C9.58746 15.4914 9.58904 15.4905 9.5907 15.4897L9.82237 15.3823C9.93257 15.3312 10.0596 15.3307 10.1702 15.381L10.4094 15.4897Z" fill="white"/>
          <path d="M8.6711 13.4959C8.89565 13.3923 9.16217 13.4896 9.26599 13.714L9.50281 14.23C9.58063 14.3981 9.54569 14.5899 9.42875 14.7191C9.40896 14.741 9.38639 14.7606 9.36202 14.7785C9.33856 14.7956 9.31368 14.8114 9.28634 14.8241C9.22958 14.8502 9.17014 14.8624 9.11137 14.8639C9.0348 14.8666 8.95986 14.8483 8.89246 14.8143C8.80654 14.7705 8.73345 14.7003 8.68982 14.606L8.45219 14.09L8.45138 14.0892L8.45056 14.0868C8.35597 13.8818 8.42976 13.6441 8.61414 13.5252C8.6199 13.5235 8.62553 13.5214 8.63123 13.5195C8.64439 13.5117 8.6569 13.5025 8.6711 13.4959Z" fill="white"/>
          <path d="M10.7341 13.714C10.8379 13.4896 11.1044 13.3923 11.329 13.4959C11.3432 13.5025 11.3557 13.5117 11.3689 13.5195C11.3743 13.5213 11.3796 13.5236 11.3851 13.5252C11.5699 13.644 11.6442 13.8816 11.5495 14.0868L11.5487 14.0892L11.5479 14.09L11.3103 14.606C11.2666 14.7003 11.1935 14.7705 11.1076 14.8143C11.0402 14.8483 10.9653 14.8666 10.8887 14.8639C10.8299 14.8624 10.7705 14.8502 10.7137 14.8241C10.6862 14.8113 10.6609 14.7957 10.6372 14.7785C10.6131 14.7607 10.591 14.7409 10.5713 14.7191C10.5643 14.7113 10.5582 14.7028 10.5518 14.6947C10.5296 14.6666 10.5113 14.6365 10.4965 14.6043C10.4442 14.4895 10.4401 14.3534 10.4973 14.23L10.7341 13.714Z" fill="white"/>
          <path d="M7.17289 11.6388C7.27684 11.4148 7.54356 11.318 7.76778 11.4215L8.02576 11.5404L8.13888 11.5916C8.25956 11.6472 8.35637 11.7446 8.41231 11.8651L8.5824 12.2337C8.68602 12.4579 8.5892 12.7239 8.36511 12.8278C8.34249 12.8382 8.31926 12.8455 8.29594 12.8514L8.29106 12.8522C8.26967 12.8573 8.24828 12.8613 8.22677 12.8636C8.2011 12.8667 8.1757 12.8673 8.15027 12.866C7.98977 12.8578 7.83918 12.7648 7.76697 12.6089L7.72953 12.5283C7.67627 12.4133 7.58336 12.3211 7.4683 12.2679L7.38936 12.2313C7.17378 12.1316 7.07701 11.8826 7.1615 11.6641C7.16304 11.6616 7.16492 11.6593 7.16638 11.6567C7.16879 11.6509 7.17021 11.6446 7.17289 11.6388Z" fill="white"/>
          <path d="M12.2323 11.4215C12.4565 11.318 12.7232 11.4148 12.8272 11.6388C12.8299 11.6446 12.8313 11.6509 12.8337 11.6567C12.8351 11.6592 12.8363 11.6617 12.8378 11.6641C12.9224 11.8827 12.8264 12.1315 12.6107 12.2313L12.5318 12.2679C12.4167 12.3211 12.3238 12.4133 12.2705 12.5283L12.2331 12.6089C12.1505 12.7873 11.9652 12.8837 11.7798 12.8644C11.7774 12.8642 11.775 12.8639 11.7725 12.8636C11.7261 12.8585 11.6796 12.8484 11.635 12.8278C11.4109 12.7239 11.3141 12.4579 11.4177 12.2337L11.5878 11.8651C11.6437 11.7446 11.7405 11.6472 11.8612 11.5916L11.9743 11.5404L12.2323 11.4215Z" fill="white"/>
          <path d="M10 7.50065C10.125 7.50065 10.2373 7.57878 10.2816 7.69596L10.7666 8.98991C10.8089 9.10259 10.8981 9.1918 11.0108 9.23405L12.3047 9.71908C12.4219 9.76335 12.5 9.87565 12.5 10.0007C12.5 10.1257 12.4219 10.238 12.3047 10.2822L11.0108 10.7673C10.8981 10.8095 10.8089 10.8987 10.7666 11.0114L10.2816 12.3053C10.2373 12.4225 10.125 12.5007 10 12.5007C9.87504 12.5007 9.76274 12.4225 9.71846 12.3053L9.23344 11.0114C9.19119 10.8987 9.10197 10.8095 8.9893 10.7673L7.69535 10.2822C7.57817 10.238 7.50004 10.1257 7.50004 10.0007C7.50004 9.87565 7.57817 9.76335 7.69535 9.71908L8.9893 9.23405C9.10197 9.1918 9.19119 9.10259 9.23344 8.98991L9.71846 7.69596C9.76274 7.57878 9.87504 7.50065 10 7.50065Z" fill="white"/>
          <path d="M5.17582 10.7184C5.27971 10.4938 5.54608 10.3957 5.77071 10.4995L5.87162 10.5459L5.87325 10.5467L6.28992 10.738C6.5069 10.8384 6.60331 11.0913 6.51534 11.3109C6.51294 11.3167 6.5115 11.323 6.50883 11.3288C6.50648 11.3339 6.50321 11.3385 6.50069 11.3434C6.48189 11.3813 6.45788 11.4144 6.4307 11.4443C6.36347 11.5167 6.2748 11.5643 6.17924 11.5811C6.09138 11.5974 5.998 11.5887 5.91069 11.5485L5.39473 11.3109C5.19818 11.22 5.09874 11.0044 5.14653 10.8014L5.17582 10.7184Z" fill="white"/>
          <path d="M14.2294 10.4995C14.454 10.3957 14.7204 10.4938 14.8243 10.7184L14.8536 10.8014C14.9013 11.0044 14.8019 11.22 14.6053 11.3109L14.0894 11.5485C14.0021 11.5887 13.9087 11.5974 13.8208 11.5811C13.6811 11.5566 13.5551 11.4671 13.4913 11.3288C13.4886 11.3231 13.4879 11.3166 13.4856 11.3109C13.3974 11.0913 13.4931 10.8384 13.7102 10.738L14.1268 10.5467L14.1285 10.5459L14.2294 10.4995Z" fill="white"/>
          <path d="M3.96651 9.35205C4.17017 9.274 4.401 9.36373 4.49711 9.56201L4.51013 9.59049C4.51134 9.593 4.51303 9.59528 4.5142 9.59782L4.61902 9.83038C4.66826 9.93964 4.66807 10.0648 4.61849 10.1739L4.5142 10.4035C4.51313 10.4058 4.51123 10.4077 4.51013 10.41L4.49548 10.4409C4.39952 10.6364 4.17327 10.7248 3.97139 10.6501L3.94698 10.6387C3.93704 10.6351 3.92689 10.6319 3.91687 10.6281L3.65889 10.5093C3.63045 10.4963 3.60365 10.4809 3.57833 10.4637C3.57288 10.46 3.56816 10.4554 3.56287 10.4515C3.53866 10.4339 3.51543 10.4147 3.49451 10.3937C3.48924 10.3884 3.48408 10.383 3.47904 10.3774C3.47489 10.3729 3.47165 10.3675 3.46765 10.3628C3.4513 10.3437 3.43652 10.3236 3.42289 10.3026C3.41862 10.2959 3.41467 10.2891 3.41069 10.2822C3.39638 10.2579 3.38371 10.2329 3.37325 10.2065C3.37142 10.2019 3.36926 10.1974 3.36755 10.1927C3.35907 10.1698 3.35269 10.1461 3.34721 10.1219C3.34543 10.1138 3.34375 10.1057 3.34233 10.0975C3.33705 10.0664 3.33337 10.0346 3.33337 10.0023C3.33337 10.0004 3.33417 9.99848 3.33419 9.99658C3.33437 9.96506 3.33718 9.93408 3.34233 9.90381C3.34408 9.89365 3.34653 9.8837 3.34884 9.8737C3.3539 9.8524 3.35932 9.83138 3.36674 9.81104C3.37028 9.80114 3.37405 9.7914 3.37813 9.78174C3.38778 9.75923 3.39902 9.73761 3.4115 9.71663C3.41532 9.71013 3.41882 9.70344 3.42289 9.6971C3.43664 9.67601 3.45197 9.65601 3.46847 9.63688C3.47209 9.63263 3.47529 9.62801 3.47904 9.62386V9.62223C3.48395 9.61685 3.48938 9.61196 3.49451 9.60677C3.51639 9.58487 3.54076 9.56475 3.56612 9.54655C3.57053 9.54339 3.57463 9.53982 3.57914 9.53678C3.60419 9.51987 3.6308 9.50487 3.65889 9.49202L3.9185 9.37158C3.92793 9.368 3.9376 9.36521 3.94698 9.36182L3.96651 9.35205Z" fill="white"/>
          <path d="M15.5022 9.56201C15.5981 9.36374 15.8292 9.27444 16.0328 9.35205L16.0531 9.36182C16.0622 9.36513 16.0716 9.36813 16.0808 9.37158L16.3412 9.49202C16.3691 9.50477 16.3952 9.52002 16.4201 9.53678C16.4248 9.53994 16.4294 9.54326 16.434 9.54655C16.4592 9.56464 16.483 9.58503 16.5048 9.60677C16.5099 9.61196 16.5153 9.61685 16.5202 9.62223L16.521 9.62386C16.5248 9.62801 16.528 9.63263 16.5316 9.63688C16.5481 9.65601 16.5634 9.67601 16.5772 9.6971C16.5813 9.70344 16.5848 9.71013 16.5886 9.71663C16.601 9.73751 16.6115 9.75934 16.6211 9.78174C16.6377 9.82081 16.6504 9.86145 16.6578 9.90381C16.6629 9.93408 16.6657 9.96506 16.6659 9.99658C16.6659 9.99848 16.6667 10.0004 16.6667 10.0023C16.6667 10.0735 16.6521 10.1423 16.6268 10.2065C16.6164 10.2329 16.6037 10.2579 16.5894 10.2822C16.5854 10.2891 16.5815 10.2959 16.5772 10.3026C16.5636 10.3236 16.5488 10.3437 16.5324 10.3628C16.5284 10.3675 16.5244 10.3729 16.5202 10.3774C16.4909 10.4096 16.4584 10.4389 16.4218 10.4637C16.3964 10.4809 16.3696 10.4963 16.3412 10.5093L16.0824 10.6281C16.0726 10.6317 16.0628 10.6352 16.0531 10.6387L16.0279 10.6501C15.8261 10.7244 15.5995 10.6363 15.5038 10.4409L15.4899 10.41C15.4888 10.4077 15.4869 10.4058 15.4859 10.4035L15.3814 10.176C15.3309 10.0662 15.3306 9.93988 15.3806 9.82986L15.4859 9.59782C15.4871 9.59528 15.4887 9.593 15.4899 9.59049L15.5022 9.56201Z" fill="white"/>
          <path d="M6.17354 8.41781C6.24076 8.42866 6.30491 8.45486 6.36072 8.4943C6.36594 8.49804 6.37111 8.50173 6.37618 8.5057C6.39298 8.51868 6.40844 8.5334 6.42338 8.54883C6.45414 8.58106 6.48087 8.61756 6.50151 8.6595C6.50346 8.6634 6.50616 8.66693 6.50802 8.6709C6.6098 8.89465 6.51325 9.16001 6.28992 9.26335L5.87325 9.45459L5.77071 9.50179C5.54608 9.60561 5.27971 9.50747 5.17582 9.28288C5.16739 9.26458 5.16208 9.24546 5.15629 9.22673C5.09213 9.01602 5.18924 8.78544 5.39473 8.69043L5.91069 8.4528C5.99604 8.41351 6.08742 8.40301 6.17354 8.41781Z" fill="white"/>
          <path d="M13.8265 8.41781C13.9127 8.40301 14.004 8.41351 14.0894 8.4528L14.6053 8.69043C14.8108 8.78544 14.9079 9.01602 14.8438 9.22673C14.838 9.24546 14.8327 9.26458 14.8243 9.28288C14.7204 9.50747 14.454 9.60561 14.2294 9.50179L14.1268 9.45459L13.7102 9.26335C13.4869 9.16006 13.3897 8.89459 13.4913 8.6709C13.5562 8.53141 13.6849 8.44067 13.8265 8.41781Z" fill="white"/>
          <path d="M8.08191 7.14258C8.12914 7.13285 8.17781 7.13014 8.22677 7.13607C8.24823 7.1384 8.26974 7.14218 8.29106 7.14746L8.29594 7.14827C8.31935 7.15435 8.34238 7.16303 8.36511 7.1735C8.56102 7.26434 8.65923 7.47893 8.61169 7.68131C8.60496 7.70958 8.59583 7.73771 8.58321 7.76514L8.41231 8.13623C8.35637 8.25674 8.25956 8.35409 8.13888 8.40967L8.02576 8.46094L7.76778 8.57975C7.54356 8.6833 7.27684 8.58647 7.17289 8.36247C7.17011 8.35645 7.16888 8.34982 7.16638 8.34375C7.16463 8.34069 7.16259 8.33779 7.16069 8.3348C7.07785 8.11681 7.17457 7.86935 7.38936 7.77002L7.4683 7.7334C7.58336 7.68022 7.67627 7.58801 7.72953 7.47298L7.76697 7.39242C7.82881 7.25894 7.9481 7.17047 8.08191 7.14258Z" fill="white"/>
          <path d="M11.7798 7.13525C11.9651 7.11604 12.1505 7.21406 12.2331 7.39242L12.2705 7.47298C12.3238 7.58801 12.4167 7.68022 12.5318 7.7334L12.6107 7.77002C12.8256 7.86939 12.9216 8.11674 12.8386 8.3348C12.8368 8.33767 12.8354 8.34081 12.8337 8.34375C12.8312 8.34982 12.83 8.35645 12.8272 8.36247C12.8018 8.41716 12.7665 8.46398 12.7246 8.50244C12.7224 8.50452 12.7197 8.5061 12.7173 8.50814C12.588 8.62224 12.3988 8.65664 12.2323 8.57975L11.9743 8.46094L11.8612 8.40967C11.7405 8.35409 11.6437 8.25674 11.5878 8.13623L11.4169 7.76514C11.4042 7.73766 11.3943 7.70964 11.3876 7.68131C11.3401 7.47899 11.4391 7.26431 11.635 7.1735C11.6797 7.1529 11.7261 7.14117 11.7725 7.13607C11.7749 7.13577 11.7774 7.13551 11.7798 7.13525Z" fill="white"/>
          <path d="M9.18949 5.14632C9.1935 5.14715 9.19771 5.14701 9.2017 5.14795C9.22997 5.15459 9.25812 5.16391 9.28552 5.17643C9.31373 5.18956 9.33961 5.20577 9.36365 5.22363C9.45286 5.28964 9.51067 5.38576 9.53292 5.49056C9.55232 5.58202 9.54494 5.67999 9.50281 5.77132L9.26599 6.28727C9.16217 6.5117 8.89565 6.60897 8.6711 6.50537C8.65677 6.49874 8.6445 6.48886 8.63123 6.48096C8.62472 6.47885 8.61831 6.47634 8.61169 6.47445C8.42914 6.35505 8.35639 6.11858 8.45056 5.91455L8.51648 5.77214L8.68982 5.39534C8.71856 5.33319 8.75929 5.2802 8.80863 5.23909C8.8927 5.16966 9.00036 5.13309 9.10974 5.13656H9.11381C9.13907 5.13735 9.16427 5.14113 9.18949 5.14632Z" fill="white"/>
          <path d="M10.8903 5.13656C10.9995 5.13309 11.1066 5.16992 11.1906 5.23909C11.2402 5.28026 11.2814 5.33298 11.3103 5.39534L11.4836 5.77214L11.5495 5.91455C11.6438 6.1188 11.5706 6.35517 11.3876 6.47445C11.3812 6.47627 11.3751 6.47893 11.3689 6.48096C11.3556 6.48886 11.3433 6.49874 11.329 6.50537C11.1044 6.60897 10.8379 6.5117 10.7341 6.28727L10.4973 5.77132C10.4551 5.67999 10.4478 5.58202 10.4672 5.49056C10.4894 5.38576 10.5472 5.28964 10.6364 5.22363C10.6603 5.20591 10.6858 5.1895 10.7137 5.17643C10.7696 5.15079 10.8284 5.13837 10.8863 5.13656H10.8903Z" fill="white"/>
          <path d="M10.0106 3.3348C10.0381 3.3354 10.0653 3.33759 10.092 3.34212H10.0953C10.1029 3.34343 10.1105 3.34539 10.118 3.34701C10.1203 3.34772 10.1223 3.34892 10.1246 3.34945C10.1468 3.3546 10.1684 3.36122 10.1897 3.36898C10.1952 3.37101 10.2012 3.37179 10.2067 3.37386C10.2103 3.37525 10.2138 3.37647 10.2173 3.37793C10.2198 3.37925 10.2221 3.38088 10.2246 3.382C10.2355 3.38682 10.2458 3.39278 10.2564 3.39827C10.2802 3.41078 10.303 3.42474 10.3247 3.44059C10.3395 3.45123 10.3542 3.46189 10.3679 3.47396C10.3702 3.47599 10.3729 3.47758 10.3752 3.47965C10.3769 3.48116 10.3789 3.4825 10.3809 3.48372C10.3847 3.48725 10.3886 3.49067 10.3923 3.4943C10.3975 3.50048 10.4024 3.50699 10.4078 3.51302C10.4164 3.52234 10.4242 3.53238 10.4322 3.54232C10.4391 3.55124 10.4475 3.55906 10.4541 3.56836C10.4558 3.5707 10.4582 3.57333 10.4598 3.57568C10.478 3.60208 10.495 3.62965 10.5087 3.65951L10.6283 3.91748C10.6312 3.92383 10.633 3.9306 10.6356 3.93701L10.6389 3.94434C10.7268 4.15432 10.6373 4.39518 10.4346 4.49854L10.4167 4.50749C10.4142 4.5087 10.4119 4.51039 10.4094 4.51156L10.1763 4.61897C10.0664 4.66962 9.93997 4.67 9.82978 4.62002L9.5907 4.51156C9.58816 4.51039 9.58588 4.5087 9.58337 4.50749L9.56466 4.49854C9.36247 4.39504 9.2728 4.15403 9.36039 3.94434L9.36446 3.93701C9.36707 3.9306 9.36886 3.92383 9.37179 3.91748L9.49141 3.65951C9.50507 3.62965 9.52204 3.60208 9.54024 3.57568C9.54187 3.57333 9.54426 3.5707 9.54594 3.56836C9.55259 3.55906 9.56101 3.55124 9.56791 3.54232C9.57592 3.53238 9.5837 3.52234 9.59233 3.51302C9.59759 3.50712 9.60188 3.50036 9.60697 3.4943C9.61067 3.49066 9.61457 3.48725 9.61837 3.48372C9.62059 3.48237 9.62305 3.48131 9.62488 3.47965C9.62717 3.47758 9.62988 3.47599 9.6322 3.47396C9.64588 3.46189 9.66058 3.45123 9.67533 3.44059C9.69711 3.42474 9.71986 3.41078 9.74369 3.39827C9.75424 3.39278 9.76454 3.38682 9.77543 3.382C9.77776 3.38097 9.77969 3.37914 9.78194 3.37793C9.78543 3.37647 9.78901 3.37525 9.79252 3.37386C9.79826 3.37162 9.80465 3.3711 9.81042 3.36898C9.8317 3.36122 9.85332 3.3546 9.87553 3.34945C9.87753 3.34898 9.87926 3.34763 9.88123 3.34701C9.88881 3.34538 9.89634 3.34344 9.90401 3.34212H9.90808C9.93478 3.33759 9.96195 3.3354 9.98946 3.3348C9.99245 3.33474 9.99542 3.33398 9.99841 3.33398H10.0017C10.0047 3.33398 10.0076 3.33474 10.0106 3.3348Z" fill="white"/>
    `;
  }
  return e;
};
function gi(t) {
  if (t.getElementById("cartridge-toast-marketplace-styles"))
    return;
  const e = t.createElement("style");
  e.id = "cartridge-toast-marketplace-styles", e.textContent = `
    /* Marketplace Toast */
    .cartridge-toast.marketplace {
      background-color: #1E221F;
      border-radius: 4px;
      width: 400px;
      padding: 12px;
      padding-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
    }

    .cartridge-toast.marketplace .image-container {
      display: flex;
      padding: 3px;
      align-items: center;
      gap: 10px;
      border-radius: 4px;
      background: #161A17;
    }

    .cartridge-toast.marketplace .image-content-container {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .cartridge-toast.marketplace .image {
      display: flex;
      width: 34px;
      height: 34px;
      padding: 2px;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1/1;
      border-radius: 2px;
      background: #000;
      flex-shrink: 0;
    }

    .cartridge-toast.marketplace .content {
      display: flex;
      height: 40px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 2px;
    }

    .cartridge-toast.marketplace .title {
      color: #FFF;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 142.857% */
    }

    .cartridge-toast.marketplace .item-name {
    color: #808080;
    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
    }

    .cartridge-toast.marketplace .close-button-container {
      display: flex;
      padding: 4px;
      align-items: center;
      gap: 10px;
    }
  `, t.head.appendChild(e);
}
function mi(t) {
  const e = document.createElement("div");
  e.className = "cartridge-toast marketplace";
  const n = document.createElement("div");
  n.className = "image-content-container";
  const r = document.createElement("div");
  r.className = "image-container";
  const s = document.createElement("img");
  s.className = "image", s.src = K(t.itemImages[0]), s.alt = t.itemNames[0], r.appendChild(s);
  const i = document.createElement("div");
  i.className = "content";
  const o = {
    purchased: "Purchased!",
    sold: "Sold!",
    sent: "Sent!",
    listed: "Listed!",
    unlisted: "Unlisted!"
  }, a = document.createElement("p");
  a.className = "title", a.textContent = o[t.action];
  const l = document.createElement("p");
  l.className = "item-name", l.textContent = t.itemNames[0], i.appendChild(a), i.appendChild(l), n.appendChild(r), n.appendChild(i);
  const c2 = document.createElement("div");
  c2.className = "close-button-container";
  const d = de2(false);
  return c2.appendChild(d), e.appendChild(n), e.appendChild(c2), e;
}
function yi(t) {
  if (t.getElementById("cartridge-toast-quest-styles"))
    return;
  const e = t.createElement("style");
  e.id = "cartridge-toast-quest-styles", e.textContent = `
    /* Quest Toast */
    .cartridge-toast.quest {
      background-color: #161A17;
      border-radius: 8px;
      width: 360px;
      padding: 12px;
      padding-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
      min-height: 52px;
      box-sizing: border-box;
    }

    .cartridge-toast.quest .image-content-container {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
    }

    .cartridge-toast.quest .image {
      width: 30px;
      height: 30px;
      aspect-ratio: 1/1;
    }

    .cartridge-toast.quest .image-container {
      display: flex;
      padding: 5px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 4px;
      background: #161A17;
    }

    .cartridge-toast.quest .content {
      display: flex;
      height: 40px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 2px;
    }

    .cartridge-toast.quest .title {
      color: #FFF;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
    }

    .cartridge-toast.quest .subtitle {
      color: #808080;
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
    }

    .cartridge-toast.quest .xp-section-container {
      display: flex;
      padding: 10px;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    .cartridge-toast.quest .xp-section {
      display: flex;
      align-items: center;
      gap: 2px;
      align-self: stretch;
    }

    .cartridge-toast.quest .xp-section .xp-icon {
      width: 20px;
      height: 20px;
      aspect-ratio: 1/1;
    }

    .cartridge-toast.quest .xp-section .xp-amount {
      color: #FFF;
      /* Inter/Regular 14px */
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 142.857% */
    }
  `, t.head.appendChild(e);
}
function Ci(t) {
  const e = document.createElement("div");
  e.className = "cartridge-toast quest";
  const n = document.createElement("div");
  n.className = "image-content-container";
  const r = document.createElement("div");
  r.className = "image-container";
  const s = bi();
  s.className = "image", r.appendChild(s);
  const i = document.createElement("div");
  i.className = "content";
  const o = document.createElement("p");
  o.className = "title", o.textContent = t.title;
  const a = document.createElement("p");
  a.className = "subtitle", a.textContent = t.subtitle || "Earned!", i.appendChild(o), i.appendChild(a), n.appendChild(r), n.appendChild(i);
  const l = de2(false);
  return e.appendChild(n), e.appendChild(l), e;
}
var bi = () => {
  const t = document.createElement("div"), e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  return e.setAttribute("width", "34"), e.setAttribute("height", "34"), e.setAttribute("viewBox", "0 0 30 30"), e.style.width = "100%", e.style.height = "100%", e.innerHTML = '<path d="M3 6.5V8C3 8.55312 3.44687 9 4 9H4.5H6V6.5C6 5.67188 5.32812 5 4.5 5C3.67188 5 3 5.67188 3 6.5ZM6.5 5C6.8125 5.41875 7 5.9375 7 6.5V16C7 17.1031 7.89687 18 9 18C10.1031 18 11 17.1031 11 16V15.8344C11 14.8219 11.8219 14 12.8344 14H18V8C18 6.34375 16.6562 5 15 5H6.5ZM17.5 19C19.4344 19 21 17.4344 21 15.5C21 15.225 20.775 15 20.5 15H12.8344C12.375 15 12 15.3719 12 15.8344V16C12 17.6562 10.6562 19 9 19H14.5H17.5Z" fill="white"/>', t.appendChild(e), t;
};
var ki = (t) => {
  const e = t.borderRadius ?? 8, n = !isFinite(t.duration) || t.duration <= 0, r = document.createElement("div");
  r.className = "cartridge-toast-progress-bar", r.style.position = "absolute", r.style.bottom = "0", r.style.left = "0", r.style.right = "0", r.style.height = "4px", r.style.overflow = "hidden", r.style.borderBottomLeftRadius = `${e}px`, r.style.borderBottomRightRadius = `${e}px`, r.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
  const s = document.createElement("div");
  return s.className = "cartridge-toast-progress-bar-fill", s.style.position = "absolute", s.style.bottom = "0", s.style.left = "0", s.style.height = "100%", s.style.backgroundColor = "rgba(255, 255, 255, 0.8)", s.style.borderBottomLeftRadius = `${e}px`, n ? (s.style.width = "100%", s.style.transition = "none") : (s.style.width = "0%", s.style.transition = `width ${t.duration}ms linear`, requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      s.style.width = "100%";
    });
  }), t.onComplete && setTimeout(() => {
    t.onComplete?.();
  }, t.duration)), r.appendChild(s), r;
};
function Tt(t, e, n, r) {
  const s = ki({
    duration: e,
    onComplete: n,
    borderRadius: r
  });
  t.appendChild(s);
}
function xi(t) {
  switch (t.variant) {
    case "error":
      return ai(t);
    case "transaction":
      return li(t);
    case "network-switch":
      return hi(t);
    case "achievement":
      return fi(t);
    case "quest":
      return Ci(t);
    case "marketplace":
      return mi(t);
  }
}
function vi(t, e) {
  switch (e) {
    case "error":
      oi(t);
      break;
    case "transaction":
      ci(t);
      break;
    case "network-switch":
      di(t);
      break;
    case "achievement":
      ui(t);
      break;
    case "quest":
      yi(t);
      break;
    case "marketplace":
      gi(t);
      break;
  }
}
function Ye(t, e) {
  si(t), vi(t, e.variant);
  const n = e.position || ei, r = ni(t, n), s = xi(e), i = () => ri(s);
  r.appendChild(s), e.onClick && (s.style.cursor = "pointer", s.addEventListener("click", (d) => {
    !d.target.closest("#close-button") && e.onClick && e.onClick();
  }));
  const o = s.querySelector("#close-button");
  o && o.addEventListener("click", (d) => {
    d.stopPropagation(), i();
  });
  let a = null;
  const l = e.duration ?? Qs, c2 = !isFinite(l) || l <= 0;
  if (e.variant !== "network-switch") {
    const d = e.variant === "error" || e.variant === "transaction" ? 8 : 4;
    c2 ? Tt(s, 1 / 0, () => {
    }, d) : Tt(s, l, i, d);
  } else c2 || (a = setTimeout(i, l));
  return () => {
    a && clearTimeout(a), i();
  };
}
var Nt = false;
function An() {
  Nt || typeof window > "u" || ut() || (window.addEventListener("message", (t) => {
    if (t.data?.type === En && t.data?.options) {
      const e = document;
      e && Ye(e, t.data.options);
    }
  }), Nt = true);
}
function Ei(t) {
  if (typeof window > "u" || typeof document > "u")
    return console.warn("Toast can only be used in a browser environment"), () => {
    };
  if (An(), ut()) {
    const e = ti();
    if (e)
      return Ye(e, t);
    try {
      window.parent && window.parent.postMessage(
        {
          type: En,
          options: t
        },
        "*"
        // In production, specify target origin
      );
    } catch (n) {
      console.warn("Failed to send toast message to parent:", n);
    }
    return () => {
    };
  } else
    return Ye(document, t);
}
typeof window < "u" && An();
var Ai = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  toast: Ei
}, Symbol.toStringTag, { value: "Module" }));
export {
  G as ALL_AUTH_OPTIONS,
  h as AUTH_EXTERNAL_WALLETS,
  Jr as ArgentWallet,
  rs as BaseWallet,
  Ws as BraavosWallet,
  D as EMBEDDED_WALLETS,
  C as EXTERNAL_WALLETS,
  k as EXTRA_EXTERNAL_WALLETS,
  Ae as EthereumWalletBase,
  w as FeeSource,
  m as HeadlessAuthenticationError,
  x as HeadlessModeNotSupportedError,
  V as IMPLEMENTED_AUTH_OPTIONS,
  A as InvalidCredentialsError,
  ss as MetaMaskWallet,
  M as NotReadyToConnect,
  js as PhantomEVMWallet,
  zs as PhantomWallet,
  Hs as RabbyWallet,
  Y as ResponseCodes,
  qs as WalletBridge,
  Pe as chainIdToPlatform,
  Pi as default,
  ne as defaultTheme,
  re as erc20Metadata,
  se as getAvailableConfigs,
  p as getConfigsIndex,
  $ as getPresetSessionPolicies,
  L as humanizeString,
  le as loadAllConfigs,
  de as loadConfig,
  _i as lookupAddresses,
  Ys as lookupUsername,
  Li as lookupUsernames,
  F as normalizeCalls,
  X as parseChainId,
  oe as parsePolicies,
  K as sanitizeImageSrc,
  g as toArray,
  R as toSessionPolicies,
  J as toWasmPolicies,
  Ei as toast
};
/*! Bundled license information:

@cartridge/controller/dist/index.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
  (*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
