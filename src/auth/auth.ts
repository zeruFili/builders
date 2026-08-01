export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  business?: string;
}

interface StoredUser extends User {
  password: string;
}

const MOCK_USERS: StoredUser[] = [
  { id: 'u1', email: 'david@covenantbuilders.com', name: 'David Thompson', avatar: 'https://i.pravatar.cc/96?img=11', password: 'password123', business: 'Covenant Builders Group' },
  { id: 'u2', email: 'sarah@kingdomfoundations.org', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/96?img=47', password: 'password123', business: 'Refuge Wellness Center' },
  { id: 'u3', email: 'james@bethanycenter.org', name: 'James Carter', avatar: 'https://i.pravatar.cc/96?img=8', password: 'password123', business: 'Bethany Retreat & Conference Center' },
  { id: 'u4', email: 'grace@generationsofgrace.co', name: 'Grace Mwamba', avatar: 'https://i.pravatar.cc/96?img=5', password: 'password123', business: 'Generations of Grace Apparel' },
  { id: 'u5', email: 'thomas@stewardshipwealth.org', name: 'Thomas Whitfield', avatar: 'https://i.pravatar.cc/96?img=6', password: 'password123', business: 'Stewardship Wealth Management' },
]

function getStoredUsers(): StoredUser[] {
  const stored = localStorage.getItem('kbn_users')
  if (stored) {
    try { return JSON.parse(stored) }
    catch { return MOCK_USERS }
  }
  localStorage.setItem('kbn_users', JSON.stringify(MOCK_USERS))
  return MOCK_USERS
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem('kbn_users', JSON.stringify(users))
}

export function getStoredSession(): User | null {
  const s = localStorage.getItem('kbn_session')
  if (!s) return null
  try { return JSON.parse(s) }
  catch { return null }
}

function saveSession(user: User) {
  localStorage.setItem('kbn_session', JSON.stringify(user))
}

export function clearSession() {
  localStorage.removeItem('kbn_session')
}

export async function login(email: string, password: string): Promise<User> {
  await new Promise(r => setTimeout(r, 800))
  const users = getStoredUsers()
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!user) throw new Error('No account found with this email address.')
  if (user.password !== password) throw new Error('Incorrect password. Please try again.')
  const { password: _, ...safeUser } = user
  saveSession(safeUser)
  return safeUser
}

export async function signUp(data: { name: string; email: string; password: string; business?: string }): Promise<User> {
  await new Promise(r => setTimeout(r, 800))
  const users = getStoredUsers()
  if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
    throw new Error('An account with this email already exists.')
  }
  if (data.password.length < 6) throw new Error('Password must be at least 6 characters.')
  const newUser: StoredUser = {
    id: 'u' + (users.length + 1),
    email: data.email,
    name: data.name,
    avatar: `https://i.pravatar.cc/96?img=${(users.length + 1) * 7 % 70}`,
    password: data.password,
    business: data.business,
  }
  users.push(newUser)
  saveStoredUsers(users)
  const { password: _, ...safeUser } = newUser
  saveSession(safeUser)
  return safeUser
}

export async function logout(): Promise<void> {
  await new Promise(r => setTimeout(r, 300))
  clearSession()
}
