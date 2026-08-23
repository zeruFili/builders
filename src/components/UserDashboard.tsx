import { useAuth } from '../auth/AuthContext'

export default function UserDashboard({ onBack }: { onBack: () => void }) {
  const { user } = useAuth()

  if (!user || user.role !== 'user') {
    return <div className="min-h-screen bg-[var(--surface-alt)] flex items-center justify-center text-[var(--text-tertiary)]">Access denied.</div>
  }

  return (
    <div className="min-h-screen bg-[var(--surface-alt)]">
      <header className="bg-[var(--brand-dark)] py-5 md:py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <img src={user.avatar} alt="" className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover ring-2 ring-white/20" />
            <div className="min-w-0">
              <h1 className="font-serif text-xl sm:text-2xl md:text-3xl text-white">Welcome, {user.name}</h1>
              <p className="text-[#94A3B8] text-sm">Member Dashboard</p>
            </div>
          </div>
          <button onClick={onBack} className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/15 hover:bg-white/20 transition-all self-start sm:self-auto flex-shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Home
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="text-center py-16 bg-[var(--surface)] rounded-2xl border border-[var(--border-light)] animate-fade-in">
          <div className="text-4xl mb-4">🙏</div>
          <h2 className="font-serif text-xl text-[var(--text-primary)] mb-2">Welcome to your member dashboard</h2>
          <p className="text-sm text-[var(--text-tertiary)]">You're signed in as {user.email}</p>
        </div>
      </div>
    </div>
  )
}
