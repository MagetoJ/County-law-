// Authentication
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  county: string;
  station?: string;
  avatar?: string;
  phone?: string;
}

export type UserRole = 'governor' | 'commander' | 'officer' | 'admin' | 'public';

// Officers
export interface Officer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rank: PoliceRank;
  station: string;
  county: string;
  division?: string;
  serviceNumber: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'on-leave' | 'suspended';
  gpsEnabled: boolean;
  lastKnownLocation?: Location;
  performanceScore?: number;
}

export type PoliceRank = 'constable' | 'corporal' | 'sergeant' | 'inspector' | 'sub-inspector' | 'ASP' | 'DSP' | 'commandant';

// Incidents
export interface Incident {
  id: string;
  title: string;
  description: string;
  type: IncidentType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: IncidentStatus;
  location: Location;
  reportedBy: string;
  reportedAt: string;
  respondingOfficers: string[];
  caseId?: string;
  evidence?: string[];
  witnessCount: number;
  estimatedResponseTime?: number;
}

export type IncidentType = 'assault' | 'robbery' | 'theft' | 'vandalism' | 'fraud' | 'other';
export type IncidentStatus = 'reported' | 'assigned' | 'in-progress' | 'resolved' | 'closed';

// Cases
export interface Case {
  id: string;
  incidentId: string;
  title: string;
  description: string;
  status: CaseStatus;
  assignedTo: string;
  relatedIncidents: string[];
  evidence: EvidenceItem[];
  witnessStatements: WitnessStatement[];
  courtDate?: string;
  prosecutor?: string;
  caseNumber: string;
  createdAt: string;
  updatedAt: string;
}

export type CaseStatus = 'open' | 'investigation' | 'awaiting-prosecution' | 'in-court' | 'closed' | 'dismissed';

export interface EvidenceItem {
  id: string;
  type: string;
  description: string;
  url?: string;
  collectedDate: string;
  collectedBy: string;
}

export interface WitnessStatement {
  id: string;
  name: string;
  phone: string;
  statement: string;
  recordedDate: string;
}

// Traffic
export interface TrafficViolation {
  id: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  driverId?: string;
  violationType: ViolationType;
  location: Location;
  recordedBy: string;
  recordedAt: string;
  fine: number;
  status: 'issued' | 'paid' | 'pending' | 'appealed';
  paymentMethod?: 'cash' | 'mpesa' | 'bank-transfer';
  paymentDate?: string;
  notes?: string;
}

export type ViolationType = 'speeding' | 'reckless-driving' | 'no-license' | 'no-insurance' | 'expired-docs' | 'other';

// Stations
export interface Station {
  id: string;
  name: string;
  location: Location;
  commander: string;
  county: string;
  division: string;
  phone: string;
  email: string;
  staffCount: number;
  capacity: number;
  resources: StationResource[];
  obRegister?: string;
}

export interface StationResource {
  type: 'vehicle' | 'firearm' | 'equipment';
  quantity: number;
  description: string;
}

// Community Policing
export interface CommunityCommittee {
  id: string;
  name: string;
  ward: string;
  chairman: string;
  chairman_phone: string;
  members: number;
  meetingFrequency: 'weekly' | 'bi-weekly' | 'monthly';
  lastMeetingDate?: string;
  issues: string[];
}

export interface NyumbaKumiRegistry {
  id: string;
  village: string;
  ward: string;
  coordinator: string;
  coordinatorPhone: string;
  households: number;
  population: number;
  lastReportDate?: string;
}

export interface CommunityInformant {
  id: string;
  name?: string;
  code: string;
  ward: string;
  reportsSubmitted: number;
  lastReportDate?: string;
  trustScore: number;
  status: 'active' | 'inactive' | 'under-review';
}

// Analytics
export interface DashboardKPI {
  totalIncidents: number;
  incidentsThisMonth: number;
  averageResponseTime: number;
  caseClearanceRate: number;
  trafficFinesCollected: number;
  communityAlerts: number;
}

export interface CrimeTrend {
  date: string;
  assaults: number;
  robberies: number;
  thefts: number;
  frauds: number;
}

export interface OfficerPerformance {
  officerId: string;
  name: string;
  rank: PoliceRank;
  casesHandled: number;
  averageResolutionTime: number;
  satisfactionScore: number;
  trainingHours: number;
}

