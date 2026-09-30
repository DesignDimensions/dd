import { useEffect, useState } from 'react'

import mark from '@/assets/icons/logo-header-group-1.svg'

import { api, setToken } from './api'
import { Icon } from './icons.jsx'
import Studio from './Studio.jsx'

/**
 * The way in: the first visit chooses the studio's password, later visits
 * sign in with it. Once signed in, the studio itself.
 */
export default function Gate() {
  const [status, setStatus] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api('status')
      .then(setStatus)
      .catch((err) => setError(err.message))
  }, [])

  if (status?.signedIn) {
    setToken(status.token)
    return <Studio onSignOut={() => setStatus({ ...status, signedIn: false, token: null })} />
  }

  return (
    <main className="gate">
      <div aria-hidden="true" className="gate_mesh">
        <span className="gate_blob gate_blob1" />
        <span className="gate_blob gate_blob2" />
        <span className="gate_blob gate_blob3" />
        <span className="gate_blob gate_blob4" />
      </div>
      <div aria-hidden="true" className="grain" />

      <section className="gate_card">
        <div className="gate_brand">
          <span className="mark">
            <img alt="" src={mark} />
          </span>
          <span>Design Dimensions</span>
        </div>
        <h1 className="gate_title">
          Studio<span className="gate_titleDot">.</span>
        </h1>
        {!status && !error ? <p className="gate_lede">One sec…</p> : null}
        {status && !status.setUp ? <SetUp onDone={setStatus} /> : null}
        {status?.setUp ? <SignIn onDone={setStatus} /> : null}
        {error && !status ? <p className="gate_error">{error}</p> : null}
      </section>

      <p className="gate_foot">
        <Icon name="lock" size={13} /> Made in-house · lives on your own server
      </p>
    </main>
  )
}

function PasswordInput({ autoComplete, autoFocus, id, onChange, placeholder, value, action }) {
  const [shown, setShown] = useState(false)
  return (
    <div className="gate_field">
      <input
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className="gate_input"
        id={id}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={shown ? 'text' : 'password'}
        value={value}
      />
      <button
        aria-label={shown ? 'Hide password' : 'Show password'}
        className="gate_peek"
        onClick={() => setShown((s) => !s)}
        type="button"
      >
        <Icon name={shown ? 'eyeOff' : 'eye'} size={18} />
      </button>
      {action}
    </div>
  )
}

function SignIn({ onDone }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [shake, setShake] = useState(0)

  async function submit(event) {
    event.preventDefault()
    if (!password) return
    setBusy(true)
    setError('')
    try {
      onDone(await api('login', { method: 'POST', body: { password } }))
    } catch (err) {
      setError(err.message)
      setShake((n) => n + 1)
      setBusy(false)
    }
  }

  return (
    <form className="gate_form" key={shake} onSubmit={submit}>
      <p className="gate_lede">Welcome back. Pop in the team password to start editing.</p>
      <div className={shake ? 'gate_shake' : undefined}>
        <PasswordInput
          action={
            <button aria-label="Sign in" className="gate_go" disabled={busy || !password} type="submit">
              {busy ? <span className="spinner" /> : <Icon name="arrowRight" size={20} />}
            </button>
          }
          autoComplete="current-password"
          autoFocus
          onChange={setPassword}
          placeholder="Password"
          value={password}
        />
      </div>
      {error ? (
        <p className="gate_error">
          <Icon name="alert" size={15} /> {error}
        </p>
      ) : null}
    </form>
  )
}

function strength(password) {
  if (password.length < 10) return { level: 0, label: `${10 - password.length} more characters` }
  const variety = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/, / /].filter((r) => r.test(password)).length
  if (password.length >= 16 || variety >= 3) return { level: 3, label: 'Strong. Nice.' }
  return { level: 2, label: 'Good enough — longer is better' }
}

function SetUp({ onDone }) {
  const [password, setPassword] = useState('')
  const [again, setAgain] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const s = strength(password)
  const mismatch = again.length > 0 && again !== password
  const ready = s.level > 0 && again === password

  async function submit(event) {
    event.preventDefault()
    if (!ready) return
    setBusy(true)
    setError('')
    try {
      onDone(await api('setup', { method: 'POST', body: { password } }))
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <form className="gate_form" onSubmit={submit}>
      <p className="gate_lede">
        First time here. Pick the password the whole team will use — a short sentence works great.
      </p>
      <PasswordInput autoComplete="new-password" autoFocus onChange={setPassword} placeholder="New password" value={password} />
      <div className="meter" data-level={s.level}>
        <span />
        <span />
        <span />
        <em>{password ? s.label : 'At least 10 characters'}</em>
      </div>
      <PasswordInput autoComplete="new-password" onChange={setAgain} placeholder="Type it once more" value={again} />
      {mismatch ? <p className="gate_error">Those two don’t match yet.</p> : null}
      {error ? <p className="gate_error">{error}</p> : null}
      <button className="button button_primary button_big" disabled={busy || !ready} type="submit">
        {busy ? 'Setting up…' : 'Open the studio'} <Icon name="arrowRight" size={18} />
      </button>
    </form>
  )
}
