import { useIsMobile } from '@/hooks/useIsMobile'

/**
 * One section, two Figma frames. Desktop (1440) and mobile (360) differ in
 * layout, and in places in wording, so each keeps its own layout
 * component, but both render the same content: the section's props. The
 * few fields the phone frame words differently live in `mobile`, which
 * overrides them below the desktop breakpoint.
 */
export function responsive(Desktop, Mobile) {
  function ResponsiveSection({ mobile, ...content }) {
    return useIsMobile() ? (
      <Mobile {...content} {...mobile} />
    ) : (
      <Desktop {...content} />
    )
  }
  return ResponsiveSection
}
