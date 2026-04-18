import {
  FeeErrorCause
} from "./chunk-AVMFVQWJ.mjs";
import {
  Amount
} from "./chunk-XZWI72IE.mjs";
import "./chunk-TJFISUBQ.mjs";

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/bridge/solana/registry.js
function buildTestnetChainMap(hyperlane) {
  return {
    solanatestnet: {
      ...hyperlane.registry.solanatestnet,
      mailbox: hyperlane.registry.solanatestnetAddresses.mailbox
    },
    starknetsepolia: {
      ...hyperlane.registry.starknetsepolia,
      mailbox: hyperlane.registry.starknetsepoliaAddresses.mailbox
    }
  };
}
function buildMainnetChainMap(hyperlane) {
  return {
    solanamainnet: {
      ...hyperlane.registry.solanamainnet,
      mailbox: hyperlane.registry.solanamainnetAddresses.mailbox
    },
    starknet: {
      ...hyperlane.registry.starknet,
      mailbox: hyperlane.registry.starknetAddresses.mailbox
    }
  };
}
var STARKNET_CHAIN_TO_HYPERLANE = {
  SN_MAIN: { starknet: "starknet", solana: "solanamainnet" },
  SN_SEPOLIA: { starknet: "starknetsepolia", solana: "solanatestnet" }
};
function hyperlaneChainName(chainId, hyperlaneChain) {
  const hyperlaneConfig = STARKNET_CHAIN_TO_HYPERLANE[chainId.toLiteral()];
  if (!hyperlaneConfig) {
    throw new Error(`Unknown starknet chain ID: ${chainId.toLiteral()}`);
  }
  const name = hyperlaneConfig[hyperlaneChain];
  if (!name) {
    throw new Error(`Unknown chain "${hyperlaneChain}" for network ${chainId.toLiteral()}`);
  }
  return name;
}
function setupMultiProtocolProvider(config, starknetWallet, hyperlane) {
  const chainId = starknetWallet.getChainId();
  const chains = chainId.isMainnet() ? buildMainnetChainMap(hyperlane) : buildTestnetChainMap(hyperlane);
  const MultiProtocolProviderCtor = hyperlane.sdk.MultiProtocolProvider;
  const ProviderType = hyperlane.sdk.ProviderType;
  const multiProvider = new MultiProtocolProviderCtor(chains);
  const solanaProvider = {
    type: ProviderType.SolanaWeb3,
    // `connection` is intentionally opaque in public types to avoid exporting
    // @solana/web3.js symbols in SDK declarations.
    provider: config.connection
  };
  multiProvider.setProvider(hyperlaneChainName(chainId, "solana"), solanaProvider);
  return multiProvider;
}
function bridgeTokenToHyperlaneToken(token, chainId, hyperlaneChain, hyperlane) {
  const isStarknet = hyperlaneChain === "starknet";
  const bridgeAddress = isStarknet ? token.starknetBridge : token.bridgeAddress;
  const collateralAddress = isStarknet ? token.starknetAddress : token.address;
  const isNative = token.id === "sol";
  const TokenStandard = hyperlane.sdk.TokenStandard;
  const tokenStandard = hyperlaneChain === "starknet" ? TokenStandard.StarknetHypSynthetic : isNative ? TokenStandard.SealevelHypNative : TokenStandard.SealevelHypCollateral;
  const HyperlaneTokenCtor = hyperlane.sdk.Token;
  return new HyperlaneTokenCtor({
    symbol: token.symbol,
    name: token.name,
    decimals: token.decimals,
    chainName: hyperlaneChainName(chainId, hyperlaneChain),
    addressOrDenom: bridgeAddress,
    collateralAddressOrDenom: collateralAddress,
    standard: tokenStandard
  });
}

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/bridge/solana/hyperlaneRuntime.js
var cachedHyperlane;
var loadingHyperlane;
async function loadHyperlane(feature) {
  if (cachedHyperlane) {
    return cachedHyperlane;
  }
  loadingHyperlane ?? (loadingHyperlane = Promise.all([
    import("@hyperlane-xyz/sdk"),
    import("@hyperlane-xyz/registry"),
    import("@hyperlane-xyz/utils")
  ]).then(([sdk, registry, utils]) => {
    cachedHyperlane = { sdk, registry, utils };
    return cachedHyperlane;
  }).catch(() => {
    throw new Error(`[starkzap] ${feature} requires optional peer dependencies "@hyperlane-xyz/sdk", "@hyperlane-xyz/registry", and "@hyperlane-xyz/utils". Install them with: npm i @hyperlane-xyz/sdk @hyperlane-xyz/registry @hyperlane-xyz/utils`);
  }).finally(() => {
    loadingHyperlane = void 0;
  }));
  return await loadingHyperlane;
}

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/bridge/solana/SolanaHyperlaneBridge.js
var SOLANA_RENT_ESTIMATE = BigInt(Math.round(411336e-8 * 1e9));
var SolanaHyperlaneBridge = class _SolanaHyperlaneBridge {
  constructor(bridgeToken, config, starknetWallet, hyperlane, multiProvider, warpCore, solanaToken, starknetChain, solanaChain) {
    this.bridgeToken = bridgeToken;
    this.config = config;
    this.starknetWallet = starknetWallet;
    this.hyperlane = hyperlane;
    this.multiProvider = multiProvider;
    this.warpCore = warpCore;
    this.solanaToken = solanaToken;
    this.starknetChain = starknetChain;
    this.solanaChain = solanaChain;
  }
  static async create(bridgeToken, config, starknetWallet) {
    const hyperlane = await loadHyperlane("Solana bridge operations");
    const chainId = starknetWallet.getChainId();
    const multiProvider = setupMultiProtocolProvider(config, starknetWallet, hyperlane);
    const solanaToken = bridgeTokenToHyperlaneToken(bridgeToken, chainId, "solana", hyperlane);
    const starknetToken = bridgeTokenToHyperlaneToken(bridgeToken, chainId, "starknet", hyperlane);
    const WarpCoreCtor = hyperlane.sdk.WarpCore;
    const warpCore = new WarpCoreCtor(multiProvider, [
      solanaToken,
      starknetToken
    ]);
    return new _SolanaHyperlaneBridge(bridgeToken, config, starknetWallet, hyperlane, multiProvider, warpCore, solanaToken, hyperlaneChainName(chainId, "starknet"), hyperlaneChainName(chainId, "solana"));
  }
  async deposit(recipient, amount) {
    const TokenAmountCtor = this.hyperlane.sdk.TokenAmount;
    const transactions = await this.warpCore.getTransferRemoteTxs({
      destination: this.starknetChain,
      originTokenAmount: new TokenAmountCtor(amount.toBase(), this.solanaToken),
      sender: this.config.address,
      recipient
    });
    if (transactions.length === 0) {
      throw new Error("Hyperlane returned no deposit transactions.");
    }
    let lastSignature = "";
    for (const tx of transactions) {
      lastSignature = await this.config.provider.signAndSendTransaction(tx.transaction);
    }
    return { hash: lastSignature };
  }
  async getDepositFeeEstimate() {
    const interchainResult = await this.estimateDepositInterchainFee();
    const localResult = await this.estimateDepositLocalFee(interchainResult.interchainFee);
    const estimate = {
      localFee: this.solAmount(localResult.localFee.amount),
      interchainFee: this.solAmount(interchainResult.interchainFee.amount)
    };
    if (localResult.localFeeError) {
      estimate.localFeeError = localResult.localFeeError;
    }
    if (interchainResult.interchainFeeError) {
      estimate.interchainFeeError = interchainResult.interchainFeeError;
    }
    return estimate;
  }
  async getAvailableDepositBalance(account) {
    const balance = await this.solanaToken.getBalance(this.multiProvider, account);
    const raw = balance?.amount ?? 0n;
    return Amount.fromRaw(raw, this.bridgeToken.decimals, this.bridgeToken.symbol);
  }
  async getAllowance() {
    return null;
  }
  async estimateDepositInterchainFee() {
    try {
      const quote = await this.warpCore.getInterchainTransferFee({
        destination: this.starknetChain,
        originToken: this.solanaToken,
        sender: this.config.address
      });
      return { interchainFee: quote.plus(SOLANA_RENT_ESTIMATE) };
    } catch {
      const HyperlaneTokenCtor = this.hyperlane.sdk.Token;
      const TokenAmountCtor = this.hyperlane.sdk.TokenAmount;
      const TokenStandard = this.hyperlane.sdk.TokenStandard;
      const zeroToken = new HyperlaneTokenCtor({
        symbol: "SOL",
        name: "Solana",
        decimals: 9,
        chainName: this.solanaChain,
        addressOrDenom: "native",
        standard: TokenStandard.SealevelHypNative
      });
      return {
        interchainFee: new TokenAmountCtor(0n, zeroToken),
        interchainFeeError: FeeErrorCause.GENERIC_L1_FEE_ERROR
      };
    }
  }
  async estimateDepositLocalFee(interchainFee) {
    try {
      const { fee } = await this.warpCore.getLocalTransferFee({
        destination: this.starknetChain,
        originToken: this.solanaToken,
        sender: this.config.address,
        interchainFee
      });
      const TokenAmountCtor = this.hyperlane.sdk.TokenAmount;
      return {
        localFee: new TokenAmountCtor(BigInt(fee), this.solanaToken)
      };
    } catch {
      const TokenAmountCtor = this.hyperlane.sdk.TokenAmount;
      return {
        localFee: new TokenAmountCtor(0n, interchainFee.token),
        localFeeError: FeeErrorCause.GENERIC_L1_FEE_ERROR
      };
    }
  }
  solAmount(amount) {
    return Amount.fromRaw(amount, 9, "SOL");
  }
};
export {
  SolanaHyperlaneBridge
};
