/**
 * Joins class names, dropping falsy values.
 *
 *   cn('card', isActive && 'card_active')
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
