/**
 * The studio's icons, drawn for it: 24-unit grid, 1.75 stroke, round caps.
 * One set, one weight, so nothing in the interface looks borrowed.
 */
const PATHS = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  chevronRight: <path d="m9.5 6 6 6-6 6" />,
  arrowLeft: <path d="M19 12H5m6-6-6 6 6 6" />,
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  arrowUp: <path d="M12 19V5m-6 6 6-6 6 6" />,
  arrowDown: <path d="M12 5v14m-6-6 6 6 6-6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  undo: <path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />,
  redo: <path d="m15 14 5-5-5-5m5 5H9.5a5.5 5.5 0 0 0 0 11H13" />,
  grip: (
    <>
      <circle cx="9" cy="6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="18" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="18" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  copy: (
    <>
      <rect height="11" rx="2.5" width="11" x="9" y="9" />
      <path d="M15 5.5V5a1.5 1.5 0 0 0-1.5-1.5h-8A1.5 1.5 0 0 0 4 5v8a1.5 1.5 0 0 0 1.5 1.5H6" />
    </>
  ),
  trash: <path d="M4.5 7h15M10 11v6m4-6v6M6 7l.9 11.2A2 2 0 0 0 8.9 20h6.2a2 2 0 0 0 2-1.8L18 7M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />,
  pencil: <path d="M14.5 5.5 18.5 9.5M4 20l1-4.5L15.8 4.7a1.8 1.8 0 0 1 2.5 0l1 1a1.8 1.8 0 0 1 0 2.5L8.5 19Z" />,
  pointer: <path d="M5 4l5.2 15 2.2-6.3L19 10.5Z" />,
  eye: (
    <>
      <path d="M2.8 12S6.2 5.5 12 5.5 21.2 12 21.2 12 17.8 18.5 12 18.5 2.8 12 2.8 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  eyeOff: <path d="M4 4l16 16M9.9 5.7A9.6 9.6 0 0 1 12 5.5c5.8 0 9.2 6.5 9.2 6.5a17 17 0 0 1-2.8 3.6M6.4 7.1C4 8.8 2.8 12 2.8 12s3.4 6.5 9.2 6.5a8.8 8.8 0 0 0 4.1-1M10 10a2.8 2.8 0 0 0 4 4" />,
  desktop: (
    <>
      <rect height="12" rx="2" width="18" x="3" y="4" />
      <path d="M9 20h6m-3-4v4" />
    </>
  ),
  tablet: (
    <>
      <rect height="18" rx="2.5" width="14" x="5" y="3" />
      <path d="M11 17.5h2" />
    </>
  ),
  phone: (
    <>
      <rect height="18" rx="3" width="10" x="7" y="3" />
      <path d="M11 17.5h2" />
    </>
  ),
  page: (
    <>
      <path d="M6 3.5h8l4.5 4.5v11A1.5 1.5 0 0 1 17 20.5H6A1.5 1.5 0 0 1 4.5 19V5A1.5 1.5 0 0 1 6 3.5Z" />
      <path d="M13.5 3.5V8h4.5" />
    </>
  ),
  home: <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-4v-6h-5v6h-4A1.5 1.5 0 0 1 4 19Z" />,
  project: (
    <>
      <rect height="16" rx="2.5" width="18" x="3" y="4" />
      <path d="m3 16 5-5 4 4 3-3 6 6" />
      <circle cx="16" cy="8.5" r="1.3" />
    </>
  ),
  article: <path d="M5 5h14M5 9.5h14M5 14h9M5 18.5h6" />,
  quote: <path d="M5 11h4v5.5H5V11Zm0 0c0-3 1-5 4-6m5 6h4v5.5h-4V11Zm0 0c0-3 1-5 4-6" />,
  sliders: (
    <>
      <path d="M4 7h9m4 0h3M4 17h3m4 0h9" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </>
  ),
  image: (
    <>
      <rect height="15" rx="2.5" width="17" x="3.5" y="4.5" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m20.5 15.5-4.5-4.5-9 8.5" />
    </>
  ),
  upload: <path d="M12 15.5V4m-4.5 4.5L12 4l4.5 4.5M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  layers: <path d="m12 4 8.5 4.5L12 13 3.5 8.5Zm-8.5 8L12 17l8.5-4.5M3.5 16 12 20.5l8.5-4.5" />,
  sparkle: <path d="M12 3.5c.6 4.2 2.3 5.9 6.5 6.5-4.2.6-5.9 2.3-6.5 6.5-.6-4.2-2.3-5.9-6.5-6.5 4.2-.6 5.9-2.3 6.5-6.5ZM18.5 15.5c.3 1.9 1 2.6 2.9 2.9-1.9.3-2.6 1-2.9 2.9-.3-1.9-1-2.6-2.9-2.9 1.9-.3 2.6-1 2.9-2.9Z" />,
  send: <path d="M20.5 3.5 10 14M20.5 3.5 14 20.5l-4-6.5-6.5-4Z" />,
  more: (
    <>
      <circle cx="6" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="18" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  logout: <path d="M14.5 4H18a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 18 20h-3.5M10 16.5 5.5 12 10 7.5M5.5 12H15" />,
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 8.5-8.5M16 7l2.5 2.5M14 9l2 2" />
    </>
  ),
  sidebar: (
    <>
      <rect height="16" rx="2.5" width="18" x="3" y="4" />
      <path d="M9.5 4v16" />
    </>
  ),
  link: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />,
  lock: (
    <>
      <rect height="10" rx="2.5" width="15" x="4.5" y="10.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  alert: <path d="M12 9v4m0 3.5h.01M10.3 4.2 2.9 17.1A2 2 0 0 0 4.6 20h14.8a2 2 0 0 0 1.7-2.9L13.7 4.2a2 2 0 0 0-3.4 0Z" />,
  cloud: <path d="M7 18.5a4.5 4.5 0 0 1-.6-9 6 6 0 0 1 11.4 1.5A3.8 3.8 0 0 1 17.3 18.5Z" />,
  cloudOff: <path d="M4 4l16 16M9 6.1A6 6 0 0 1 17.8 11a3.8 3.8 0 0 1 2.6 5.3M16 18.5H7a4.5 4.5 0 0 1-1.7-8.7" />,
  zap: <path d="M13 3 5 13.5h6L10.5 21 19 10h-6Z" />,
  music: (
    <>
      <path d="M9 17.5V5.5l10-2v12" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <circle cx="16.5" cy="15.5" r="2.5" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3.5a8.5 8.5 0 0 0 0 17c1.2 0 1.8-.8 1.8-1.7 0-1.3-1-1.5-1-2.6 0-1 .8-1.7 1.8-1.7H17a3.5 3.5 0 0 0 3.5-3.5c0-4.2-3.8-7.5-8.5-7.5Z" />
      <circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  building: <path d="M4 20.5h16M6 20.5V5a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 18 5v15.5M10 8h1m2 0h1m-4 4h1m2 0h1m-3 8.5v-4h2v4" />,
  footer: (
    <>
      <rect height="16" rx="2.5" width="18" x="3" y="4" />
      <path d="M3 15.5h18M7 18h3m3 0h4" />
    </>
  ),
  tag: <path d="M3.5 12.2V5A1.5 1.5 0 0 1 5 3.5h7.2l8.3 8.3a1.5 1.5 0 0 1 0 2.1l-6.6 6.6a1.5 1.5 0 0 1-2.1 0ZM8.5 8.5h.01" />,
  mail: (
    <>
      <rect height="14" rx="2.5" width="18" x="3" y="5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
}

export function Icon({ name, size = 18, className, strokeWidth = 1.75, ...rest }) {
  return (
    <svg
      aria-hidden="true"
      className={className ? `icon ${className}` : 'icon'}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      width={size}
      {...rest}
    >
      {PATHS[name]}
    </svg>
  )
}
