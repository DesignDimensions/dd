import { Icon } from './icons.jsx'

/** The notes shown by useToasts, with their Undo-style action. */
export function Toasts({ toasts, dismiss }) {
  return (
    <div aria-live="polite" className="toasts">
      {toasts.map((t) => (
        <div className={`toast toast_${t.tone}`} key={t.key}>
          <Icon name={t.tone === 'error' ? 'alert' : 'check'} size={16} strokeWidth={2.1} />
          <span>{t.message}</span>
          {t.action ? (
            <button
              className="toast_action"
              onClick={() => {
                t.action.run()
                dismiss(t.key)
              }}
              type="button"
            >
              {t.action.label}
            </button>
          ) : null}
        </div>
      ))}
    </div>
  )
}