// Location
export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  ward?: string;
  constituency?: string;
  county?: string;
}

// Public Portal
export interface CrimeReport {
  id: string;
  description: string;
  location: Location;
  reportedAt: string;
  reporterName?: string;
  reporterPhone?: string;
  reporterEmail?: string;
  status: 'submitted' | 'received' | 'investigating' | 'resolved';
  urgency: 'low' | 'medium' | 'high';
}

export interface MissingPerson {
  id: string;
  name: string;
  age: number;
  lastSeenLocation: Location;
  lastSeenDate: string;
  description: string;
  photo?: string;
  reporterName: string;
  reporterPhone: string;
  status: 'missing' | 'found' | 'deceased';
}

// Admin
export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super-admin' | 'county-admin' | 'station-admin';
  county?: string;
  createdAt: string;
  lastLogin?: string;
  status: 'active' | 'inactive';
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  timestamp: string;
  changes?: Record<string, unknown>;
}

// API Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// API Error
export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

// Schools & Education
export interface School {
  id: string;
  name: string;
  registrationNumber: string;
  type: 'primary' | 'secondary' | 'mixed';
  county: string;
  constituency: string;
  ward: string;
  location: Location;
  principalName: string;
  principalPhone: string;
  principalEmail: string;
  studentCount: number;
  teacherCount: number;
  boardMembers: number;
  yearEstablished: number;
  status: 'active' | 'inactive' | 'closed';
  gpsCoordinates?: { lat: number; lng: number };
  contactPhone: string;
  contactEmail: string;
}

export interface AcademicResult {
  id: string;
  schoolId: string;
  examYear: number;
  examType: 'kcpe' | 'kcse';
  totalStudents: number;
  totalMarks: number;
  averageMarks: number;
  passRate: number;
  gradeDistribution: GradeDistribution;
  topScore: number;
  uploadedDate: string;
  uploadedBy: string;
}

export interface GradeDistribution {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
}

export interface SchoolRanking {
  id: string;
  schoolId: string;
  schoolName: string;
  county: string;
  rankingYear: number;
  position: number;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  score: number;
  previousRank?: number;
  trendingDirection: 'up' | 'down' | 'stable';
}

export interface Teacher {
  id: string;
  schoolId: string;
  tscNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subjects: string[];
  joinDate: string;
  qualifications: string[];
  status: 'active' | 'inactive' | 'on-leave';
  designation: 'head-teacher' | 'deputy-head' | 'teacher';
}

export interface SchoolFeeding {
  id: string;
  schoolId: string;
  programStatus: 'active' | 'inactive';
  beneficiaries: number;
  mealsPerDay: number;
  weeklyMenu: WeeklyMenu;
  supplier?: string;
  supplierPhone?: string;
  monthlyBudget: number;
  fundingSource: string;
  lastAuditDate?: string;
}

export interface WeeklyMenu {
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
}

export interface InfrastructureProject {
  id: string;
  schoolId: string;
  projectName: string;
  description: string;
  category: 'classroom' | 'library' | 'lab' | 'sanitation' | 'water' | 'other';
  status: 'planning' | 'approved' | 'in-progress' | 'completed' | 'stalled';
  estimatedCost: number;
  amountSpent: number;
  startDate: string;
  expectedEndDate?: string;
  actualEndDate?: string;
  fundingSource: string;
  contractor?: string;
}

export interface SchoolIncident {
  id: string;
  schoolId: string;
  incidentType: 'bullying' | 'violence' | 'drug-abuse' | 'theft' | 'vandalism' | 'sexual-abuse' | 'other';
  description: string;
  reportedDate: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  studentsInvolved: number;
  actionTaken: string;
  reportedBy: string;
  linkedIncidentId?: string;
  status: 'reported' | 'investigating' | 'resolved' | 'closed';
}

export interface SchoolInspection {
  id: string;
  schoolId: string;
  inspectionDate: string;
  inspectorName: string;
  inspectorId: string;
  overallRating: number;
  findings: InspectionFinding[];
  recommendations: string[];
  nextInspectionDate: string;
  status: 'completed' | 'pending';
}

export interface InspectionFinding {
  category: 'infrastructure' | 'teaching' | 'safety' | 'health' | 'management';
  rating: number;
  comment: string;
}
