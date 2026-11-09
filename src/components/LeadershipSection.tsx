import { BOARD_OF_DIRECTORS, FOUNDER_AND_PRESIDENT } from "../data/leadership"

function BoardOfDirectorsGrid({
  cardSurface = "alt",
}: {
  cardSurface?: "alt" | "base"
}) {
  const cardBgClass =
    cardSurface === "alt" ? "bg-[var(--surface-alt)]" : "bg-[var(--surface)]"

  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-10 sm:mb-12">
        <span
          className="hidden xs:block h-px w-12 sm:w-20 bg-[var(--border-default)]"
          aria-hidden="true"
        />
        <div className="text-center">
          <p className="overline-gold mb-1.5">Governance &amp; Stewardship</p>
          <h3 className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] uppercase">
            KBN Board of Directors
          </h3>
        </div>
        <span
          className="hidden xs:block h-px w-12 sm:w-20 bg-[var(--border-default)]"
          aria-hidden="true"
        />
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {BOARD_OF_DIRECTORS.map((member) => (
          <article
            key={member.name}
            className={`card-hover group ${cardBgClass} rounded-[1.5rem] border border-[var(--border-light)] overflow-hidden flex flex-col`}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--brand-dark)] border-b-4 border-[var(--accent)]">
              <img
                src={member.image}
                alt={`${member.name} — ${member.role}`}
                loading="lazy"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-dark)]/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            <div className="px-4 py-5 sm:px-5 sm:py-6 text-center flex-1 flex flex-col justify-center">
              <h4 className="font-serif text-lg sm:text-xl text-[var(--text-primary)] leading-snug mb-1.5 break-words">
                {member.name}
              </h4>
              <p className="text-xs sm:text-sm font-semibold text-[var(--accent-dark)] leading-snug break-words">
                {member.role}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default function LeadershipSection({
  onReadFounderBio,
}: {
  onReadFounderBio?: () => void
}) {
  return (
    <section
      id="leadership"
      className="relative py-20 md:py-28 bg-[var(--surface)] overflow-hidden scroll-mt-16"
    >
      <div
        className="absolute -left-20 top-16 w-64 h-64 rounded-[3rem] border border-[var(--border-default)] -rotate-12 pointer-events-none hidden md:block"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 bottom-20 w-72 h-72 rounded-full border border-[var(--accent)]/20 pointer-events-none hidden md:block"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <p className="overline-gold mb-3">Our Leadership</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase mb-4">
            Founder &amp; Board of Directors
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Committed stewards serving with spiritual integrity, strategic
            vision, and excellence to advance Kingdom Builders Network across
            borders.
          </p>
        </div>

        {/* Founder and President */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-20">
          <p className="overline-gold text-center mb-5">
            Founder and President
          </p>
          <article className="card-hover bg-[var(--surface-alt)] rounded-[2rem] border border-[var(--border-light)] overflow-hidden shadow-lg grid md:grid-cols-[300px_1fr] items-stretch">
            <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[360px] overflow-hidden bg-[var(--brand-dark)] border-b-4 md:border-b-0 md:border-r-4 border-[var(--accent)]">
              <img
                src={FOUNDER_AND_PRESIDENT.image}
                alt={`${FOUNDER_AND_PRESIDENT.name} — ${FOUNDER_AND_PRESIDENT.role}`}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-7 sm:p-10 flex flex-col justify-center text-left">
              <span className="inline-flex items-center self-start text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--accent-dark)] bg-[var(--accent-light)] border border-[var(--accent)]/30 px-3.5 py-1.5 rounded-full mb-4">
                {FOUNDER_AND_PRESIDENT.role}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] mb-3">
                {FOUNDER_AND_PRESIDENT.name}
              </h3>
              <div
                className="w-12 h-0.5 bg-[var(--accent)] mb-5"
                aria-hidden="true"
              />
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                Visionary founder and president of Kingdom Builders Network — a
                born-again Christian, minister of God, and pioneering
                entrepreneur dedicated to uplifting Christian communities across
                Ethiopia and the United States.
              </p>
              {onReadFounderBio && (
                <button
                  type="button"
                  onClick={onReadFounderBio}
                  className="btn-pill btn-navy self-start"
                >
                  Read Founder&apos;s Story
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
            </div>
          </article>
        </div>

        {/* KBN Board of Directors */}
        <BoardOfDirectorsGrid cardSurface="alt" />
      </div>
    </section>
  )
}
