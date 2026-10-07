import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Layouts from './components/Layouts.jsx';
import PrivacyBanner from './components/PrivacyBanner.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Layouts />
      <PrivacyBanner />
    </>
  );
}
