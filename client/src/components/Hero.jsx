const CHROME_STORE_URL = 'https://chrome.google.com/webstore';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <div>
          <span className="eyebrow">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
            </svg>
            Free Chrome Extension
          </span>

          <h1>
            Turn any YouTube lecture into a <span>study-ready PDF</span>
          </h1>

          <p className="lede">
            Capture slides at the exact moment they appear, annotate them with pen, shapes
            and text, reorder your deck, and export a clean PDF booklet — all without
            leaving the video.
          </p>

          <div className="hero-ctas">
            <a className="btn btn-primary" href={CHROME_STORE_URL} target="_blank" rel="noreferrer">
              Add to Chrome — it&rsquo;s free
            </a>
            <a className="btn btn-secondary" href="#how-it-works">
              See how it works
            </a>
          </div>

          <div className="hero-proof">
            <span className="dot" /> 100% local &amp; private
            <span className="dot" /> No sign-up required
            <span className="dot" /> Works on any YouTube video
          </div>
        </div>

        <div className="hero-visual">
          <div className="mock-window">
            <div className="mock-titlebar">
              <span className="mock-dot" />
              <span className="mock-dot" />
              <span className="mock-dot" />
            </div>
            <div className="mock-body">
              <div>
                <div className="mock-thumb active" />
                <div className="mock-thumb" style={{ marginTop: 8 }} />
                <div className="mock-thumb" style={{ marginTop: 8 }} />
              </div>
              <div className="mock-stage">
                <div className="mock-float-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                  12:04
                </div>
                <span>Slide captured &amp; annotated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
