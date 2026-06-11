// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

// Auth
export const AUTH_TOKEN_KEY = 'kauniSalama_token';
export const AUTH_USER_KEY = 'kauniSalama_user';
export const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes

// Police Ranks
export const POLICE_RANKS = {
  constable: 'Constable',
  corporal: 'Corporal',
  sergeant: 'Sergeant',
  inspector: 'Inspector',
  'sub-inspector': 'Sub-Inspector',
  ASP: 'Assistant Superintendent of Police',
  DSP: 'Deputy Superintendent of Police',
  commandant: 'Commandant',
} as const;

// Incident Types
export const INCIDENT_TYPES = {
  assault: 'Assault',
  robbery: 'Robbery',
  theft: 'Theft',
  vandalism: 'Vandalism',
  fraud: 'Fraud',
  other: 'Other',
} as const;

// Incident Statuses
export const INCIDENT_STATUS = {
  reported: 'Reported',
  assigned: 'Assigned',
  'in-progress': 'In Progress',
  resolved: 'Resolved',
  closed: 'Closed',
} as const;

// Case Statuses
export const CASE_STATUS = {
  open: 'Open',
  investigation: 'Under Investigation',
  'awaiting-prosecution': 'Awaiting Prosecution',
  'in-court': 'In Court',
  closed: 'Closed',
  dismissed: 'Dismissed',
} as const;

// Officer Statuses
export const OFFICER_STATUS = {
  active: 'Active',
  inactive: 'Inactive',
  'on-leave': 'On Leave',
  suspended: 'Suspended',
} as const;

// Traffic Violation Types
export const TRAFFIC_VIOLATION_TYPES = {
  speeding: 'Speeding',
  'reckless-driving': 'Reckless Driving',
  'no-license': 'No License',
  'no-insurance': 'No Insurance',
  'expired-docs': 'Expired Documents',
  other: 'Other',
} as const;

// Traffic Violation Statuses
export const TRAFFIC_STATUS = {
  issued: 'Issued',
  paid: 'Paid',
  pending: 'Pending',
  appealed: 'Appealed',
} as const;

// Severity Levels
export const SEVERITY_LEVELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
} as const;

// Severity Colors (for UI)
export const SEVERITY_COLORS = {
  low: 'bg-green-100 text-green-800 border-green-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  high: 'bg-orange-100 text-orange-800 border-orange-300',
  critical: 'bg-red-100 text-red-800 border-red-300',
} as const;

// User Roles
export const USER_ROLES = {
  governor: 'Governor',
  commander: 'Police Commander',
  officer: 'Police Officer',
  admin: 'Administrator',
  public: 'Public',
} as const;

// Counties (Kenya)
export const KENYAN_COUNTIES = [
  'Mombasa',
  'Kwale',
  'Kilifi',
  'Tana River',
  'Lamu',
  'Taita-Taveta',
  'Garissa',
  'Wajir',
  'Mandera',
  'Marsabit',
  'Isiolo',
  'Samburu',
  'Turkana',
  'West Pokot',
  'Baringo',
  'Laikipia',
  'Nakuru',
  'Nairobi',
  'Kajiado',
  'Kericho',
  'Bomet',
  'Kakamega',
  'Vihiga',
  'Bungoma',
  'Busia',
  'Siaya',
  'Kisumu',
  'Homabay',
  'Migori',
  'Kisii',
  'Nyamira',
  'Murang\'a',
  'Kiambu',
  'Nyeri',
  'Kirinyaga',
  'Machakos',
  'Makueni',
  'Embu',
  'Meru',
  'Tharaka-Nithi',
  'Uasin Gishu',
  'Elgeyo-Marakwet',
  'Nandi',
  'Trans Nzoia',
  'Kitui',
  'Narok',
] as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const PAGINATION_SIZES = [10, 20, 50, 100];

// Date Formats
export const DATE_FORMAT = 'yyyy-MM-dd';
export const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';
export const DISPLAY_DATE_FORMAT = 'dd MMM yyyy';
export const DISPLAY_DATETIME_FORMAT = 'dd MMM yyyy, HH:mm';

