// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/types/config.js
import { CairoFelt252, RpcProvider, constants } from "starknet";
var VALID_CHAIN_IDS = ["SN_MAIN", "SN_SEPOLIA"];
function decodeFelt252ToShortString(felt252) {
  return new CairoFelt252(felt252).decodeUtf8();
}
var ChainId = class _ChainId {
  constructor(value) {
    this.value = value;
  }
  /** Returns `true` if this is Starknet Mainnet (`SN_MAIN`). */
  isMainnet() {
    return this.value === "SN_MAIN";
  }
  /** Returns `true` if this is Starknet Sepolia testnet (`SN_SEPOLIA`). */
  isSepolia() {
    return this.value === "SN_SEPOLIA";
  }
  /**
   * Returns the felt252 (hex) representation used on-chain.
   * @throws Error if the chain ID is not recognized
   */
  toFelt252() {
    if (this.isMainnet())
      return constants.StarknetChainId.SN_MAIN;
    if (this.isSepolia())
      return constants.StarknetChainId.SN_SEPOLIA;
    throw new Error(`Unknown chain ID: ${this.value}`);
  }
  /** Returns the literal string value (e.g. `"SN_MAIN"` or `"SN_SEPOLIA"`). */
  toLiteral() {
    return this.value;
  }
  /**
   * Create a ChainId from a literal string.
   * @param literal - `"SN_MAIN"` or `"SN_SEPOLIA"`
   */
  static from(literal) {
    return new _ChainId(literal);
  }
  /**
   * Create a ChainId from an on-chain felt252 hex value.
   * @param felt252 - The hex-encoded chain ID (e.g. from `provider.getChainId()`)
   * @throws Error if the decoded value is not a supported chain
   */
  static fromFelt252(felt252) {
    const decoded = decodeFelt252ToShortString(felt252);
    if (!VALID_CHAIN_IDS.includes(decoded)) {
      throw new Error(`Unsupported chain ID: "${decoded}". Expected one of: ${VALID_CHAIN_IDS.join(", ")}`);
    }
    return new _ChainId(decoded);
  }
};
ChainId.MAINNET = new ChainId("SN_MAIN");
ChainId.SEPOLIA = new ChainId("SN_SEPOLIA");
async function getChainId(provider) {
  const chainIdHex = await provider.getChainId();
  return ChainId.fromFelt252(chainIdHex);
}

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/types/address.js
import { validateAndParseAddress } from "starknet";
function fromAddress(value) {
  return validateAndParseAddress(value);
}
function resolveWalletAddress(value) {
  if (value && typeof value === "object" && "address" in value) {
    return fromAddress(value.address);
  }
  return fromAddress(value);
}

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/types/amount.js
var MAX_DECIMALS = 255;
var MAX_SIGNIFICANT_NUMBER_DIGITS = 15;
var MAX_SCIENTIFIC_EXPONENT = 1e4;
var NBSP = "\xA0";
function assertValidDecimals(decimals) {
  if (!Number.isFinite(decimals) || !Number.isInteger(decimals) || decimals < 0) {
    throw new Error(`Invalid decimals: ${decimals}. Must be a non-negative integer.`);
  }
  if (decimals > MAX_DECIMALS) {
    throw new Error(`Invalid decimals: ${decimals}. Must be <= ${MAX_DECIMALS}.`);
  }
}
function countSignificantDigits(decimal) {
  const strippedLeadingZeros = decimal.replace(/^0+/, "");
  const withoutDot = strippedLeadingZeros.replace(".", "");
  const strippedTrailingZeros = withoutDot.replace(/0+$/, "");
  return strippedTrailingZeros.length;
}
function expandScientificNotation(value) {
  const scientificMatch = value.match(/^(\d+)(?:\.(\d+))?[eE]([+-]?\d+)$/);
  if (!scientificMatch) {
    return value;
  }
  const integerPart = scientificMatch[1] ?? "";
  const fractionPart = scientificMatch[2] ?? "";
  const exponentRaw = scientificMatch[3];
  if (!exponentRaw) {
    throw new Error(`Invalid scientific notation: ${value}`);
  }
  const exponent = Number(exponentRaw);
  if (!Number.isInteger(exponent)) {
    throw new Error(`Invalid scientific notation exponent: ${exponentRaw}`);
  }
  if (Math.abs(exponent) > MAX_SCIENTIFIC_EXPONENT) {
    throw new Error(`Scientific notation exponent too large: ${exponentRaw}.`);
  }
  if (exponent >= 0) {
    const digits2 = `${integerPart}${fractionPart}`;
    if (exponent >= fractionPart.length) {
      return digits2 + "0".repeat(exponent - fractionPart.length);
    }
    const splitIndex2 = integerPart.length + exponent;
    return `${digits2.slice(0, splitIndex2)}.${digits2.slice(splitIndex2)}`;
  }
  const shift = Math.abs(exponent);
  const digits = `${integerPart}${fractionPart}`;
  if (shift >= integerPart.length) {
    return `0.${"0".repeat(shift - integerPart.length)}${digits}`;
  }
  const splitIndex = integerPart.length - shift;
  return `${integerPart.slice(0, splitIndex)}.${integerPart.slice(splitIndex)}${fractionPart}`;
}
function normalizeUnitNumberish(amount) {
  if (typeof amount === "number") {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new Error(`Invalid unit amount: "${amount}". Must be a positive number.`);
    }
    if (Number.isInteger(amount) && !Number.isSafeInteger(amount)) {
      throw new Error("Amount.parse(number) only accepts safe integers. Pass a string or bigint for exact large values.");
    }
    if (!Number.isInteger(amount)) {
      const significantDigits = countSignificantDigits(expandScientificNotation(amount.toString()));
      if (significantDigits > MAX_SIGNIFICANT_NUMBER_DIGITS) {
        throw new Error("Amount.parse(number) cannot safely represent this decimal. Pass a string for exact values.");
      }
    }
  }
  return expandScientificNotation(amount.toString());
}
function normalizeRawNumberish(amount) {
  if (typeof amount === "number") {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new Error(`Invalid raw amount: "${amount}". Must be a non-negative integer.`);
    }
    if (!Number.isInteger(amount)) {
      throw new Error("Amount.fromRaw(number) only accepts integer numbers. Pass a string or bigint for exact values.");
    }
    if (!Number.isSafeInteger(amount)) {
      throw new Error("Amount.fromRaw(number) only accepts safe integers. Pass a string or bigint for exact large values.");
    }
  }
  return expandScientificNotation(amount.toString());
}
function isZeroString(value) {
  return /^0+(\.0+)?$/.test(value);
}
function formatIntegerPart(integerPart) {
  try {
    return BigInt(integerPart).toLocaleString("default");
  } catch {
    return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
function localeDecimalSeparator() {
  const formatter = Intl.NumberFormat("default", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });
  if (typeof formatter.formatToParts === "function") {
    const decimal = formatter.formatToParts(1.1).find((part) => part.type === "decimal");
    if (decimal?.value) {
      return decimal.value;
    }
  }
  return ".";
}
var Amount = class _Amount {
  constructor(value, decimals, symbol) {
    assertValidDecimals(decimals);
    this.baseValue = value;
    this.decimals = decimals;
    this.symbol = symbol;
  }
  /**
   * Creates an Amount from a human-readable unit value (e.g., "1.5" ETH).
   *
   * Use this method when you have a value that a user would recognize,
   * like "1.5" for 1.5 ETH or "100" for 100 USDC.
   *
   * @param amount - The unit amount as string, number, or bigint
   * @param args - Either a `Token` object, or `decimals` and optional `symbol`:
   *   - `(token: Token)` - Uses the token's decimals and symbol
   *   - `(decimals: number, symbol?: string)` - Uses explicit decimals and optional symbol
   * @returns A new Amount instance
   * @throws Error if the amount format is invalid (negative, non-numeric)
   * @throws Error if the amount exceeds the specified decimal precision
   *
   * @example
   * ```ts
   * // With a Token (recommended for known tokens)
   * Amount.parse("1.5", STRK)          // Uses STRK's decimals and symbol
   * Amount.parse(100, USDC)            // Uses USDC's decimals and symbol
   *
   * // With decimals and optional symbol
   * Amount.parse("1.5", 18, "ETH")     // 1.5 ETH = 1500000000000000000 wei
   * Amount.parse(1.5, 18, "ETH")       // Same as above (number input)
   * Amount.parse(10n, 18, "ETH")       // 10 ETH (bigint treated as whole units)
   * Amount.parse("100", 6, "USDC")     // 100 USDC = 100000000 base units
   * Amount.parse("0.5", 8)             // 0.5 with 8 decimals, no symbol
   * ```
   */
  static parse(amount, ...args) {
    let decimals;
    let symbol;
    if (typeof args[0] === "number") {
      decimals = args[0];
      symbol = args[1];
    } else {
      decimals = args[0].decimals;
      symbol = args[0].symbol;
    }
    assertValidDecimals(decimals);
    const amountStr = normalizeUnitNumberish(amount);
    if (!amountStr.match(/^\d+(\.\d+)?$/)) {
      throw new Error(`Invalid unit amount: "${amountStr}". Must be a positive number.`);
    }
    const [integer, fraction = ""] = amountStr.split(".");
    if (fraction.length > decimals) {
      throw new Error(`Precision overflow: "${amountStr}" exceeds ${decimals} decimal places.`);
    }
    const paddedFraction = fraction.padEnd(decimals, "0");
    const baseValue = BigInt(`${integer}${paddedFraction}`);
    return new _Amount(baseValue, decimals, symbol);
  }
  /**
   * Creates an Amount directly from a raw value (e.g., wei, FRI, satoshis).
   *
   * Use this method when you have a value directly from the blockchain,
   * such as a balance query or transaction amount.
   *
   * @param amount - The raw amount as string, number, or bigint
   * @param args - Either a `Token` object, or `decimals` and optional `symbol`:
   *   - `(token: Token)` - Uses the token's decimals and symbol
   *   - `(decimals: number, symbol?: string)` - Uses explicit decimals and optional symbol
   * @returns A new Amount instance
   * @throws Error if the amount is negative
   *
   * @example
   * ```ts
   * // With a Token (recommended for known tokens)
   * const balance = await contract.balanceOf(address);
   * Amount.fromRaw(balance, STRK)                    // Uses STRK's decimals and symbol
   *
   * // With decimals and optional symbol
   * Amount.fromRaw(1500000000000000000n, 18, "ETH")  // 1.5 ETH
   * Amount.fromRaw("1500000000000000000", 18, "ETH") // From string (e.g., JSON response)
   * Amount.fromRaw(1000000, 6, "USDC")               // 1 USDC
   * Amount.fromRaw(1000000n, 6)                      // 1 unit, no symbol
   * ```
   */
  static fromRaw(amount, ...args) {
    let decimals;
    let symbol;
    if (typeof args[0] === "number") {
      decimals = args[0];
      symbol = args[1];
    } else {
      decimals = args[0].decimals;
      symbol = args[0].symbol;
    }
    assertValidDecimals(decimals);
    const normalizedAmount = normalizeRawNumberish(amount);
    if (!normalizedAmount.match(/^\d+$|^0x[0-9a-fA-F]+$/)) {
      throw new Error(`Invalid raw amount: "${normalizedAmount}". Must be a non-negative integer or hex value.`);
    }
    const baseValue = BigInt(normalizedAmount);
    if (baseValue < 0n) {
      throw new Error(`Negative amounts are not supported: ${baseValue.toString()}`);
    }
    return new _Amount(baseValue, decimals, symbol);
  }
  /**
   * Returns the raw base value as a bigint for use in smart contract calls.
   *
   * This is the value you should pass to Starknet contracts and other
   * blockchain operations that expect raw token amounts.
   *
   * @returns The raw base value as bigint (e.g., wei, FRI)
   *
   * @example
   * ```ts
   * const amount = Amount.parse("1.5", 18, "ETH");
   * const rawValue = amount.toBase(); // 1500000000000000000n
   *
   * // Use in contract call
   * await contract.transfer(recipient, rawValue);
   * ```
   */
  toBase() {
    return this.baseValue;
  }
  /**
   * Returns the human-readable unit value as a string.
   *
   * This is the value suitable for displaying to users. Trailing zeros
   * after the decimal point are automatically removed.
   *
   * @returns The unit value as a string (e.g., "1.5", "100", "0.001")
   *
   * @example
   * ```ts
   * Amount.fromRaw(1500000000000000000n, 18).toUnit()  // "1.5"
   * Amount.fromRaw(1000000000000000000n, 18).toUnit()  // "1"
   * Amount.fromRaw(500n, 18).toUnit()                   // "0.0000000000000005"
   * Amount.fromRaw(100000000n, 6).toUnit()              // "100"
   * ```
   */
  toUnit() {
    if (this.decimals === 0) {
      return this.baseValue.toString();
    }
    const valueStr = this.baseValue.toString();
    const padded = valueStr.padStart(this.decimals + 1, "0");
    const integer = padded.slice(0, -this.decimals);
    const fraction = padded.slice(-this.decimals);
    const cleanFraction = fraction.replace(/0+$/, "");
    return cleanFraction ? `${integer}.${cleanFraction}` : integer;
  }
  /**
   * Returns a locale-formatted string with the token symbol for UI display.
   *
   * Uses the device's preferred locale for number formatting, including
   * appropriate thousand separators and decimal notation.
   *
   * @param compressed - If true, limits decimal places to 4 for compact display (default: false)
   * @returns Formatted string with symbol (e.g., "1,500.50 ETH", "0.0001 STRK")
   *
   * @example
   * ```ts
   * const amount = Amount.parse("1500.123456", 18, "ETH");
   *
   * amount.toFormatted()       // "1,500.123456 ETH" (full precision)
   * amount.toFormatted(true)   // "1,500.1235 ETH" (compressed to 4 decimals)
   *
   * // Without symbol
   * const noSymbol = Amount.parse("100", 6);
   * noSymbol.toFormatted()     // "100" (no symbol appended)
   * ```
   */
  toFormatted(compressed = false) {
    return tokenAmountToFormatted(compressed, this.baseValue, this.decimals, this.symbol ?? "");
  }
  /**
   * Returns the number of decimal places for this amount.
   *
   * Useful for validation when working with specific token contracts.
   *
   * @returns The number of decimal places (e.g., 18 for ETH, 6 for USDC)
   *
   * @example
   * ```ts
   * const ethAmount = Amount.parse("1.5", 18, "ETH");
   * console.log(ethAmount.getDecimals()); // 18
   *
   * const usdcAmount = Amount.parse("100", USDC);
   * console.log(usdcAmount.getDecimals()); // 6
   * ```
   */
  getDecimals() {
    return this.decimals;
  }
  /**
   * Returns the token symbol for this amount, if set.
   *
   * Useful for validation when working with specific token contracts.
   *
   * @returns The token symbol (e.g., "ETH", "USDC") or undefined if not set
   *
   * @example
   * ```ts
   * const ethAmount = Amount.parse("1.5", 18, "ETH");
   * console.log(ethAmount.getSymbol()); // "ETH"
   *
   * const noSymbol = Amount.parse("1.5", 18);
   * console.log(noSymbol.getSymbol()); // undefined
   * ```
   */
  getSymbol() {
    return this.symbol;
  }
  /**
   * Checks if another Amount is compatible for operations.
   * Two amounts are compatible if they have the same decimals and symbol.
   *
   * @param other - The other Amount to check against
   * @returns true if compatible, false otherwise
   */
  isCompatible(other) {
    if (this.decimals !== other.decimals) {
      return false;
    }
    return !(this.symbol !== void 0 && other.symbol !== void 0 && this.symbol !== other.symbol);
  }
  /**
   * Validates that another Amount is compatible for arithmetic operations.
   * Two amounts are compatible if they have the same decimals and symbol.
   *
   * @param other - The other Amount to validate against
   * @throws Error if decimals don't match
   * @throws Error if symbols don't match (when both are set)
   */
  assertCompatible(other) {
    if (this.decimals !== other.decimals) {
      throw new Error(`Cannot perform arithmetic on amounts with different decimals: ${this.decimals} vs ${other.decimals}`);
    }
    if (this.symbol !== void 0 && other.symbol !== void 0 && this.symbol !== other.symbol) {
      throw new Error(`Cannot perform arithmetic on amounts with different symbols: "${this.symbol}" vs "${other.symbol}"`);
    }
  }
  /**
   * Adds another Amount to this one.
   *
   * Both amounts must have the same decimals and symbol (if set).
   *
   * @param other - The Amount to add
   * @returns A new Amount representing the sum
   * @throws Error if decimals don't match
   * @throws Error if symbols don't match (when both are set)
   *
   * @example
   * ```ts
   * const a = Amount.parse("1.5", 18, "ETH");
   * const b = Amount.parse("2.5", 18, "ETH");
   * const sum = a.add(b);
   * console.log(sum.toUnit()); // "4"
   * ```
   */
  add(other) {
    this.assertCompatible(other);
    return new _Amount(this.baseValue + other.baseValue, this.decimals, this.symbol ?? other.symbol);
  }
  /**
   * Subtracts another Amount from this one.
   *
   * Both amounts must have the same decimals and symbol (if set).
   *
   * @param other - The Amount to subtract
   * @returns A new Amount representing the difference
   * @throws Error if decimals don't match
   * @throws Error if symbols don't match (when both are set)
   * @throws Error if the result would be negative (other > this)
   *
   * @example
   * ```ts
   * const a = Amount.parse("5", 18, "ETH");
   * const b = Amount.parse("2", 18, "ETH");
   * const diff = a.subtract(b);
   * console.log(diff.toUnit()); // "3"
   * ```
   */
  subtract(other) {
    this.assertCompatible(other);
    const result = this.baseValue - other.baseValue;
    if (result < 0n) {
      throw new Error("Subtraction would result in a negative amount. Use gte() or gt() to check before subtracting.");
    }
    return new _Amount(result, this.decimals, this.symbol ?? other.symbol);
  }
  /**
   * Multiplies this Amount by a scalar value.
   *
   * The scalar can be a string, number, or bigint. Fractional multipliers
   * are supported (e.g., "0.5" to halve the amount).
   *
   * @param multiplier - The scalar value to multiply by
   * @returns A new Amount representing the product
   * @throws Error if multiplier is negative or invalid
   *
   * @example
   * ```ts
   * const amount = Amount.parse("10", 18, "ETH");
   *
   * amount.multiply(2).toUnit();     // "20"
   * amount.multiply("0.5").toUnit(); // "5"
   * amount.multiply("1.5").toUnit(); // "15"
   * ```
   */
  multiply(multiplier) {
    const multiplierStr = multiplier.toString();
    if (!multiplierStr.match(/^\d+(\.\d+)?$/)) {
      throw new Error(`Invalid multiplier: "${multiplierStr}". Must be a positive number.`);
    }
    const PRECISION = 18;
    const scaleFactor = 10n ** BigInt(PRECISION);
    const [integer, fraction = ""] = multiplierStr.split(".");
    const paddedFraction = fraction.padEnd(PRECISION, "0").slice(0, PRECISION);
    const scaledMultiplier = BigInt(`${integer}${paddedFraction}`);
    const result = this.baseValue * scaledMultiplier / scaleFactor;
    return new _Amount(result, this.decimals, this.symbol);
  }
  /**
   * Divides this Amount by a scalar value.
   *
   * The scalar can be a string, number, or bigint. Fractional divisors
   * are supported (e.g., "0.5" to double the amount).
   *
   * Note: Division uses integer arithmetic and rounds down (floor).
   *
   * @param divisor - The scalar value to divide by
   * @returns A new Amount representing the quotient
   * @throws Error if divisor is zero
   * @throws Error if divisor is negative or invalid
   *
   * @example
   * ```ts
   * const amount = Amount.parse("10", 18, "ETH");
   *
   * amount.divide(2).toUnit();     // "5"
   * amount.divide("0.5").toUnit(); // "20"
   * amount.divide(4).toUnit();     // "2.5"
   * ```
   */
  divide(divisor) {
    const divisorStr = divisor.toString();
    if (!divisorStr.match(/^\d+(\.\d+)?$/)) {
      throw new Error(`Invalid divisor: "${divisorStr}". Must be a positive number.`);
    }
    const PRECISION = 18;
    const scaleFactor = 10n ** BigInt(PRECISION);
    const [integer, fraction = ""] = divisorStr.split(".");
    const paddedFraction = fraction.padEnd(PRECISION, "0").slice(0, PRECISION);
    const scaledDivisor = BigInt(`${integer}${paddedFraction}`);
    if (scaledDivisor === 0n) {
      if (!isZeroString(divisorStr)) {
        throw new Error(`Divisor "${divisorStr}" is too small: precision is limited to ${PRECISION} decimal places.`);
      }
      throw new Error("Division by zero");
    }
    const scaledBase = this.baseValue * scaleFactor;
    const result = scaledBase / scaledDivisor;
    return new _Amount(result, this.decimals, this.symbol);
  }
  /**
   * Checks if this Amount is equal to another Amount.
   *
   * Returns false if amounts have different decimals or symbols.
   *
   * @param other - The Amount to compare with
   * @returns true if the amounts are equal and compatible, false otherwise
   *
   * @example
   * ```ts
   * const a = Amount.parse("1.5", 18, "ETH");
   * const b = Amount.parse("1.5", 18, "ETH");
   * const c = Amount.parse("2", 18, "ETH");
   * const usdc = Amount.parse("1.5", 6, "USDC");
   *
   * a.eq(b);    // true
   * a.eq(c);    // false
   * a.eq(usdc); // false (incompatible)
   * ```
   */
  eq(other) {
    if (!this.isCompatible(other)) {
      return false;
    }
    return this.baseValue === other.baseValue;
  }
  /**
   * Checks if this Amount is greater than another Amount.
   *
   * Returns false if amounts have different decimals or symbols.
   *
   * @param other - The Amount to compare with
   * @returns true if this amount is greater and compatible, false otherwise
   *
   * @example
   * ```ts
   * const a = Amount.parse("2", 18, "ETH");
   * const b = Amount.parse("1", 18, "ETH");
   * const usdc = Amount.parse("1", 6, "USDC");
   *
   * a.gt(b);    // true
   * b.gt(a);    // false
   * a.gt(usdc); // false (incompatible)
   * ```
   */
  gt(other) {
    if (!this.isCompatible(other)) {
      return false;
    }
    return this.baseValue > other.baseValue;
  }
  /**
   * Checks if this Amount is greater than or equal to another Amount.
   *
   * Returns false if amounts have different decimals or symbols.
   *
   * @param other - The Amount to compare with
   * @returns true if this amount is greater or equal and compatible, false otherwise
   *
   * @example
   * ```ts
   * const a = Amount.parse("2", 18, "ETH");
   * const b = Amount.parse("2", 18, "ETH");
   * const usdc = Amount.parse("2", 6, "USDC");
   *
   * a.gte(b);    // true
   * a.gte(usdc); // false (incompatible)
   * ```
   */
  gte(other) {
    if (!this.isCompatible(other)) {
      return false;
    }
    return this.baseValue >= other.baseValue;
  }
  /**
   * Checks if this Amount is less than another Amount.
   *
   * Returns false if amounts have different decimals or symbols.
   *
   * @param other - The Amount to compare with
   * @returns true if this amount is less and compatible, false otherwise
   *
   * @example
   * ```ts
   * const a = Amount.parse("1", 18, "ETH");
   * const b = Amount.parse("2", 18, "ETH");
   * const usdc = Amount.parse("2", 6, "USDC");
   *
   * a.lt(b);    // true
   * b.lt(a);    // false
   * a.lt(usdc); // false (incompatible)
   * ```
   */
  lt(other) {
    if (!this.isCompatible(other)) {
      return false;
    }
    return this.baseValue < other.baseValue;
  }
  /**
   * Checks if this Amount is less than or equal to another Amount.
   *
   * Returns false if amounts have different decimals or symbols.
   *
   * @param other - The Amount to compare with
   * @returns true if this amount is less or equal and compatible, false otherwise
   *
   * @example
   * ```ts
   * const a = Amount.parse("2", 18, "ETH");
   * const b = Amount.parse("2", 18, "ETH");
   * const usdc = Amount.parse("2", 6, "USDC");
   *
   * a.lte(b);    // true
   * a.lte(usdc); // false (incompatible)
   * ```
   */
  lte(other) {
    if (!this.isCompatible(other)) {
      return false;
    }
    return this.baseValue <= other.baseValue;
  }
  /**
   * Checks if this Amount is zero.
   *
   * @returns true if the amount is zero, false otherwise
   *
   * @example
   * ```ts
   * Amount.parse("0", 18, "ETH").isZero();   // true
   * Amount.parse("0.1", 18, "ETH").isZero(); // false
   * ```
   */
  isZero() {
    return this.baseValue === 0n;
  }
  /**
   * Checks if this Amount is positive (greater than zero).
   *
   * @returns true if the amount is positive, false otherwise
   *
   * @example
   * ```ts
   * Amount.parse("1", 18, "ETH").isPositive(); // true
   * Amount.parse("0", 18, "ETH").isPositive(); // false
   * ```
   */
  isPositive() {
    return this.baseValue > 0n;
  }
};
function assertAmountMatchesToken(amount, token) {
  const amountDecimals = amount.getDecimals();
  if (amountDecimals !== token.decimals) {
    throw new Error(`Amount decimals mismatch: expected ${token.decimals} (${token.symbol}), got ${amountDecimals}`);
  }
  const amountSymbol = amount.getSymbol();
  if (amountSymbol !== void 0 && amountSymbol !== token.symbol) {
    throw new Error(`Amount symbol mismatch: expected "${token.symbol}", got "${amountSymbol}"`);
  }
}
function tokenAmountToFormatted(compressed = false, balance, decimals, symbol) {
  assertValidDecimals(decimals);
  const isNegative = balance < 0n;
  const absoluteBalance = isNegative ? -balance : balance;
  const maxFractionDigits = compressed ? Math.min(4, decimals) : decimals;
  let integerPart;
  let fractionalPart;
  if (compressed && maxFractionDigits < decimals) {
    const droppedDigits = decimals - maxFractionDigits;
    const roundingFactor = BigInt(10) ** BigInt(droppedDigits);
    const rounded = (absoluteBalance + roundingFactor / 2n) / roundingFactor;
    const displayDivisor = BigInt(10) ** BigInt(maxFractionDigits);
    integerPart = (rounded / displayDivisor).toString();
    fractionalPart = (rounded % displayDivisor).toString().padStart(maxFractionDigits, "0");
  } else {
    const divisor = BigInt(10) ** BigInt(decimals);
    integerPart = (absoluteBalance / divisor).toString();
    fractionalPart = (absoluteBalance % divisor).toString().padStart(decimals, "0");
  }
  const fractionalDisplay = fractionalPart.replace(/0+$/, "");
  const integerDisplay = formatIntegerPart(integerPart);
  const sign = isNegative ? "-" : "";
  const amountDisplay = fractionalDisplay ? `${sign}${integerDisplay}${localeDecimalSeparator()}${fractionalDisplay}` : `${sign}${integerDisplay}`;
  return `${symbol}${NBSP}${amountDisplay}`;
}

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/types/bridge/external-chain.js
var ExternalChain;
(function(ExternalChain2) {
  ExternalChain2["ETHEREUM"] = "ethereum";
  ExternalChain2["SOLANA"] = "solana";
})(ExternalChain || (ExternalChain = {}));

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/types/onboard.js
var OnboardStrategy = {
  Signer: "signer",
  Privy: "privy",
  Cartridge: "cartridge"
};

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/types/tx.js
import { ETransactionStatus } from "starknet";

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/types/bridge/protocol.js
var Protocol;
(function(Protocol2) {
  Protocol2["CANONICAL"] = "canonical";
  Protocol2["CCTP"] = "cctp";
  Protocol2["OFT"] = "oft";
  Protocol2["OFT_MIGRATED"] = "oft-migrated";
  Protocol2["HYPERLANE"] = "hyperlane";
})(Protocol || (Protocol = {}));

// ../../node_modules/.pnpm/starkzap@2.0.0_@cartridge+c_9366dcdf8bd299f112689bbaa468f635/node_modules/starkzap/dist/src/types/bridge/bridge-token.js
var BridgeToken = class {
  constructor(params) {
    this.id = params.id;
    this.name = params.name;
    this.symbol = params.symbol;
    if (params.coingeckoId) {
      this.coingeckoId = params.coingeckoId;
    }
    this.decimals = params.decimals;
    this.address = params.address;
    this.bridgeAddress = params.l1Bridge;
    this.starknetAddress = params.starknetAddress;
    this.starknetBridge = params.starknetBridge;
  }
};
var EthereumBridgeToken = class extends BridgeToken {
  constructor(params) {
    super({ ...params });
    this.chain = ExternalChain.ETHEREUM;
    this.protocol = params.protocol;
  }
};
var SolanaBridgeToken = class extends BridgeToken {
  constructor(params) {
    super({ ...params });
    this.chain = ExternalChain.SOLANA;
    this.protocol = Protocol.HYPERLANE;
  }
};

export {
  ChainId,
  getChainId,
  fromAddress,
  resolveWalletAddress,
  Amount,
  assertAmountMatchesToken,
  OnboardStrategy,
  Protocol,
  ExternalChain,
  EthereumBridgeToken,
  SolanaBridgeToken
};
