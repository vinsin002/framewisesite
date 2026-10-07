import StudioMock from './StudioMock.jsx';

const POINTS = [
  {
    title: 'Capture without pausing',
    desc: 'Press S or click the camera in the player. A popup confirms the slide number and timestamp while the video keeps playing.'
  },
  {
    title: 'Annotate with precision',
    desc: 'Pen, highlighter, arrows, shapes and rich text boxes, plus an eraser that removes only the part of a stroke you touch.'
  },
  {
    title: 'Reorder and export',
    desc: 'Drag slides into order, then export a Full Page or 4 in 1 PDF named after your project.'
  }
];

export default function Showcase() {
  return (
    <section className="section section-alt" id="showcase">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">See it in action</span>
          <h2>Your whole lecture, one clean workspace</h2>
          <p>
            Every slide you capture lands in the Framewise Studio, ready to mark up,
            arrange and turn into a study-ready PDF.
          </p>
        </div>

        <div className="showcase-stage">
          <div className="showcase-zoom">
            <StudioMock />
          </div>
        </div>

        <div className="showcase-points">
          {POINTS.map((p, i) => (
            <div className="showcase-point" key={p.title}>
              <span className="showcase-num">{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