// Navigation Items
export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Incidents', href: '/incidents', icon: 'AlertCircle' },
  { label: 'Cases', href: '/cases', icon: 'Files' },
  { label: 'Officers', href: '/officers', icon: 'Users' },
  { label: 'Dispatch', href: '/dispatch', icon: 'Radio' },
  { label: 'Traffic', href: '/traffic', icon: 'Car' },
  { label: 'Stations', href: '/stations', icon: 'Building2' },
  { label: 'Community', href: '/community', icon: 'Users2' },
  { label: 'Analytics', href: '/analytics', icon: 'BarChart3' },
] as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  login: '/auth/login',
  logout: '/auth/logout',
  refresh: '/auth/refresh',
  resetPassword: '/auth/reset-password',

  // Officers
  officers: '/officers',
  officer: (id: string) => `/officers/${id}`,

  // Incidents
  incidents: '/incidents',
  incident: (id: string) => `/incidents/${id}`,
  assignIncident: (id: string) => `/incidents/${id}/assign`,

  // Cases
  cases: '/cases',
  case: (id: string) => `/cases/${id}`,
  updateCaseStatus: (id: string) => `/cases/${id}/status`,

  // Traffic
  traffic: '/traffic-violations',
  trafficViolation: (id: string) => `/traffic-violations/${id}`,
  recordPayment: (id: string) => `/traffic-violations/${id}/payment`,

  // Dispatch
  liveIncidents: '/dispatch/live-incidents',
  officerLocations: '/officers/location',

  // Stations
  stations: '/stations',
  station: (id: string) => `/stations/${id}`,

  // Community
  committees: '/community/committees',
  committee: (id: string) => `/community/committees/${id}`,
  nyumbaKumi: '/community/nyumba-kumi',
  nyumbaKumiDetail: (id: string) => `/community/nyumba-kumi/${id}`,
  informants: '/community/informants',
  informant: (id: string) => `/community/informants/${id}`,

  // Analytics
  dashboard: '/analytics/dashboard',
  crimeTrends: '/analytics/crime-trends',
  officerPerformance: '/analytics/officer-performance',
  responseTimes: '/analytics/response-times',

  // Admin
  users: '/admin/users',
  user: (id: string) => `/admin/users/${id}`,
  auditLogs: '/admin/audit-logs',
} as const;

// Map Configuration
export const MAP_CONFIG = {
  center: [-0.0236, 37.9062], // Kenya center coordinates
  zoom: 6,
  maxZoom: 18,
  minZoom: 5,
} as const;

// Dispatch Colors
export const DISPATCH_STATUS_COLORS = {
  reported: '#ef4444',      // red
  assigned: '#f59e0b',      // amber
  'in-progress': '#3b82f6', // blue
  resolved: '#10b981',      // green
  closed: '#6b7280',        // gray
} as const;

// Schools & Education
export const SCHOOL_TYPES = {
  primary: 'Primary School',
  secondary: 'Secondary School',
  mixed: 'Mixed School',
} as const;

export const SCHOOL_STATUS = {
  active: 'Active',
  inactive: 'Inactive',
  closed: 'Closed',
} as const;

export const EXAM_TYPES = {
  kcpe: 'KCPE',
  kcse: 'KCSE',
} as const;

export const RANKING_TIERS = {
  platinum: 'Platinum',
  gold: 'Gold',
  silver: 'Silver',
  bronze: 'Bronze',
} as const;

export const RANKING_TIER_COLORS = {
  platinum: 'bg-gradient-to-r from-slate-300 to-slate-400',
  gold: 'bg-gradient-to-r from-yellow-300 to-yellow-400',
  silver: 'bg-gradient-to-r from-gray-300 to-gray-400',
  bronze: 'bg-gradient-to-r from-orange-300 to-orange-400',
} as const;

export const SCHOOL_INCIDENT_TYPES = {
  bullying: 'Bullying',
  violence: 'Violence',
  'drug-abuse': 'Drug Abuse',
  theft: 'Theft',
  vandalism: 'Vandalism',
  'sexual-abuse': 'Sexual Abuse',
  other: 'Other',
} as const;

export const INFRASTRUCTURE_CATEGORIES = {
  classroom: 'Classroom',
  library: 'Library',
  lab: 'Laboratory',
  sanitation: 'Sanitation',
  water: 'Water & Sanitation',
  other: 'Other',
} as const;

export const PROJECT_STATUS = {
  planning: 'Planning',
  approved: 'Approved',
  'in-progress': 'In Progress',
  completed: 'Completed',
  stalled: 'Stalled',
} as const;

export const INSPECTION_CATEGORIES = {
  infrastructure: 'Infrastructure',
  teaching: 'Teaching & Learning',
  safety: 'Safety & Security',
  health: 'Health & Hygiene',
  management: 'School Management',
} as const;

export const TEACHER_DESIGNATION = {
  'head-teacher': 'Head Teacher',
  'deputy-head': 'Deputy Head',
  teacher: 'Teacher',
} as const;

export const TEACHER_STATUS = {
  active: 'Active',
  inactive: 'Inactive',
  'on-leave': 'On Leave',
} as const;

// School Endpoints
export const SCHOOL_API_ENDPOINTS = {
  schools: '/schools',
  school: (id: string) => `/schools/${id}`,
  academicResults: (id: string) => `/schools/${id}/academic-results`,
  academicResult: (schoolId: string, resultId: string) => `/schools/${schoolId}/academic-results/${resultId}`,
  rankings: '/schools/rankings',
  teachers: (id: string) => `/schools/${id}/teachers`,
  teacher: (schoolId: string, teacherId: string) => `/schools/${schoolId}/teachers/${teacherId}`,
  feeding: (id: string) => `/schools/${id}/feeding`,
  infrastructure: (id: string) => `/schools/${id}/infrastructure`,
  infrastructureProject: (schoolId: string, projectId: string) => `/schools/${schoolId}/infrastructure/${projectId}`,
  incidents: (id: string) => `/schools/${id}/incidents`,
  schoolIncident: (schoolId: string, incidentId: string) => `/schools/${schoolId}/incidents/${incidentId}`,
  inspections: (id: string) => `/schools/${id}/inspections`,
  inspection: (schoolId: string, inspectionId: string) => `/schools/${schoolId}/inspections/${inspectionId}`,
} as const;
