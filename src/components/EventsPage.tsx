import { getEvents, type KbnEvent } from '../data/events'
import knbLogo from '../assets/kbn logo.jpg'

export default function EventsPage({ onBack, onOpenEvent }: { onBack: () => void; onOpenEvent: (event: KbnEvent) => void }) {
  const events = getEvents()

  return (
    <div className="min-h-screen bg-[var(--surface-alt)] overflow-x-hidden">
      <div className="relative bg-[var(--brand-dark)] py-10 sm:py-12 md:py-16">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4A853 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 -right-10 w-48 h-48 sm:w-96 sm:h-96 bg-[var(--accent)] rounded-full blur-[120px] sm:blur-[180px] opacity-10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <button onClick={onBack} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/15 hover:bg-white/20 transition-all mb-4 sm:mb-6">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span className="hidden xs:inline">Back to Home</span>
          </button>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl text-white mb-2 sm:mb-3 leading-tight break-words">Our Events</h1>
          <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] max-w-2xl leading-relaxed break-words">Explore the gatherings, conferences, and outreach events that bring Kingdom Builders Network together across the United States and Ethiopia.</p>
        </div>
      </div>

      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {events.length === 0 ? (
            <div className="text-center py-24 bg-[var(--surface)] rounded-2xl border border-[var(--border-light)]">
              <p className="text-sm text-[var(--text-tertiary)]">No events found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {events.map((ev) => (
                <button
                  key={ev.slug}
                  onClick={() => onOpenEvent(ev)}
                  className="text-left card-hover bg-[var(--surface)] rounded-2xl border border-[var(--border-light)] overflow-hidden group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden bg-[var(--surface-raised)]">
                    <img src={ev.brochure} alt={ev.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-[var(--text-primary)] mb-2 leading-tight break-words">{ev.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2 break-words">{ev.description}</p>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-dark)] group-hover:text-[var(--brand)] transition-colors">
                      View More
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

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
