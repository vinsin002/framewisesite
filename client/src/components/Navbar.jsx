const CHROME_STORE_URL = 'https://chrome.google.com/webstore';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="brand">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Framewise logo" />
          Framewise
        </a>

        <nav className="nav-links nav-mobile-hide">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#layouts">PDF layouts</a>
          <a href="#pricing">Pricing</a>
          <a href="#waitlist">Waitlist</a>
        </nav>

        <div className="nav-actions">
          <a className="btn btn-primary btn-sm" href={CHROME_STORE_URL} target="_blank" rel="noreferrer">
            Add to Chrome — it&rsquo;s free
          </a>
        </div>
      </div>
    </header>
  );
}
