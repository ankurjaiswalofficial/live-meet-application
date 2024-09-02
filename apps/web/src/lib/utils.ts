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
    return words.map((word) => word[0].toUpperCase()).join('').slice(0, 2)
  }
  return 'UN';
}

export function generateCustomUUID(): string {
  const getRandomLetters = (): string => {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 3; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const uuid = `${getRandomLetters()}-${getRandomLetters()}-${getRandomLetters()}`;
  return uuid;
}

export function generateFakeUser(): string {
  const getRandomLetters = (): string => {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 3; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const uuid = `_Fake${getRandomLetters()}Fake${getRandomLetters()}Fake`
  return uuid;
}
