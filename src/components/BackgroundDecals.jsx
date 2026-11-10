export default function BackgroundDecals() {
  return (
    <div className="page-backdrop" aria-hidden="true">
      <svg className="backdrop-decal backdrop-decal--orbit" viewBox="0 0 180 180" fill="none" focusable="false">
        <circle cx="90" cy="90" r="58" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="90" cy="90" rx="88" ry="29" stroke="currentColor" strokeWidth="2" transform="rotate(-35 90 90)" />
        <circle cx="145" cy="43" r="9" fill="var(--decal-mint)" />
        <circle cx="90" cy="90" r="5" fill="currentColor" />
      </svg>
      <svg className="backdrop-decal backdrop-decal--spark" viewBox="0 0 120 120" focusable="false">
        <path d="m60 4 10 34 29-21-17 31 34 12-34 10 17 29-29-17-10 34-12-34-31 17 21-29L4 60l34-12-21-31 31 21Z" fill="currentColor" />
        <circle cx="60" cy="60" r="12" fill="var(--bg)" />
      </svg>
      <svg className="backdrop-decal backdrop-decal--steps" viewBox="0 0 160 160" fill="none" focusable="false">
        <path d="M10 150V90h45V45h45V10h50v65h-45v40H60v35Z" fill="currentColor" fillOpacity=".22" stroke="currentColor" strokeWidth="2" />
        <path d="M10 125h25V70h45V25" stroke="var(--decal-purple)" strokeWidth="3" />
      </svg>
      <svg className="backdrop-decal backdrop-decal--rings" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2" focusable="false">
        <circle cx="80" cy="80" r="72" />
        <circle cx="80" cy="80" r="55" />
        <circle cx="80" cy="80" r="38" />
        <path d="M80 0v160M0 80h160" strokeDasharray="3 9" />
      </svg>
      <svg className="backdrop-decal backdrop-decal--tiles" viewBox="0 0 140 140" focusable="false">
        <rect x="12" y="12" width="52" height="52" rx="8" fill="var(--decal-mint)" />
        <rect x="76" y="12" width="52" height="52" rx="26" fill="var(--decal-mint)" />
        <rect x="12" y="76" width="52" height="52" rx="8" fill="var(--decal-purple)" />
        <path d="M76 128V76h52Z" fill="var(--decal-purple)" />
      </svg>
      <svg className="backdrop-decal backdrop-decal--crosses" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" focusable="false">
        <path d="M25 5v40M5 25h40M75 55v40M55 75h40" />
      </svg>
      <div className="backdrop-dots backdrop-dots--left" />
      <div className="backdrop-dots backdrop-dots--right" />
    </div>
  )
}
