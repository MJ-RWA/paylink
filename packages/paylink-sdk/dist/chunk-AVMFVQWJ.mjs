// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/types/errors.js
var TransactionErrorCause;
(function(TransactionErrorCause2) {
  TransactionErrorCause2["USER_REJECTED"] = "USER_REJECTED";
  TransactionErrorCause2["INSUFFICIENT_BALANCE"] = "INSUFFICIENT_BALANCE";
  TransactionErrorCause2["APPROVE_FAILED"] = "APPROVE_FAILED";
})(TransactionErrorCause || (TransactionErrorCause = {}));
var FeeErrorCause;
(function(FeeErrorCause2) {
  FeeErrorCause2["NO_TOKEN_CONTRACT"] = "NO_TOKEN_CONTRACT";
  FeeErrorCause2["APPROVAL_FEE_ERROR"] = "APPROVAL_FEE_ERROR";
  FeeErrorCause2["GENERIC_L2_FEE_ERROR"] = "L2_FEE_ERROR";
  FeeErrorCause2["GENERIC_L1_FEE_ERROR"] = "L1_FEE_ERROR";
})(FeeErrorCause || (FeeErrorCause = {}));

export {
  TransactionErrorCause,
  FeeErrorCause
};
