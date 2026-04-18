// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/connect/ethersRuntime.js
var cachedEthers;
var loadingEthers;
async function loadEthers(feature) {
  if (cachedEthers) {
    return cachedEthers;
  }
  loadingEthers ?? (loadingEthers = import("./lib-LHDPPDR4.mjs").then((ethersModule) => {
    cachedEthers = ethersModule;
    return cachedEthers;
  }).catch(() => {
    throw new Error(`[starkzap] ${feature} requires optional peer dependency "ethers". Install it with: npm i ethers`);
  }).finally(() => {
    loadingEthers = void 0;
  }));
  return await loadingEthers;
}
function fromEthereumAddress(value, ethers) {
  return ethers.getAddress(value);
}

export {
  loadEthers,
  fromEthereumAddress
};
