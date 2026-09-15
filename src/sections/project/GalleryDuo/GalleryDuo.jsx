import duoMg9645 from '@/assets/suryagarh/duo-mg9645.png'
import duoMg9888 from '@/assets/suryagarh/duo-mg9888.png'
import { useZoomable } from '@/hooks/useZoomable'

import './GalleryDuo.css'

/** Figma 2955:12731 — two full-width photo bands, stacked. */
export default function GalleryDuo() {
  const mg9645Ref = useZoomable(duoMg9645)
  const mg9888Ref = useZoomable(duoMg9888)

  return (
    <section className="galleryDuo_section">
      <div className="galleryDuo_frame">
        <img alt="" className="galleryDuo_image" ref={mg9645Ref} src={duoMg9645} />
      </div>
      <div className="galleryDuo_frame">
        <img alt="" className="galleryDuo_image" ref={mg9888Ref} src={duoMg9888} />
      </div>
    </section>
  )
}
