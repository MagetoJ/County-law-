'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Users, AlertCircle, Phone, Mail, Clock } from 'lucide-react';

export default function StationDetailPage({ params }: { params: { id: string } }) {
  // Mock station data
  const station = {
    id: params.id,
    name: 'Nairobi Central Police Station',
    region: 'Nairobi County',
    subCounty: 'Central Division',
    location: 'Tom Mboya Street, Nairobi CBD',
    latitude: -1.2872,
    longitude: 36.8173,
    officers: 48,
    vehicles: 12,
    contactPerson: 'CSP John Kipchoge',
    phone: '+254 20 2725 000',
    email: 'nairobi.central@police.go.ke',
    establishedYear: 1905,
    status: 'Operational',
    lastUpdated: '2024-01-15',
    jurisdictionArea: 'Central Nairobi Division',
    staffing: {
      commissioned: 15,
      nonCommissioned: 28,
      support: 5,
    },
    incidentsThisMonth: 45,
    casesResolved: 38,
    crimeRate: 'Moderate',
    recentIncidents: [
      { id: '1', type: 'Theft', date: '2024-01-15', status: 'Resolved' },
      { id: '2', type: 'Robbery', date: '2024-01-14', status: 'Under Investigation' },
      { id: '3', type: 'Assault', date: '2024-01-13', status: 'Resolved' },
    ],
  };

  return (
    <ProtectedLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">{station.name}</h1>
            <Badge className="bg-green-600 text-white">{station.status}</Badge>
          </div>
          <p className="text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {station.region} • {station.subCounty}
          </p>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-secondary">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">Personnel</p>
                <p className="text-3xl font-bold text-foreground">{station.officers}</p>
                <p className="text-xs text-muted-foreground mt-2">Active Officers</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-secondary">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">Vehicles</p>
                <p className="text-3xl font-bold text-foreground">{station.vehicles}</p>
                <p className="text-xs text-muted-foreground mt-2">Available Units</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-secondary">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">This Month</p>
                <p className="text-3xl font-bold text-foreground">{station.incidentsThisMonth}</p>
                <p className="text-xs text-muted-foreground mt-2">Incidents</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-secondary">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">Resolution Rate</p>
                <p className="text-3xl font-bold text-foreground">
                  {Math.round((station.casesResolved / station.incidentsThisMonth) * 100)}%
                </p>
                <p className="text-xs text-muted-foreground mt-2">Case Clearance</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="personnel">Personnel</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card className="bg-card border-secondary">
              <CardHeader>
                <CardTitle className="text-foreground">Station Information</CardTitle>
                <CardDescription>Basic details and jurisdiction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Jurisdiction</p>
                    <p className="text-foreground">{station.jurisdictionArea}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Established</p>
                    <p className="text-foreground">{station.establishedYear}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Crime Rate</p>
                    <p className="text-foreground">{station.crimeRate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Last Updated</p>
                    <p className="text-foreground">{station.lastUpdated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Personnel Tab */}
          <TabsContent value="personnel" className="space-y-4">
            <Card className="bg-card border-secondary">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Personnel Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Commissioned Officers</span>
                    <span className="font-semibold text-accent">{station.staffing.commissioned}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Non-Commissioned</span>
                    <span className="font-semibold text-accent">{station.staffing.nonCommissioned}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Support Staff</span>
                    <span className="font-semibold text-accent">{station.staffing.support}</span>
                  </div>
                  <div className="border-t border-secondary pt-4 flex items-center justify-between">
                    <span className="text-foreground font-semibold">Total</span>
                    <span className="font-bold text-accent text-lg">{station.officers}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Incidents Tab */}
          <TabsContent value="incidents" className="space-y-4">
            <Card className="bg-card border-secondary">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Recent Incidents
                </CardTitle>
                <CardDescription>This month&apos;s incident summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {station.recentIncidents.map((incident) => (
                    <div key={incident.id} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                      <div>
                        <p className="text-foreground font-medium">{incident.type}</p>
                        <p className="text-xs text-muted-foreground">{incident.date}</p>
                      </div>
                      <Badge variant={incident.status === 'Resolved' ? 'default' : 'secondary'}>
                        {incident.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-4">
            <Card className="bg-card border-secondary">
              <CardHeader>
                <CardTitle className="text-foreground">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-1 flex items-center gap-2">
                      <Users className="w-4 h-4" /> Station Commander
                    </p>
                    <p className="text-foreground">{station.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-1 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Phone
                    </p>
                    <p className="text-foreground">{station.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-1 flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email
                    </p>
                    <p className="text-foreground">{station.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Address
                    </p>
                    <p className="text-foreground">{station.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedLayout>
  );
}
