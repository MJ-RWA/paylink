import {
  BaseWallet,
  Tx,
  assertSafeHttpUrl,
  checkDeployed,
  ensureWalletReady,
  preflightTransaction,
  sponsoredDetails
} from "./chunk-MXWUSOZN.mjs";
import "./chunk-FMBTOKMI.mjs";
import "./chunk-IX2XH525.mjs";
import "./chunk-VP7WVUCP.mjs";
import {
  fromAddress,
  getChainId
} from "./chunk-XZWI72IE.mjs";
import "./chunk-TJFISUBQ.mjs";

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/wallet/cartridge.js
import { RpcProvider } from "starknet";
var NEGATIVE_DEPLOYMENT_CACHE_TTL_MS = 3e3;
var MAX_CONTROLLER_WAIT_MS = 1e4;
var INITIAL_CONTROLLER_POLL_MS = 100;
var MAX_CONTROLLER_POLL_MS = 1e3;
function cartridgeDependencyError(extra) {
  return new Error("Cartridge integration requires '@cartridge/controller'. Install it in your app dependencies to use connectCartridge()." + (extra ? ` ${extra}` : ""));
}
async function loadCartridgeControllerModule() {
  let imported;
  try {
    imported = await import("./dist-7ZFQ2A6K.mjs");
  } catch (error) {
    const details = error instanceof Error && error.message ? `Original error: ${error.message}` : void 0;
    throw cartridgeDependencyError(details);
  }
  const mod = imported;
  if (typeof mod.default !== "function" || typeof mod.toSessionPolicies !== "function") {
    throw cartridgeDependencyError("Loaded module does not expose expected exports.");
  }
  return mod;
}
var CartridgeWallet = class _CartridgeWallet extends BaseWallet {
  constructor(controller, walletAccount, provider, chainId, classHash, stakingConfig, bridgingConfig, options = {}) {
    super({
      address: fromAddress(walletAccount.address),
      stakingConfig,
      bridgingConfig
    });
    this.deployedCache = null;
    this.deployedCacheExpiresAt = 0;
    this.controller = controller;
    this.walletAccount = walletAccount;
    this.provider = provider;
    this.classHash = classHash;
    this.chainId = chainId;
    this.explorerConfig = options.explorer;
    this.defaultFeeMode = options.feeMode ?? "user_pays";
    this.defaultTimeBounds = options.timeBounds;
  }
  /**
   * Create and connect a CartridgeWallet.
   */
  static async create(options = {}, stakingConfig, bridgingConfig) {
    const { default: Controller, toSessionPolicies } = await loadCartridgeControllerModule();
    const controllerOptions = {};
    if (options.chainId) {
      controllerOptions.defaultChainId = options.chainId.toFelt252();
    }
    if (options.rpcUrl) {
      const rpcUrl = assertSafeHttpUrl(options.rpcUrl, "Cartridge RPC URL").toString();
      controllerOptions.chains = [{ rpcUrl }];
    }
    if (options.policies && options.policies.length > 0) {
      controllerOptions.policies = toSessionPolicies(options.policies);
    }
    if (options.preset) {
      controllerOptions.preset = options.preset;
    }
    if (options.url) {
      controllerOptions.url = assertSafeHttpUrl(options.url, "Cartridge controller URL").toString();
    }
    const controller = new Controller(controllerOptions);
    let waited = 0;
    let pollIntervalMs = INITIAL_CONTROLLER_POLL_MS;
    while (!controller.isReady() && waited < MAX_CONTROLLER_WAIT_MS) {
      const sleepMs = Math.min(pollIntervalMs, MAX_CONTROLLER_WAIT_MS - waited);
      await new Promise((resolve) => setTimeout(resolve, sleepMs));
      waited += sleepMs;
      pollIntervalMs = Math.min(pollIntervalMs * 2, MAX_CONTROLLER_POLL_MS);
    }
    if (!controller.isReady()) {
      throw new Error("Cartridge Controller failed to initialize. Please try again.");
    }
    const connectedAccount = await controller.connect();
    if (!isCartridgeWalletAccount(connectedAccount)) {
      throw new Error("Cartridge connection failed. Make sure popups are allowed and try again.");
    }
    const walletAccount = connectedAccount;
    const nodeUrl = assertSafeHttpUrl(options.rpcUrl ?? controller.rpcUrl(), "Cartridge RPC URL").toString();
    const provider = new RpcProvider({ nodeUrl });
    let classHash = "0x0";
    try {
      classHash = await provider.getClassHashAt(fromAddress(walletAccount.address));
    } catch {
    }
    const chainId = options.chainId ?? await getChainId(provider);
    return new _CartridgeWallet(controller, walletAccount, provider, chainId, classHash, stakingConfig, bridgingConfig, options);
  }
  async isDeployed() {
    const now = Date.now();
    if (this.deployedCache === true) {
      return true;
    }
    if (this.deployedCache === false && now < this.deployedCacheExpiresAt) {
      return false;
    }
    const deployed = await checkDeployed(this.provider, this.address);
    if (deployed) {
      this.deployedCache = true;
      this.deployedCacheExpiresAt = Number.POSITIVE_INFINITY;
    } else {
      this.deployedCache = false;
      this.deployedCacheExpiresAt = now + NEGATIVE_DEPLOYMENT_CACHE_TTL_MS;
    }
    return deployed;
  }
  clearDeploymentCache() {
    this.deployedCache = null;
    this.deployedCacheExpiresAt = 0;
  }
  async ensureReady(options = {}) {
    return ensureWalletReady(this, options);
  }
  async deploy(options = {}) {
    if (options.feeMode !== void 0 || options.timeBounds !== void 0) {
      throw new Error("CartridgeWallet.deploy() does not support DeployOptions overrides; deployment mode is controlled by Cartridge Controller.");
    }
    this.clearDeploymentCache();
    const result = await this.controller.keychain?.deploy?.();
    if (!result || result.code !== "SUCCESS" || !result.transaction_hash) {
      throw new Error(result?.message ?? "Cartridge deployment failed");
    }
    return new Tx(result.transaction_hash, this.provider, this.chainId, this.explorerConfig);
  }
  async execute(calls, options = {}) {
    const feeMode = options.feeMode ?? this.defaultFeeMode;
    const timeBounds = options.timeBounds ?? this.defaultTimeBounds;
    let transaction_hash;
    if (feeMode === "sponsored") {
      transaction_hash = (await this.walletAccount.executePaymasterTransaction(calls, sponsoredDetails(timeBounds))).transaction_hash;
    } else {
      const deployed = await this.isDeployed();
      if (!deployed) {
        throw new Error('Account is not deployed. Call wallet.ensureReady({ deploy: "if_needed" }) before execute() in user_pays mode.');
      }
      transaction_hash = (await this.walletAccount.execute(calls)).transaction_hash;
    }
    return new Tx(transaction_hash, this.provider, this.chainId, this.explorerConfig);
  }
  async signMessage(typedData) {
    return this.walletAccount.signMessage(typedData);
  }
  async preflight(options) {
    const feeMode = options.feeMode ?? this.defaultFeeMode;
    return preflightTransaction(this, this.walletAccount, {
      ...options,
      feeMode
    });
  }
  getAccount() {
    return this.walletAccount;
  }
  getProvider() {
    return this.provider;
  }
  getChainId() {
    return this.chainId;
  }
  getFeeMode() {
    return this.defaultFeeMode;
  }
  getClassHash() {
    return this.classHash;
  }
  async estimateFee(calls) {
    return this.walletAccount.estimateInvokeFee(calls);
  }
  /**
   * Get the Cartridge Controller instance for Cartridge-specific features.
   */
  getController() {
    return this.controller;
  }
  async disconnect() {
    this.clearCaches();
    this.clearDeploymentCache();
    await this.controller.disconnect();
  }
  /**
   * Get the Cartridge username for this wallet.
   */
  async username() {
    return this.controller.username();
  }
};
function isCartridgeWalletAccount(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  const account = value;
  return typeof account.address === "string" && typeof account.execute === "function" && typeof account.executePaymasterTransaction === "function" && typeof account.signMessage === "function" && typeof account.simulateTransaction === "function" && typeof account.estimateInvokeFee === "function";
}
export {
  CartridgeWallet
};
