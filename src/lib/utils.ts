import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const conditionsMap = {
  NEW: "New",
  COMPLETE: "Complete",
  LOOSE: "Loose",
  BAD: "Bad",
  NOT_WORKING: "Not Working",
};

export type CurrencyType = {
  loose: number;
  complete: number;
  new: number;
  box: number;
  manual: number;
};
export type Price = {
  usd: CurrencyType;
  gbp: CurrencyType;
  eur: CurrencyType;
};
