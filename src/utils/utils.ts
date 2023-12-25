import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export function convertDateFormat(originalDate: Date): string {
  const inputDate = new Date(originalDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = inputDate.toLocaleDateString("en-US", options);

  return formattedDate;
}
