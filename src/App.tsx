import { useState, useMemo } from 'react'
import CompanyProfile, { CompanyCard, StarRating } from './components/CompanyProfile'
import { companies, CATEGORIES, type Company, type Category } from './data/companies'

const NAV_ITEMS = ['Home', 'About Us', 'Community & Membership', 'Events'] as const

const EVENTS = [
  { image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&auto=format', date: 'Aug 15, 2025', time: '7:30 AM – 9:30 AM', location: 'Daily Bread Café, Fort Worth', title: 'Business Networking Breakfast', description: 'Start your morning with fellowship, prayer, and purposeful connections with fellow Christian entrepreneurs over coffee and breakfast.' },
  { image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop&auto=format', date: 'Sep 20, 2025', time: '9:00 AM – 4:00 PM', location: 'Bethany Retreat Center, Tyler', title: 'Kingdom Leadership Summit', description: 'A full day of worship, keynote sessions, and workshops designed to equip Christian leaders for greater Kingdom impact.' },
  { image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&h=400&fit=crop&auto=format', date: 'Oct 7, 2025', time: '6:30 PM – 8:30 PM', location: 'Grace Community Church, Dallas', title: 'Prayer & Worship Gathering', description: 'An evening of powerful worship and intercessory prayer for our businesses, families, and city. All are welcome.' },
  { image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&h=400&fit=crop&auto=format', date: 'Nov 11, 2025', time: '9:00 AM – 12:30 PM', location: 'Stewardship Wealth, Dallas', title: 'Entrepreneurship Workshop', description: 'Practical training on starting and scaling a business with biblical principles. Includes mentoring sessions and Q&A with experienced leaders.' },
  { image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop&auto=format', date: 'Dec 5, 2025', time: '8:00 AM – 5:00 PM', location: 'Irving Convention Center', title: 'Christian Business Conference', description: 'Our annual flagship event featuring inspiring speakers, breakout sessions, and unparalleled networking with Kingdom-minded professionals.' },
  { image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop&auto=format', date: 'Dec 19, 2025', time: '6:00 PM – 8:00 PM', location: 'Daily Bread Café, Fort Worth', title: 'Monthly Member Meetup', description: 'Wind down the year with fellowship and celebration. Share testimonies of God\'s faithfulness and look ahead to the new year together.' },
]

const TESTIMONIALS = [
  { photo: 'https://i.pravatar.cc/96?img=47', name: 'Sarah Cho', profession: 'Business Owner', company: 'Covenant Builders Group', text: 'KBN connected me with Christian mentors who transformed how I lead my business. I no longer feel alone in the marketplace — I have a community that prays for me and pushes me to pursue excellence for God\'s glory.' },
  { photo: 'https://i.pravatar.cc/96?img=11', name: 'Marcus Webb', profession: 'Architect', company: 'Kingdom Foundations Inc.', text: 'Joining KBN was one of the best decisions I have made for my career. The networking events are genuine, not transactional. I have formed friendships that go far beyond business.' },
  { photo: 'https://i.pravatar.cc/96?img=44', name: 'Patricia Nguyen', profession: 'Physician', company: 'Faith Health Partners', text: 'Finding other Christian healthcare professionals through KBN has been life-giving. We share best practices, pray for each other\'s patients, and encourage one another to keep Christ at the center of our practice.' },
  { photo: 'https://i.pravatar.cc/96?img=8', name: 'Pastor James Hartley', profession: 'Senior Pastor', company: 'Grace Community Church', text: 'KBN bridges the gap between the church and the marketplace. Our congregation members have found jobs, mentors, and Kingdom-minded business partners through this incredible network.' },
]

const COMMUNITY_CARDS = [
  { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', title: 'Christian Business Directory', desc: 'Discover trusted Christian-owned businesses and connect with professionals who share your values.' },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', title: 'Networking Opportunities', desc: 'Build meaningful relationships with entrepreneurs, professionals, and ministry leaders.' },
  { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', title: 'Mentorship', desc: 'Learn from experienced Christian business leaders passionate about helping others grow.' },
  { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', title: 'Faith & Leadership', desc: 'Grow spiritually while developing leadership skills rooted in biblical principles.' },
  { icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', title: 'Business Growth', desc: 'Access resources, partnerships, and opportunities that help your business flourish while honoring Christ.' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="w-9 h-9 bg-[var(--brand)] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-[var(--brand)]/20">
            <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <span className="font-serif text-xl text-[var(--text-primary)] hidden sm:block tracking-tight">KBN</span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-alt)] px-3 py-2 rounded-xl transition-all">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-2 rounded-xl transition-colors hidden md:block">Login</a>
          <a href="#" className="text-sm font-semibold text-white bg-[var(--brand)] px-4 py-2 rounded-xl hover:bg-[var(--brand-light)] transition-colors shadow-lg shadow-[var(--brand)]/20 hidden md:flex items-center gap-2">
            Join the Network
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-10 h-10 rounded-xl border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--surface-alt)] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden border-t border-[var(--border-light)] bg-[var(--surface)] px-4 py-4 space-y-2 animate-slide-down">
          {NAV_ITEMS.map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setMenuOpen(false)} className="block w-full text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-2.5 rounded-xl hover:bg-[var(--surface-alt)] transition-colors">{item}</a>
          ))}
          <div className="pt-2 border-t border-[var(--border-light)] space-y-2">
            <a href="#" className="block w-full text-center text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-2.5 rounded-xl hover:bg-[var(--surface-alt)] transition-colors">Login</a>
            <a href="#" className="block w-full text-center text-sm font-semibold text-white bg-[var(--brand)] py-2.5 rounded-xl hover:bg-[var(--brand-light)] transition-colors">Join the Network</a>
          </div>
        </div>
      )}
    </header>
  )
}

