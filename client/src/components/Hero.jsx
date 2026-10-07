const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/knbomfddjfkikbcebpoenaogpeeomhck';

const Icon = ({ children }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

function StudioMock() {
  return (
    <div className="studio-mock">
      <div className="studio-toast">
        <span className="studio-toast-thumb" />
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span className="studio-toast-msg">#9 Slide Captured</span>
        <span className="studio-toast-time">04:28</span>
      </div>

      <aside className="studio-side">
        <div className="studio-brand">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" />
          <span>Framewise</span>
        </div>
        <div className="studio-thumb t1"><span>#1</span></div>
        <div className="studio-thumb t2"><span>#2</span></div>
        <div className="studio-thumb t3 active"><span>#3</span></div>
        <div className="studio-thumb t4"><span>#4</span></div>
      </aside>

      <div className="studio-main">
        <div className="studio-toolbar">
          <Icon><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /></Icon>
          <Icon><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></Icon>
          <Icon><path d="m9 11-6 6v3h9l3-3" /><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" /></Icon>
          <Icon><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" /><path d="M22 21H7" /></Icon>
          <Icon><path d="M7 17 17 7" /><path d="M7 7h10v10" /></Icon>
          <Icon><rect x="4" y="4" width="16" height="16" rx="2" /></Icon>
          <Icon><circle cx="12" cy="12" r="9" /></Icon>
          <span className="studio-toolbar-t">T</span>
          <span className="studio-toolbar-sep" />
          <span className="studio-swatch" />
        </div>

        <div className="studio-canvas">
          <span className="ann ann-rect" />
          <svg className="ann ann-arrow" viewBox="0 0 120 60" fill="none">
            <path d="M6 52 C40 40 70 24 108 10" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M92 8 L110 9 L102 25" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="ann ann-highlight" />
          <span className="ann ann-text">Key idea</span>
        </div>

        <div className="studio-pager">‹ &nbsp;Slide 3 / 19&nbsp; ›</div>
      </div>
    </div>
  );
}

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
