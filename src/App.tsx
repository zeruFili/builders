import { useState, useEffect, useRef } from 'react'
import knbLogo from './assets/kbn logo.jpg'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import CompanyDashboard from './components/CompanyDashboard'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'
import AboutUsPage from './components/AboutUsPage'
import { useAuth } from './auth/AuthContext'
import { type UserRole } from './auth/auth'

const NAV_ITEMS = ['Home', 'About Us', 'Events'] as const

const EVENTS = [
  { image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&auto=format', date: 'Aug 15, 2025', time: '7:30 AM – 9:30 AM', location: 'Abren Cafe, Addis Ababa', title: 'Quarterly Networking Breakfast', description: 'Start your morning with fellowship, prayer, and purposeful connections with fellow Christian entrepreneurs over coffee and breakfast at our quarterly gathering.' },
  { image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop&auto=format', date: 'Sep 20, 2025', time: '9:00 AM – 4:00 PM', location: 'Betesha Retreat Center, Addis Ababa', title: 'National Ethiopian Christian Business Summit', description: 'A full day of worship, keynote sessions, and workshops designed to equip Christian leaders for greater Kingdom impact across Ethiopia.' },
  { image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&h=400&fit=crop&auto=format', date: 'Oct 7, 2025', time: '6:30 PM – 8:30 PM', location: 'Addis Ababa, Ethiopia', title: 'Prayer & Worship Gathering', description: 'An evening of powerful worship and intercessory prayer for our businesses, families, and nation. All are welcome.' },
  { image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&h=400&fit=crop&auto=format', date: 'Nov 11, 2025', time: '9:00 AM – 12:30 PM', location: 'Hawassa, SNNPR, Ethiopia', title: 'Hawassa Regional Networking Event', description: 'Strategic networking event in Hawassa — chosen for its 85% Christian population — uniting local Christian entrepreneurs and professionals.' },
  { image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop&auto=format', date: 'Dec 5, 2025', time: '8:00 AM – 5:00 PM', location: 'Addis Ababa, Ethiopia', title: 'Kingdom Builders Leadership Academy Launch', description: 'Launch of our leadership academy equipping believers with business skills and spiritual grounding for Kingdom impact.' },
  { image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop&auto=format', date: 'Dec 19, 2025', time: '6:00 PM – 8:00 PM', location: 'Abren Cafe, Addis Ababa', title: 'Year-End Celebration & Prayer', description: 'Wind down the year with fellowship and celebration. Share testimonies of God\'s faithfulness and look ahead to the new year together.' },
]

function Navbar({ onLogin, onSignUp, onHome, onAboutUs }: { onLogin: () => void; onSignUp: () => void; onHome: () => void; onAboutUs: () => void }) {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  return (
    <header className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        <button onClick={onHome} className="flex items-center gap-2.5 flex-shrink-0 group">
          <img src={knbLogo} alt="KBN Logo" className="w-9 h-9 rounded-xl object-cover group-hover:scale-105 transition-transform shadow-lg shadow-[var(--brand)]/20" />
          <span className="font-serif text-lg sm:text-xl text-[var(--text-primary)] tracking-tight">KBN</span>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map(item =>
            item === 'About Us' ? (
              <button key={item} onClick={onAboutUs} className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-alt)] px-3 py-2 rounded-xl transition-all cursor-pointer">
                {item}
              </button>
            ) : (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-alt)] px-3 py-2 rounded-xl transition-all">
                {item}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-2 py-1.5 rounded-xl hover:bg-[var(--surface-alt)] transition-all">
                <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-lg object-cover ring-2 ring-[var(--border-light)]" />
                <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${user.role === 'admin' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : user.role === 'company' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'}`}>{user.role}</span>
                <svg className="w-4 h-4 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {userMenuOpen && (
                <div className="absolute right-4 top-16 z-50 w-56 bg-[var(--surface)] rounded-xl border border-[var(--border-light)] shadow-xl p-2 animate-slide-down">
                  <div className="px-3 py-2.5 border-b border-[var(--border-light)] mb-1">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{user.name}</p>
                    <p className="text-xs text-[var(--text-tertiary)] truncate">{user.email}</p>
                    {user.business && <p className="text-xs text-[var(--accent-dark)] mt-0.5">{user.business}</p>}
                  </div>
                  <button onClick={() => { logout(); setUserMenuOpen(false) }} className="w-full text-left text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-alt)] px-3 py-2 rounded-lg transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Sign Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <button onClick={onLogin} className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-2 sm:px-3 py-2 rounded-xl transition-colors">Login</button>
              <button onClick={onSignUp} className="text-sm font-semibold text-white bg-[var(--brand)] px-3 sm:px-4 py-2 rounded-xl hover:bg-[var(--brand-light)] transition-colors shadow-lg shadow-[var(--brand)]/20 flex items-center gap-2">
                <span className="hidden xs:inline">Sign Up</span>
                <svg className="w-4 h-4 xs:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
              </button>
            </>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-10 h-10 rounded-xl border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--surface-alt)] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden border-t border-[var(--border-light)] bg-[var(--surface)] px-4 py-4 space-y-2 animate-slide-down">
          {NAV_ITEMS.map(item =>
            item === 'About Us' ? (
              <button key={item} onClick={() => { onAboutUs(); setMenuOpen(false) }} className="block w-full text-left text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-2.5 rounded-xl hover:bg-[var(--surface-alt)] transition-colors">{item}</button>
            ) : (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setMenuOpen(false)} className="block w-full text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-2.5 rounded-xl hover:bg-[var(--surface-alt)] transition-colors">{item}</a>
            )
          )}
          <div className="pt-2 border-t border-[var(--border-light)] space-y-2">
            {user ? (
              <button onClick={() => { logout(); setMenuOpen(false) }} className="block w-full text-center text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-2.5 rounded-xl hover:bg-[var(--surface-alt)] transition-colors">Sign Out</button>
            ) : (
              <>
                <button onClick={() => { onLogin(); setMenuOpen(false) }} className="block w-full text-center text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-2.5 rounded-xl hover:bg-[var(--surface-alt)] transition-colors">Login</button>
                <button onClick={() => { onSignUp(); setMenuOpen(false) }} className="block w-full text-center text-sm font-semibold text-white bg-[var(--brand)] py-2.5 rounded-xl hover:bg-[var(--brand-light)] transition-colors">Sign Up</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

function SectionHeading({ overline, title, subtitle, light }: { overline?: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      {overline && <span className="inline-block text-xs font-semibold text-[var(--accent-dark)] tracking-widest uppercase mb-3">{overline}</span>}
      <h2 className={`font-serif text-2xl sm:text-3xl md:text-4xl mb-4 ${light ? 'text-white' : 'text-[var(--text-primary)]'}`}>{title}</h2>
      {subtitle && <p className={`leading-relaxed ${light ? 'text-[#94A3B8]' : 'text-[var(--text-secondary)]'}`}>{subtitle}</p>}
    </div>
  )
}

export default function App() {
  const [showAboutUs, setShowAboutUs] = useState(false)
  const [authPage, setAuthPage] = useState<'login' | 'signup' | null>(null)
  const [dashboard, setDashboard] = useState<UserRole | null>(null)
  const { user, loading } = useAuth()
  const loginExplicitRef = useRef(false)

  function handleLoginSuccess(role: UserRole) {
    loginExplicitRef.current = true
    setAuthPage(null)
    setDashboard(role)
  }

  useEffect(() => {
    if (loading) return
    if (user) {
      if (loginExplicitRef.current) {
        loginExplicitRef.current = false
      } else {
        setDashboard(user.role)
      }
    } else {
      setDashboard(null)
    }
  }, [loading, user])

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--surface-alt)] flex items-center justify-center">
        <svg className="w-8 h-8 animate-spin text-[var(--brand)]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
      </div>
    )
  }

  if (dashboard === 'company') return <CompanyDashboard onBack={() => setDashboard(null)} />
  if (dashboard === 'admin') return <AdminDashboard onBack={() => setDashboard(null)} />
  if (dashboard === 'user') return <UserDashboard onBack={() => setDashboard(null)} />

  if (authPage === 'login') {
    return <LoginPage onBack={() => setAuthPage(null)} onSwitch={() => setAuthPage('signup')} onSuccess={handleLoginSuccess} />
  }

  if (authPage === 'signup') {
    return <SignUpPage onBack={() => setAuthPage(null)} onSwitch={() => setAuthPage('login')} />
  }

  if (showAboutUs) {
    return <AboutUsPage onBack={() => setShowAboutUs(false)} />
  }

  return (
    <div className="min-h-screen bg-[var(--surface-alt)]">
      <Navbar
        onLogin={() => setAuthPage('login')}
        onSignUp={() => setAuthPage('signup')}
        onHome={() => { setAuthPage(null); setShowAboutUs(false) }}
        onAboutUs={() => { setShowAboutUs(true); window.scrollTo(0, 0) }}
      />

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
                Kingdom Builders Network (KBN) is a registered ministry under the Ethiopian Council of Gospel Believers Churches, connecting hundreds of Ethiopian Christian entrepreneurs and professionals across the U.S. and Ethiopia. Through connection, communication, and collaboration, we strengthen both the spiritual and economic well-being of the Christian community.
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
              <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md mt-12">
                {[
                  { value: '300+', label: 'Members' },
                  { value: '15', label: 'Industries' },
                  { value: '2', label: 'Countries' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="font-serif text-xl sm:text-2xl text-white font-bold">{s.value}</div>
                    <div className="text-xs text-[#94A3B8] mt-0.5 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--surface-alt)] to-transparent" />
      </section>

      {/* About */}
      <section id="about-us" className="py-16 sm:py-20 md:py-28 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading overline="Who We Are" title="Kingdom Builders Network" subtitle="Inspired by Psalm 133:1 — 'Behold, how good and pleasant it is when God's people live together in unity!' — KBN envisions a united community of Christian entrepreneurs and professionals who are spiritually rooted, socially connected, and economically empowered to build the Kingdom of God in every sphere of life." />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Unity in Christ', desc: 'Building relationships among believers for mutual spiritual and professional growth, reflecting the heart of Psalm 133.' },
              { title: 'Integrity & Excellence', desc: 'Upholding Christian ethics in all professional and business dealings while pursuing excellence in leadership and community transformation.' },
              { title: 'Service', desc: 'Using resources, skills, and influence to serve churches, communities, and God\'s Kingdom — empowering believers and building Christian institutions.' },
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

          {/* Achievements */}
          <div className="max-w-4xl mx-auto mt-16">
            <h3 className="font-serif text-2xl text-[var(--text-primary)] text-center mb-8">Our Impact (Past 3 Years)</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="card-hover bg-[var(--surface)] rounded-2xl border border-[var(--border-light)] p-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-dark)] mb-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  United States
                </div>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>• Connected Ethiopian Christian professionals in multiple states</li>
                  <li>• Hosted 3 successful national networking events</li>
                  <li>• Developing strategic plan for commercial buildings to support Christian businesses</li>
                </ul>
              </div>
              <div className="card-hover bg-[var(--surface)] rounded-2xl border border-[var(--border-light)] p-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-dark)] mb-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  Ethiopia
                </div>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>• Held 2 large-scale networking events in Hawassa</li>
                  <li>• Launched KG to College Christian School in Hawassa</li>
                  <li>• Building Kingdom Business Hubs across Addis Ababa</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 md:py-28 bg-[var(--brand-dark)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4A853 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading overline="Our Purpose" title="Mission & Vision" light />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-10 text-center group card-hover">
              <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">Our Mission</h3>
              <p className="text-[#94A3B8] leading-relaxed text-lg">To unite Christian entrepreneurs and professionals through connection, communication, and collaboration — strengthening both the spiritual and physical well-being of the Christian community locally and globally.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-10 text-center group card-hover">
              <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">Our Vision</h3>
              <p className="text-[#94A3B8] leading-relaxed text-lg">A united community of Christian entrepreneurs and professionals who are spiritually rooted, socially connected, and economically empowered to build the Kingdom of God in every sphere of life — in Ethiopia, the U.S., and beyond.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="py-16 sm:py-20 md:py-28 animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading overline="Get Involved" title="Upcoming Events" subtitle="Grow in faith, build relationships, and sharpen your skills at our upcoming gatherings." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

      {/* CTA */}
      <section id="join" className="py-16 sm:py-20 md:py-28 bg-[var(--brand-dark)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4A853 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)] rounded-full blur-[180px] opacity-5" />
        <div className="relative max-w-3xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">Join a Movement That Builds God's Kingdom</h2>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10">Become part of a growing network of Ethiopian Christian entrepreneurs and professionals committed to making a Kingdom impact through faith, excellence, and service — across Ethiopia, the USA, and beyond.</p>
          <button onClick={() => setAuthPage('signup')} className="inline-flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--brand-dark)] text-base font-bold px-8 py-4 rounded-xl hover:bg-[var(--accent-dark)] transition-colors shadow-2xl shadow-[var(--accent)]/30 cursor-pointer">
            Become a Member
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--brand)] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
              <img src={knbLogo} alt="KBN Logo" className="w-9 h-9 rounded-xl object-cover bg-white/10" />
                <span className="font-serif text-xl">Kingdom Builders Network</span>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 max-w-sm">A registered ministry under the Ethiopian Council of Gospel Believers Churches and in the United States — connecting Christian entrepreneurs and professionals across borders.</p>
              
            </div>
            <div className="mt-8 sm:mt-0">
              <h4 className="font-semibold text-white text-sm mb-4">Navigation</h4>
              <div className="space-y-2.5">
                {['About Us', 'Events', 'Contact'].map(link => (
                  link === 'About Us' ? (
                    <button key={link} onClick={() => { setShowAboutUs(true); window.scrollTo(0, 0) }} className="block text-sm text-[#94A3B8] hover:text-white transition-colors cursor-pointer">{link}</button>
                  ) : (
                    <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="block text-sm text-[#94A3B8] hover:text-white transition-colors">{link}</a>
                  )
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Resources</h4>
              <div className="space-y-2.5">
                {['Leadership Academy', 'KBN App & Podcast', 'Prayer Requests', 'KBN Journal', 'FAQ'].map(link => (
                  <a key={link} href="#" className="block text-sm text-[#94A3B8] hover:text-white transition-colors">{link}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Contact</h4>
              <div className="space-y-2.5 text-sm text-[#94A3B8]">
                <p>info@kbn.org</p>
                <p>+251 91 196 3232</p>
                <p>Addis Ababa, Ethiopia</p>
              </div>
              <div className="flex items-center gap-3 mt-5">
                <a href="https://www.tiktok.com/@kbn_ethiopia?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/50 hover:bg-[var(--accent)]/20 hover:text-[var(--accent)] transition-all" aria-label="TikTok">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
                <a href="https://www.tiktok.com/link/v2?aid=1988&lang=en&scene=bio_url&target=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17VqXsVbz6%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/50 hover:bg-[var(--accent)]/20 hover:text-[var(--accent)] transition-all" aria-label="Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#64748B]">&copy; 2025 Kingdom Builders Network. All rights reserved.</p>
            <div className="flex items-center gap-4 sm:gap-6 text-xs text-[#64748B]">
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
