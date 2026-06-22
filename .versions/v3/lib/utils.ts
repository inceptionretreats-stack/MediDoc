import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes without conflicts (shadcn standard helper). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
