/**
 * Utility function to merge CSS class names.
 * Simple implementation without clsx/tailwind-merge dependency.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
