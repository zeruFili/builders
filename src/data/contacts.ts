export interface Contact {
  id: string
  fullName: string
  phone: string
  email: string
  message: string
  createdAt: string
}

export interface ContactInput {
  fullName: string
  phone: string
  email: string
  message: string
}

const STORAGE_KEY = 'kbn_contacts'

function readLocal(): Contact[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) return parsed
    } catch {
      /* ignore corrupt data */
    }
  }
  return []
}

function writeLocal(contacts: Contact[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
}

function nextLocalId(contacts: Contact[]): string {
  let max = 0
  for (const c of contacts) {
    const n = parseInt(c.id, 10)
    if (!Number.isNaN(n) && n > max) max = n
  }
  return String(max + 1).padStart(6, '0')
}

export async function getContacts(): Promise<Contact[]> {
  try {
    const res = await fetch('/api/contacts')
    if (!res.ok) throw new Error('Failed to load contacts')
    const data = await res.json()
    if (!Array.isArray(data)) throw new Error('Unexpected response')
    return data
  } catch {
    return readLocal()
  }
}

export async function submitContact(input: ContactInput): Promise<Contact> {
  try {
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    if (!res.ok) throw new Error('Failed to save contact')
    return await res.json()
  } catch {
    const contacts = readLocal()
    const contact: Contact = {
      ...input,
      id: nextLocalId(contacts),
      createdAt: new Date().toISOString(),
    }
    writeLocal([contact, ...contacts])
    return contact
  }
}
