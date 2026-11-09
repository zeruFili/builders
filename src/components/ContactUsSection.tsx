import { useState } from 'react'
import { submitContact } from '../data/contacts'

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function isValidPhone(value: string): boolean {
  const trimmed = value.trim()
  if (!trimmed) return false
  if (!/^\+?[0-9\s\-().]+$/.test(trimmed)) return false
  const digits = trimmed.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15
}

interface FormErrors {
  fullName?: string
  phone?: string
  email?: string
}

export default function ContactUsSection() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  function validate(): FormErrors {
    const next: FormErrors = {}
    if (!fullName.trim()) next.fullName = 'Full name is required.'
    if (!phone.trim()) next.phone = 'Phone number is required.'
    else if (!isValidPhone(phone)) next.phone = 'Enter a valid phone number.'
    if (email.trim() && !isValidEmail(email)) next.email = 'Enter a valid email address.'
    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitError('')
    setSent(false)
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      await submitContact({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        message: message.trim(),
      })
      setFullName('')
      setPhone('')
      setEmail('')
      setMessage('')
      setErrors({})
      setSent(true)
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = (hasError?: string) =>
    `w-full bg-[var(--surface-alt)] border rounded-xl py-2.5 px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:ring-2 transition-all ${
      hasError
        ? 'border-red-400 focus:ring-red-300/50 focus:border-red-400'
        : 'border-[var(--border-default)] focus:ring-[var(--brand)]/20 focus:border-[var(--brand)]/50'
    }`

  return (
    <section id="contact" className="relative py-20 md:py-24 bg-[var(--surface-alt)] overflow-hidden scroll-mt-16">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <p className="overline-gold mb-3">Get in Touch</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)]">Contact Us</h2>
        </div>

        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border-light)] p-6 sm:p-8 shadow-sm">
          {submitError && (
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 mb-5 animate-scale-in">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-sm text-red-700 dark:text-red-300">{submitError}</p>
            </div>
          )}

          {sent && (
            <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 mb-5 animate-scale-in">
              <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">Thank you for reaching out. We'll be in touch soon.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4" noValidate>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Full Name <span className="text-[var(--error)]">*</span></label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="John Doe" autoComplete="name"
                className={inputClass(errors.fullName)} />
              {errors.fullName && <p className="text-xs text-red-600 mt-1.5">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Phone Number <span className="text-[var(--error)]">*</span></label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+251 91 196 3232" autoComplete="tel"
                className={inputClass(errors.phone)} />
              {errors.phone && <p className="text-xs text-red-600 mt-1.5">{errors.phone}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Email Address <span className="text-[var(--text-tertiary)]">(optional)</span></label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email"
                className={inputClass(errors.email)} />
              {errors.email && <p className="text-xs text-red-600 mt-1.5">{errors.email}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Message <span className="text-[var(--text-tertiary)]">(optional)</span></label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="How can we help you?" rows={3}
                className="w-full bg-[var(--surface-alt)] border border-[var(--border-default)] rounded-xl py-2.5 px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)]/50 transition-all resize-none" />
            </div>

            <div className="sm:col-span-2">
              <button type="submit" disabled={submitting}
                className="w-full bg-[var(--accent)] text-[var(--brand-dark)] text-sm font-bold py-3 rounded-xl hover:bg-[var(--accent-dark)] transition-colors shadow-lg shadow-[var(--accent)]/30 disabled:opacity-60 flex items-center justify-center gap-2">
                {submitting ? (
                  <><svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Submitting...</>
                ) : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
