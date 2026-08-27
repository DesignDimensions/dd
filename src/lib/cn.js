/**
 * Joins CSS-module class names, dropping falsy values.
 *
 *   cn(styles.card, isActive && styles.active)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
