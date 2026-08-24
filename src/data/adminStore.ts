export interface AdminUser {
  id: string
  name: string
  email: string
  avatar: string
  role: 'admin' | 'user'
  status: 'active' | 'deactivated'
  deactivatedAt?: string
  deactivationReason?: string
  registeredAt: string
}

const STORAGE_KEY = 'kbn_admin'

interface AdminData {
  adminUsers: AdminUser[]
}

const defaultData: AdminData = {
  adminUsers: [
    { id: 'admin1', name: 'Admin KBN', email: 'admin@kbn.org', avatar: 'https://i.pravatar.cc/96?img=68', role: 'admin', status: 'active', registeredAt: '2024-01-01T00:00:00Z' },
    { id: 'regular1', name: 'Abel Tesfaye', email: 'abel@example.com', avatar: 'https://i.pravatar.cc/96?img=3', role: 'user', status: 'active', registeredAt: '2024-03-12T08:30:00Z' },
    { id: 'regular2', name: 'Tigist Lemma', email: 'tigist@example.com', avatar: 'https://i.pravatar.cc/96?img=9', role: 'user', status: 'active', registeredAt: '2024-04-05T10:15:00Z' },
    { id: 'reg3', name: 'Fikir Tsegaye', email: 'fikir@example.com', avatar: 'https://i.pravatar.cc/96?img=12', role: 'user', status: 'deactivated', deactivatedAt: '2025-05-15T14:00:00Z', deactivationReason: 'Posted misleading content', registeredAt: '2024-06-20T09:00:00Z' },
    { id: 'reg4', name: 'Medhanit Abebe', email: 'medhanit@example.com', avatar: 'https://i.pravatar.cc/96?img=16', role: 'user', status: 'active', registeredAt: '2024-07-10T13:00:00Z' },
    { id: 'reg5', name: 'Natnael Berhanu', email: 'natnael@example.com', avatar: 'https://i.pravatar.cc/96?img=22', role: 'user', status: 'active', registeredAt: '2024-09-01T11:00:00Z' },
  ],
}

function getData(): AdminData {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try { return JSON.parse(stored) }
    catch { /* fall through */ }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData))
  return JSON.parse(JSON.stringify(defaultData))
}

function saveData(data: AdminData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

const adminListeners = new Set<() => void>()

export function adminSubscribe(fn: () => void): () => void {
  adminListeners.add(fn)
  return () => { adminListeners.delete(fn) }
}

function notify() {
  adminListeners.forEach(fn => fn())
}

export function getAdminUsers(): AdminUser[] {
  return getData().adminUsers
}

export function deactivateUser(id: string, reason: string) {
  const data = getData()
  const user = data.adminUsers.find(u => u.id === id)
  if (!user) return
  user.status = 'deactivated'
  user.deactivatedAt = new Date().toISOString()
  user.deactivationReason = reason
  saveData(data)
  notify()
}

export function reactivateUser(id: string) {
  const data = getData()
  const user = data.adminUsers.find(u => u.id === id)
  if (!user) return
  user.status = 'active'
  user.deactivatedAt = undefined
  user.deactivationReason = undefined
  saveData(data)
  notify()
}
