import brand01 from '@/assets/about/brand-01.png'
import brand02 from '@/assets/about/brand-02.png'
import brand03 from '@/assets/about/brand-03.png'
import brand04 from '@/assets/about/brand-04.png'
import brand05 from '@/assets/about/brand-05.png'
import brand06 from '@/assets/about/brand-06.png'
import brand07 from '@/assets/about/brand-07.png'
import brand08 from '@/assets/about/brand-08.png'
import brand09 from '@/assets/about/brand-09.png'
import brand10 from '@/assets/about/brand-10.png'
import brand11 from '@/assets/about/brand-11.png'
import brand12 from '@/assets/about/brand-12.png'

import './Brands.css'

/**
 * Figma 7962:21344 — twelve 248x108 logo tiles on a 1120 wrap.
 *
 * Figma names each tile (Suryagarh, Godawan, White Rhino and so on) but
 * renders it as an image with no label, so the names are carried here as
 * alt text only.
 */
const BRANDS = [
  { src: brand01, name: 'Logo variation' },
  { src: brand02, name: 'Logo variation' },
  { src: brand03, name: 'Catch' },
  { src: brand04, name: 'White Rhino' },
  { src: brand05, name: 'Godawan' },
  { src: brand06, name: 'Le Marche' },
  { src: brand07, name: 'San Lorenzo' },
  { src: brand08, name: 'Snack Factory' },
  { src: brand09, name: 'CAB' },
  { src: brand10, name: 'Bhujialalji' },
  { src: brand11, name: 'Suryagarh' },
  { src: brand12, name: 'Kachori Story' },
]

export default function Brands() {
  return (
    <section className="brands_section">
      <div className="brands_textStack">
        <div className="brands_stack24">
          <div className="brands_stack16">
            <p className="brands_eyebrow">Our Association</p>
            <div className="brands_headingRow">
              <p className="brands_heading">Brands love us</p>
            </div>
          </div>
        </div>
      </div>

      <div className="brands_grid">
        {BRANDS.map((brand, index) => (
          <div className="brands_tile" key={`${brand.name}-${index}`}>
            <img alt={brand.name} className="brands_logo" src={brand.src} />
          </div>
        ))}
      </div>
    </section>
  )
}
