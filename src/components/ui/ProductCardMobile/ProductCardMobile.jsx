import { Link } from 'react-router-dom'

import IconButton from '@/components/ui/IconButton/IconButton.jsx'
import Tag from '@/components/ui/Tag/Tag.jsx'
import { cn } from '@/lib/cn'

import './ProductCardMobile.css'

/**
 * Figma "Product Card Mobile" 2715:10696, reworked to match wepresent's
 * .card-wrapper "has-frame" recipe: the whole card is the coloured
 * frame, with the image inset inside it rather than running edge to
 * edge with only the body panel coloured.
 *
 * `to` makes the whole card a link to that route. `image`, `body` and `tag`
 * may be left out, as on ProjectCard.
 */
export default function ProductCardMobile({
  image,
  title,
  body,
  tag,
  background,
  mediaBackground,
  to,
}) {
  const Root = to ? Link : 'div'

  return (
    <Root
      className="productCardMobile_card"
      style={{ backgroundColor: background }}
      {...(to && { to })}
    >
      <div
        className={cn('productCardMobile_media', !image && 'productCardMobile_mediaEmpty')}
        style={{ backgroundColor: mediaBackground }}
      >
        {image ? <img alt="" className="productCardMobile_image" src={image} /> : null}
      </div>
      <div className="productCardMobile_body">
        <div className="productCardMobile_text">
          <p className="productCardMobile_title">{title}</p>
          {body ? <p className="productCardMobile_copy">{body}</p> : null}
        </div>
        <div className="productCardMobile_footer">
          {tag ? <Tag size="mobile">{tag}</Tag> : <span />}
          <IconButton size={32} />
        </div>
      </div>
    </Root>
  )
}
