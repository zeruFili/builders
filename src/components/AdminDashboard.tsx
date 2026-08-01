import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import AdminCompanies from './admin/AdminCompanies'
import AdminApplications from './admin/AdminApplications'
import AdminUsers from './admin/AdminUsers'
import AdminCategories from './admin/AdminCategories'
import AdminOverview from './admin/AdminOverview'

type Section = 'overview' | 'applications' | 'companies' | 'users' | 'categories'

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: 'overview', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'applications', label: 'Company Applications', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { id: 'companies', label: 'Listed Companies', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { id: 'users', label: 'User Management', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { id: 'categories', label: 'Categories', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
]

export default function AdminDashboard({ onBack }: { onBack: () => void }) {
  const { user } = useAuth()
  const [active, setActive] = useState<Section>('overview')
  const [collapsed, setCollapsed] = useState(false)

  if (!user || user.role !== 'admin') {
    return <div className="min-h-screen bg-[var(--surface-alt)] flex items-center justify-center text-[var(--text-tertiary)]">Access denied.</div>
  }

  const content = (() => {
    switch (active) {
      case 'overview': return <AdminOverview />
      case 'applications': return <AdminApplications />
      case 'companies': return <AdminCompanies />
      case 'users': return <AdminUsers />
      case 'categories': return <AdminCategories />
    }
  })()

  return (
    <div className="min-h-screen bg-[var(--surface-alt)] flex">
      <aside className={`${collapsed ? 'w-16' : 'w-60'} bg-[var(--brand-dark)] text-white flex flex-col transition-all duration-300 flex-shrink-0`}>
        <div className="h-16 flex items-center gap-3 px-4 border-b border-white/10">
          <div className="w-9 h-9 bg-[var(--accent)] rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-[var(--brand-dark)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          {!collapsed && <span className="font-serif text-lg">Admin</span>}
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${active === item.id ? 'bg-[var(--accent)]/20 text-[var(--accent)]' : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'}`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && active === item.id && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-white/10">
          <button onClick={() => setCollapsed(!collapsed)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#94A3B8] hover:bg-white/5 hover:text-white transition-all">
            <svg className={`w-5 h-5 flex-shrink-0 transition-transform ${collapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
            {!collapsed && 'Collapse'}
          </button>
          <button onClick={onBack} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#94A3B8] hover:bg-white/5 hover:text-white transition-all">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {!collapsed && 'Back to Site'}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-[var(--surface)] border-b border-[var(--border-light)] flex items-center justify-between px-6 sticky top-0 z-10">
          <div>
            <h1 className="font-serif text-lg text-[var(--text-primary)]">{NAV_ITEMS.find(n => n.id === active)?.label}</h1>
          </div>
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg object-cover ring-2 ring-[var(--border-light)]" />
            <span className="text-sm font-medium text-[var(--text-secondary)] hidden sm:inline">{user.name}</span>
          </div>
        </header>
        <div className="p-6">
          {content}
        </div>
      </main>
    </div>
  )
}
