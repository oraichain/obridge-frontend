import { validateNumber } from '@oraichain/oraidex-common';

export const formatNumberKMB = (num: number, isUsd: boolean = true) => {
  const prefixShow = isUsd ? '$' : '';

  if (num >= 1e9) {
    return prefixShow + (num / 1e9).toFixed(2) + 'B';
  }

  if (num >= 1e6) {
    return prefixShow + (num / 1e6).toFixed(2) + 'M';
  }

  if (num >= 1e3) {
    return prefixShow + (num / 1e3).toFixed(2) + 'K';
  }
  return isUsd ? formatDisplayUsdt(num, 2) : numberWithCommas(num, undefined, { maximumFractionDigits: 2 });
};

// TODO: need to seperate format funcs to format module later.
export const formatDisplayUsdt = (amount: number | string, dp = 2, dpMin = 4): string => {
  const validatedAmount = validateNumber(amount);
  if (validatedAmount < 1) return `$${toFixedIfNecessary(amount.toString(), dpMin).toString()}`;

  return `$${numberWithCommas(toFixedIfNecessary(amount.toString(), dp), undefined, { maximumFractionDigits: 6 })}`;
  // return `$${numberWithCommas(toFixedIfNecessary(amount.toString(), dp))}`;
};

export const toFixedIfNecessary = (value: string, dp: number): number => {
  return +parseFloat(value).toFixed(dp);
};

// add `,` when split thounsand value.
export const numberWithCommas = (
  x: number,
  locales: Intl.LocalesArgument = undefined,
  options: Intl.NumberFormatOptions = {}
) => {
  if (isNegative(x)) return '0';
  return x.toLocaleString(locales, options);
};

export const isNegative = (number) => number <= 0;

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: '2-digit'
});
export function formatDate(date: Date | number) {
  const obj = dateFormatter.formatToJson(date);
  return `${obj.month} ${obj.day}, ${obj.year}`;
}

export const timeWithPeriodFormatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});
export function formatTimeWithPeriod(date: Date | number) {
  const obj = timeWithPeriodFormatter.formatToJson(date);
  return `${obj.hour}:${obj.minute} ${obj.dayPeriod}`; //:${obj.second}
}
