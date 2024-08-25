import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateFallbackText(text?: string): string {
  if (text) {
    if (!text.trim()) {
      return "UN";
    }
    const words = text.split(' ');
    return words.map((word, index) => word[0].toUpperCase()).join('').slice(0, 2)
  }
  return 'UN';
}
