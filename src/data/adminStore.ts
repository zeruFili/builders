import { type Category } from './companies'

export interface CompanyApplication {
  id: string
  companyName: string
  logo: string
  ownerName: string
  email: string
  phone: string
  website: string
  address: string
  category: Category
  description: string
  longDescription: string
  services: string[]
  tags: string[]
  licenseDoc: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
}

export interface AdminCompany extends AdminCompanyEditable {
  id: string
  name: string
  category: string[]
  logo: string
  banner: string
  rating: number
  reviewCount: number
  description: string
  longDescription: string
  phone: string
  email: string
  website: string
  address: string
  services: string[]
  tags: string[]
  featured: boolean
  ownerName?: string
  missionStatement?: string
  status: 'active' | 'deactivated'
  deactivatedAt?: string
  listedAt: string
}

type AdminCompanyEditable = Record<string, unknown>

export interface AdminUser {
  id: string
  name: string
  email: string
  avatar: string
  role: 'admin' | 'user' | 'company'
  business?: string
  status: 'active' | 'deactivated'
  deactivatedAt?: string
  deactivationReason?: string
  registeredAt: string
}

export interface AdminCategory {
  id: string
  name: string
  description: string
  icon: string
  status: 'active' | 'inactive'
  companyCount: number
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'kbn_admin'

interface AdminData {
  applications: CompanyApplication[]
  listedCompanies: AdminCompany[]
  adminUsers: AdminUser[]
  adminCategories: AdminCategory[]
}

const defaultData: AdminData = {
  applications: [
    {
      id: 'app-1',
      companyName: 'Grace Home Health Services',
      logo: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=120&h=120&fit=crop&auto=format',
      ownerName: 'Rebecca Nkosi',
      email: 'rebecca@gracehomehealth.org',
      phone: '+1 (555) 303-8811',
      website: 'https://gracehomehealth.org',
      address: '288 Caregiver Lane, Atlanta, GA 30303',
      category: 'Healthcare' as Category,
      description: 'Faith-based home health care services providing compassionate in-home care for seniors and disabled individuals.',
      longDescription: 'Grace Home Health Services is a faith-based home health care provider serving the greater Atlanta area. Our team of 45 certified nursing assistants, registered nurses, and physical therapists delivers compassionate care grounded in Christian values. We specialize in post-surgical recovery, chronic disease management, and senior companion care.',
      services: ['Home Health Aide', 'Skilled Nursing', 'Physical Therapy', 'Companion Care', 'Medication Management'],
      tags: ['Faith-Based', 'Home Care', 'Seniors', 'Healthcare'],
      licenseDoc: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=800&fit=crop&auto=format',
      status: 'pending',
      submittedAt: '2025-07-20T14:30:00Z',
    },
    {
      id: 'app-2',
      companyName: 'Zion Construction & Development',
      logo: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=120&h=120&fit=crop&auto=format',
      ownerName: 'Marcus Okonkwo',
      email: 'marcus@zionconstruction.com',
      phone: '+1 (555) 412-7700',
      website: 'https://zionconstruction.com',
      address: '52 Foundation Way, Houston, TX 77002',
      category: 'Construction' as Category,
      description: 'Commercial and residential construction with a focus on affordable housing and community development projects.',
      longDescription: 'Zion Construction & Development has been building communities for over 15 years. We specialize in multi-family affordable housing, community center construction, and commercial tenant improvements. Our mission is to build structures that strengthen neighborhoods and serve the people who live in them.',
      services: ['Affordable Housing', 'Commercial Construction', 'Renovations', 'Community Development', 'Project Management'],
      tags: ['Affordable Housing', 'Community', 'Commercial', 'Residential'],
      licenseDoc: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=800&fit=crop&auto=format',
      status: 'pending',
      submittedAt: '2025-07-22T09:15:00Z',
    },
    {
      id: 'app-3',
      companyName: 'King\'s Table Farm & Bakery',
      logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&h=120&fit=crop&auto=format',
      ownerName: 'Esther Williams',
      email: 'esther@kingstablefarm.com',
      phone: '+1 (555) 287-3344',
      website: 'https://kingstablefarm.com',
      address: '901 Harvest Road, Franklin, TN 37064',
      category: 'Food & Beverage' as Category,
      description: 'Farm-to-table bakery and organic market sourcing from local Christian farms.',
      longDescription: 'King\'s Table Farm & Bakery produces artisan breads, pastries, and preserves using ingredients from our own organic farm and a network of 12 local Christian farming families. Our bakery café serves breakfast and lunch Monday through Saturday, and we host monthly farm dinners that seat 40 guests communally.',
      services: ['Artisan Breads', 'Pastries', 'Farm Dinners', 'Organic Market', 'Wholesale Supply'],
      tags: ['Farm-to-Table', 'Organic', 'Bakery', 'Local'],
      licenseDoc: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&h=800&fit=crop&auto=format',
      status: 'pending',
      submittedAt: '2025-07-25T16:45:00Z',
    },
    {
      id: 'app-4',
      companyName: 'Abundant Life Wellness Center',
      logo: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=120&h=120&fit=crop&auto=format',
      ownerName: 'Dr. Joseph Mwangi',
      email: 'drjoseph@abundantlifewellness.com',
      phone: '+1 (555) 623-9988',
      website: 'https://abundantlifewellness.com',
      address: '144 Healing Way, Denver, CO 80201',
      category: 'Healthcare' as Category,
      description: 'Integrative wellness center combining medical care, nutrition counseling, and faith-based mental health support.',
      longDescription: 'Abundant Life Wellness Center offers an integrative approach to health, combining evidence-based medical care with nutrition counseling, physical therapy, and faith-based mental health support. Our team of 18 practitioners includes MDs, registered dietitians, licensed counselors, and pastoral care specialists.',
      services: ['Primary Care', 'Nutrition Counseling', 'Mental Health Counseling', 'Physical Therapy', 'Pastoral Care'],
      tags: ['Integrative', 'Mental Health', 'Nutrition', 'Wellness'],
      licenseDoc: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?w=600&h=800&fit=crop&auto=format',
      status: 'pending',
      submittedAt: '2025-07-28T11:00:00Z',
    },
  ],
  listedCompanies: [
    {
      id: 'covenant-builders',
      name: 'Covenant Builders Group',
      category: ['Construction'],
      logo: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=120&h=120&fit=crop&auto=format',
      banner: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=400&fit=crop&auto=format',
      rating: 4.7,
      reviewCount: 156,
      description: 'Faith-driven construction company specializing in churches, community centers, and affordable housing.',
      longDescription: 'Covenant Builders Group has served Christian organizations since 1988, constructing over 200 churches, 45 community centers, and 3,000 affordable housing units across the Southeast. We are a values-driven company that prioritizes integrity, quality, and community impact.',
      phone: '+1 (555) 510-7700',
      email: 'info@covenantbuilders.com',
      website: 'https://covenantbuilders.com',
      address: '310 Covenant Way, Dallas, TX 75201',
      services: ['Church Construction', 'Community Centers', 'Affordable Housing', 'Renovations', 'Design-Build'],
      tags: ['Faith-Based', 'Non-Profit', 'Community', 'Design-Build'],
      featured: true,
      ownerName: 'David Thompson',
      missionStatement: 'To build structures that serve communities and glorify God through excellence in construction.',
      status: 'active',
      listedAt: '2024-01-15T10:00:00Z',
    },
    {
      id: 'refuge-wellness',
      name: 'Refuge Wellness Center',
      category: ['Healthcare', 'Hospitality'],
      logo: 'https://images.unsplash.com/photo-1572932491814-54869e8e5bac?w=120&h=120&fit=crop&auto=format',
      banner: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=400&fit=crop&auto=format',
      rating: 4.9,
      reviewCount: 89,
      description: 'Christian wellness retreat offering counseling, prayer ministry, and restorative programs.',
      longDescription: 'Refuge Wellness Center provides a safe space for healing and restoration through professional Christian counseling, prayer ministry, and wellness programs. Our 20-acre campus includes private counseling rooms, a chapel, walking trails, and a guest house for multi-day retreats.',
      phone: '+1 (555) 820-4455',
      email: 'care@refugewellness.org',
      website: 'https://refugewellness.org',
      address: '800 Refuge Trail, Austin, TX 78701',
      services: ['Christian Counseling', 'Prayer Ministry', 'Wellness Retreats', 'Couples Therapy', 'Group Sessions'],
      tags: ['Counseling', 'Retreat', 'Wellness', 'Prayer'],
      featured: true,
      ownerName: 'Sarah Chen',
      missionStatement: 'Providing a refuge for healing, restoration, and spiritual growth through Christ-centered care.',
      status: 'active',
      listedAt: '2024-02-20T12:00:00Z',
    },
    {
      id: 'stewardship-wealth',
      name: 'Stewardship Wealth Management',
      category: ['Professional Services'],
      logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&h=120&fit=crop&auto=format',
      banner: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=400&fit=crop&auto=format',
      rating: 4.6,
      reviewCount: 203,
      description: 'Biblical financial planning and investment management for families and ministries.',
      longDescription: 'Stewardship Wealth Management integrates biblical principles with modern financial planning. We serve 340 families and 28 ministries, managing over $850M in assets. Our advisors hold CFP and CKA certifications and approach every client relationship as a partnership in faithful stewardship.',
      phone: '+1 (555) 930-2200',
      email: 'advice@stewardshipwealth.org',
      website: 'https://stewardshipwealth.org',
      address: '1800 Dominion Tower, Dallas, TX 75201',
      services: ['Financial Planning', 'Investment Management', 'Retirement Planning', 'Estate Planning', 'Ministry Finances'],
      tags: ['CFP', 'CKA', 'Biblical', 'Ministry'],
      featured: true,
      ownerName: 'Thomas Whitfield',
      missionStatement: 'Helping God\'s people steward financial resources faithfully for Kingdom purposes.',
      status: 'active',
      listedAt: '2024-03-05T08:00:00Z',
    },
    {
      id: 'bethany-retreat',
      name: 'Bethany Retreat & Conference Center',
      category: ['Hospitality', 'Ministry'],
      logo: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=120&h=120&fit=crop&auto=format',
      banner: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=400&fit=crop&auto=format',
      rating: 4.8,
      reviewCount: 415,
      description: 'Premier Christian retreat and conference center hosting over 500 events annually.',
      longDescription: 'Bethany Retreat & Conference Center sits on 150 acres of rolling Texas countryside. Our main conference center seats 800, with 12 breakout rooms, 90 guest rooms, a commercial kitchen serving farm-to-table meals, and extensive outdoor spaces for prayer walks and team-building.',
      phone: '+1 (555) 650-3390',
      email: 'events@bethanycenter.org',
      website: 'https://bethanycenter.org',
      address: '1200 Bethany Road, Tyler, TX 75702',
      services: ['Conference Hosting', 'Retreats', 'Event Planning', 'Catering', 'Lodging', 'Team Building'],
      tags: ['Retreat', 'Conference', 'Events', 'Lodging'],
      featured: true,
      ownerName: 'James Carter',
      missionStatement: 'Providing a sacred space where people encounter God and are equipped for their calling.',
      status: 'deactivated',
      deactivatedAt: '2025-06-01T09:00:00Z',
      listedAt: '2024-01-10T10:00:00Z',
    },
    {
      id: 'generations-of-grace',
      name: 'Generations of Grace Apparel',
      category: ['Fashion', 'Clothing'],
      logo: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=120&h=120&fit=crop&auto=format',
      banner: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&h=400&fit=crop&auto=format',
      rating: 4.4,
      reviewCount: 178,
      description: 'Christian streetwear brand making faith-inspired apparel that sparks conversations.',
      longDescription: 'Generations of Grace Apparel creates high-quality Christian streetwear designed to spark conversations about faith. Our collections are ethically produced in WRAP-certified factories and feature original artwork by Christian designers. We donate 10% of profits to international missions.',
      phone: '+1 (555) 374-2200',
      email: 'hello@generationsofgrace.co',
      website: 'https://generationsofgrace.co',
      address: '77 Creative Blvd, Los Angeles, CA 90015',
      services: ['T-Shirts', 'Hoodies', 'Accessories', 'Limited Editions', 'Custom Designs'],
      tags: ['Streetwear', 'Ethical', 'Missions', 'Christian'],
      featured: false,
      ownerName: 'Grace Mwamba',
      missionStatement: 'Clothing that carries a message of hope and sparks meaningful conversations about faith.',
      status: 'active',
      listedAt: '2024-04-18T14:00:00Z',
    },
  ],
  adminUsers: [
    { id: 'admin1', name: 'Admin KBN', email: 'admin@kbn.org', avatar: 'https://i.pravatar.cc/96?img=68', role: 'admin', status: 'active', registeredAt: '2024-01-01T00:00:00Z' },
    { id: 'regular1', name: 'John Doe', email: 'john@example.com', avatar: 'https://i.pravatar.cc/96?img=3', role: 'user', status: 'active', registeredAt: '2024-03-12T08:30:00Z' },
    { id: 'regular2', name: 'Mary Smith', email: 'mary@example.com', avatar: 'https://i.pravatar.cc/96?img=9', role: 'user', status: 'active', registeredAt: '2024-04-05T10:15:00Z' },
    { id: 'u1', name: 'David Thompson', email: 'david@covenantbuilders.com', avatar: 'https://i.pravatar.cc/96?img=11', role: 'company', business: 'Covenant Builders Group', status: 'active', registeredAt: '2024-01-15T10:00:00Z' },
    { id: 'u2', name: 'Sarah Chen', email: 'sarah@kingdomfoundations.org', avatar: 'https://i.pravatar.cc/96?img=47', role: 'company', business: 'Refuge Wellness Center', status: 'active', registeredAt: '2024-02-20T12:00:00Z' },
    { id: 'u3', name: 'James Carter', email: 'james@bethanycenter.org', avatar: 'https://i.pravatar.cc/96?img=8', role: 'company', business: 'Bethany Retreat Center', status: 'active', registeredAt: '2024-01-10T10:00:00Z' },
    { id: 'u4', name: 'Grace Mwamba', email: 'grace@generationsofgrace.co', avatar: 'https://i.pravatar.cc/96?img=5', role: 'company', business: 'Generations of Grace Apparel', status: 'active', registeredAt: '2024-04-18T14:00:00Z' },
    { id: 'u5', name: 'Thomas Whitfield', email: 'thomas@stewardshipwealth.org', avatar: 'https://i.pravatar.cc/96?img=6', role: 'company', business: 'Stewardship Wealth Management', status: 'deactivated', deactivatedAt: '2025-07-01T08:00:00Z', deactivationReason: 'Inappropriate review conduct', registeredAt: '2024-03-05T08:00:00Z' },
    { id: 'reg3', name: 'Peter Akintola', email: 'peter@example.com', avatar: 'https://i.pravatar.cc/96?img=12', role: 'user', status: 'deactivated', deactivatedAt: '2025-05-15T14:00:00Z', deactivationReason: 'Posted misleading reviews', registeredAt: '2024-06-20T09:00:00Z' },
    { id: 'reg4', name: 'Emily Chikwamba', email: 'emily@example.com', avatar: 'https://i.pravatar.cc/96?img=16', role: 'user', status: 'active', registeredAt: '2024-07-10T13:00:00Z' },
    { id: 'reg5', name: 'Samuel Baah', email: 'samuel@example.com', avatar: 'https://i.pravatar.cc/96?img=22', role: 'user', status: 'active', registeredAt: '2024-09-01T11:00:00Z' },
  ],
  adminCategories: [
    { id: 'cat-1', name: 'Construction', description: 'Building and renovation companies for residential, commercial, and industrial projects.', icon: '🏗️', status: 'active', companyCount: 5, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
    { id: 'cat-2', name: 'Hospitals', description: 'Hospitals, medical centers, and surgical institutes providing healthcare services.', icon: '🏥', status: 'active', companyCount: 5, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
    { id: 'cat-3', name: 'Hotels', description: 'Hotels, resorts, and lodging establishments from luxury to budget.', icon: '🏨', status: 'active', companyCount: 5, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
    { id: 'cat-4', name: 'Guest Houses', description: 'Bed and breakfasts, guest houses, and intimate lodging experiences.', icon: '🏡', status: 'active', companyCount: 5, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
    { id: 'cat-5', name: 'Clothing', description: 'Fashion brands, boutiques, and apparel manufacturers.', icon: '👕', status: 'active', companyCount: 5, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
    { id: 'cat-6', name: 'Coffee Shops', description: 'Coffee shops, cafés, and specialty beverage establishments.', icon: '☕', status: 'active', companyCount: 5, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
    { id: 'cat-7', name: 'Furniture', description: 'Furniture manufacturers, retailers, and custom woodworking shops.', icon: '🪑', status: 'active', companyCount: 2, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
    { id: 'cat-8', name: 'Cars', description: 'Auto dealerships, repair shops, and automotive service providers.', icon: '🚗', status: 'active', companyCount: 0, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
    { id: 'cat-9', name: 'Healthcare', description: 'Healthcare services including home health, wellness centers, and specialized care.', icon: '❤️', status: 'active', companyCount: 1, createdAt: '2024-02-01T00:00:00Z', updatedAt: '2024-06-15T00:00:00Z' },
    { id: 'cat-10', name: 'Hospitality', description: 'Hospitality services and event hosting venues.', icon: '🎉', status: 'active', companyCount: 2, createdAt: '2024-02-01T00:00:00Z', updatedAt: '2024-02-01T00:00:00Z' },
    { id: 'cat-11', name: 'Ministry', description: 'Ministries, churches, and faith-based organizations.', icon: '⛪', status: 'active', companyCount: 1, createdAt: '2024-02-01T00:00:00Z', updatedAt: '2024-02-01T00:00:00Z' },
    { id: 'cat-12', name: 'Fashion', description: 'Fashion design, streetwear, and accessories brands.', icon: '👗', status: 'active', companyCount: 1, createdAt: '2024-02-01T00:00:00Z', updatedAt: '2024-02-01T00:00:00Z' },
    { id: 'cat-13', name: 'Food & Beverage', description: 'Food production, bakeries, and beverage companies.', icon: '🍽️', status: 'active', companyCount: 0, createdAt: '2024-03-01T00:00:00Z', updatedAt: '2024-03-01T00:00:00Z' },
    { id: 'cat-14', name: 'Professional Services', description: 'Professional services including legal, financial, and consulting.', icon: '💼', status: 'active', companyCount: 1, createdAt: '2024-03-01T00:00:00Z', updatedAt: '2024-03-01T00:00:00Z' },
    { id: 'cat-15', name: 'Automotive', description: 'Automotive sales, service, repair, and detailing.', icon: '🔧', status: 'inactive', companyCount: 0, createdAt: '2024-04-01T00:00:00Z', updatedAt: '2025-03-01T00:00:00Z' },
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

export function getApplications(): CompanyApplication[] {
  return getData().applications
}

export function approveApplication(id: string, reviewerName: string) {
  const data = getData()
  const idx = data.applications.findIndex(a => a.id === id)
  if (idx === -1) return
  const app = data.applications[idx]
  app.status = 'approved'
  app.reviewedAt = new Date().toISOString()
  app.reviewedBy = reviewerName

  const company: AdminCompany = {
    id: app.id,
    name: app.companyName,
    category: [app.category],
    logo: app.logo,
    banner: app.logo,
    rating: 0,
    reviewCount: 0,
    description: app.description,
    longDescription: app.longDescription,
    phone: app.phone,
    email: app.email,
    website: app.website,
    address: app.address,
    services: app.services,
    tags: app.tags,
    featured: false,
    ownerName: app.ownerName,
    missionStatement: app.description,
    status: 'active',
    listedAt: new Date().toISOString(),
  }
  data.listedCompanies.push(company)
  saveData(data)
  notify()
}

export function rejectApplication(id: string, reviewerName: string) {
  const data = getData()
  const app = data.applications.find(a => a.id === id)
  if (!app) return
  app.status = 'rejected'
  app.reviewedAt = new Date().toISOString()
  app.reviewedBy = reviewerName
  saveData(data)
  notify()
}

export function getListedCompanies(): AdminCompany[] {
  return getData().listedCompanies
}

export function rateCompany(id: string, rating: number) {
  const data = getData()
  const company = data.listedCompanies.find(c => c.id === id)
  if (!company) return
  company.rating = ((company.rating * company.reviewCount + rating) / (company.reviewCount + 1))
  company.reviewCount += 1
  company.rating = Math.round(company.rating * 10) / 10
  saveData(data)
  notify()
}

export function deactivateCompany(id: string) {
  const data = getData()
  const company = data.listedCompanies.find(c => c.id === id)
  if (!company) return
  company.status = 'deactivated'
  company.deactivatedAt = new Date().toISOString()
  saveData(data)
  notify()
}

export function reactivateCompany(id: string) {
  const data = getData()
  const company = data.listedCompanies.find(c => c.id === id)
  if (!company) return
  company.status = 'active'
  company.deactivatedAt = undefined
  saveData(data)
  notify()
}

export function updateCompanyCategories(id: string, categories: string[]) {
  const data = getData()
  const company = data.listedCompanies.find(c => c.id === id)
  if (!company) return
  company.category = categories
  saveData(data)
  notify()
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

export function getAdminCategories(): AdminCategory[] {
  return getData().adminCategories
}

export function createCategory(data: Omit<AdminCategory, 'id' | 'companyCount' | 'createdAt' | 'updatedAt'>) {
  const adminData = getData()
  const newCat: AdminCategory = {
    ...data,
    id: 'cat-' + (adminData.adminCategories.length + 1),
    companyCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  adminData.adminCategories.push(newCat)
  saveData(adminData)
  notify()
}

export function updateCategory(id: string, updates: Partial<Pick<AdminCategory, 'name' | 'description' | 'icon' | 'status'>>) {
  const data = getData()
  const cat = data.adminCategories.find(c => c.id === id)
  if (!cat) return
  Object.assign(cat, updates, { updatedAt: new Date().toISOString() })
  saveData(data)
  notify()
}

export function deleteCategory(id: string) {
  const data = getData()
  data.adminCategories = data.adminCategories.filter(c => c.id !== id)
  saveData(data)
  notify()
}
