'use client';

import { useRef, useState, type FormEvent } from 'react';
import { Menu, X } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { siteConfig as s, slug } from '@/config/site';

export function MobileNav() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const previousOverflow = useRef('');

  function openMenu() {
    previousOverflow.current = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = 'hidden';
    setOpen(true);
  }

  return (
    <>
      <button ref={trigger} className="menu-toggle" aria-label="Open navigation"
        aria-expanded={open} aria-controls="mobile-navigation" onClick={openMenu}>
        <Menu aria-hidden="true" />
      </button>
      <dialog id="mobile-navigation" ref={dialog} aria-label="Navigation"
        onClose={() => {
          document.body.style.overflow = previousOverflow.current;
          setOpen(false);
          trigger.current?.focus();
        }}>
        <button onClick={() => dialog.current?.close()} aria-label="Close navigation">
          <X aria-hidden="true" /> Close
        </button>
        <nav aria-label="Mobile navigation">
          {s.nav.map((name) => (
            <a key={name} href={`#${slug(name)}`} onClick={() => dialog.current?.close()}>
              {name}
            </a>
          ))}
        </nav>
      </dialog>
    </>
  );
}

export function QuoteForm() {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    setBusy(true);
    setStatus('');
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const data: unknown = await response.json();
      if (typeof data === 'object' && data !== null && 'message' in data && typeof data.message === 'string') {
        setStatus(data.message);
      } else {
        setStatus('Unexpected response. Please call our team.');
      }
    } catch {
      setStatus('Unable to connect. Please call our team.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={busy}>
      <h3>Book a free assessment</h3>
      <p>Tell us a little about what happened.</p>
      <div className="form-grid">
        <label>Your name
          <input name="name" autoComplete="name" required minLength={2} maxLength={100} />
        </label>
        <label>Phone number
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required pattern="[+0-9 ()\-]{8,20}" />
        </label>
        <label>Suburb / postcode
          <input name="suburb" autoComplete="postal-code" required maxLength={100} />
        </label>
        <label>Type of damage
          <select name="damage" required>
            <option value="">Select an option</option>
            {s.services.map(([title]) => <option key={title}>{title}</option>)}
          </select>
        </label>
      </div>
      <label>What happened?<textarea name="message" rows={3} maxLength={2000} /></label>
      <label className="honeypot" aria-hidden="true">Leave this blank
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent">
        <input type="checkbox" name="consent" required /> I agree to be contacted about my enquiry.
      </label>
      <Button variant="primary" size="lg" disabled={busy}>
        {busy ? 'Sending...' : 'Request a free assessment'}
      </Button>
      <p role="status" aria-live="polite">{status}</p>
    </form>
  );
}
