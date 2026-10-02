export default function PrivacyBanner() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="privacy-banner">
          <div className="icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2 3 6v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V6l-9-4z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div>
            <h3>Your slides never leave your computer</h3>
            <p>
              Framewise stores every screenshot, annotation and PDF locally in Chrome's own
              storage. There are no external servers, no accounts, and nothing is ever
              uploaded or tracked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
