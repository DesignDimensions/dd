import story3d from '@/assets/images/story-3d.jpg'
import storyAi from '@/assets/images/story-ai-designer.jpg'
import storyGradients from '@/assets/images/story-gradients.gif'
import Cta from '@/components/ui/Cta/Cta.jsx'
import ProjectCard from '@/components/ui/ProjectCard/ProjectCard.jsx'

import styles from './DesignDialogueDesktop.module.css'

const BODY_COPY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'

/** Figma 2714:8806 */
export default function DesignDialogueDesktop() {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <div className={styles.textStack}>
          <div className={styles.stack24}>
            <div className={styles.stack16}>
              <p className={styles.eyebrow}>We dig deep</p>
              <div className={styles.headingRow}>
                <p className={styles.heading}>Design Dialogue</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.headRight}>
          <div className={styles.stack12}>
            <div className={styles.stack8}>
              <p className={styles.intro}>{BODY_COPY}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.row}>
          <ProjectCard
            background="#dcf6f8"
            body={BODY_COPY}
            eyebrow="Article"
            image={storyAi}
            title={['AI is not the designer,', 'you are!']}
          />
          <ProjectCard
            background="#ff694f"
            body={BODY_COPY}
            eyebrow="Article"
            image={storyGradients}
            title={['Gradients are not ', 'dependable']}
          />
          <ProjectCard
            background="#c79275"
            body={BODY_COPY}
            eyebrow="Article"
            image={story3d}
            title={['3D slaying the design', 'industry']}
          />
        </div>
      </div>

      <Cta>View All Stories</Cta>
    </section>
  )
}
