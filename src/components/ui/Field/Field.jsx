import { useId, useState } from 'react'

import attachIcon from '@/assets/forms/attach.svg'
import { cn } from '@/lib/cn'

import './Field.css'

/**
 * Figma 2719:20424 (and every labelled field on the Contact us and Careers
 * frames) — a semibold label over a 28px-radius pill. `multiline` swaps in
 * Figma's 240px message box (2719:20438).
 *
 * `label` may be left out for a repeated field that shares the label above
 * it; pass `ariaLabel` then, so the input still has a name.
 */
export default function Field({
  ariaLabel,
  label,
  multiline = false,
  name,
  placeholder,
  type = 'text',
}) {
  const id = useId()
  const control = {
    'aria-label': label ? undefined : ariaLabel,
    className: cn('field_control', multiline && 'field_textarea'),
    id,
    name,
    placeholder,
  }

  return (
    <div className="field_group">
      {label ? (
        <label className="field_label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      {multiline ? <textarea {...control} /> : <input {...control} type={type} />}
    </div>
  )
}

/**
 * Figma 2719:21242 — "Attach Resume": the same pill as a file picker, with
 * the chosen file's name taking the placeholder's place.
 */
export function FileField({ label, name, placeholder = 'no file selected' }) {
  const id = useId()
  const [fileName, setFileName] = useState('')

  return (
    <div className="field_group">
      <span className="field_label" id={`${id}-label`}>
        {label}
      </span>
      <label className={cn('field_control', 'field_file')} htmlFor={id}>
        <img alt="" className="field_fileIcon" src={attachIcon} />
        <span className={cn('field_fileName', !fileName && 'field_placeholder')}>
          {fileName || placeholder}
        </span>
        <input
          aria-labelledby={`${id}-label`}
          className="field_fileInput"
          id={id}
          name={name}
          onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')}
          type="file"
        />
      </label>
    </div>
  )
}
