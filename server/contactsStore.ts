import fs from 'node:fs'
import path from 'node:path'
import type { Contact, ContactInput } from '../src/data/contacts.ts'

const DATA_FILE = path.resolve(import.meta.dirname, 'contacts.txt')

function readFile(): Contact[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8')
    return raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line) as Contact)
  } catch {
    return []
  }
}

function writeFile(records: Contact[]) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
  const content = records.map((r) => JSON.stringify(r)).join('\n') + (records.length ? '\n' : '')
  fs.writeFileSync(DATA_FILE, content, 'utf8')
}

function nextId(records: Contact[]): string {
  let max = 0
  for (const r of records) {
    const n = parseInt(r.id, 10)
    if (!Number.isNaN(n) && n > max) max = n
  }
  return String(max + 1).padStart(6, '0')
}

export function listContacts(): Contact[] {
  return readFile()
}

export function addContact(input: ContactInput): Contact {
  const records = readFile()
  const contact: Contact = {
    fullName: input.fullName,
    phone: input.phone,
    email: input.email,
    message: input.message,
    id: nextId(records),
    createdAt: new Date().toISOString(),
  }
  records.unshift(contact)
  writeFile(records)
  return contact
}
