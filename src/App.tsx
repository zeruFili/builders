import { useState } from 'react'
import { companies, CATEGORIES, type Company, type Category } from './data/companies'

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'lg' ? 'text-xl' : size === 'md' ? 'text-base' : 'text-sm'
  return (
    <span className={`inline-flex items-center gap-0.5 ${sz}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star
        const partial = !filled && rating > star - 1
        return (
          <span key={star} className="relative inline-block">
            <span className="text-[#E4E2DC]">★</span>
            {(filled || partial) && (
              <span
                className="absolute inset-0 text-[#D97706] overflow-hidden"
                style={{ width: filled ? '100%' : `${(rating - Math.floor(rating)) * 100}%` }}
              >
                ★
              </span>
            )}
          </span>
        )
      })}
    </span>
  )
}

function CategoryIcon({ category }: { category: Category }) {
  const icons: Record<Category, string> = {
    Construction: '🏗',
    Hospitals: '🏥',
    Hotels: '🏨',
    'Guest Houses': '🏡',
    Clothing: '👗',
    'Coffee Shops': '☕',
    Furniture: '🪑',
    Cars: '🚗',
  }
  return <span>{icons[category]}</span>
}

function CompanyCard({ company, onClick }: { company: Company; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      className="bg-white rounded-xl border border-[#E4E2DC] hover:border-[#0F172A] hover:shadow-lg transition-all duration-200 cursor-pointer group overflow-hidden"
    >
      <div className="h-2 bg-[#0F172A] group-hover:bg-[#D97706] transition-colors duration-200" />
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#F1F0EC]">
            <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-[#D97706] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                <CategoryIcon category={company.category} /> {company.category}
              </span>
              {company.featured && (
                <span className="text-xs font-medium text-[#0F172A] bg-[#F1F0EC] px-2 py-0.5 rounded-full">
                  Featured
                </span>
              )}
            </div>
            <h3 className="font-semibold text-[#0F172A] text-base leading-tight truncate">{company.name}</h3>
          </div>
        </div>
        <p className="text-sm text-[#64748B] leading-relaxed mb-4 line-clamp-2">{company.description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-[#F1F0EC]">
          <div className="flex items-center gap-2">
            <StarRating rating={company.rating} />
            <span className="font-semibold text-[#0F172A] text-sm">{company.rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-[#64748B]">{company.reviewCount.toLocaleString()} reviews</span>
        </div>
      </div>
    </article>
  )
}

function ReviewCard({ review }: { review: Company['reviews'][0] }) {
  return (
    <div className="bg-white rounded-xl border border-[#E4E2DC] p-6">
      <div className="flex items-start gap-4">
        <img src={review.avatar} alt={review.reviewer} className="w-10 h-10 rounded-full object-cover flex-shrink-0 bg-[#F1F0EC]" />
        <div className="flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
            <span className="font-semibold text-[#0F172A]">{review.reviewer}</span>
            <span className="text-xs text-[#64748B]">{review.date}</span>
          </div>
          <div className="mb-3">
            <StarRating rating={review.rating} size="md" />
          </div>
          <p className="text-sm text-[#334155] leading-relaxed">{review.text}</p>
        </div>
      </div>
    </div>
  )
}

function CompanyProfile({ company, onBack }: { company: Company; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Banner */}
      <div className="relative h-64 md:h-80 bg-[#0F172A] overflow-hidden">
        <img src={company.banner} alt={company.name} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent" />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
        >
          ← Back to Directory
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-6xl mx-auto flex items-end gap-5">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-4 border-white/20 flex-shrink-0 bg-[#1E293B]">
              <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-[#D97706] bg-amber-500/20 px-2 py-0.5 rounded-full">
                  <CategoryIcon category={company.category} /> {company.category}
                </span>
                {company.featured && (
                  <span className="text-xs font-medium text-white bg-white/10 px-2 py-0.5 rounded-full">Featured</span>
                )}
              </div>
              <h1 className="font-serif text-2xl md:text-4xl text-white leading-tight">{company.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <StarRating rating={company.rating} size="lg" />
                <span className="text-white font-semibold text-lg">{company.rating.toFixed(1)}</span>
                <span className="text-white/60 text-sm">({company.reviewCount.toLocaleString()} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section className="bg-white rounded-xl border border-[#E4E2DC] p-6 md:p-8">
              <h2 className="font-serif text-2xl text-[#0F172A] mb-4">About</h2>
              <p className="text-[#334155] leading-relaxed">{company.longDescription}</p>
            </section>

            {/* Services */}
            <section className="bg-white rounded-xl border border-[#E4E2DC] p-6 md:p-8">
              <h2 className="font-serif text-2xl text-[#0F172A] mb-5">Services & Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {company.services.map((service) => (
                  <div key={service} className="flex items-center gap-3 p-3 bg-[#FAFAF8] rounded-lg border border-[#F1F0EC]">
                    <span className="w-2 h-2 rounded-full bg-[#D97706] flex-shrink-0" />
                    <span className="text-sm font-medium text-[#0F172A]">{service}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            {company.gallery.length > 0 && (
              <section className="bg-white rounded-xl border border-[#E4E2DC] p-6 md:p-8">
                <h2 className="font-serif text-2xl text-[#0F172A] mb-5">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {company.gallery.map((img, i) => (
                    <div key={i} className="aspect-video rounded-lg overflow-hidden bg-[#F1F0EC]">
                      <img src={img} alt={`${company.name} gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-2xl text-[#0F172A]">Customer Reviews</h2>
                <div className="flex items-center gap-2 bg-white border border-[#E4E2DC] rounded-lg px-4 py-2">
                  <StarRating rating={company.rating} size="md" />
                  <span className="font-bold text-[#0F172A]">{company.rating.toFixed(1)}</span>
                  <span className="text-[#64748B] text-sm">/ 5</span>
                </div>
              </div>
              <div className="space-y-4">
                {company.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact */}
            <div className="bg-white rounded-xl border border-[#E4E2DC] p-6">
              <h3 className="font-semibold text-[#0F172A] mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-[#D97706] text-base mt-0.5">📞</span>
                  <div>
                    <div className="text-xs text-[#64748B] mb-0.5">Phone</div>
                    <a href={`tel:${company.phone}`} className="text-sm font-medium text-[#0F172A] hover:text-[#D97706] transition-colors">{company.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D97706] text-base mt-0.5">✉️</span>
                  <div>
                    <div className="text-xs text-[#64748B] mb-0.5">Email</div>
                    <a href={`mailto:${company.email}`} className="text-sm font-medium text-[#0F172A] hover:text-[#D97706] transition-colors break-all">{company.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D97706] text-base mt-0.5">🌐</span>
                  <div>
                    <div className="text-xs text-[#64748B] mb-0.5">Website</div>
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#0F172A] hover:text-[#D97706] transition-colors">{company.website.replace('https://', '')}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D97706] text-base mt-0.5">📍</span>
                  <div>
                    <div className="text-xs text-[#64748B] mb-0.5">Address</div>
                    <p className="text-sm font-medium text-[#0F172A]">{company.address}</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-5 bg-[#0F172A] text-white text-sm font-semibold py-3 rounded-lg hover:bg-[#1E293B] transition-colors">
                Get in Touch
              </button>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl border border-[#E4E2DC] p-6">
              <h3 className="font-semibold text-[#0F172A] mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {company.tags.map((tag) => (
                  <span key={tag} className="text-xs font-medium text-[#64748B] bg-[#F1F0EC] px-3 py-1.5 rounded-full border border-[#E4E2DC]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Rating breakdown */}
            <div className="bg-white rounded-xl border border-[#E4E2DC] p-6">
              <h3 className="font-semibold text-[#0F172A] mb-4">Overall Rating</h3>
              <div className="text-center mb-4">
                <div className="font-serif text-5xl text-[#0F172A]">{company.rating.toFixed(1)}</div>
                <StarRating rating={company.rating} size="lg" />
                <p className="text-xs text-[#64748B] mt-2">{company.reviewCount.toLocaleString()} reviews</p>
              </div>
              {[5, 4, 3].map((star) => {
                const pct = star === 5 ? 72 : star === 4 ? 20 : 8
                return (
                  <div key={star} className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-[#64748B] w-3">{star}</span>
                    <span className="text-[#D97706] text-xs">★</span>
                    <div className="flex-1 h-1.5 bg-[#F1F0EC] rounded-full overflow-hidden">
                      <div className="h-full bg-[#D97706] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-[#64748B] w-7 text-right">{pct}%</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  if (selectedCompany) {
    return <CompanyProfile company={selectedCompany} onBack={() => setSelectedCompany(null)} />
  }

  const filtered = selectedCategory
    ? companies.filter((c) => c.category === selectedCategory)
    : companies

  const featured = companies.filter((c) => c.featured)

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <header className="border-b border-[#E4E2DC] bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <button onClick={() => { setSelectedCategory(null); setSelectedCompany(null) }} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0F172A] rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">D</span>
            </div>
            <span className="font-serif text-xl text-[#0F172A]">DirectoryHub</span>
          </button>
          <nav className="hidden md:flex items-center gap-6">
            {(['Hotels', 'Coffee Shops', 'Cars'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="text-sm text-[#64748B] hover:text-[#0F172A] transition-colors font-medium"
              >
                {cat}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-[#0F172A] px-4 py-2 rounded-lg border border-[#E4E2DC] hover:bg-[#F1F0EC] transition-colors hidden md:block">
              List a Business
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      {!selectedCategory && (
        <section className="relative bg-[#0F172A] overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
            <div className="max-w-2xl">
              <span className="inline-block text-xs font-semibold text-[#D97706] bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-5">
                Trusted Business Directory
              </span>
              <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-5">
                Find the right<br />
                <em className="not-italic text-[#D97706]">business</em> for you.
              </h1>
              <p className="text-[#94A3B8] text-lg leading-relaxed mb-8">
                Explore verified companies across every category — from construction to coffee shops — backed by real customer reviews.
              </p>
              <div className="flex flex-wrap gap-3">
                {CATEGORIES.slice(0, 4).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg border border-white/10 transition-colors"
                  >
                    <CategoryIcon category={cat} /> {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        {/* Category filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex-shrink-0 text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
                !selectedCategory
                  ? 'bg-[#0F172A] text-white border-[#0F172A]'
                  : 'text-[#64748B] border-[#E4E2DC] hover:border-[#0F172A] hover:text-[#0F172A]'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#0F172A] text-white border-[#0F172A]'
                    : 'text-[#64748B] border-[#E4E2DC] hover:border-[#0F172A] hover:text-[#0F172A]'
                }`}
              >
                <CategoryIcon category={cat} /> {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured strip (homepage only) */}
        {!selectedCategory && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-2xl text-[#0F172A]">Featured Businesses</h2>
              <span className="text-sm text-[#64748B]">{featured.length} featured</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((company) => (
                <CompanyCard key={company.id} company={company} onClick={() => setSelectedCompany(company)} />
              ))}
            </div>
          </section>
        )}

        {/* All / filtered companies */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-2xl text-[#0F172A]">
              {selectedCategory ? `${selectedCategory} Businesses` : 'All Businesses'}
            </h2>
            <span className="text-sm text-[#64748B]">
              {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
            </span>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#64748B]">
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-medium">No companies in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((company) => (
                <CompanyCard key={company.id} company={company} onClick={() => setSelectedCompany(company)} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E4E2DC] mt-16 py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#0F172A] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">D</span>
            </div>
            <span className="font-serif text-lg text-[#0F172A]">DirectoryHub</span>
          </div>
          <p className="text-sm text-[#64748B]">© 2025 DirectoryHub. Connecting you with trusted businesses.</p>
          <div className="flex items-center gap-4 text-sm text-[#64748B]">
            <a href="#" className="hover:text-[#0F172A] transition-colors">About</a>
            <a href="#" className="hover:text-[#0F172A] transition-colors">Advertise</a>
            <a href="#" className="hover:text-[#0F172A] transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
