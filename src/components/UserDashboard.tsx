import { useAuth } from '../auth/AuthContext'

export default function UserDashboard({ onBack }: { onBack: () => void }) {
  const { user } = useAuth()
  if (!user || user.role !== 'user') {
    return <div className="min-h-screen bg-[var(--surface-alt)] flex items-center justify-center text-[var(--text-tertiary)]">Access denied.</div>
  }
  return (
    <div className="min-h-screen bg-[var(--surface-alt)]">
      <header className="bg-[var(--brand-dark)] py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">👤</div>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl text-white">Member Dashboard</h1>
              <p className="text-[#94A3B8] text-sm">Welcome, {user.name}</p>
            </div>
          </div>
          <button onClick={onBack} className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-sm font-medium px-4 py-2.5 rounded-xl border border-white/15 hover:bg-white/20 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Home
          </button>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 text-center animate-fade-in-up">
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border-light)] p-12 max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-2xl bg-[var(--accent-light)] flex items-center justify-center mx-auto mb-6 text-3xl">🌿</div>
          <h2 className="font-serif text-2xl text-[var(--text-primary)] mb-3">Welcome, {user.name}.</h2>
          <p className="text-[var(--text-secondary)]">Your member dashboard features will be added in a future update. You are logged in as <strong>{user.email}</strong>.</p>
        </div>
      </div>
    </div>
  )
}
