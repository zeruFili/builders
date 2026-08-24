export interface EventImage {
  src: string
  type: string
  label: string
}

export interface KbnEvent {
  slug: string
  title: string
  description: string
  brochure: string
  images: EventImage[]
}

const eventModules = import.meta.glob('../../assets/events/*.{jpg,jpeg,JPG,JPEG,png,webp,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const TYPE_RE = /^(.*?)[\s,._-]*(brochure|stage|surafel|peoples|group image|preacher|worship|yared tilahun)(?:\s+(one|two|three))?[\s,._-]*$/i

const RANK: Record<string, number> = {
  brochure: 0,
  stage: 1,
  'stage one': 1.1,
  'stage two': 1.2,
  'stage three': 1.3,
  surafel: 2,
  peoples: 3,
  'peoples one': 3,
  'peoples two': 4,
  'peoples three': 5,
  'group image': 6,
  worship: 7,
  preacher: 8,
  'yared tilahun': 9,
}

const LABEL: Record<string, string> = {
  brochure: 'Brochure',
  stage: 'Stage',
  'stage one': 'Stage',
  'stage two': 'Stage',
  'stage three': 'Stage',
  surafel: 'Surafel',
  peoples: 'People',
  'peoples one': 'People',
  'peoples two': 'People',
  'peoples three': 'People',
  'group image': 'Group',
  worship: 'Worship',
  preacher: 'Preacher',
  'yared tilahun': 'Yared Tilahun',
}

const STOPWORDS = new Set(['and', 'of', 'the', 'for', 'in', 'to', 'on', 'with', 'at', 'a', 'an', 'is', 'by'])

function basename(path: string): string {
  return path.split(/[\\/]/).pop() ?? path
}

function classify(fileName: string): { starter: string; type: string } {
  const base = fileName.replace(/\.[^.]+$/, '')
  const m = base.match(TYPE_RE)
  if (m) {
    const starter = (m[1] ?? '').replace(/\s+/g, ' ').trim()
    const type = (m[2] + (m[3] ? ' ' + m[3] : '')).toLowerCase()
    return { starter, type }
  }
  return { starter: base.replace(/\s+/g, ' ').trim(), type: 'other' }
}

function titleCase(raw: string): string {
  const cleaned = raw.replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim()
  return cleaned
    .split(' ')
    .map((w, i) => {
      const lower = w.toLowerCase()
      if (i !== 0 && STOPWORDS.has(lower)) return lower
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join(' ')
}

function slugify(starter: string): string {
  return starter
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function rank(type: string): number {
  return RANK[type] ?? 100
}

function buildEvents(): KbnEvent[] {
  const groups = new Map<string, { starter: string; files: { src: string; type: string }[] }>()

  for (const [path, src] of Object.entries(eventModules)) {
    const fileName = basename(path)
    const { starter, type } = classify(fileName)
    if (!starter) continue
    const key = starter.toLowerCase()
    let group = groups.get(key)
    if (!group) {
      group = { starter, files: [] }
      groups.set(key, group)
    }
    group.files.push({ src, type })
  }

  const events: KbnEvent[] = []
  for (const group of groups.values()) {
    const sorted = [...group.files].sort((a, b) => rank(a.type) - rank(b.type))
    const images: EventImage[] = sorted.map((f) => ({
      src: f.src,
      type: f.type,
      label: LABEL[f.type] ?? 'Photo',
    }))
    const title = titleCase(group.starter)
    const slug = slugify(group.starter)
    const brochure = images.find((i) => i.type === 'brochure')?.src ?? images[0]?.src ?? ''
    events.push({
      slug,
      title,
      description: `${title} — a Kingdom Builders Network gathering for Christian professionals and entrepreneurs.`,
      brochure,
      images,
    })
  }

  return events.sort((a, b) => a.title.localeCompare(b.title))
}

const EVENTS = buildEvents()

export function getEvents(): KbnEvent[] {
  return EVENTS
}

export function getEventBySlug(slug: string): KbnEvent | undefined {
  return EVENTS.find((e) => e.slug === slug)
}
