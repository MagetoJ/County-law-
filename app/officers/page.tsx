'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, User, Mail, Phone, Badge, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const mockOfficers = [
  {
    id: '1',
    name: 'John Kipchoge',
    rank: 'Inspector',
    station: 'Parklands Police Station',
    email: 'john.kipchoge@police.ke',
    phone: '+254712345678',
    status: 'active',
    casesHandled: 23,
    performanceScore: 4.8,
  },
  {
    id: '2',
    name: 'Mary Okonkwo',
    rank: 'Sergeant',
    station: 'Karen Police Station',
    email: 'mary.okonkwo@police.ke',
    phone: '+254712345679',
    status: 'active',
    casesHandled: 19,
    performanceScore: 4.7,
  },
  {
    id: '3',
    name: 'Peter Kipchoge',
    rank: 'Constable',
    station: 'Kasarani Police Station',
    email: 'peter.kipchoge@police.ke',
    phone: '+254712345680',
    status: 'active',
    casesHandled: 18,
    performanceScore: 4.6,
  },
  {
    id: '4',
    name: 'Sarah Mutua',
    rank: 'Sergeant',
    station: 'Mombasa Road Police Station',
    email: 'sarah.mutua@police.ke',
    phone: '+254712345681',
    status: 'on-leave',
    casesHandled: 15,
    performanceScore: 4.5,
  },
  {
    id: '5',
    name: 'David Okonkwo',
    rank: 'Corporal',
    station: 'Westlands Police Station',
    email: 'david.okonkwo@police.ke',
    phone: '+254712345682',
    status: 'active',
    casesHandled: 12,
    performanceScore: 4.4,
  },
];

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-500/20 text-green-700',
  inactive: 'bg-gray-500/20 text-gray-700',
  'on-leave': 'bg-yellow-500/20 text-yellow-700',
  suspended: 'bg-red-500/20 text-red-700',
};

export default function OfficersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOfficers = mockOfficers.filter(officer => {
    const matchesSearch = officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         officer.rank.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || officer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <ProtectedLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Officers</h1>
            <p className="text-muted-foreground mt-1">Manage police officers and personnel</p>
          </div>
          <Link href="/officers/new">
            <Button className="bg-primary hover:bg-primary/90 text-sidebar-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add Officer
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
                  placeholder="Search by name or rank..."
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
                <option value="active">Active</option>
                <option value="on-leave">On Leave</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Officers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOfficers.length > 0 ? (
            filteredOfficers.map((officer) => (
              <Link key={officer.id} href={`/officers/${officer.id}`}>
                <Card className="border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Officer Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <User className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{officer.name}</h3>
                            <p className="text-sm text-muted-foreground">{officer.rank}</p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[officer.status]}`}>
                          {officer.status.replace('-', ' ')}
                        </span>
                      </div>

                      {/* Station */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{officer.station}</span>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{officer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <span>{officer.phone}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">Cases Handled</p>
                          <p className="text-lg font-bold text-foreground mt-1">{officer.casesHandled}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Performance</p>
                          <p className="text-lg font-bold text-foreground mt-1">{officer.performanceScore}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Card className="border-border border-dashed md:col-span-2">
              <CardContent className="pt-12 pb-12 flex flex-col items-center justify-center">
                <User className="w-12 h-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No officers found</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Officers</p>
              <p className="text-2xl font-bold text-foreground mt-2">{mockOfficers.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {mockOfficers.filter(o => o.status === 'active').length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">On Leave</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">
                {mockOfficers.filter(o => o.status === 'on-leave').length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Avg Cases</p>
              <p className="text-2xl font-bold text-foreground mt-2">
                {(mockOfficers.reduce((sum, o) => sum + o.casesHandled, 0) / mockOfficers.length).toFixed(1)}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  );
}
