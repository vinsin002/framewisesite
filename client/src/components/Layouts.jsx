function FullBleedPreview() {
  return <div className="bar" style={{ width: '92%', height: '80%' }} />;
}

function SideBySidePreview() {
  return (
    <div style={{ display: 'flex', gap: 6, width: '92%', height: '70%' }}>
      <div className="bar" style={{ width: '60%', height: '100%' }} />
      <div style={{ width: '40%', height: '100%', background: '#E2E8F0', borderRadius: 3 }} />
    </div>
  );
}

function StackedPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '80%', height: '80%' }}>
      <div className="bar" style={{ width: '100%', height: '55%' }} />
      <div style={{ width: '100%', height: '35%', background: '#E2E8F0', borderRadius: 3 }} />
    </div>
  );
}

function GridPreview() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, width: '80%', height: '75%' }}>
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
    </div>
  );
}

const LAYOUTS = [
  { name: 'Full-Bleed 16:9', desc: 'Widescreen slides, zero margins', preview: <FullBleedPreview /> },
  { name: 'Side-by-Side', desc: 'Slide left, notes panel right', preview: <SideBySidePreview /> },
  { name: 'Stacked', desc: 'Slide on top, notes below', preview: <StackedPreview /> },
  { name: '2×2 Cheat Sheet', desc: '4 slides per page', preview: <GridPreview /> }
];

export default function Layouts() {
  return (
    <section className="section" id="layouts">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Export</span>
          <h2>Pick the PDF layout that fits how you study</h2>
          <p>Switch between four layouts right from the live preview — no re-exporting needed.</p>
        </div>

        <div className="layouts-grid">
          {LAYOUTS.map((l) => (
            <div className="layout-card" key={l.name}>
              <div className="layout-preview">{l.preview}</div>
              <h4>{l.name}</h4>
              <p>{l.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
