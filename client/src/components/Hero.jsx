import StudioMock from './StudioMock.jsx';

const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/knbomfddjfkikbcebpoenaogpeeomhck';

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
            Snap slides at the exact moment they appear &mdash; the video keeps playing.
            Mark them up in the Framewise Studio with pen, shapes, text and a precision
            eraser, reorder your deck, and export a clean PDF named after your project.
          </p>

          <div className="hero-ctas">
            <a className="btn btn-primary" href={CHROME_STORE_URL} target="_blank" rel="noreferrer">
              Add to Chrome &mdash; it&rsquo;s free
            </a>
            <a className="btn btn-secondary" href="#how-it-works">
              See how it works
            </a>
          </div>

          <div className="hero-proof">
            <span className="dot" /> 100% local &amp; private
            <span className="dot" /> No sign-up required
            <span className="dot" /> Light &amp; dark mode
          </div>
        </div>

        <div className="hero-visual">
          <StudioMock />
        </div>
      </div>
    </section>
  );
}
