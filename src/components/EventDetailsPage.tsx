import { useState, useEffect } from 'react'
import { getEventBySlug } from '../data/events'
import knbLogo from '../assets/kbn logo.jpg'

export default function EventDetailsPage({ slug, onBack }: { slug: string; onBack: () => void }) {
  const event = getEventBySlug(slug)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightbox === null) return
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? i : (i + 1) % event!.images.length))
      if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? i : (i - 1 + event!.images.length) % event!.images.length))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, event])

  if (!event) {
    return (
      <div className="min-h-screen bg-[var(--surface-alt)] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-serif text-2xl text-[var(--text-primary)] mb-3">Event not found</h1>
        <p className="text-sm text-[var(--text-tertiary)] mb-6">The event you're looking for doesn't exist.</p>
        <button onClick={onBack} className="inline-flex items-center gap-2 bg-[var(--brand)] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[var(--brand-light)] transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Events
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--surface-alt)] overflow-x-hidden">
      <div className="relative bg-[var(--brand-dark)] py-10 sm:py-12 md:py-16">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4A853 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 -right-10 w-48 h-48 sm:w-96 sm:h-96 bg-[var(--accent)] rounded-full blur-[120px] sm:blur-[180px] opacity-10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <button onClick={onBack} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/15 hover:bg-white/20 transition-all mb-4 sm:mb-6">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="hidden xs:inline">Back to Events</span>
          </button>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl text-white mb-2 sm:mb-3 leading-tight break-words">{event.title}</h1>
          <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] max-w-2xl leading-relaxed break-words">{event.description}</p>
        </div>
      </div>

      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="font-serif text-xl sm:text-2xl text-[var(--text-primary)] mb-6 sm:mb-8">Event Gallery</h2>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 [column-fill:_balance]">
            {event.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="group relative block w-full mb-4 sm:mb-5 break-inside-avoid rounded-2xl overflow-hidden border border-[var(--border-light)] bg-[var(--surface)] cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40"
              >
                <img src={img.src} alt={event.title} loading="lazy" className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && event.images[lightbox] && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors" onClick={() => setLightbox(null)} aria-label="Close">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          {event.images.length > 1 && (
            <>
              <button className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + event.images.length) % event.images.length) }} aria-label="Previous">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % event.images.length) }} aria-label="Next">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}
          <figure className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img src={event.images[lightbox].src} alt={event.title} className="max-w-full max-h-[78vh] object-contain rounded-xl shadow-2xl" />
            <figcaption className="mt-3 text-sm text-white/80 text-center">
              <span className="text-white/50">{lightbox + 1} / {event.images.length}</span>
            </figcaption>
          </figure>
        </div>
      )}

      <footer className="bg-[var(--brand)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <img src={knbLogo} alt="KBN Logo" className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover bg-white/10 flex-shrink-0" />
              <span className="font-serif text-base sm:text-lg truncate">Kingdom Builders Network</span>
            </div>
            <p className="text-xs text-[#64748B] text-center flex-shrink-0">&copy; 2025 Kingdom Builders Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
