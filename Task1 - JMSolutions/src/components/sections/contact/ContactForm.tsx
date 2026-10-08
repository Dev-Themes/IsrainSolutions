'use client';

import { useActionState, useEffect, useState, Suspense } from 'react';
import { useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import { RequestTypeToggle } from './RequestTypeToggle';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ArrowRight } from 'lucide-react';
import { submitContact } from '@/app/contact/actions';
import { site } from '@/config/site';
import { contactPageData } from '@/content/contact';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full relative" disabled={pending}>
      {pending ? 'Sending...' : (
        <>
          Send Request <ArrowRight className="w-4 h-4 ml-2" />
        </>
      )}
    </Button>
  );
}

function FormContent() {
  const searchParams = useSearchParams();
  const defaultService = searchParams.get('service') || '';

  const [state, formAction] = useActionState(submitContact, null);
  const [requestType, setRequestType] = useState<'emergency' | 'schedule'>('schedule');
  const [formStartedAt, setFormStartedAt] = useState('');
  const [contactMethod, setContactMethod] = useState<'call' | 'text' | 'email'>('call');

  useEffect(() => {
    setFormStartedAt(Date.now().toString());
  }, []);

  if (state?.ok) {
    return (
      <div className="p-6 md:p-10 bg-card/50" role="status">
        <h3 className="text-2xl font-display font-bold text-fg-0 mb-4">Request received.</h3>
        <p className="text-fg-1 mb-6">
          A technician will confirm your window by phone.
        </p>
        <div className="p-4 border border-ember/20 bg-ember/5 rounded">
          <p className="text-sm text-fg-1 mb-1">Emergency line</p>
          <a href={`tel:${site.phone.replace(/[^0-9]/g, '')}`} className="text-2xl font-bold text-fg-0 hover:text-ember transition-colors">
            {site.phone}
          </a>
        </div>
      </div>
    );
  }

  const errors = state?.errors || {};

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      {state?.message && !state.ok && (
        <div className="p-4 bg-red-900/20 border border-red-500/50 text-red-200 rounded" role="alert">
          {state.message}
        </div>
      )}

      <input type="hidden" name="formStartedAt" value={formStartedAt} />
      
      {/* Honeypot */}
      <input 
        type="text" 
        name="website" 
        tabIndex={-1} 
        aria-hidden="true" 
        autoComplete="off" 
        className="absolute w-0 h-0 opacity-0 -z-10" 
      />

      <div className="flex flex-col gap-2">
        <label className="text-fg-0 font-bold">Request type</label>
        <RequestTypeToggle value={requestType} onChange={setRequestType} />
        {requestType === 'emergency' && (
          <p className="text-sm text-ember mt-2">We dispatch the first available technician.</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-fg-0 font-bold">Full Name <span className="text-fg-2 font-normal">(Required)</span></label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            autoComplete="name"
            placeholder="Jane Doe"
            aria-invalid={!!errors?.name}
            aria-describedby={errors?.name ? "name-error" : undefined}
            className={`p-4 bg-bg-0 border ${errors?.name ? 'border-red-500' : 'border-line'} text-fg-0 text-[16px] focus:outline-brand w-full`} 
          />
          {errors?.name && <p id="name-error" className="text-red-400 text-sm mt-1">{errors.name[0]}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-fg-0 font-bold">Phone Number <span className="text-fg-2 font-normal">(Required)</span></label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            required 
            autoComplete="tel"
            inputMode="tel"
            placeholder="(555) 010-0142"
            aria-invalid={!!errors?.phone}
            aria-describedby={errors?.phone ? "phone-error" : undefined}
            className={`p-4 bg-bg-0 border ${errors?.phone ? 'border-red-500' : 'border-line'} text-fg-0 text-[16px] focus:outline-brand w-full`} 
          />
          {errors?.phone && <p id="phone-error" className="text-red-400 text-sm mt-1">{errors.phone[0]}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-fg-0 font-bold">Email <span className="text-fg-2 font-normal">(Optional)</span></label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          autoComplete="email"
          placeholder="jane@example.com"
          aria-invalid={!!errors?.email}
          aria-describedby={errors?.email ? "email-error" : undefined}
          className={`p-4 bg-bg-0 border ${errors?.email ? 'border-red-500' : 'border-line'} text-fg-0 text-[16px] focus:outline-brand w-full`} 
        />
        {errors?.email && <p id="email-error" className="text-red-400 text-sm mt-1">{errors.email[0]}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="address" className="text-fg-0 font-bold">Service Address <span className="text-fg-2 font-normal">(Optional)</span></label>
        <input 
          type="text" 
          id="address" 
          name="address" 
          autoComplete="street-address"
          placeholder="123 Main St"
          className="p-4 bg-bg-0 border border-line text-fg-0 text-[16px] focus:outline-brand w-full" 
        />
        <p className="text-fg-1 text-[14px]">Helps us confirm we serve your area.</p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="service" className="text-fg-0 font-bold">Service Needed <span className="text-fg-2 font-normal">(Required)</span></label>
        <div className="relative">
          <select 
            id="service" 
            name="service" 
            required 
            defaultValue={defaultService}
            aria-invalid={!!errors?.service}
            aria-describedby={errors?.service ? "service-error" : undefined}
            className={`p-4 bg-bg-0 border ${errors?.service ? 'border-red-500' : 'border-line'} text-fg-0 text-[16px] focus:outline-brand w-full appearance-none`}
          >
            <option value="" disabled>Select a service...</option>
            {contactPageData.services.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-fg-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
        {errors?.service && <p id="service-error" className="text-red-400 text-sm mt-1">{errors.service[0]}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="issue" className="text-fg-0 font-bold">Describe the issue <span className="text-fg-2 font-normal">(Required)</span></label>
        <textarea 
          id="issue" 
          name="issue" 
          required 
          minLength={20}
          maxLength={800}
          placeholder="Please describe what the system is doing..."
          aria-invalid={!!errors?.issue}
          aria-describedby={errors?.issue ? "issue-error" : undefined}
          className={`p-4 bg-bg-0 border ${errors?.issue ? 'border-red-500' : 'border-line'} text-fg-0 text-[16px] focus:outline-brand w-full min-h-[120px] resize-y`} 
        />
        <p className="text-fg-1 text-[14px]">Mention what the system is doing, when it started, and any error codes on the thermostat or unit.</p>
        {errors?.issue && <p id="issue-error" className="text-red-400 text-sm mt-1">{errors.issue[0]}</p>}
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-fg-0 font-bold">Preferred contact method</label>
        <div className="flex flex-wrap gap-6">
          {(['call', 'text', 'email'] as const).map(method => (
            <label key={method} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="contactMethod" 
                value={method} 
                checked={contactMethod === method}
                onChange={() => setContactMethod(method)}
                className="w-4 h-4 text-brand focus:ring-brand border-line bg-bg-0"
              />
              <span className="text-fg-0 capitalize">{method}</span>
            </label>
          ))}
        </div>
      </div>

      {contactMethod === 'text' && (
        <div className="flex flex-col gap-2 mt-2 p-4 bg-card border border-line">
          <label className="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              name="textConsent" 
              className="mt-1 w-4 h-4 text-brand focus:ring-brand border-line bg-bg-0 shrink-0"
              aria-invalid={!!errors?.textConsent}
              aria-describedby={errors?.textConsent ? "consent-error" : undefined}
            />
            <span className="text-[14px] text-fg-1 leading-tight">
              I agree to receive text messages about this request. Message and data rates may apply.
            </span>
          </label>
          {errors?.textConsent && <p id="consent-error" className="text-red-400 text-sm mt-1 ml-7">{errors.textConsent[0]}</p>}
        </div>
      )}

      <div className="mt-4 flex flex-col gap-4">
        <SubmitButton />
        <p className="text-center text-fg-1 text-sm">
          For immediate help, call <a href={`tel:${site.phone.replace(/[^0-9]/g, '')}`} className="font-bold text-fg-0 hover:text-brand transition-colors">{site.phone}</a> directly.
        </p>
      </div>

    </form>
  );
}

export function ContactForm() {
  return (
    <div className="relative isolate bg-card clip-chamfer p-[2px]">
      <div className="absolute inset-0 bg-[image:var(--grad-brand)] -z-10"></div>
      <div className="bg-card w-full h-full clip-chamfer px-6 py-8 md:px-10 md:py-10">
        <SectionHeader 
          h2Part1="Request" 
          h2Part2="Service"
          centered={false}
        />
        <div className="mt-8">
          <Suspense fallback={<div className="h-96 animate-pulse bg-line/10 rounded"></div>}>
            <FormContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
