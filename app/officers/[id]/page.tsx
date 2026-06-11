'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Badge,
  Calendar,
  TrendingUp,
  Award,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const mockOfficer = {
  id: '1',
  name: 'John Kipchoge',
  rank: 'Inspector',
  serviceNumber: 'NPK/2018/0456',
  station: 'Parklands Police Station',
  county: 'Nairobi',
  division: 'Nairobi East Division',
  email: 'john.kipchoge@police.ke',
  phone: '+254712345678',
  joinDate: '2018-06-15',
  status: 'active',
  performanceScore: 4.8,
  casesHandled: 45,
  casesResolved: 43,
  averageResolutionTime: '5.2 days',
  trainingHours: 120,
  certifications: ['Basic Investigation', 'Crime Scene Management', 'Forensics'],
  disciplinaryRecords: 0,
  commendations: 3,
  lastAssignment: 'Armed Robbery Investigation',
};

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-500/20 text-green-700',
  inactive: 'bg-gray-500/20 text-gray-700',
  'on-leave': 'bg-yellow-500/20 text-yellow-700',
  suspended: 'bg-red-500/20 text-red-700',
};

export default function OfficerDetailPage({ params }: { params: { id: string } }) {
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
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground">{mockOfficer.name}</h1>
                <p className="text-muted-foreground mt-1">{mockOfficer.rank} • {mockOfficer.serviceNumber}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className={`text-sm px-3 py-1 rounded-full font-medium ${STATUS_COLORS[mockOfficer.status]}`}>
                {mockOfficer.status.replace('-', ' ')}
              </span>
              <Button variant="outline">Edit</Button>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Performance</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{mockOfficer.performanceScore}</p>
                  <p className="text-xs text-muted-foreground mt-1">out of 5</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Cases Handled</p>
              <p className="text-3xl font-bold text-foreground mt-2">{mockOfficer.casesHandled}</p>
              <p className="text-xs text-green-600 mt-1">{mockOfficer.casesResolved} resolved</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Training Hours</p>
              <p className="text-3xl font-bold text-foreground mt-2">{mockOfficer.trainingHours}</p>
              <p className="text-xs text-muted-foreground mt-1">professional development</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Commendations</p>
              <p className="text-3xl font-bold text-foreground mt-2">{mockOfficer.commendations}</p>
              <p className="text-xs text-muted-foreground mt-1">awards & recognition</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                    <p className="text-foreground font-medium">{mockOfficer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Service Number</p>
                    <p className="text-foreground font-medium">{mockOfficer.serviceNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="text-foreground font-medium">{mockOfficer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="text-foreground font-medium">{mockOfficer.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Rank</p>
                    <p className="text-foreground font-medium">{mockOfficer.rank}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Join Date</p>
                    <p className="text-foreground font-medium">{mockOfficer.joinDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assignment Information */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Current Assignment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Station</p>
                  <p className="text-foreground font-medium">{mockOfficer.station}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Division</p>
                  <p className="text-foreground font-medium">{mockOfficer.division}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">County</p>
                  <p className="text-foreground font-medium">{mockOfficer.county}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Last Assignment</p>
                  <p className="text-foreground font-medium">{mockOfficer.lastAssignment}</p>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Professional Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockOfficer.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg border border-border">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-foreground">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Details */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Cases Resolved Rate</span>
                    <span className="text-sm font-semibold text-foreground">
                      {Math.round((mockOfficer.casesResolved / mockOfficer.casesHandled) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div 
                      className="h-full bg-accent rounded-full"
                      style={{ width: `${(mockOfficer.casesResolved / mockOfficer.casesHandled) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Average Resolution Time</p>
                  <p className="text-2xl font-bold text-foreground">{mockOfficer.averageResolutionTime}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card className="border-border bg-gradient-to-br from-green-500/10 to-green-500/5">
              <CardHeader>
                <CardTitle className="text-lg">Status Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Status</p>
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${STATUS_COLORS[mockOfficer.status]}`}>
                    {mockOfficer.status.replace('-', ' ')}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Disciplinary Records</p>
                  <p className="text-2xl font-bold text-green-600">{mockOfficer.disciplinaryRecords}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Commendations</p>
                  <p className="text-2xl font-bold text-accent">{mockOfficer.commendations}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  View Cases
                </Button>
                <Button className="w-full" variant="outline">
                  Assign Case
                </Button>
                <Button className="w-full" variant="outline">
                  Leave Request
                </Button>
                <Button className="w-full" variant="outline">
                  Performance Report
                </Button>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground break-all">{mockOfficer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{mockOfficer.phone}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
