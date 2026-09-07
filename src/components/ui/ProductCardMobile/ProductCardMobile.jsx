import IconButton from '@/components/ui/IconButton/IconButton.jsx'
import Tag from '@/components/ui/Tag/Tag.jsx'

import './ProductCardMobile.css'

/**
 * Figma "Product Card Mobile" 2715:10696, reworked to match wepresent's
 * .card-wrapper "has-frame" recipe: the whole card is the coloured
 * frame, with the image inset inside it rather than running edge to
 * edge with only the body panel coloured.
 */
export default function ProductCardMobile({
  image,
  title,
  body,
  tag,
  background,
  mediaBackground,
}) {
  return (
    <div className="productCardMobile_card" style={{ backgroundColor: background }}>
      <div
        className="productCardMobile_media"
        style={{ backgroundColor: mediaBackground }}
      >
        <img alt="" className="productCardMobile_image" src={image} />
      </div>
      <div className="productCardMobile_body">
        <div className="productCardMobile_text">
          <p className="productCardMobile_title">{title}</p>
          <p className="productCardMobile_copy">{body}</p>
        </div>
        <div className="productCardMobile_footer">
          <Tag size="mobile">{tag}</Tag>
          <IconButton size={32} />
        </div>
      </div>
    </div>
  )
}
