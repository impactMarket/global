import { BigNumber } from "bignumber.js";
import config from "../config";

export function claimFrequencyToText(frequency: BigNumber | string): string {
    const f = new BigNumber(frequency);
    if (f.eq(86400)) return 'day';
    if (f.eq(604800)) return 'week';
    return 'month';
}

// cUSD has 18 zeros!
export function humanifyNumber(inputNumber: BigNumber | string): string {
    const decimals = new BigNumber(10).pow(config.cUSDDecimals);
    return new BigNumber(inputNumber).div(decimals).decimalPlaces(2, 1).toString();
}
