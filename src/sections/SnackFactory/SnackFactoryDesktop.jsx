import MergeButton from '@/components/ui/MergeButton/MergeButton.jsx'

import './SnackFactoryDesktop.css'

/**
 * Figma 2714:8744
 *
 * Note: the tag reads "Packaging design" in the frame. Kept verbatim —
 * flag it with the designer if it is a typo rather than intentional.
 */
export default function SnackFactoryDesktop({ heading, intro, tag }) {
  return (
    <section className="section_box section_clip snackFactoryDesktop_section">
      <div className="snackFactoryDesktop_left">
        <div className="snackFactoryDesktop_textStack">
          <div className="snackFactoryDesktop_stack24">
            <div className="snackFactoryDesktop_stack16">
              <div className="snackFactoryDesktop_headingRow">
                <p className="snackFactoryDesktop_heading">{heading}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="snackFactoryDesktop_right">
        <div className="snackFactoryDesktop_introRow">
          <p className="snackFactoryDesktop_intro">{intro}</p>
        </div>
        <div className="snackFactoryDesktop_metaWrap">
          <div className="snackFactoryDesktop_metaRow">
            <MergeButton label={tag} />
          </div>
        </div>
      </div>
    </section>
  )
}
