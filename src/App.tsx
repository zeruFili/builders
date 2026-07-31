import { useState, useMemo } from 'react'
import CompanyProfile, { CompanyCard, StarRating, CategoryIcon, getCategoryColor } from './components/CompanyProfile'
import { companies, CATEGORIES, type Company, type Category } from './data/companies'

function getCategoryGradient(cat: Category): string {
  const g: Record<Category, [string, string]> = {
    Construction: ['#F59E0B', '#D97706'],
    Hospitals: ['#10B981', '#059669'],
    Hotels: ['#8B5CF6', '#7C3AED'],
    'Guest Houses': ['#F43F5E', '#E11D48'],
    Clothing: ['#0EA5E9', '#0284C7'],
    'Coffee Shops': ['#FACC15', '#EAB308'],
    Furniture: ['#6366F1', '#4F46E5'],
    Cars: ['#EF4444', '#DC2626'],
  }
  return `linear-gradient(135deg, ${g[cat][0]}, ${g[cat][1]})`
}

function CategoryCard({ category, count, onClick }: { category: Category; count: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="card-hover bg-[var(--surface)] rounded-2xl border border-[var(--border-light)] p-6 text-left group relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: getCategoryGradient(category) }}
      />
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-all duration-300 bg-[var(--surface-alt)] group-hover:bg-white/20 group-hover:text-white group-hover:scale-110">
          <CategoryIcon category={category} />
        </div>
        <h3 className="font-semibold text-[var(--text-primary)] text-[15px] group-hover:text-white transition-colors mb-1">{category}</h3>
        <p className="text-xs text-[var(--text-tertiary)] group-hover:text-white/70 transition-colors">{count} companies</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-white/30" />
    </button>
  )
}

