'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, FileText, User, Calendar, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const mockCases = [
  {
    id: '1',
    caseNumber: 'CR/2024/001',
    title: 'Armed Robbery - Nairobi CBD',
    status: 'investigation',
    assignedTo: 'John Kipchoge',
    createdAt: '2024-01-15',
    courtDate: '2024-03-20',
    priority: 'high',
    evidence: 3,
  },
  {
    id: '2',
    caseNumber: 'CR/2024/002',
    title: 'Vehicle Theft Ring',
    status: 'awaiting-prosecution',
    assignedTo: 'Mary Okonkwo',
    createdAt: '2024-01-10',
    courtDate: '2024-02-28',
    priority: 'high',
    evidence: 8,
  },
  {
    id: '3',
    caseNumber: 'CR/2024/003',
    title: 'Assault Case',
    status: 'open',
    assignedTo: 'Peter Kipchoge',
    createdAt: '2024-01-20',
    courtDate: null,
    priority: 'medium',
    evidence: 2,
  },
  {
    id: '4',
    caseNumber: 'CR/2024/004',
    title: 'Fraud Investigation',
    status: 'in-court',
    assignedTo: 'Sarah Mutua',
    createdAt: '2023-12-01',
    courtDate: '2024-02-15',
    priority: 'medium',
    evidence: 5,
  },
  {
    id: '5',
    caseNumber: 'CR/2024/005',
    title: 'Vandalism Case',
    status: 'closed',
    assignedTo: 'David Okonkwo',
    createdAt: '2023-11-15',
    courtDate: '2024-01-10',
    priority: 'low',
    evidence: 1,
  },
];

const STATUS_COLORS: Record<string, string> = {
  open: 'bg-blue-500/20 text-blue-700',
  investigation: 'bg-purple-500/20 text-purple-700',
  'awaiting-prosecution': 'bg-orange-500/20 text-orange-700',
  'in-court': 'bg-yellow-500/20 text-yellow-700',
  closed: 'bg-green-500/20 text-green-700',
  dismissed: 'bg-red-500/20 text-red-700',
};

const PRIORITY_COLORS: Record<string, string> = {
  low: 'text-green-600',
  medium: 'text-yellow-600',
  high: 'text-red-600',
};

export default function CasesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredCases = mockCases.filter(caseItem => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || caseItem.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <ProtectedLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cases</h1>
            <p className="text-muted-foreground mt-1">Manage criminal cases and investigations</p>
          </div>
          <Link href="/cases/new">
            <Button className="bg-primary hover:bg-primary/90 text-sidebar-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              New Case
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
                  placeholder="Search by case number or title..."
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
                <option value="open">Open</option>
                <option value="investigation">Investigation</option>
                <option value="awaiting-prosecution">Awaiting Prosecution</option>
                <option value="in-court">In Court</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Cases List */}
        <div className="space-y-3">
          {filteredCases.length > 0 ? (
            filteredCases.map((caseItem) => (
              <Link key={caseItem.id} href={`/cases/${caseItem.id}`}>
                <Card className="border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {/* Case Info */}
                      <div className="md:col-span-2">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{caseItem.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{caseItem.caseNumber}</p>
                          </div>
                        </div>
                      </div>

                      {/* Assigned Officer */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Assigned To</p>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">{caseItem.assignedTo}</span>
                        </div>
                      </div>

                      {/* Court Date */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Court Date</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">
                            {caseItem.courtDate || 'Not Set'}
                          </span>
                        </div>
                      </div>

                      {/* Status and Priority */}
                      <div className="flex flex-col justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium w-fit ${STATUS_COLORS[caseItem.status]}`}>
                          {caseItem.status.replace('-', ' ')}
                        </span>
                        <div className="flex items-center gap-2 mt-2 text-sm">
                          <span className={`font-medium ${PRIORITY_COLORS[caseItem.priority]}`}>
                            {caseItem.priority}
                          </span>
                          <span className="text-muted-foreground text-xs">Priority</span>
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
                <FileText className="w-12 h-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No cases found</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Cases</p>
              <p className="text-2xl font-bold text-foreground mt-2">{mockCases.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Under Investigation</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">
                {mockCases.filter(c => c.status === 'investigation').length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">In Court</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">
                {mockCases.filter(c => c.status === 'in-court').length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Closed</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {mockCases.filter(c => c.status === 'closed').length}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  );
}
