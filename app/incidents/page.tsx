'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  AlertCircle,
  Clock,
  MapPin,
  User,
  Filter,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const mockIncidents = [
  {
    id: '1',
    title: 'Armed Robbery - Nairobi CBD',
    type: 'robbery',
    severity: 'critical',
    status: 'in-progress',
    location: 'Nairobi, CBD',
    reportedBy: 'John Doe',
    reportedAt: '2 hours ago',
    respondingOfficers: 2,
  },
  {
    id: '2',
    title: 'Vehicle Theft - Kilimani',
    type: 'theft',
    severity: 'high',
    status: 'in-progress',
    location: 'Nairobi, Kilimani',
    reportedBy: 'Jane Smith',
    reportedAt: '4 hours ago',
    respondingOfficers: 1,
  },
  {
    id: '3',
    title: 'Assault - Westlands',
    type: 'assault',
    severity: 'high',
    status: 'resolved',
    location: 'Nairobi, Westlands',
    reportedBy: 'Peter James',
    reportedAt: '6 hours ago',
    respondingOfficers: 2,
  },
  {
    id: '4',
    title: 'Fraud Case - Parklands',
    type: 'fraud',
    severity: 'medium',
    status: 'assigned',
    location: 'Nairobi, Parklands',
    reportedBy: 'Mary Kipchoge',
    reportedAt: '1 day ago',
    respondingOfficers: 1,
  },
  {
    id: '5',
    title: 'Vandalism - Mombasa Road',
    type: 'vandalism',
    severity: 'low',
    status: 'closed',
    location: 'Nairobi, Mombasa Road',
    reportedBy: 'David Okonkwo',
    reportedAt: '2 days ago',
    respondingOfficers: 1,
  },
];

const SEVERITY_COLORS: Record<string, string> = {
  low: 'bg-green-500/20 text-green-700 border-green-300',
  medium: 'bg-yellow-500/20 text-yellow-700 border-yellow-300',
  high: 'bg-orange-500/20 text-orange-700 border-orange-300',
  critical: 'bg-red-500/20 text-red-700 border-red-300',
};

const STATUS_COLORS: Record<string, string> = {
  reported: 'bg-blue-500/20 text-blue-700',
  assigned: 'bg-purple-500/20 text-purple-700',
  'in-progress': 'bg-orange-500/20 text-orange-700',
  resolved: 'bg-green-500/20 text-green-700',
  closed: 'bg-gray-500/20 text-gray-700',
};

export default function IncidentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredIncidents = mockIncidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || incident.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <ProtectedLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Incidents</h1>
            <p className="text-muted-foreground mt-1">Manage and respond to reported incidents</p>
          </div>
          <Link href="/incidents/new">
            <Button className="bg-primary hover:bg-primary/90 text-sidebar-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Report Incident
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search incidents by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-card text-foreground cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="reported">Reported</option>
                <option value="assigned">Assigned</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Incidents List */}
        <div className="space-y-3">
          {filteredIncidents.length > 0 ? (
            filteredIncidents.map((incident) => (
              <Link key={incident.id} href={`/incidents/${incident.id}`}>
                <Card className="border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Title and Type */}
                      <div className="md:col-span-2">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{incident.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1 capitalize">
                              {incident.type.replace('-', ' ')}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{incident.location}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full border font-medium ${SEVERITY_COLORS[incident.severity]}`}>
                            {incident.severity}
                          </span>
                        </div>
                      </div>

                      {/* Status and Info */}
                      <div className="flex flex-col justify-between">
                        <div>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium block w-fit ${STATUS_COLORS[incident.status]}`}>
                            {incident.status.replace('-', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{incident.respondingOfficers} officers</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{incident.reportedAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Card className="border-border border-dashed">
              <CardContent className="pt-12 pb-12 flex flex-col items-center justify-center">
                <AlertCircle className="w-12 h-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No incidents found</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Incidents</p>
              <p className="text-2xl font-bold text-foreground mt-2">{mockIncidents.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold text-orange-600 mt-2">
                {mockIncidents.filter(i => i.status === 'in-progress').length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Resolved</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {mockIncidents.filter(i => i.status === 'resolved').length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Critical</p>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {mockIncidents.filter(i => i.severity === 'critical').length}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  );
}
