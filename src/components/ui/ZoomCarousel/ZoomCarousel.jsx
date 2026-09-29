import { Children, useState } from 'react'
import { A11y, Autoplay, EffectCards } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-cards'
import './ZoomCarousel.css'

/**
 * Looping, centred card slider. Reference: wepresent's hero carousel
 * (.centered-title_media → .carousel_wrapper, desktopEffect "zoom").
 *
 * The centred slide sits at full size; its neighbours shrink to 82.5%
 * and are pulled back in towards it, so the row reads as one card in
 * focus with the rest receding. Drag or swipe to move it.
 *
 * Like theirs, it first renders unlooped to measure: if everything fits
 * (Swiper "locks") the cards just sit centred in a row. Otherwise it
 * remounts looped, repeating the cards until there are at least twelve,
 * with a few extra kept parked either side of the centre
 * (loopAdditionalSlides). Theirs repeats to six, but that leaves the
 * right edge empty on load at 1280 and up, and at any position from
 * 1920 — the zoom pulls outer slides inwards, so a wide screen shows
 * more of them than their width alone suggests.
 *
 * `effect="cards"` is their phone variant instead: the slides stack
 * into a deck and swiping flicks the top one off.
 *
 * Once looped it advances on its own every `interval` ms, holding while
 * the pointer is over it and carrying on after a drag. It stays still
 * under prefers-reduced-motion.
 */

const MIN_LOOP_SLIDES = 12
const SIDE_SCALE = 0.825

/** Piecewise-linear map of `value` from `input` stops to `output` stops. */
function interpolate(value, input, output, clamp = true) {
  const last = input.length - 1
  let i = 1
  while (i < last && value > input[i]) i += 1
  const [x0, x1] = [input[i - 1], input[i]]
  const [y0, y1] = [output[i - 1], output[i]]
  let t = (value - x0) / (x1 - x0)
  if (clamp) t = Math.min(Math.max(t, 0), 1)
  return y0 + (y1 - y0) * t
}

/** Their custom Swiper effect, ported as-is. */
function ZoomEffect({ swiper, on }) {
  on('beforeInit', () => {
    if (swiper.params.effect !== 'zoom') return
    swiper.classNames.push(`${swiper.params.containerModifierClass}zoom`)
    swiper.classNames.push(`${swiper.params.containerModifierClass}3d`)
    const overrides = { watchSlidesProgress: true }
    Object.assign(swiper.params, overrides)
    Object.assign(swiper.originalParams, overrides)
  })

  on('progress', () => {
    if (swiper.params.effect !== 'zoom') return
    const sizes = swiper.slidesSizesGrid
    for (let i = 0; i < swiper.slides.length; i += 1) {
      const slide = swiper.slides[i]
      const { progress } = slide
      const offset =
        progress + (swiper.params.centeredSlides ? 0 : (swiper.params.slidesPerView - 1) * 0.5)
      const scale = interpolate(Math.abs(offset), [0, 1], [1, SIDE_SCALE])
      const shrink = sizes[i] - sizes[i] * scale
      const x = interpolate(
        progress,
        [-2, -1, 0, 1, 2],
        [-1.8 * shrink, -0.6 * shrink, 0, 0.6 * shrink, 1.8 * shrink],
        false,
      )
      slide.style.transform = `scale(${scale}) translateX(${x}px)`
    }
  })

  on('setTransition', (instance, duration) => {
    if (instance.params.effect !== 'zoom') return
    for (const slide of instance.slides) slide.style.transitionDuration = `${duration}ms`
  })
}

export default function ZoomCarousel({
  children,
  effect = 'zoom',
  interval = 3000,
  label = 'cards',
}) {
  const [swiper, setSwiper] = useState(null)
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const items = Children.toArray(children)
  if (items.length === 0) return null

  const locked = !swiper || swiper.isLocked
  const copies = locked ? 1 : Math.ceil(MIN_LOOP_SLIDES / items.length)
  const slides = Array.from({ length: copies }, () => items).flat()

  return (
    <div aria-label={label} className="zoomCarousel_wrapper" role="region">
      <Swiper
        autoplay={
          !locked && !reducedMotion && {
            delay: interval,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }
        }
        breakpoints={{ 1024: { spaceBetween: 42 } }}
        centeredSlides={!locked}
        cardsEffect={{ perSlideRotate: 0, perSlideOffset: 10, slideShadows: false }}
        className={locked ? 'zoomCarousel_slider swiper-locked' : 'zoomCarousel_slider'}
        effect={effect}
        key={`${effect}-${items.length}-${locked}`}
        loop={!locked}
        loopAdditionalSlides={3}
        modules={[EffectCards, ZoomEffect, Autoplay, A11y]}
        onSwiper={setSwiper}
        slidesPerView="auto"
        spaceBetween={20}
      >
        {slides.map((child, i) => (
          <SwiperSlide className="zoomCarousel_item" key={i}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
