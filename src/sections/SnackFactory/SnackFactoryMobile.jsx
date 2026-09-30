import MergeButton from '@/components/ui/MergeButton/MergeButton.jsx'

import './SnackFactoryMobile.css'

/**
 * Figma 2715:10544 "After".
 *
 * The tag reads "Packaging Design" here, where the desktop frame reads
 * "Packaging design" (2714:8755). Both are kept as their frame states them.
 */
export default function SnackFactoryMobile({ heading, intro, tag }) {
  return (
    <section className="section_box snackFactoryMobile_section">
      <p className="snackFactoryMobile_heading">{heading}</p>
      <div className="snackFactoryMobile_body">
        <p className="snackFactoryMobile_intro">{intro}</p>
        <div className="snackFactoryMobile_buttons">
          <MergeButton gap={12} label={tag} size={32} />
        </div>
      </div>
    </section>
  )
}
