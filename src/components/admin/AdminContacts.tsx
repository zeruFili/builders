import { useState, useEffect } from 'react'
import { getContacts, type Contact } from '../../data/contacts'

function buildContactsTxt(contacts: Contact[]): string {
  const lines: string[] = [
    'Kingdom Builders Network — Registered Members',
    `Generated: ${new Date().toLocaleString()}`,
    `Total: ${contacts.length}`,
    '='.repeat(60),
    '',
  ]
  contacts.forEach((c, i) => {
    lines.push(`${i + 1}. ${c.fullName}`)
    lines.push(`   ID: ${c.id}`)
    lines.push(`   Phone: ${c.phone}`)
    lines.push(`   Email: ${c.email || '—'}`)
    lines.push(`   Message: ${c.message || '—'}`)
    lines.push(`   Submitted: ${new Date(c.createdAt).toLocaleString()}`)
    lines.push('')
  })
  return lines.join('\n')
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Contact | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getContacts()
      .then((list) => setContacts(list))
      .finally(() => setLoading(false))
  }, [])

  const filtered = contacts.filter((c) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      c.fullName.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q)
    )
  })

  function handleDownload() {
    const blob = new Blob([buildContactsTxt(contacts)], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'kbn-registered-members.txt'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  if (selected) {
    return (
      <div className="max-w-2xl mx-auto bg-[var(--surface)] rounded-2xl border border-[var(--border-light)] overflow-hidden animate-scale-in">
        <div className="bg-[var(--brand-dark)] px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to members
          </button>
          <span className="text-xs font-semibold text-[var(--accent)]">#{selected.id}</span>
        </div>
        <div className="p-5 sm:p-8">
          <h1 className="font-serif text-2xl text-[var(--text-primary)] mb-6">{selected.fullName}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Phone</label>
              <p className="text-sm text-[var(--text-primary)]">{selected.phone}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Email</label>
              <p className="text-sm text-[var(--text-primary)]">{selected.email || '—'}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Submitted</label>
              <p className="text-sm text-[var(--text-primary)]">{new Date(selected.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="border-t border-[var(--border-light)] pt-6">
            <label className="block text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Message</label>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">{selected.message || '—'}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <p className="text-sm text-[var(--text-tertiary)]">All contact form submissions, newest first.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Search members..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-[var(--surface)] border border-[var(--border-default)] rounded-xl py-2 pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:ring-2 focus:ring-[var(--brand)]/20" />
          </div>
          <button onClick={handleDownload} disabled={contacts.length === 0}
            className="inline-flex items-center gap-2 text-xs font-semibold bg-[var(--brand)] text-white px-3.5 py-2.5 rounded-xl hover:bg-[var(--brand-light)] transition-colors disabled:opacity-50 flex-shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download .txt
          </button>
        </div>
      </div>

      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border-light)] overflow-hidden">
        {loading ? (
          <div className="text-center py-16">
            <svg className="w-6 h-6 animate-spin text-[var(--brand)] mx-auto" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-light)] bg-[var(--surface-alt)]">
                  <th className="text-left text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider px-3 sm:px-5 py-3">ID</th>
                  <th className="text-left text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider px-3 sm:px-5 py-3">Name</th>
                  <th className="text-left text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider px-3 sm:px-5 py-3 hidden sm:table-cell">Phone</th>
                  <th className="text-left text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider px-3 sm:px-5 py-3 hidden md:table-cell">Email</th>
                  <th className="text-left text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider px-3 sm:px-5 py-3 hidden md:table-cell">Submitted</th>
                  <th className="text-right text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider px-3 sm:px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-light)]">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-[var(--surface-alt)] transition-colors">
                    <td className="px-3 sm:px-5 py-3 text-xs font-semibold text-[var(--accent-dark)]">#{c.id}</td>
                    <td className="px-3 sm:px-5 py-3">
                      <div className="text-xs sm:text-sm font-medium text-[var(--text-primary)] truncate max-w-[160px]">{c.fullName}</div>
                    </td>
                    <td className="px-3 sm:px-5 py-3 text-sm text-[var(--text-secondary)] hidden sm:table-cell">{c.phone}</td>
                    <td className="px-3 sm:px-5 py-3 text-sm text-[var(--text-secondary)] hidden md:table-cell">{c.email || '—'}</td>
                    <td className="px-3 sm:px-5 py-3 text-xs text-[var(--text-tertiary)] hidden md:table-cell">{new Date(c.createdAt).toLocaleString()}</td>
                    <td className="px-3 sm:px-5 py-3 text-right">
                      <button onClick={() => setSelected(c)} className="text-xs font-medium text-[var(--brand)] hover:underline">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-12">
            <div className="text-2xl mb-2">📋</div>
            <p className="text-sm text-[var(--text-tertiary)]">No registrations found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
