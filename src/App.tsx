import { useState, useEffect, useRef } from 'react'
import knbLogo from './assets/kbn logo.jpg'
import surafelImg from './assets/surafel.jpg'
import usaOneImg from './assets/usa one.jpg'
import addisOneImg from './assets/addis one.jpg'
import worshipImg from '../assets/events/hawassa worship.jpg'
import stageImg from '../assets/events/Atlanta stage one.jpg'
import suraImg from '../assets/events/INTEGROTY  THE FOUNDATION OF KINGDOM INFLUENCE  surafel.jpg'
import heroImg from '../assets/events/light and salt  peoples one.jpg'
import peopleImg from '../assets/events/denver peoples.jpg'
import atlantaPeopleImg from '../assets/events/Atlanta peoples one.jpg'
import excelImg from '../assets/events/kingdom excellence peoples one.jpg'
import groupImg from '../assets/events/hawassa group image.jpg'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'
import AboutUsPage from './components/AboutUsPage'
import EventsPage from './components/EventsPage'
import worshipingImg from '../assets/events/INTEGROTY  THE FOUNDATION OF KINGDOM INFLUENCE peoples three.jpg'
import EventDetailsPage from './components/EventDetailsPage'
import { useAuth } from './auth/AuthContext'
import { type UserRole } from './auth/auth'
import { getEvents, type KbnEvent } from './data/events'

const NAV_ITEMS = ['About Us', 'Events'] as const

