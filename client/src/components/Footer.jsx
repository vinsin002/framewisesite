export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>&copy; {new Date().getFullYear()} Framewise. MIT Licensed. Built for students who learn from YouTube.</p>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#layouts">PDF layouts</a>
          <a href="#pricing">Pricing</a>
        </div>
      </div>
    </footer>
  );
}
