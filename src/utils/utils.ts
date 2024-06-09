import { type ClassValue, clsx } from "clsx";
import { format, isSameDay, isSameMonth, isSameYear, parse } from "date-fns";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatDateRange = (
  startDateString: string,
  endDateString: string,
): string => {
  const startDate = parse(startDateString, "MMM d, yyyy", new Date());
  const endDate = parse(endDateString, "MMM d, yyyy", new Date());

  if (isSameDay(startDate, endDate)) {
    return format(startDate, "MMM d, yyyy");
  } else if (isSameMonth(startDate, endDate)) {
    return `${format(startDate, "MMM d")} - ${format(endDate, "d, yyyy")}`;
  } else if (isSameYear(startDate, endDate)) {
    return `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`;
  } else {
    return `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`;
  }
};

export const getRandomDate = (): string => {
  const start = new Date();
  const end = new Date();
  end.setDate(start.getDate() + 180); // Set end date range to 180 days after start date
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  const randomDate = new Date(randomTime);
  return `${randomDate.toLocaleString("default", { month: "short" })} ${randomDate.getDate()}, ${randomDate.getFullYear()}`;
};
