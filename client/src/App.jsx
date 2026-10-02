import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Layouts from './components/Layouts.jsx';
import Pricing from './components/Pricing.jsx';
import PrivacyBanner from './components/PrivacyBanner.jsx';
import Waitlist from './components/Waitlist.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Layouts />
      <Pricing />
      <PrivacyBanner />
      <Waitlist />
      <Footer />
    </>
  );
}