function Navbar({ onSignUp, onHome, onAboutUs, onEvents }: { onSignUp: () => void; onHome: () => void; onAboutUs: () => void; onEvents: () => void }) {
  const { user, logout } = useAuth()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        <button onClick={onHome} className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0 group">
          <img src={knbLogo} alt="KBN Logo" className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover group-hover:scale-105 transition-transform shadow-lg shadow-[var(--brand)]/20" />
          <span className={`font-serif text-lg sm:text-xl tracking-tight transition-colors duration-300 ${scrolled ? 'text-[var(--text-primary)]' : 'text-white'}`}>KBN</span>
        </button>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button key={item} onClick={item === 'About Us' ? onAboutUs : onEvents} className={`text-xs sm:text-sm font-medium px-2 sm:px-3 py-2 rounded-xl transition-all cursor-pointer ${scrolled ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-alt)]' : 'text-white/90 hover:text-white hover:bg-white/10'}`}>
                {item}
              </button>
            ))}
          </nav>

          {user ? (
            <>
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className={`hidden xs:flex items-center gap-2 text-sm font-medium px-2 py-1.5 rounded-xl transition-all ${scrolled ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-alt)]' : 'text-white/90 hover:text-white hover:bg-white/10'}`}>
                <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-lg object-cover ring-2 ring-[var(--border-light)]" />
                <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${user.role === 'admin' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'}`}>{user.role}</span>
                <svg className="w-4 h-4 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {userMenuOpen && (
                <div className="absolute right-4 top-16 z-50 w-56 bg-[var(--surface)] rounded-xl border border-[var(--border-light)] shadow-xl p-2 animate-slide-down">
                  <div className="px-3 py-2.5 border-b border-[var(--border-light)] mb-1">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{user.name}</p>
                    <p className="text-xs text-[var(--text-tertiary)] truncate">{user.email}</p>
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
              <button onClick={onSignUp} className={`text-sm font-semibold px-3 sm:px-4 py-2 rounded-xl transition-colors shadow-lg flex items-center gap-2 ${scrolled ? 'text-white bg-[var(--brand)] hover:bg-[var(--brand-light)] shadow-[var(--brand)]/20' : 'text-[var(--brand-dark)] bg-white hover:bg-[var(--accent)]'}`}>
                <span className="hidden xs:inline">Sign Up</span>
                <svg className="w-4 h-4 xs:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
              </button>
            </>
          )}
        </div>
      </div>
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

function TriangleArt({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 110" fill="none" aria-hidden="true">
      <path d="M60 10 L112 98 L8 98 Z" stroke="var(--accent)" strokeWidth="2" />
      <path d="M60 34 L94 92 L26 92 Z" stroke="var(--accent)" strokeWidth="1.5" opacity="0.55" />
      <path d="M60 58 L76 84 L44 84 Z" stroke="var(--accent)" strokeWidth="1.5" opacity="0.3" />
      <circle cx="60" cy="52" r="3" fill="var(--accent)" />
    </svg>
  )
}

function CurveDivider({ fill = 'var(--surface-alt)', position = 'bottom', flip = false, className = '' }: { fill?: string; position?: 'top' | 'bottom'; flip?: boolean; className?: string }) {
  return (
    <svg className={`absolute block ${position === 'bottom' ? 'bottom-[-1px]' : 'top-[-1px]'} left-0 w-full h-10 sm:h-14 md:h-20 ${flip ? 'rotate-180' : ''} ${className}`} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,64 C240,120 480,0 720,32 C960,64 1200,120 1440,56 L1440,124 L0,124 Z" fill={fill} />
    </svg>
  )
}

export default function App() {
  const [showAboutUs, setShowAboutUs] = useState(false)
  const [showEvents, setShowEvents] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<KbnEvent | null>(null)
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

  if (selectedEvent) {
    return <EventDetailsPage slug={selectedEvent.slug} onBack={() => setSelectedEvent(null)} />
  }

  if (showEvents) {
    return <EventsPage onBack={() => setShowEvents(false)} onOpenEvent={(ev) => setSelectedEvent(ev)} />
  }

  return (
    <div className="min-h-screen bg-[var(--surface-alt)]">
      <Navbar
        onSignUp={() => setAuthPage('signup')}
        onHome={() => { setAuthPage(null); setShowAboutUs(false); setShowEvents(false); setSelectedEvent(null) }}
        onAboutUs={() => { setShowAboutUs(true); setShowEvents(false); setSelectedEvent(null); window.scrollTo(0, 0) }}
        onEvents={() => { setShowEvents(true); setShowAboutUs(false); setSelectedEvent(null); window.scrollTo(0, 0) }}
      />

      {/* Hero */}
      <section id="home" className="relative text-white overflow-hidden section_has_divider">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-dark)]/95 via-[var(--brand-dark)]/85 to-[var(--brand-dark)]/95" />
        </div>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4A853 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-[28rem] h-[28rem] bg-[var(--accent)] rounded-full blur-[180px] opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--brand)] rounded-full blur-[140px] opacity-25 pointer-events-none" />
        <TriangleArt className="absolute left-8 top-24 w-24 h-24 opacity-40 hidden md:block" />
        <TriangleArt className="absolute right-16 top-36 w-16 h-16 opacity-30 hidden md:block" />
        <div className="relative max-w-5xl mx-auto px-4 md:px-8 pt-24 pb-28 md:pt-36 md:pb-44 text-center">
          <p className="overline-gold mb-8 text-[var(--accent)]">
            Kingdom Builders Network
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6">
            Building God's Kingdom
          </h1>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl gold-gradient-text mb-10">
            Every Day, Everywhere.
          </p>
          <p className="text-[#94A3B8] text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            Kingdom Builders Network (KBN) is a registered ministry connecting hundreds of Ethiopian Christian entrepreneurs and professionals across the U.S. and Ethiopia — strengthening the spiritual and economic well-being of the Christian community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setAuthPage('signup')} className="btn-pill btn-gold shadow-xl shadow-[var(--accent)]/30">
              Become a Member
            </button>
            <button onClick={() => { setShowEvents(true); window.scrollTo(0, 0) }} className="btn-pill btn-outline-light">
              Explore Events
            </button>
          </div>
        </div>
        <CurveDivider fill="var(--surface)" position="bottom" />
      </section>

      

     

      {/* About KBN */}
      <section className="relative py-20 md:py-28 bg-[var(--surface)] overflow-hidden">
        <div className="absolute -right-16 top-10 w-64 h-64 rounded-[3rem] border border-[var(--border-default)] rotate-12 pointer-events-none hidden md:block" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="overline-gold mb-4">Who We Are</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] leading-tight mb-8 uppercase">
              Raising Up Kingdom Builders
            </h2>
            <TriangleArt className="w-24 h-24 opacity-60 mb-6" />
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Since our founding, Kingdom Builders Network has passionately pursued the mission to unite Christian entrepreneurs and professionals — people whose hearts are set on fire to live purposefully and build the Kingdom of God in every sphere of life.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              Through dynamic gatherings, practical equipping, and strategic initiatives, we come alongside churches and believers to make spiritual decisions, activate God-given purpose, and create impact across the United States and Ethiopia.
            </p>
            <button onClick={() => { setShowAboutUs(true); window.scrollTo(0, 0) }} className="btn-pill btn-navy">
              See the Mission in Action
            </button>
          </div>
          <div className="relative">
            <img src={suraImg} alt="Kingdom Builders Network gathering" className="relative w-full h-72 md:h-[28rem] object-cover rounded-[3rem] shadow-2xl" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--brand-dark)] shadow-xl">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
          </div>
        </div>
      </section>

     

      {/* Explore ways */}
      <section className="relative py-20 md:py-28 bg-[var(--brand-dark)] overflow-hidden">

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-14">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="overline-gold mb-3 text-[var(--accent)]">Explore ways</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white uppercase">To Forge Forward</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: peopleImg, title: 'Networking Events', desc: 'Quarterly gatherings uniting Christian entrepreneurs and professionals across the U.S. and Ethiopia.' },
              { img: worshipImg, title: 'Worship & Prayer', desc: 'Powerful gatherings of worship and intercessory prayer for our businesses, families, and nation.' },
              { img: usaOneImg, title: 'Global Movement', desc: 'Building Christian schools, institutions, and community hubs that reflect Kingdom values.' },
            ].map(way => (
              <button key={way.title} onClick={() => { setShowEvents(true); window.scrollTo(0, 0) }} className="group text-left cursor-pointer">
                <div className="h-60 overflow-hidden rounded-t-[3rem] border-b-4 border-[var(--accent)]">
                  <img src={way.img} alt={way.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="px-2 pt-6">
                  <h3 className="font-serif text-xl text-white mb-3 uppercase tracking-wide">{way.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">{way.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <CurveDivider fill="var(--surface-alt)" position="bottom" />

      </section>

      {/* Who We Are */}
      <section className="relative py-20 md:py-28 bg-[var(--surface-alt)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="overline-gold mb-4">Who We Are</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] leading-tight mb-6 uppercase">
              Kingdom Builders Network
            </h2>
            <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed">
              Inspired by Psalm 133:1 — 'Behold, how good and pleasant it is when God's people live together in unity!' — KBN envisions a united community of Christian entrepreneurs and professionals who are spiritually rooted, socially connected, and economically empowered to build the Kingdom of God in every sphere of life.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 lg:grid-cols-1">
            {[
              { title: 'Unity in Christ', desc: 'Building relationships among believers for mutual spiritual and professional growth, reflecting the heart of Psalm 133.' },
              { title: 'Integrity & Excellence', desc: 'Upholding Christian ethics in all professional and business dealings while pursuing excellence in leadership and community transformation.' },
              { title: 'Service', desc: 'Using resources, skills, and influence to serve churches, communities, and God\'s Kingdom — empowering believers and building Christian institutions.' },
            ].map(pillar => (
              <div key={pillar.title} className="flex items-center gap-4 text-left">
                <div className="w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[var(--accent)]/25">
                  <svg className="w-6 h-6 text-[var(--brand-dark)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] uppercase tracking-wide">{pillar.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Testimonials */}
      <section className="relative overflow-hidden bg-[var(--surface)]">
  <TriangleArt className="absolute left-[6%] top-[20%] w-20 h-20 opacity-30 hidden md:block" />
  <TriangleArt className="absolute right-[8%] top-[30%] w-14 h-14 opacity-25 hidden md:block" />
  <div className="absolute left-[10%] bottom-12 w-24 h-24 rounded-full border-2 border-[var(--accent)]/30 hidden md:block" />
  <div className="absolute right-[12%] bottom-20 w-16 h-16 rounded-[2rem] border-2 border-[var(--accent)]/20 rotate-12 hidden md:block" />

  <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-20 md:pt-28">
    <div className="text-center max-w-2xl mx-auto mb-24">
      <p className="overline-gold mb-3">Stories of God’s Faithfulness</p>
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase">Stories of Faith</h2>
    </div>

    <div className="relative">
      <div className="absolute top-1/2 bottom-0 left-1/2 -translate-x-1/2 w-screen bg-[var(--surface-alt)]" />
      <div className="relative grid md:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-8 pb-20 md:pb-28">
        {[
          { name: 'Meron Tadesse', role: 'Business Owner', quote: 'KBN connected me with Christian mentors who transformed how I lead my business. I no longer feel alone in the marketplace — I have a community that prays for me and pushes me to pursue excellence for God\'s glory.', img: peopleImg, dark: true },
          { name: 'Henok Kebede', role: 'Architect', quote: 'Joining KBN was one of the best decisions I have made for my career. The networking events are genuine, not transactional. I have formed friendships that go far beyond business.', img: atlantaPeopleImg, dark: false },
          { name: 'Dr. Tigist Asrat', role: 'Physician', quote: 'Finding other Christian professionals through KBN has been life-giving. We share best practices, pray for each other, and encourage one another to keep Christ at the center of our work.', img: groupImg, dark: true },
        ].map(t => (
          <figure key={t.name} className={`relative rounded-[2rem] px-7 pt-20 pb-9 text-center shadow-xl flex flex-col ${t.dark ? 'bg-[var(--brand)]' : 'bg-[var(--accent)]'}`}>
            <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden ring-4 shadow-lg ${t.dark ? 'ring-[var(--accent)]' : 'ring-[var(--brand)]'}`}>
              <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
            </div>
            <blockquote className={`text-sm leading-relaxed mb-6 flex-1 ${t.dark ? 'text-[#C7CFDD]' : 'text-[var(--brand-dark)]/80'}`}>"{t.quote}"</blockquote>
            <figcaption>
              <div className={`text-base font-bold uppercase tracking-wide ${t.dark ? 'text-white' : 'text-[var(--brand-dark)]'}`}>{t.name}</div>
              <div className={`text-xs ${t.dark ? 'text-[#94A3B8]' : 'text-[var(--brand-dark)]/60'}`}>{t.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* Events */}
      <section id="events" className="relative py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div>
              <p className="overline-gold mb-3">The Latest</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase">Events & Gatherings</h2>
            </div>
            <button onClick={() => { setShowEvents(true); window.scrollTo(0, 0) }} className="btn-pill btn-navy">
              See All Events
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {getEvents().slice(0, 4).map(ev => (
              <button key={ev.slug} onClick={() => { setShowEvents(true); setSelectedEvent(ev); window.scrollTo(0, 0) }} className="group text-left cursor-pointer">
                <div className="h-52 overflow-hidden rounded-t-[2rem] border-b-4 border-[var(--accent)]">
                  <img src={ev.brochure} alt={ev.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="font-serif text-base text-[var(--text-primary)] leading-snug mt-4 line-clamp-2 group-hover:text-[var(--accent-dark)] transition-colors">{ev.title}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Founder CTA */}
      <section className="relative py-20 md:py-28 bg-[var(--brand-dark)] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4A853 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-14 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-serif text-3xl sm:text-4xl text-[var(--accent)] mb-8 leading-snug">Raising Up Kingdom Builders</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-10 uppercase">
              People Who Love God, Love Others, and Advance the Kingdom Everywhere They Go.
            </h2>
           
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={excelImg} alt="Founder" className="w-full h-56 md:h-72 object-cover rounded-[2rem]" />
            <img src={worshipingImg} alt="Worship gathering" className="w-full h-56 md:h-72 object-cover rounded-[2rem] mt-8" />
            <img src={addisOneImg} alt="Event" className="w-full h-56 md:h-72 object-cover rounded-[2rem]" />
            <img src={stageImg} alt="Stage" className="w-full h-56 md:h-72 object-cover rounded-[2rem] mt-8" />
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="relative py-16 md:py-20 bg-[var(--accent)] overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[var(--brand-dark)] leading-tight mb-6">
            Discover your kingdom impact.
          </h2>
          <button onClick={() => setAuthPage('signup')} className="btn-pill btn-navy">
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--brand)] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
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
                  ) : link === 'Events' ? (
                    <button key={link} onClick={() => { setShowEvents(true); window.scrollTo(0, 0) }} className="block text-sm text-[#94A3B8] hover:text-white transition-colors cursor-pointer">{link}</button>
                  ) : (
                    <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="block text-sm text-[#94A3B8] hover:text-white transition-colors">{link}</a>
                  )
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
            <p className="text-xs text-[#64748B]">&copy; 2026 Kingdom Builders Network. All rights reserved.</p>
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
