'use client';

import { useRef, useState, useEffect, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Phone, ArrowRight } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { siteConfig as s, slug } from '@/config/site';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close();
      };
      window.addEventListener('keydown', onKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', onKeyDown);
      };
    }
  }, [open]);

  const modalContent = open ? (
    <div className="mobile-nav-backdrop" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      <button
        type="button"
        className="mobile-nav-overlay-dismiss"
        aria-label="Close navigation overlay"
        tabIndex={-1}
        onClick={close}
      />
      <div id="mobile-navigation" ref={panelRef} className="mobile-nav-panel">
        <div className="mobile-nav-header">
          <span className="mobile-nav-title">Navigation</span>
          <button
            type="button"
            className="mobile-nav-close"
            onClick={close}
            aria-label="Close navigation"
          >
            <X size={18} aria-hidden="true" />
            <span>Close</span>
          </button>
        </div>
        <nav className="mobile-nav-body" aria-label="Mobile navigation">
          {s.nav.map((name) => (
            <a
              key={name}
              href={`#${slug(name)}`}
              onClick={close}
              className="mobile-nav-item"
            >
              <span>{name}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className="mobile-nav-actions">
          <a
            href={`tel:${s.phoneE164}`}
            className="button button-primary mobile-nav-call"
            onClick={close}
          >
            <Phone size={15} />
            <span>Call {s.phone}</span>
          </a>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="menu-toggle"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={toggle}
      >
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      {mounted && modalContent && createPortal(modalContent, document.body)}
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
          <input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Jane Smith" />
        </label>
        <label>Phone number
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required pattern="[+0-9 ()\-]{8,20}" placeholder="0400 000 000" />
        </label>
        <label>Suburb / postcode
          <input name="suburb" autoComplete="postal-code" required maxLength={100} placeholder="e.g. Brisbane 4000" />
        </label>
        <label>Type of damage
          <select name="damage" required defaultValue="">
            <option value="" disabled>Select an option</option>
            {s.services.map(([title]) => <option key={title} value={title}>{title}</option>)}
          </select>
        </label>
      </div>
      <label>What happened?<textarea name="message" rows={3} maxLength={2000} placeholder="Describe the damage, affected rooms or when it occurred..." /></label>
      <label className="honeypot" aria-hidden="true">Leave this blank
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent">
        <input type="checkbox" name="consent" required /> <span>I agree to be contacted about my enquiry.</span>
      </label>
      <Button variant="primary" size="lg" disabled={busy}>
        {busy ? 'Sending...' : 'Request a free assessment'}
      </Button>
      {status ? <p role="status" aria-live="polite" className="form-status">{status}</p> : null}
    </form>
  );
}
