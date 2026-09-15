import { useState } from 'react'

const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT

/** Figma 2715:11785 / 11787 / 11789 — the same three fields on mobile */
export const ENQUIRY_FIELDS = [
  { autoComplete: 'name', label: 'Your name', name: 'name', type: 'text' },
  { autoComplete: 'email', label: 'Email address', name: 'email', type: 'email' },
  { autoComplete: 'tel', label: 'Phone number', name: 'phone', type: 'tel' },
]

const SUBMIT_LABELS = { error: 'Try again', idle: 'Submit', sending: 'Sending…', sent: 'Sent' }

/**
 * The footer's enquiry form (ContactDesktop / ContactMobile).
 *
 * Interests are multi-select pills. Each selected one renders a hidden
 * `interests` input, so the choices travel in the form's own data next to
 * name, email and phone. Submitting posts all of it as JSON to
 * VITE_ENQUIRY_ENDPOINT. There is no endpoint yet, so until one is set
 * nothing is sent and the payload is only logged in development.
 */
export function useEnquiryForm() {
  const [interests, setInterests] = useState([])
  const [status, setStatus] = useState('idle')

  function toggleInterest(label) {
    setInterests((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    )
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      email: data.get('email'),
      interests: data.getAll('interests'),
      name: data.get('name'),
      phone: data.get('phone'),
    }

    if (!ENDPOINT) {
      if (import.meta.env.DEV) console.info('Enquiry not sent — VITE_ENQUIRY_ENDPOINT is not set.', payload)
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(ENDPOINT, {
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      if (!response.ok) throw new Error(`Enquiry failed with ${response.status}`)
      form.reset()
      setInterests([])
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return { handleSubmit, interests, submitLabel: SUBMIT_LABELS[status], toggleInterest }
}
