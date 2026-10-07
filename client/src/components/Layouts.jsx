function FullPagePreview() {
  return (
    <div className="pdf-sheet pdf-sheet-full">
      <div className="pdf-slide" />
    </div>
  );
}

function FourInOnePreview() {
  return (
    <div className="pdf-sheet pdf-sheet-grid">
      <div className="pdf-slide s1" />
      <div className="pdf-slide s2" />
      <div className="pdf-slide s3" />
      <div className="pdf-slide s4" />
    </div>
  );
}

const LAYOUTS = [
  {
    name: 'Full Page (1×1)',
    desc: 'One slide per page, edge to edge in widescreen 16:9. Best for presenting or reading slide by slide.',
    preview: <FullPagePreview />
  },
  {
    name: '4 in 1 (1×4)',
    desc: 'Four slides on every page. A compact cheat sheet that keeps a whole lecture to a few pages.',
    preview: <FourInOnePreview />
  }
];

export default function Layouts() {
  return (
    <section className="section" id="layouts">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Export</span>
          <h2>Two clean PDF layouts, one live preview</h2>
          <p>
            Flip between layouts in the preview, rename your project right there, and
            download. The file is named after your project, with nothing extra added.
          </p>
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