function SectionHeading({ overline, title, subtitle }: { overline?: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      {overline && <span className="inline-block text-xs font-semibold text-[var(--accent-dark)] tracking-widest uppercase mb-3">{overline}</span>}
      <h2 className="font-serif text-3xl md:text-4xl text-[var(--text-primary)] mb-4">{title}</h2>
      {subtitle && <p className="text-[var(--text-secondary)] leading-relaxed">{subtitle}</p>}
    </div>
  )
}

function DirectoryPage({ onBack, onSelectCompany }: { onBack: () => void; onSelectCompany: (c: Company) => void }) {
  const [dirCategory, setDirCategory] = useState<Category | null>(null)
  const [dirSearch, setDirSearch] = useState('')
  const [dirSort, setDirSort] = useState<'rating' | 'reviews' | 'name'>('rating')

  const dirFiltered = useMemo(() => {
    let result = dirCategory
      ? companies.filter((c) => c.category === dirCategory)
      : companies
    if (dirSearch) {
      const q = dirSearch.toLowerCase()
      result = result.filter(c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.tags.some(t => t.toLowerCase().includes(q)) || c.category.toLowerCase().includes(q))
    }
    if (dirSort === 'rating') result.sort((a, b) => b.rating - a.rating)
    else if (dirSort === 'reviews') result.sort((a, b) => b.reviewCount - a.reviewCount)
    else result.sort((a, b) => a.name.localeCompare(b.name))
    return result
  }, [dirCategory, dirSearch, dirSort])

  return (
    <div>
      <div className="bg-[var(--brand-dark)] py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <button onClick={onBack} className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-sm font-medium px-4 py-2.5 rounded-xl border border-white/15 hover:bg-white/20 transition-all mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Home
          </button>
          <h1 className="font-serif text-3xl md:text-5xl text-white mb-3">All Members</h1>
          <p className="text-[#94A3B8] text-lg">Browse all {companies.length} businesses in our network</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Search companies..." value={dirSearch} onChange={e => setDirSearch(e.target.value)}
              className="w-full bg-[var(--surface)] border border-[var(--border-default)] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)]/50 transition-all" />
          </div>
          <div className="flex items-center gap-2 bg-[var(--surface)] border border-[var(--border-default)] rounded-xl p-1">
            {(['rating', 'reviews', 'name'] as const).map(opt => (
              <button key={opt} onClick={() => setDirSort(opt)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${dirSort === opt ? 'bg-[var(--brand)] text-white shadow-sm' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}`}>
                {opt === 'rating' ? 'Top Rated' : opt === 'reviews' ? 'Most Reviews' : 'A-Z'}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6 flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
          <button onClick={() => setDirCategory(null)} className={`flex-shrink-0 text-xs font-medium px-4 py-2 rounded-xl border transition-all ${!dirCategory ? 'bg-[var(--brand)] text-white border-[var(--brand)]' : 'text-[var(--text-secondary)] border-[var(--border-default)] bg-[var(--surface)] hover:border-[var(--text-primary)]'}`}>All</button>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setDirCategory(cat)}
              className={`flex-shrink-0 text-xs font-medium px-4 py-2 rounded-xl border transition-all ${dirCategory === cat ? 'bg-[var(--brand)] text-white border-[var(--brand)]' : 'text-[var(--text-secondary)] border-[var(--border-default)] bg-[var(--surface)] hover:border-[var(--text-primary)]'}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-stagger">
          {dirFiltered.map(c => (
            <CompanyCard key={c.id} company={c} onClick={() => onSelectCompany(c)} />
          ))}
        </div>
        {dirFiltered.length === 0 && (
          <div className="text-center py-24 animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-[var(--surface)] border border-[var(--border-light)] flex items-center justify-center mx-auto mb-5 text-3xl">🔍</div>
            <h3 className="font-serif text-xl text-[var(--text-primary)] mb-2">No results found</h3>
            <p className="text-sm text-[var(--text-tertiary)] mb-6">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [showDirectory, setShowDirectory] = useState(false)

  if (selectedCompany) {
    return <CompanyProfile company={selectedCompany} onBack={() => setSelectedCompany(null)} />
  }

  if (showDirectory) {
    return (
      <div className="min-h-screen bg-[var(--surface-alt)]">
        <DirectoryPage
          onBack={() => setShowDirectory(false)}
          onSelectCompany={(c) => setSelectedCompany(c)}
        />
      </div>
    )
  }

  const featured = companies.filter(c => c.featured)

  return (
    <div className="min-h-screen bg-[var(--surface-alt)]">
      <Navbar />

      {/* Hero */}
      <section id="home" className="relative bg-[var(--brand-dark)] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4A853 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-10 right-10 w-96 h-96 bg-[var(--accent)] rounded-full blur-[180px] opacity-10" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-[var(--brand)] rounded-full blur-[140px] opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-20 md:pt-28 md:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/20 px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                Kingdom Builders Network
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] mb-6">
                Building God's Kingdom Through<br />
                <span className="gold-gradient-text">Faith, Business, and Community</span>
              </h1>
              <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl">
                Kingdom Builders Network (KBN) is a community of Christian entrepreneurs, business leaders, and professionals committed to honoring God through their work. Together, we encourage one another, create meaningful connections, and grow businesses that make a lasting Kingdom impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#join" className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--brand-dark)] text-sm font-bold px-6 py-3.5 rounded-xl hover:bg-[var(--accent-dark)] transition-colors shadow-xl shadow-[var(--accent)]/30">
                  Join the Network
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </a>
                <a href="#who-we-are" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold px-6 py-3.5 rounded-xl border border-white/15 hover:bg-white/20 transition-colors">
                  Learn More
                </a>
              </div>
              <div className="grid grid-cols-3 gap-8 max-w-md mt-12">
                {[
                  { value: '200+', label: 'Members' },
                  { value: '8', label: 'Industries' },
                  { value: '12', label: 'Chapters' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="font-serif text-2xl text-white font-bold">{s.value}</div>
                    <div className="text-xs text-[#94A3B8] mt-0.5 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 to-[var(--brand)]/20 rounded-2xl blur-2xl" />
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=500&fit=crop&auto=format"
                  alt="Christian professionals collaborating"
                  className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-[var(--surface-raised)] rounded-xl shadow-xl p-4 z-10 border border-[var(--border-light)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent-light)] flex items-center justify-center text-lg">🙏</div>
                    <div>
                      <div className="text-sm font-semibold text-[var(--text-primary)]">Prayer & Fellowship</div>
                      <div className="text-xs text-[var(--text-tertiary)]">Joining together in faith</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--surface-alt)] to-transparent" />
      </section>

      {/* About */}
      <section id="about-us" className="py-20 md:py-28 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading overline="Who We Are" title="Kingdom Builders Network" subtitle="KBN exists to connect Christian entrepreneurs and professionals who desire to integrate faith with business. We believe businesses can be powerful tools for serving communities, creating opportunities, and advancing God's Kingdom." />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Authentic Relationships', desc: 'We foster genuine connections where faith and business intersect, building a community that supports, encourages, and challenges one another.' },
              { title: 'Mentorship & Growth', desc: 'Through mentorship, networking, and collaboration, we empower members to grow spiritually and professionally in every season.' },
              { title: 'Kingdom Impact', desc: 'We equip believers to use their businesses as platforms for ministry, serving their communities and advancing God\'s purposes.' },
            ].map(item => (
              <div key={item.title} className="card-hover bg-[var(--surface)] rounded-2xl border border-[var(--border-light)] p-6 text-center group">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-[var(--accent-dark)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-[var(--brand-dark)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4A853 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading overline="Our Purpose" title="Mission & Vision" />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-10 text-center group card-hover">
              <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">Our Mission</h3>
              <p className="text-[#94A3B8] leading-relaxed text-lg">Connecting Christian entrepreneurs and professionals to grow in faith, business, and purpose.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-10 text-center group card-hover">
              <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">Our Vision</h3>
              <p className="text-[#94A3B8] leading-relaxed text-lg">To build a global network of Kingdom-minded leaders who use their gifts, businesses, and influence to glorify God and positively impact their communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community & Membership */}
      <section id="community-membership" className="py-20 md:py-28 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading overline="Why Join" title="Community & Membership" subtitle="Experience the power of a faith-driven professional network designed to help you thrive in business and walk closer with Christ." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMMUNITY_CARDS.map((card, i) => (
              <div key={card.title} className="card-hover bg-[var(--surface)] rounded-2xl border border-[var(--border-light)] p-6 group" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[var(--accent)]/20 transition-all">
                  <svg className="w-6 h-6 text-[var(--accent-dark)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} /></svg>
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{card.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Members */}
      <section className="py-20 md:py-28 bg-[var(--surface)] animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading overline="Our Community" title="Featured Members" subtitle="Meet some of the incredible Christian business owners and professionals in our network." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger">
            {featured.map(company => (
              <CompanyCard key={company.id} company={company} onClick={() => setSelectedCompany(company)} />
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => setShowDirectory(true)} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] border border-[var(--brand)] px-6 py-3 rounded-xl hover:bg-[var(--brand)] hover:text-white transition-colors">
              View All Members
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="py-20 md:py-28 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading overline="Get Involved" title="Upcoming Events" subtitle="Grow in faith, build relationships, and sharpen your skills at our upcoming gatherings." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVENTS.map((ev, i) => (
              <div key={ev.title} className="card-hover bg-[var(--surface)] rounded-2xl border border-[var(--border-light)] overflow-hidden group" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="relative h-40 overflow-hidden">
                  <img src={ev.image} alt={ev.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-[var(--surface-raised)]/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-bold text-[var(--brand)]">
                    {ev.date}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)] mb-2">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {ev.time}
                    <span className="mx-1">·</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {ev.location.split(',')[0]}
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2 leading-tight">{ev.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">{ev.description}</p>
                  <button className="text-xs font-semibold text-[var(--accent-dark)] hover:text-[var(--brand)] transition-colors flex items-center gap-1">
                    Register Now
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-[var(--surface)] animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading overline="Testimonials" title="What Our Members Are Saying" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="card-hover bg-[var(--surface-alt)] rounded-2xl border border-[var(--border-light)] p-6 flex flex-col" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-center gap-1 mb-3 text-[var(--accent)]">
                  {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-light)]">
                  <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-[var(--surface)]" />
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-primary)]">{t.name}</div>
                    <div className="text-xs text-[var(--text-tertiary)]">{t.profession}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="py-20 md:py-28 bg-[var(--brand-dark)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4A853 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)] rounded-full blur-[180px] opacity-5" />
        <div className="relative max-w-3xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">Join a Community That Builds More Than Businesses</h2>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10">Become part of a growing network of Christian entrepreneurs and professionals committed to making a Kingdom impact through faith, excellence, and service.</p>
          <a href="#" className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--brand-dark)] text-base font-bold px-8 py-4 rounded-xl hover:bg-[var(--accent-dark)] transition-colors shadow-2xl shadow-[var(--accent)]/30">
            Become a Member
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--brand)] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <span className="font-serif text-xl">Kingdom Builders Network</span>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 max-w-sm">Connecting Christian entrepreneurs and professionals to grow in faith, business, and purpose.</p>
              <div className="flex items-center gap-3">
                {['Twitter', 'LinkedIn', 'Instagram', 'YouTube'].map(s => (
                  <a key={s} href="#" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/50 hover:bg-[var(--accent)]/20 hover:text-[var(--accent)] transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Navigation</h4>
              <div className="space-y-2.5">
                {['About Us', 'Community & Membership', 'Events', 'Join the Network'].map(link => (
                  <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="block text-sm text-[#94A3B8] hover:text-white transition-colors">{link}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Resources</h4>
              <div className="space-y-2.5">
                {['Blog', 'Podcast', 'Devotionals', 'Prayer Requests', 'FAQ'].map(link => (
                  <a key={link} href="#" className="block text-sm text-[#94A3B8] hover:text-white transition-colors">{link}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Contact</h4>
              <div className="space-y-2.5 text-sm text-[#94A3B8]">
                <p>info@kbn.org</p>
                <p>(469) 555-KBN1</p>
                <p>Dallas-Fort Worth, TX</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#64748B]">&copy; 2025 Kingdom Builders Network. All rights reserved.</p>
            <div className="flex items-center gap-6 text-xs text-[#64748B]">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
