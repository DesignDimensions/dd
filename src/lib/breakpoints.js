/**
 * The single breakpoint between the two Figma frames.
 *
 * Figma provides a 1440px desktop frame and a 360px mobile frame and
 * nothing in between, so this value is a judgement call rather than a
 * measurement: below it the mobile frame is used, at or above it the
 * desktop frame is.
 *
 * IMPORTANT: `1024px` is also hardcoded in the `@media` blocks of every
 * section's CSS module, because CSS custom properties cannot be used in
 * media conditions. Change both together.
 */
export const DESKTOP_MIN_WIDTH = 1024
