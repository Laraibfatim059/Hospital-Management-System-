import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines conditional class names using clsx and merges conflicting Tailwind CSS classes.
 *
 * @param {...any} inputs - Class names, boolean expressions, objects, or arrays
 * @returns {string} Merged Tailwind class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
