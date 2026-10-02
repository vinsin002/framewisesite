const CHROME_STORE_URL = 'https://chrome.google.com/webstore';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Everything you need to capture and export lecture notes.',
    features: [
      'Unlimited slide captures',
      'Full annotation toolset',
      'All 4 PDF export layouts',
      'Local storage — no account needed'
    ],
    cta: 'Add to Chrome',
    href: CHROME_STORE_URL,
    highlighted: false
  },
  {
    name: 'Pro',
    price: '$4.99',
    period: '/ month',
    desc: 'For students juggling multiple courses at once.',
    features: [
      'Everything in Free',
      'Unlimited notebooks & decks',
      'Cloud backup & sync across devices',
      'Priority email support'
    ],
    cta: 'Join the waitlist',
    href: '#waitlist',
    highlighted: true
  },
  {
    name: 'Team',
    price: '$9.99',
    period: '/ user / month',
    desc: 'Share decks across a study group or classroom.',
    features: [
      'Everything in Pro',
      'Shared team notebooks',
      'Admin & usage dashboard',
      'Priority onboarding'
    ],
    cta: 'Join the waitlist',
    href: '#waitlist',
    highlighted: false
  }
];

export default function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Pricing</span>
          <h2>Simple pricing, free to start</h2>
          <p className="pricing-note">
            Illustrative pricing — Pro and Team plans are coming soon and not yet billed.
          </p>
        </div>

        <div className="pricing-grid">
          {PLANS.map((plan) => (
            <div className={`price-card${plan.highlighted ? ' price-card-highlight' : ''}`} key={plan.name}>
              {plan.highlighted && <span className="price-badge">Most popular</span>}
              <h3>{plan.name}</h3>
              <div className="price-amount">
                {plan.price}
                <span className="price-period">{plan.period}</span>
              </div>
              <p className="price-desc">{plan.desc}</p>
              <ul className="price-features">
                {plan.features.map((f) => (
                  <li key={f}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-secondary'} price-cta`}
                href={plan.href}
                target={plan.href.startsWith('http') ? '_blank' : undefined}
                rel={plan.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
