import {
  CanonicalEthereumBridge
} from "./chunk-HUFF52HQ.mjs";
import {
  ethereumAddress
} from "./chunk-XW5UPK5M.mjs";
import "./chunk-FMBTOKMI.mjs";
import "./chunk-IX2XH525.mjs";
import "./chunk-VP7WVUCP.mjs";
import {
  FeeErrorCause
} from "./chunk-AVMFVQWJ.mjs";
import {
  Amount
} from "./chunk-XZWI72IE.mjs";
import "./chunk-TJFISUBQ.mjs";

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/bridge/ethereum/lords/LordsBridge.js
import { RPC, uint256 } from "starknet";

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/abi/ethereum/lordsBridge.json
var lordsBridge_default = [
  {
    inputs: [
      { internalType: "address", name: "_starknet", type: "address" },
      { internalType: "address", name: "_l1Token", type: "address" },
      { internalType: "uint256", name: "_l2Bridge", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "l1Sender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "l2Recipient",
        type: "uint256"
      }
    ],
    name: "LogDeposit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "l1Recipient",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "LogWithdrawal",
    type: "event"
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "l2Recipient", type: "uint256" },
      { internalType: "uint256", name: "fee", type: "uint256" }
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "l1Token",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "l2Bridge",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "starknet",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "address", name: "l1Recipient", type: "address" }
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/bridge/ethereum/lords/LordsBridge.js
var LordsBridge = class extends CanonicalEthereumBridge {
  constructor(bridgeToken, config, starknetWallet) {
    super(bridgeToken, config, starknetWallet, lordsBridge_default);
  }
  /**
   * The LORDS L1 bridge has a single-token contract with a different deposit
   * signature: `deposit(uint256 amount, uint256 l2Recipient, uint256 fee)`.
   * Unlike the canonical bridge's `deposit(address token, uint256 amount,
   * uint256 l2Recipient)`, the token address is implicit (one bridge per
   * token) and a fee argument (1 wei) is passed instead. No ETH value is
   * attached to the transaction.
   */
  async prepareDepositTransactionDetails(recipient, amount) {
    const signer = await this.config.signer.getAddress();
    return {
      method: "deposit(uint256,uint256,uint256)",
      args: [amount.toBase().toString(), recipient.toString(), "1"],
      transaction: {
        from: signer
      }
    };
  }
  /**
   * The LORDS L2 bridge uses `handle_deposit` with a 3-element payload
   * `[recipient, amount_low, amount_high]`, whereas the canonical bridge uses
   * `handle_token_deposit` with a 5-element payload that also includes the L1
   * token address and the sender address.
   */
  async estimateL1ToL2MessageFee(recipient, amount) {
    try {
      const { low, high } = uint256.bnToUint256(amount.toBase());
      const l1Message = {
        from_address: await ethereumAddress(this.bridge),
        to_address: this.bridgeToken.starknetBridge.toString(),
        entry_point_selector: "handle_deposit",
        payload: [recipient.toString(), low.toString(), high.toString()]
      };
      const { overall_fee, unit } = await this.starknetWallet.getProvider().estimateMessageFee(l1Message);
      const fee = Amount.fromRaw(overall_fee, 18, unit === "WEI" ? "ETH" : "STRK");
      return { fee };
    } catch {
      return {
        fee: Amount.fromRaw(0n, 18, "ETH"),
        l2FeeError: FeeErrorCause.GENERIC_L2_FEE_ERROR
      };
    }
  }
  /**
   * `prepareDepositTransactionDetails` (the only call site for now) is
   * completely overridden, but it is a good practise to maintain that no eth
   * are spent.
   */
  async getEthDepositValue(_recipient, _amount) {
    return this.ethAmount(0n);
  }
};
export {
  LordsBridge
};