function Navbar({ onCategorySelect }: { onCategorySelect: (cat: Category | null) => void }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        <button onClick={() => onCategorySelect(null)} className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="w-9 h-9 bg-[var(--brand)] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-[var(--brand)]/20">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span className="font-serif text-xl text-[var(--text-primary)] hidden sm:block">Dirvault</span>
        </button>

        <div className="hidden md:flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Search companies..."
              className="w-full bg-[var(--surface-alt)] border border-[var(--border-default)] rounded-xl py-2 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)]/50 transition-all"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {CATEGORIES.slice(0, 5).map(cat => (
            <button
              key={cat}
              onClick={() => onCategorySelect(cat)}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-alt)] px-3 py-2 rounded-xl transition-all"
            >
              {cat}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="text-sm font-semibold text-white bg-[var(--brand)] px-4 py-2 rounded-xl hover:bg-[var(--brand-dark)] transition-colors shadow-lg shadow-[var(--brand)]/20 hidden md:flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            List Business
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-10 h-10 rounded-xl border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--surface-alt)] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--border-light)] bg-[var(--surface)] px-4 py-4 space-y-2 animate-slide-down">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => { onCategorySelect(cat); setMenuOpen(false) }} className="block w-full text-left text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-2.5 rounded-xl hover:bg-[var(--surface-alt)] transition-colors">{cat}</button>
          ))}
        </div>
      )}
    </header>
  )
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating')
  const [showVerified, setShowVerified] = useState(false)

  if (selectedCompany) {
    return <CompanyProfile company={selectedCompany} onBack={() => setSelectedCompany(null)} />
  }

  const filtered = useMemo(() => {
    let result = selectedCategory
      ? companies.filter((c) => c.category === selectedCategory)
      : companies
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.tags.some(t => t.toLowerCase().includes(q)) || c.category.toLowerCase().includes(q))
    }
    if (showVerified) result = result.filter(c => c.rating >= 4.0)
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)
    else if (sortBy === 'reviews') result.sort((a, b) => b.reviewCount - a.reviewCount)
    else result.sort((a, b) => a.name.localeCompare(b.name))
    return result
  }, [selectedCategory, searchQuery, showVerified, sortBy])

  const featured = companies.filter(c => c.featured)

  const totalCompanies = companies.length
  const totalReviews = companies.reduce((sum, c) => sum + c.reviewCount, 0)

  return (
    <div className="min-h-screen bg-[var(--surface-alt)]">
      <Navbar onCategorySelect={(cat) => { if (cat !== null) setSelectedCategory(cat); else { setSelectedCategory(null); setSearchQuery('') } }} />

      {!selectedCategory && (
        <section className="relative bg-[var(--brand-dark)] overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--brand)] rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-10 left-20 w-48 h-48 bg-[var(--accent)] rounded-full blur-[100px] opacity-15" />
          <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-16 md:pt-24 md:pb-20">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                Trusted by thousands of businesses
              </span>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
                Discover <span className="gradient-text">exceptional</span><br />businesses
              </h1>
              <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl">
                Explore thousands of verified companies across every industry — backed by real customer reviews and transparent ratings.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <div className="relative flex-1 max-w-md">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <input
                    type="text"
                    placeholder="Search companies by name, category, or tag..."
                    value={searchQuery}
                    onChange={e => { setSearchQuery(e.target.value); if (e.target.value) setSelectedCategory(null) }}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-[#94A3B8] outline-none focus:ring-2 focus:ring-[var(--brand)]/50 focus:bg-white/15 transition-all text-sm"
                  />
                </div>
                <button
                  onClick={() => { setSearchQuery(searchQuery) }}
                  className="bg-[var(--brand)] text-white text-sm font-semibold px-6 py-3.5 rounded-xl hover:bg-[var(--brand-light)] transition-colors shadow-xl shadow-[var(--brand)]/30 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  Search
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 max-w-lg">
                {[
                  { value: totalCompanies.toLocaleString(), label: 'Companies' },
                  { value: (totalReviews / 1000).toFixed(0) + 'K+', label: 'Reviews' },
                  { value: CATEGORIES.length.toString(), label: 'Categories' },
                ].map(stat => (
                  <div key={stat.label} className="text-center">
                    <div className="font-serif text-2xl md:text-3xl text-white font-bold">{stat.value}</div>
                    <div className="text-xs text-[#94A3B8] mt-1 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--surface-alt)] to-transparent" />
        </section>
      )}

      <main className={`max-w-7xl mx-auto px-4 md:px-8 ${selectedCategory ? 'py-8' : 'py-12'}`}>
        {!selectedCategory && (
          <section className="mb-16 animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-[var(--text-primary)]">Browse Categories</h2>
                <p className="text-sm text-[var(--text-tertiary)] mt-1">Find businesses across every industry</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {CATEGORIES.map(cat => (
                <CategoryCard
                  key={cat}
                  category={cat}
                  count={companies.filter(c => c.category === cat).length}
                  onClick={() => setSelectedCategory(cat)}
                />
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-[var(--text-primary)]">
                {selectedCategory ? `${selectedCategory}` : 'All Businesses'}
              </h2>
              <p className="text-sm text-[var(--text-tertiary)] mt-1">{filtered.length} {filtered.length === 1 ? 'company' : 'companies'} found</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] bg-[var(--surface)] border border-[var(--border-default)] px-3 py-2 rounded-xl hover:border-[var(--text-primary)] transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  Clear filter
                </button>
              )}
              <div className="flex items-center gap-2 bg-[var(--surface)] border border-[var(--border-default)] rounded-xl p-1">
                {(['rating', 'reviews', 'name'] as const).map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSortBy(opt)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${sortBy === opt ? 'bg-[var(--brand)] text-white shadow-sm' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}`}
                  >
                    {opt === 'rating' ? 'Top Rated' : opt === 'reviews' ? 'Most Reviews' : 'A-Z'}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowVerified(!showVerified)}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border transition-all ${showVerified ? 'bg-[var(--brand)] text-white border-[var(--brand)]' : 'text-[var(--text-secondary)] bg-[var(--surface)] border-[var(--border-default)] hover:border-[var(--text-primary)]'}`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                Verified Only
              </button>
            </div>
          </div>

          {!selectedCategory && featured.length > 0 && !searchQuery && !showVerified && (
            <div className="mb-10 animate-fade-in-up">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                <h3 className="font-semibold text-sm text-[var(--text-secondary)] uppercase tracking-wider">Featured</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {featured.map(company => (
                  <CompanyCard key={company.id} company={company} onClick={() => setSelectedCompany(company)} />
                ))}
              </div>
            </div>
          )}

          <div className="mb-6 flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
            <button
              onClick={() => { setSelectedCategory(null); setSearchQuery('') }}
              className={`flex-shrink-0 text-xs font-medium px-4 py-2 rounded-xl border transition-all ${!selectedCategory && !searchQuery ? 'bg-[var(--brand)] text-white border-[var(--brand)]' : 'text-[var(--text-secondary)] border-[var(--border-default)] bg-[var(--surface)] hover:border-[var(--text-primary)]'}`}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setSearchQuery('') }}
                className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-xl border transition-all ${selectedCategory === cat ? 'bg-[var(--brand)] text-white border-[var(--brand)]' : 'text-[var(--text-secondary)] border-[var(--border-default)] bg-[var(--surface)] hover:border-[var(--text-primary)]'}`}
              >
                <CategoryIcon category={cat} /> {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-[var(--surface)] border border-[var(--border-light)] flex items-center justify-center mx-auto mb-5 text-3xl">
                🔍
              </div>
              <h3 className="font-serif text-xl text-[var(--text-primary)] mb-2">No results found</h3>
              <p className="text-sm text-[var(--text-tertiary)] mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => { setSelectedCategory(null); setSearchQuery(''); setShowVerified(false) }}
                className="text-sm font-medium text-[var(--brand)] hover:text-[var(--brand-dark)] transition-colors"
              >
                Clear all filters →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-stagger">
              {filtered.map(company => (
                <CompanyCard key={company.id} company={company} onClick={() => setSelectedCompany(company)} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-[var(--brand-dark)] text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <span className="font-serif text-xl text-white">Dirvault</span>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">The modern business directory connecting you with verified, trusted companies across every industry.</p>
              <div className="flex items-center gap-3">
                {['Twitter', 'LinkedIn', 'GitHub'].map(s => (
                  <a key={s} href="#" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Categories</h4>
              <div className="space-y-2.5">
                {CATEGORIES.slice(0, 5).map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} className="block text-sm text-[#94A3B8] hover:text-white transition-colors">{cat}</button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Company</h4>
              <div className="space-y-2.5">
                {['About', 'Careers', 'Blog', 'Press', 'Partners'].map(link => (
                  <a key={link} href="#" className="block text-sm text-[#94A3B8] hover:text-white transition-colors">{link}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Stay Updated</h4>
              <p className="text-sm text-[#94A3B8] mb-4">Subscribe for new listings, trends, and insights.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="you@example.com" className="flex-1 bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#94A3B8] outline-none focus:ring-2 focus:ring-[var(--brand)]/50 transition-all" />
                <button className="bg-[var(--brand)] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[var(--brand-light)] transition-colors">Subscribe</button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#64748B]">&copy; 2025 Dirvault. All rights reserved.</p>
            <div className="flex items-center gap-6 text-xs text-[#64748B]">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
