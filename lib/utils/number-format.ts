/* eslint-disable @typescript-eslint/no-explicit-any */
// import * as validator from "validator";

export const formatNumber = (val: any, dp?: number) => {
  const formatter = new Intl.NumberFormat("ng-NG", {
    style: "decimal",
    maximumFractionDigits: dp || 0,
    minimumFractionDigits: dp || 0,
  });
  //   return formatter.format(val);
  return isNaN(parseFloat(formatter.format(val))) ? "-" : formatter.format(val);
};

export function isNumeric(str: string) {
  if (typeof str !== "string") return false; // we only process strings!

  if (!isNaN(parseFloat(str))) {
    return !isNaN(parseFloat(str));
  }

  return false;
}

export const getDecimalFormat = (val: number) => {
  if (typeof val !== "number") {
    throw new Error("Input must be a number");
  }

  const absoluteValue = Math.abs(val);
  const decimalPart = absoluteValue - Math.floor(absoluteValue); // Convert the decimal part to a whole number to two decimal places
  const decimalAsWholeNumber = Math.round(decimalPart * 100);

  return decimalAsWholeNumber;
};

export const formatWholeDecimal = (value: number) => {
  return {
    wholeNumber: formatNumber(value, 0),
    decimal: getDecimalFormat(value),
  };
};

export function formatNumberInFormat(num: number) {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "k";
  } else {
    return num.toString();
  }
}
