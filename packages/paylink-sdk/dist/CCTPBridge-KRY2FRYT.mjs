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
  fromAddress
} from "./chunk-XZWI72IE.mjs";
import "./chunk-TJFISUBQ.mjs";

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/bridge/ethereum/cctp/constants.js
var ETHEREUM_DOMAIN_ID = 0;
var STARKNET_DOMAIN_ID = 25;
var ETH_FAST_TRANSFER_FEE_BP = 1;
var STARKNET_FAST_TRANSFER_FEE_BP = 14;
var FAST_TRANSFER_FINALITY_THRESHOLD = 1e3;
var STANDARD_TRANSFER_FINALITY_THRESHOLD = 2e3;
var LIVE_DOMAIN = "https://iris-api.circle.com";
var SANDBOX_DOMAIN = "https://iris-api-sandbox.circle.com";
function getFinalityThreshold(fastTransfer) {
  return fastTransfer ? FAST_TRANSFER_FINALITY_THRESHOLD : STANDARD_TRANSFER_FINALITY_THRESHOLD;
}

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/bridge/ethereum/cctp/CCTPFees.js
var BridgeDirection;
(function(BridgeDirection2) {
  BridgeDirection2[BridgeDirection2["WITHDRAW_FROM_STARKNET"] = 0] = "WITHDRAW_FROM_STARKNET";
  BridgeDirection2[BridgeDirection2["DEPOSIT_TO_STARKNET"] = 1] = "DEPOSIT_TO_STARKNET";
})(BridgeDirection || (BridgeDirection = {}));
var CCTPFees = class _CCTPFees {
  constructor() {
  }
  static getInstance() {
    if (!_CCTPFees.instance) {
      _CCTPFees.instance = new _CCTPFees();
    }
    return _CCTPFees.instance;
  }
  async getMinimumFeeBps(direction, chainId, fastTransfer) {
    try {
      const feeData = await this.getFees(direction, chainId);
      if (!Array.isArray(feeData)) {
        return this.getFallbackFee(direction, fastTransfer);
      }
      const targetThreshold = getFinalityThreshold(fastTransfer);
      const fee = feeData.find((f) => f.finalityThreshold === targetThreshold);
      if (fee) {
        return fee.minimumFee;
      }
      return this.getFallbackFee(direction, fastTransfer);
    } catch (error) {
      console.error("Failed to get transfer fee, using fallback:", error);
      return this.getFallbackFee(direction, fastTransfer);
    }
  }
  async getFees(direction, chainId) {
    return this.fetchFees(direction, chainId);
  }
  async fetchFees(direction, chainId) {
    const source = direction === BridgeDirection.DEPOSIT_TO_STARKNET ? ETHEREUM_DOMAIN_ID : STARKNET_DOMAIN_ID;
    const destination = direction === BridgeDirection.DEPOSIT_TO_STARKNET ? STARKNET_DOMAIN_ID : ETHEREUM_DOMAIN_ID;
    let domainUrl;
    if (chainId.isMainnet()) {
      domainUrl = LIVE_DOMAIN;
    } else {
      domainUrl = SANDBOX_DOMAIN;
    }
    const url = `${domainUrl}/v2/burn/USDC/fees/${source}/${destination}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch fees from Circle API: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  }
  getFallbackFee(direction, fastTransfer) {
    if (!fastTransfer) {
      return 0;
    }
    return direction === BridgeDirection.DEPOSIT_TO_STARKNET ? ETH_FAST_TRANSFER_FEE_BP : STARKNET_FAST_TRANSFER_FEE_BP;
  }
};

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/bridge/ethereum/cctp/CCTPBridge.js
var CCTPBridge = class _CCTPBridge extends EthereumBridge {
  constructor() {
    super(...arguments);
    this.cctpFees = CCTPFees.getInstance();
  }
  async deposit(recipient, amount, options) {
    await this.approveSpendingOf(amount);
    const txRequest = await this.createDepositForBurnTransaction(recipient, amount, void 0, options?.fastTransfer);
    const txResponse = await this.execute(txRequest);
    this.clearCachedAllowance();
    return { hash: txResponse.hash };
  }
  async getDepositFeeEstimate(options) {
    const fastTransfer = options?.fastTransfer;
    const minimalAmount = this.usdcAmount(2n);
    const [allowance, approvalFeeData, feeData, minimumFeeBps] = await Promise.all([
      this.getAllowance(),
      this.estimateApprovalFee(),
      this.config.provider.getFeeData(),
      this.cctpFees.getMinimumFeeBps(BridgeDirection.DEPOSIT_TO_STARKNET, this.starknetWallet.getChainId(), fastTransfer)
    ]);
    const gasPrice = feeData.maxFeePerGas ?? feeData.gasPrice ?? 0n;
    const defaultL1Fee = this.ethAmount(_CCTPBridge.DEFAULT_CCTP_DEPOSIT_GAS * gasPrice);
    if (!allowance || allowance.lt(minimalAmount)) {
      return {
        l1Fee: defaultL1Fee,
        l2Fee: _CCTPBridge.ZERO_ETH,
        fastTransferBpFee: minimumFeeBps,
        ...approvalFeeData
      };
    } else {
      const txRequest = await this.createDepositForBurnTransaction(_CCTPBridge.DUMMY_SN_ADDRESS, minimalAmount, minimumFeeBps, fastTransfer);
      try {
        const gasEstimate = await this.config.signer.estimateGas(txRequest);
        const l1Fee = gasEstimate * gasPrice;
        return {
          l1Fee: this.ethAmount(l1Fee),
          l2Fee: _CCTPBridge.ZERO_ETH,
          fastTransferBpFee: minimumFeeBps,
          ...approvalFeeData
        };
      } catch {
        return {
          l1Fee: defaultL1Fee,
          l1FeeError: FeeErrorCause.GENERIC_L1_FEE_ERROR,
          l2Fee: _CCTPBridge.ZERO_ETH,
          fastTransferBpFee: minimumFeeBps,
          ...approvalFeeData
        };
      }
    }
  }
  getAllowanceSpender() {
    if (this.starknetWallet.getChainId().isMainnet()) {
      return Promise.resolve(_CCTPBridge.MAINNET_TOKEN_MESSENGER);
    } else {
      return Promise.resolve(_CCTPBridge.SEPOLIA_TOKEN_MESSENGER);
    }
  }
  async getEthereumGasPrice() {
    const feeData = await this.config.provider.getFeeData();
    return feeData.maxFeePerGas ?? feeData.gasPrice ?? 0n;
  }
  usdcAmount(value) {
    return Amount.fromRaw(value, 6, "USDC");
  }
  async createDepositForBurnTransaction(recipient, amount, fastTransferFeeBps, fastTransfer) {
    const usdcToken = this.token;
    const usdcAddress = await usdcToken.getAddress();
    const feeBps = fastTransferFeeBps ?? await this.cctpFees.getMinimumFeeBps(BridgeDirection.DEPOSIT_TO_STARKNET, this.starknetWallet.getChainId(), fastTransfer);
    const maxFee = this.calculateMaxFee(amount, feeBps);
    const calldata = _CCTPBridge.TOKEN_MESSENGER_INTERFACE.encodeFunctionData("depositForBurn", [
      amount.toBase(),
      STARKNET_DOMAIN_ID,
      recipient,
      usdcAddress,
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      maxFee.toBase(),
      getFinalityThreshold(fastTransfer)
    ]);
    return {
      to: await this.getAllowanceSpender(),
      data: calldata
    };
  }
  calculateMaxFee(amount, feeBasisPoints) {
    const numerator = amount.toBase() * BigInt(feeBasisPoints);
    const divisor = 10000n;
    const result = (numerator + divisor - 1n) / divisor;
    return this.usdcAmount(result);
  }
};
CCTPBridge.MAINNET_TOKEN_MESSENGER = fromEthereumAddress("0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d", { getAddress });
CCTPBridge.SEPOLIA_TOKEN_MESSENGER = fromEthereumAddress("0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA", { getAddress });
CCTPBridge.DEFAULT_CCTP_DEPOSIT_GAS = 104581n;
CCTPBridge.TOKEN_MESSENGER_INTERFACE = new Interface([
  "function depositForBurn(uint256 amount, uint32 destinationDomain, bytes32 mintRecipient, address burnToken, bytes32 destinationCaller, uint256 maxFee, uint32 minFinalityThreshold)"
]);
CCTPBridge.DUMMY_SN_ADDRESS = fromAddress("0x0000000000000000000000000000000000000000000000000000000000000001");
CCTPBridge.ZERO_ETH = Amount.fromRaw(0n, 18, "ETH");
export {
  CCTPBridge
};
