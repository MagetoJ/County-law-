'use client';

import { useState } from 'react';
import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SCHOOL_INCIDENT_TYPES, SEVERITY_LEVELS } from '@/lib/constants';
import { SchoolIncident } from '@/lib/types';
import { AlertCircle, Users, CheckCircle } from 'lucide-react';

const MOCK_INCIDENTS: SchoolIncident[] = [
  {
    id: '1',
    schoolId: '1',
    incidentType: 'bullying',
    description: 'Student reported being bullied by classmates on social media',
    reportedDate: '2023-11-15',
    severity: 'medium',
    studentsInvolved: 4,
    actionTaken: 'Counseling provided to all involved students, parents contacted',
    reportedBy: 'School Counselor',
    status: 'resolved',
  },
  {
    id: '2',
    schoolId: '1',
    incidentType: 'violence',
    description: 'Altercation between two students in dormitory',
    reportedDate: '2023-11-12',
    severity: 'high',
    studentsInvolved: 2,
    actionTaken: 'Students suspended for 1 week, parents meeting held',
    reportedBy: 'Dormitory Supervisor',
    status: 'closed',
  },
  {
    id: '3',
    schoolId: '1',
    incidentType: 'drug-abuse',
    description: 'Suspected drug substance found in student locker',
    reportedDate: '2023-11-20',
    severity: 'critical',
    studentsInvolved: 1,
    actionTaken: 'Matter reported to authorities, substance tested',
    reportedBy: 'Principal',
    linkedIncidentId: 'INC-001',
    status: 'investigating',
  },
  {
    id: '4',
    schoolId: '1',
    incidentType: 'theft',
    description: 'Mobile phones stolen from dormitory',
    reportedDate: '2023-11-10',
    severity: 'medium',
    studentsInvolved: 5,
    actionTaken: 'Investigation ongoing, increased dormitory patrols',
    reportedBy: 'Dormitory Warden',
    status: 'investigating',
  },
];

const getSeverityColor = (severity: string) => {
  const colors: Record<string, string> = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800',
  };
  return colors[severity] || colors.medium;
};

const getStatusIcon = (status: string) => {
  if (status === 'resolved' || status === 'closed') return <CheckCircle className="w-4 h-4 text-green-600" />;
  return <AlertCircle className="w-4 h-4 text-orange-600" />;
};

export default function SchoolIncidentsPage() {
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredIncidents = selectedStatus
    ? MOCK_INCIDENTS.filter(i => i.status === selectedStatus)
    : MOCK_INCIDENTS;

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">School Safety Incidents</h1>
            <p className="text-muted-foreground mt-2">Monitor and manage school safety issues</p>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6">
            {['', 'reported', 'investigating', 'resolved', 'closed'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedStatus === status
                    ? 'bg-accent text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {status === '' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Incidents */}
          <div className="space-y-4">
            {filteredIncidents.map((incident) => (
              <Card key={incident.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(incident.status)}
                      <h3 className="text-lg font-semibold text-foreground">
                        {SCHOOL_INCIDENT_TYPES[incident.incidentType as keyof typeof SCHOOL_INCIDENT_TYPES]}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{incident.description}</p>
                  </div>
                  <Badge className={getSeverityColor(incident.severity)}>
                    {SEVERITY_LEVELS[incident.severity as keyof typeof SEVERITY_LEVELS]}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-muted-foreground text-xs mb-1">Reported</p>
                    <p className="font-semibold text-foreground">
                      {new Date(incident.reportedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-muted-foreground text-xs mb-1 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Students Involved
                    </p>
                    <p className="font-semibold text-foreground">{incident.studentsInvolved}</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-muted-foreground text-xs mb-1">Status</p>
                    <p className="font-semibold text-foreground capitalize">{incident.status}</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-muted-foreground text-xs mb-1">Reported By</p>
                    <p className="font-semibold text-foreground text-xs">{incident.reportedBy}</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                  <p className="text-xs font-semibold text-blue-900 mb-1">Action Taken</p>
                  <p className="text-sm text-blue-800">{incident.actionTaken}</p>
                </div>

                {incident.linkedIncidentId && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs font-semibold text-red-900">
                      Linked to Law Enforcement Incident: {incident.linkedIncidentId}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {filteredIncidents.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No incidents found.</p>
            </Card>
          )}

          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Total Incidents</p>
              <p className="text-2xl font-bold text-foreground mt-2">{MOCK_INCIDENTS.length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Critical</p>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {MOCK_INCIDENTS.filter(i => i.severity === 'critical').length}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Investigating</p>
              <p className="text-2xl font-bold text-orange-600 mt-2">
                {MOCK_INCIDENTS.filter(i => i.status === 'investigating').length}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Resolved</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {MOCK_INCIDENTS.filter(i => i.status === 'resolved' || i.status === 'closed').length}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
