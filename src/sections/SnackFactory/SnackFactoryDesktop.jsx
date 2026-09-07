import MergeButton from '@/components/ui/MergeButton/MergeButton.jsx'

import './SnackFactoryDesktop.css'

/**
 * Figma 2714:8744
 *
 * Note: the tag reads "Paxkaging design" in the frame. Kept verbatim —
 * flag it with the designer if it is a typo rather than intentional.
 */
export default function SnackFactoryDesktop() {
  return (
    <section className="snackFactoryDesktop_section">
      <div className="snackFactoryDesktop_left">
        <div className="snackFactoryDesktop_textStack">
          <div className="snackFactoryDesktop_stack24">
            <div className="snackFactoryDesktop_stack16">
              <div className="snackFactoryDesktop_headingRow">
                <p className="snackFactoryDesktop_heading">Snack Factory</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="snackFactoryDesktop_right">
        <div className="snackFactoryDesktop_introRow">
          <p className="snackFactoryDesktop_intro">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="snackFactoryDesktop_metaWrap">
          <div className="snackFactoryDesktop_metaRow">
            <MergeButton label="Paxkaging design" />
          </div>
        </div>
      </div>
    </section>
  )
}
