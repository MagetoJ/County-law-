'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  AlertCircle,
  MapPin,
  User,
  FileText,
  Clock,
  CheckCircle,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const mockIncident = {
  id: '1',
  title: 'Armed Robbery - Nairobi CBD',
  type: 'robbery',
  severity: 'critical',
  status: 'in-progress',
  location: {
    address: 'Tom Mboya Street, Nairobi CBD',
    ward: 'Nairobi CBD',
    coordinates: '-1.2851, 36.8155',
  },
  reportedBy: 'John Doe',
  reportedByPhone: '+254712345678',
  reportedAt: '2024-01-25 14:30',
  description: 'Armed suspects entered ABC Bank and demanded money. Security guard present. Multiple customers in the bank at the time of the incident.',
  witnessCount: 8,
  respondingOfficers: [
    { id: '1', name: 'John Kipchoge', rank: 'Inspector', arrivalTime: 3 },
    { id: '2', name: 'Mary Okonkwo', rank: 'Sergeant', arrivalTime: 5 },
  ],
  evidence: [
    { id: '1', type: 'CCTV Footage', description: 'Bank security camera footage', url: '#' },
    { id: '2', type: 'Witness Statement', description: 'Statement from bank manager', url: '#' },
  ],
  caseStatus: 'investigation',
  notes: 'High priority case. Suspects armed and dangerous. Robbery in progress at time of report.',
};

const SEVERITY_COLORS: Record<string, string> = {
  low: 'bg-green-100 text-green-800 border-green-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  high: 'bg-orange-100 text-orange-800 border-orange-300',
  critical: 'bg-red-100 text-red-800 border-red-300',
};

const STATUS_COLORS: Record<string, string> = {
  reported: 'bg-blue-500/20 text-blue-700',
  assigned: 'bg-purple-500/20 text-purple-700',
  'in-progress': 'bg-orange-500/20 text-orange-700',
  resolved: 'bg-green-500/20 text-green-700',
  closed: 'bg-gray-500/20 text-gray-700',
};

export default function IncidentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <ProtectedLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div>
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">{mockIncident.title}</h1>
              <p className="text-muted-foreground mt-1">Incident ID: #{mockIncident.id}</p>
            </div>
            <div className="flex gap-2">
              <Button className="bg-primary hover:bg-primary/90 text-sidebar-primary-foreground">
                Assign Officer
              </Button>
              <Button variant="outline">
                Update Status
              </Button>
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Severity</p>
              <span className={`text-sm px-3 py-1 rounded-full font-semibold border ${SEVERITY_COLORS[mockIncident.severity]}`}>
                {mockIncident.severity}
              </span>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Status</p>
              <span className={`text-sm px-3 py-1 rounded-full font-semibold ${STATUS_COLORS[mockIncident.status]}`}>
                {mockIncident.status.replace('-', ' ')}
              </span>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Reported</p>
              <p className="text-sm font-semibold text-foreground">{mockIncident.reportedAt}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Type</p>
              <p className="text-sm font-semibold text-foreground capitalize">{mockIncident.type}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Incident Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-foreground leading-relaxed">{mockIncident.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Notes</p>
                  <p className="text-foreground leading-relaxed">{mockIncident.notes}</p>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Address</p>
                  <p className="text-foreground font-medium">{mockIncident.location.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Ward</p>
                  <p className="text-foreground">{mockIncident.location.ward}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Coordinates</p>
                  <p className="text-foreground font-mono text-sm">{mockIncident.location.coordinates}</p>
                </div>
                <div className="mt-4">
                  <div className="w-full h-40 bg-muted rounded-lg flex items-center justify-center border border-border">
                    <p className="text-muted-foreground">Map would load here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Evidence */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Evidence</CardTitle>
                <CardDescription>{mockIncident.evidence.length} items collected</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockIncident.evidence.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{item.type}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Reporter Info */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Reporter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Name</p>
                  <p className="text-foreground font-medium">{mockIncident.reportedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <p className="text-foreground">{mockIncident.reportedByPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Reported At</p>
                  <p className="text-foreground">{mockIncident.reportedAt}</p>
                </div>
              </CardContent>
            </Card>

            {/* Witnesses */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Witnesses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{mockIncident.witnessCount}</p>
                <p className="text-sm text-muted-foreground mt-1">witnesses on scene</p>
                <Button variant="outline" className="w-full mt-4">
                  View Statements
                </Button>
              </CardContent>
            </Card>

            {/* Responding Officers */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Responding Officers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockIncident.respondingOfficers.length > 0 ? (
                  mockIncident.respondingOfficers.map((officer) => (
                    <div key={officer.id} className="p-3 rounded-lg border border-border">
                      <h4 className="font-semibold text-foreground">{officer.name}</h4>
                      <p className="text-sm text-muted-foreground">{officer.rank}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        ETA: {officer.arrivalTime} minutes
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">No officers assigned</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
