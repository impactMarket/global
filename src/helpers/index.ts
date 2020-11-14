import { BigNumber } from "bignumber.js";
import config from "../config";

export function claimFrequencyToText(frequency: BigNumber | string): string {
    const f = new BigNumber(frequency);
    if (f.eq(86400)) return 'day';
    if (f.eq(604800)) return 'week';
    return 'unknown';
}

// cUSD has 18 zeros!
export function humanifyNumber(inputNumber: BigNumber | string): string {
    const decimals = new BigNumber(10).pow(config.cUSDDecimals);
    return new BigNumber(inputNumber).div(decimals).decimalPlaces(2, 1).toString();
}

export function currencyValue(inputNumber: BigNumber | string, decimals: boolean = true) {
    return '$' + numericalValue(inputNumber, decimals);
}

export function numericalValue(inputNumber: BigNumber | string, decimals: boolean = true) {
    return Number(inputNumber).toLocaleString('en', { maximumFractionDigits: decimals ? 2 : 0 });
}
