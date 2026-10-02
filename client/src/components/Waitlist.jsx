import { useState } from 'react';

const CONTACT_EMAIL = 'dikshit.rishii@gmail.com';

export default function Waitlist() {
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent('Notify me about Framewise updates');
    const body = encodeURIComponent(`Please add me to the updates list: ${email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="section" id="waitlist">
      <div className="container">
        <div className="waitlist">
          <h2>Get notified about new features</h2>
          <p>
            We're adding more export layouts and annotation tools. Drop your email and
            we'll let you know when they ship — no spam, ever.
          </p>

          <form className="waitlist-form" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Notify me</button>
          </form>
        </div>
      </div>
    </section>
  );
}
