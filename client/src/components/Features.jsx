const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

const FEATURES = [
  {
    title: 'One-key capture, video keeps playing',
    desc: 'Press S (or Alt+S) or click the camera button built into the YouTube player. A "#N Slide Captured" popup shows the timestamp, matches YouTube\'s light or dark theme, and playback never pauses.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    )
  },
  {
    title: 'Full annotation studio',
    desc: 'Select, pen, highlighter, arrow, rectangle, circle and text, each remembering its own thickness (up to 72px for highlighter and eraser). Your last-used tool stays selected as you move between slides.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    )
  },
  {
    title: 'Rich text boxes',
    desc: '16 fonts, sizes from 8 to 96, bold, italic and underline, alignment, a background fill with opacity, and borders in solid, dashed, dotted or double styles. Drag a box by its grip or any edge.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    )
  },
  {
    title: 'Precision eraser',
    desc: 'Erase only the part of a pen or highlighter stroke you actually touch, not the whole line. Shapes and text stay put, so cleanup never costs you your work.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
        <path d="M22 21H7" />
        <path d="m5 11 9 9" />
      </svg>
    )
  },
  {
    title: 'Fills, colors & opacity',
    desc: 'Fill shapes and text boxes with any color, then fade them with an opacity slider right inside the palette. The highlighter gets its own opacity too, and the pen is always crisp.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
        <path d="m5 2 5 5" />
        <path d="M2 13h15" />
        <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z" />
      </svg>
    )
  },
  {
    title: 'Drag-anywhere slide timeline',
    desc: 'Grab any slide anywhere on its card to reorder it. Add blank slides in eight soft canvas colors, sort back to video order, or clear a slide, all from the Slide Options menu.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="3" y="4" width="18" height="4" rx="1" />
        <rect x="3" y="10" width="18" height="4" rx="1" />
        <rect x="3" y="16" width="12" height="4" rx="1" />
      </svg>
    )
  },
  {
    title: 'Side panel gallery',
    desc: 'Browse every captured slide as a thumbnail while you watch. Click one and the video jumps straight to that moment.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    )
  },
  {
    title: 'Auto-save, light & dark',
    desc: 'Every change saves silently in the background, refresh the page and you land right where you left off, even in the export dialog. The whole studio follows light or dark mode.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    )
  },
  {
    title: '100% local & private',
    desc: 'Every screenshot, note and PDF stays on your machine in Chrome\'s own storage. No external servers, no accounts, no tracking.',
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 2 3 6v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V6l-9-4z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }
];

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Features</span>
          <h2>Everything you need to turn lectures into notes</h2>
          <p>Built for students, researchers and anyone who learns from YouTube.</p>
        </div>

        <div className="features-grid">
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
