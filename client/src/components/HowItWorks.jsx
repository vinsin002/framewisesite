function CaptureVisual() {
  return (
    <div className="step-visual">
      <div className="step-visual-frame">
        <div className="step-visual-flash" />
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </div>
    </div>
  );
}

function AnnotateVisual() {
  return (
    <div className="step-visual">
      <div className="step-visual-slide">
        <span className="scribble scribble-1" />
        <span className="scribble scribble-2" />
        <span className="scribble-dot" />
      </div>
    </div>
  );
}

function ExportVisual() {
  return (
    <div className="step-visual">
      <div className="step-visual-doc">
        <span className="doc-line" style={{ width: '70%' }} />
        <span className="doc-line" style={{ width: '90%' }} />
        <span className="doc-line" style={{ width: '55%' }} />
      </div>
      <svg className="step-visual-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v11" />
        <path d="M7 12l5 5 5-5" />
      </svg>
    </div>
  );
}

const STEPS = [
  {
    title: 'Capture',
    desc: 'Watch any YouTube lecture and press S (or Alt+S) whenever an important slide appears. It\'s saved instantly at full resolution while the video keeps playing.',
    visual: <CaptureVisual />
  },
  {
    title: 'Annotate & arrange',
    desc: 'Open Framewise Studio to draw, highlight, erase and add text on each slide, then drag slides to reorder your deck exactly how you want it.',
    visual: <AnnotateVisual />
  },
  {
    title: 'Export',
    desc: 'Choose Full Page or 4 in 1 in the live preview, rename your project, and download a clean PDF named after it.',
    visual: <ExportVisual />
  }
];

export default function HowItWorks() {
  return (
    <section className="section section-alt" id="how-it-works">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2>From video to PDF in three steps</h2>
          <p>No uploads, no waiting — everything happens right in your browser.</p>
        </div>

        <div className="steps">
          {STEPS.map((s, i) => (
            <div className="step" key={s.title}>
              {s.visual}
              <div className="step-num">{i + 1}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
