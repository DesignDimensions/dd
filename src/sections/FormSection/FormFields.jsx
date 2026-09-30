import { useState } from 'react'

import Field, { FileField } from '@/components/ui/Field/Field.jsx'

/**
 * A form's fields from content, in order:
 *
 *   { label, name, placeholder, type?, multiline? }   a text field
 *   { kind: 'file', label, name }                     a file picker
 *   { kind: 'links', label, ariaLabel, name, placeholder, addLabel }
 *       link fields the visitor can add to ("Add More +", Figma 2719:21232)
 */
export default function FormFields({ fields }) {
  return fields.map((field, index) => {
    if (field.kind === 'file')
      return <FileField key={index} label={field.label} name={field.name} />
    if (field.kind === 'links') return <LinkFields key={index} {...field} />
    return (
      <Field
        key={index}
        label={field.label}
        multiline={field.multiline}
        name={field.name}
        placeholder={field.placeholder}
        type={field.type}
      />
    )
  })
}

/** The link fields, then "Add More +" right-aligned beneath, adding
    another field — what the frame's control implies. */
function LinkFields({ addLabel, ariaLabel, label, name, placeholder }) {
  const [count, setCount] = useState(1)

  return (
    <div className="formSection_links">
      {Array.from({ length: count }, (_, index) => (
        <Field
          ariaLabel={`${ariaLabel} ${index + 1}`}
          key={index}
          label={index === 0 ? label : undefined}
          name={name}
          placeholder={placeholder}
          type="url"
        />
      ))}
      <button
        className="formSection_addMore"
        onClick={() => setCount((n) => n + 1)}
        type="button"
      >
        {addLabel}
      </button>
    </div>
  )
}
