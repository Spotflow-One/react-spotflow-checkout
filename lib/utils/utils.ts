import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const remToPx = (value: string) => Math.round(parseFloat(value) * 16);

export const pxToRem = (value: number) => `${value / 16}rem`;
