import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(isoString: string) {
  const date = new Date(isoString);

  const day = date.getUTCDate();
  const month = date.toLocaleString('default', { month: 'short' }); // Get month as 'Oct'
  const year = date.getUTCFullYear();

  return `${day} ${month}, ${year}`;
}