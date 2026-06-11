'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertCircle, 
  MapPin, 
  Phone, 
  User,
  Clock,
  CheckCircle,
  Radio,
} from 'lucide-react';
import { useState } from 'react';

const mockDispatchIncidents = [
  {
    id: '1',
    title: 'Armed Robbery - Nairobi CBD',
    type: 'robbery',
    severity: 'critical',
    status: 'assigned',
    location: 'Nairobi CBD, Tom Mboya Street',
    reportedAt: '14:30',
    respondingOfficers: [
      { id: '1', name: 'John Kipchoge', rank: 'Inspector', arrivalTime: 2 },
      { id: '2', name: 'Mary Okonkwo', rank: 'Sergeant', arrivalTime: 5 },
    ],
    responseTime: 3,
  },
  {
    id: '2',
    title: 'Vehicle Theft - Kilimani',
    type: 'theft',
    severity: 'high',
    status: 'in-progress',
    location: 'Kilimani, Kileleshwa',
    reportedAt: '14:15',
    respondingOfficers: [
      { id: '3', name: 'Peter Kipchoge', rank: 'Constable', arrivalTime: 1 },
    ],
    responseTime: 8,
  },
  {
    id: '3',
    title: 'Assault - Westlands',
    type: 'assault',
    severity: 'high',
    status: 'in-progress',
    location: 'Westlands, Valley Road',
    reportedAt: '14:00',
    respondingOfficers: [
      { id: '4', name: 'Sarah Mutua', rank: 'Sergeant', arrivalTime: 4 },
    ],
    responseTime: 15,
  },
  {
    id: '4',
    title: 'Fraud Call - Parklands',
    type: 'fraud',
    severity: 'medium',
    status: 'reported',
    location: 'Parklands, Limuru Road',
    reportedAt: '13:45',
    respondingOfficers: [],
    responseTime: null,
  },
];

const STATUS_COLORS: Record<string, string> = {
  reported: 'bg-red-500/20 text-red-700 border-red-300',
  assigned: 'bg-orange-500/20 text-orange-700 border-orange-300',
  'in-progress': 'bg-blue-500/20 text-blue-700 border-blue-300',
  resolved: 'bg-green-500/20 text-green-700 border-green-300',
};

const SEVERITY_COLORS: Record<string, string> = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
};

export default function DispatchPage() {
  const [selectedIncident, setSelectedIncident] = useState(mockDispatchIncidents[0]);

  return (
    <ProtectedLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dispatch Center</h1>
          <p className="text-muted-foreground mt-1">Real-time incident assignment and officer management</p>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border bg-gradient-to-br from-red-500/10 to-red-500/5">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Urgent (Critical)</p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {mockDispatchIncidents.filter(i => i.severity === 'critical').length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border bg-gradient-to-br from-orange-500/10 to-orange-500/5">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {mockDispatchIncidents.filter(i => i.status === 'in-progress').length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border bg-gradient-to-br from-blue-500/10 to-blue-500/5">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Assigned</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {mockDispatchIncidents.filter(i => i.status === 'assigned').length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Pending Assignment</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {mockDispatchIncidents.filter(i => i.status === 'reported').length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dispatch Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Incident List */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Active Incidents</CardTitle>
                <CardDescription>Click to view details and assign officers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {mockDispatchIncidents.map((incident) => (
                  <div
                    key={incident.id}
                    onClick={() => setSelectedIncident(incident)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedIncident.id === incident.id
                        ? 'border-primary bg-primary/10'
                        : `border-border hover:border-primary/50 ${STATUS_COLORS[incident.status]}`
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{incident.title}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{incident.reportedAt}</span>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${SEVERITY_COLORS[incident.severity]}`}>
                        {incident.severity}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{incident.location}</span>
                    </div>
                    {incident.responseTime && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        Response time: {incident.responseTime} minutes
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Incident Details */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-primary" />
                Incident Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Incident</p>
                <p className="font-semibold text-foreground">{selectedIncident.title}</p>
              </div>

              {/* Status */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Status</p>
                <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[selectedIncident.status]}`}>
                  {selectedIncident.status.replace('-', ' ')}
                </span>
              </div>

              {/* Location */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Location</p>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="font-medium text-foreground text-sm">{selectedIncident.location}</p>
                </div>
              </div>

              {/* Responding Officers */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Responding Officers</p>
                <div className="space-y-2">
                  {selectedIncident.respondingOfficers.length > 0 ? (
                    selectedIncident.respondingOfficers.map((officer) => (
                      <div key={officer.id} className="p-2 rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-3 h-3 text-primary" />
                          <span className="text-sm font-medium text-foreground">{officer.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{officer.rank}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          ETA: {officer.arrivalTime} minutes
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No officers assigned</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 space-y-2">
                {selectedIncident.status === 'reported' && (
                  <Button className="w-full bg-primary hover:bg-primary/90 text-sidebar-primary-foreground">
                    Assign Officers
                  </Button>
                )}
                {selectedIncident.status === 'in-progress' && (
                  <>
                    <Button variant="outline" className="w-full">
                      View Map
                    </Button>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Mark Resolved
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  );
}
