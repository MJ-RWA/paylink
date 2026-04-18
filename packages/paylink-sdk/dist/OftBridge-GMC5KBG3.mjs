import {
  EthereumBridge
} from "./chunk-XW5UPK5M.mjs";
import {
  fromEthereumAddress
} from "./chunk-FMBTOKMI.mjs";
import {
  Interface,
  getAddress
} from "./chunk-IX2XH525.mjs";
import "./chunk-VP7WVUCP.mjs";
import {
  FeeErrorCause
} from "./chunk-AVMFVQWJ.mjs";
import {
  Amount,
  ExternalChain,
  fromAddress
} from "./chunk-XZWI72IE.mjs";
import "./chunk-TJFISUBQ.mjs";

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/bridge/ethereum/oft/LayerZeroApi.js
var LAYERZERO_API_BASE = "https://transfer.layerzero-api.com/v1";
var LayerZeroApi = class {
  constructor(config, fetcher) {
    this.config = config;
    if (fetcher) {
      this.fetcher = fetcher;
    } else if (typeof globalThis.fetch === "function") {
      this.fetcher = globalThis.fetch.bind(globalThis);
    } else {
      throw new Error("No fetch implementation available. Provide fetcher in LayerZeroApi.");
    }
  }
  async getDepositQuotes(params) {
    return this.getQuotes({
      srcChainKey: this.config.externalChainKey,
      srcTokenAddress: this.config.externalTokenAddress,
      dstChainKey: "starknet",
      dstTokenAddress: this.config.starknetTokenAddress,
      ...params
    });
  }
  getApprovalTransaction(quotes) {
    const quote = quotes[0];
    if (!quote)
      return null;
    try {
      const approveStep = quote.userSteps.find((step) => step.description === "approve");
      return approveStep?.transaction.encoded ?? null;
    } catch {
      return null;
    }
  }
  getDepositTransaction(quotes) {
    return this.getBridgeTransaction(quotes);
  }
  /**
   * Extract the allowance spender from an approval transaction's calldata.
   * Parses `approve(address,uint256)` to retrieve the spender argument.
   */
  extractSpenderFromApprovalTx(approvalTx) {
    if (!approvalTx?.data)
      return null;
    try {
      const approveInterface = new Interface([
        "function approve(address spender, uint256 value)"
      ]);
      const decoded = approveInterface.parseTransaction({
        data: approvalTx.data
      });
      const spender = decoded?.args[0];
      return spender ? fromEthereumAddress(spender, { getAddress }) : null;
    } catch {
      return null;
    }
  }
  async getQuotes(params) {
    const response = await this.fetcher(`${LAYERZERO_API_BASE}/quotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.config.apiKey ? { "x-api-key": this.config.apiKey } : {}
      },
      body: JSON.stringify({
        ...params,
        amount: params.amount.toBase().toString(),
        options: {
          amountType: "EXACT_SRC_AMOUNT",
          feeTolerance: { type: "PERCENT", amount: 1 },
          dstNativeDropAmount: "0"
        }
      })
    });
    if (!response.ok) {
      throw new Error(`LayerZero API request failed (${response.status}): ${await response.text()}`);
    }
    const data = await response.json();
    return data.quotes;
  }
  getBridgeTransaction(quotes) {
    const quote = quotes[0];
    if (!quote)
      return null;
    try {
      const bridgeStep = quote.userSteps.find((step) => step.description === "bridge");
      return bridgeStep?.transaction.encoded ?? null;
    } catch {
      return null;
    }
  }
};

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/bridge/ethereum/oft/constants.js
var DEFAULT_OFT_DEPOSIT_GAS_REQUIREMENT = 250000n;
var DEFAULT_OFT_MIN_AMOUNT = "1";
var OFT_MIN_AMOUNT_BY_TOKEN_ID = {
  solvbtc: "10000000000"
};

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/bridge/ethereum/oft/OftBridge.js
var DUMMY_SN_ADDRESS = fromAddress("0x023123100123103023123acb1231231231231031231ca123f23123123123100a");
var DUMMY_ETH_ADDRESS = "0x0000000000000000000000000000000000000001";
var DUMMY_DEPOSIT_TX_CACHE_TTL_MS = 6e4;
var OftBridge = class extends EthereumBridge {
  constructor(bridgeToken, config, starknetWallet, apiKey) {
    super(bridgeToken, config, starknetWallet, []);
    this.dummyDepositTxCache = null;
    const chainId = starknetWallet.getChainId();
    if (!chainId.isMainnet()) {
      throw new Error("OFT bridging is only supported on Starknet Mainnet. The LayerZero Value Transfer API does not support testnets.");
    }
    this.layerZeroApi = new LayerZeroApi({
      externalTokenAddress: bridgeToken.address,
      starknetTokenAddress: bridgeToken.starknetAddress,
      externalChainKey: ExternalChain.ETHEREUM,
      apiKey
    });
  }
  async deposit(recipient, amount, _options) {
    await this.approveSpendingOf(amount);
    const signerAddress = await this.config.signer.getAddress();
    const quotes = await this.layerZeroApi.getDepositQuotes({
      srcWalletAddress: signerAddress,
      dstWalletAddress: recipient,
      amount
    });
    const depositTx = this.layerZeroApi.getDepositTransaction(quotes);
    if (!depositTx) {
      throw new Error("Failed to get OFT deposit transaction from LayerZero API.");
    }
    const response = await this.execute(depositTx);
    this.clearCachedAllowance();
    this.clearDummyDepositTxCache();
    return { hash: response.hash };
  }
  async getDepositFeeEstimate(_options) {
    const [allowance, dummyDepositTx, approvalFeeEstimation] = await Promise.all([
      this.getAllowance(),
      this.getDummyDepositTx(),
      this.estimateApprovalFee()
    ]);
    const { approvalFee, approvalFeeError } = approvalFeeEstimation;
    const interchainFee = this.ethAmount(BigInt(dummyDepositTx?.value?.toString() ?? "0"));
    let l1Fee;
    let l1FeeError;
    const needsFallback = allowance !== null && allowance.isZero();
    if (needsFallback || !dummyDepositTx) {
      const feeDecimal = DEFAULT_OFT_DEPOSIT_GAS_REQUIREMENT * await this.getEthereumGasPrice();
      l1Fee = this.ethAmount(feeDecimal);
      if (!dummyDepositTx) {
        l1FeeError = FeeErrorCause.GENERIC_L1_FEE_ERROR;
      }
    } else {
      try {
        const [gasUnits, gasPrice] = await Promise.all([
          this.config.provider.estimateGas(dummyDepositTx),
          this.getEthereumGasPrice()
        ]);
        l1Fee = this.ethAmount(gasUnits * gasPrice);
      } catch {
        l1Fee = this.ethAmount(0n);
        l1FeeError = FeeErrorCause.GENERIC_L1_FEE_ERROR;
      }
    }
    return {
      l1Fee,
      l1FeeError,
      l2Fee: interchainFee,
      interchainFee,
      approvalFee,
      approvalFeeError
    };
  }
  async getAllowanceSpender() {
    if (this.cachedSpender !== void 0) {
      return this.cachedSpender;
    }
    try {
      const quotes = await this.layerZeroApi.getDepositQuotes({
        srcWalletAddress: DUMMY_ETH_ADDRESS,
        dstWalletAddress: DUMMY_SN_ADDRESS.toString(),
        amount: this.getOftMinAmount()
      });
      const approvalTx = this.layerZeroApi.getApprovalTransaction(quotes);
      this.cachedSpender = this.layerZeroApi.extractSpenderFromApprovalTx(approvalTx);
    } catch {
      this.cachedSpender = void 0;
      return null;
    }
    return this.cachedSpender;
  }
  async getEthereumGasPrice() {
    const gasData = await this.config.provider.getFeeData();
    const gasPrice = gasData.gasPrice ?? 0n;
    const maxFeePerGas = gasData.maxFeePerGas;
    return maxFeePerGas && gasData.maxPriorityFeePerGas ? maxFeePerGas : gasPrice;
  }
  getOftMinAmount() {
    const amountBase = OFT_MIN_AMOUNT_BY_TOKEN_ID[this.bridgeToken.id] ?? DEFAULT_OFT_MIN_AMOUNT;
    return Amount.fromRaw(amountBase, this.bridgeToken.decimals, this.bridgeToken.symbol);
  }
  getDummyDepositTx() {
    const now = Date.now();
    const cached = this.dummyDepositTxCache;
    if (cached && now - cached.createdAt < DUMMY_DEPOSIT_TX_CACHE_TTL_MS) {
      return cached.promise;
    }
    const promise = this.fetchDummyDepositTx().then((tx) => {
      if (!tx && this.dummyDepositTxCache?.promise === promise) {
        this.dummyDepositTxCache = null;
      }
      return tx;
    });
    this.dummyDepositTxCache = { promise, createdAt: now };
    return promise;
  }
  async fetchDummyDepositTx() {
    try {
      const signerAddress = await this.config.signer.getAddress();
      const quotes = await this.layerZeroApi.getDepositQuotes({
        srcWalletAddress: signerAddress,
        dstWalletAddress: DUMMY_SN_ADDRESS.toString(),
        amount: this.getOftMinAmount()
      });
      return this.layerZeroApi.getDepositTransaction(quotes);
    } catch {
      return null;
    }
  }
  clearDummyDepositTxCache() {
    this.dummyDepositTxCache = null;
  }
};
export {
  OftBridge
};
