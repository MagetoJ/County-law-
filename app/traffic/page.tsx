'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Car, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const mockTraffic = [
  {
    id: '1',
    vehicleNumber: 'KCN 123 A',
    driverName: 'James Kipchoge',
    violationType: 'speeding',
    fine: 5000,
    location: 'Nairobi, CBD',
    recordedAt: '2024-01-25',
    status: 'issued',
    paymentMethod: null,
  },
  {
    id: '2',
    vehicleNumber: 'KDC 456 B',
    driverName: 'Mary Okonkwo',
    violationType: 'reckless-driving',
    fine: 8000,
    location: 'Nairobi, Mombasa Road',
    recordedAt: '2024-01-24',
    status: 'paid',
    paymentMethod: 'mpesa',
  },
  {
    id: '3',
    vehicleNumber: 'KBX 789 C',
    driverName: 'Peter Kipchoge',
    violationType: 'no-insurance',
    fine: 10000,
    location: 'Nairobi, Westlands',
    recordedAt: '2024-01-23',
    status: 'pending',
    paymentMethod: null,
  },
  {
    id: '4',
    vehicleNumber: 'KAM 234 D',
    driverName: 'Sarah Mutua',
    violationType: 'expired-docs',
    fine: 3000,
    location: 'Nairobi, Karen',
    recordedAt: '2024-01-22',
    status: 'paid',
    paymentMethod: 'cash',
  },
  {
    id: '5',
    vehicleNumber: 'KBT 567 E',
    driverName: 'David Okonkwo',
    violationType: 'speeding',
    fine: 5000,
    location: 'Nairobi, Kilimani',
    recordedAt: '2024-01-21',
    status: 'appealed',
    paymentMethod: null,
  },
];

const VIOLATION_TYPES: Record<string, string> = {
  speeding: 'Speeding',
  'reckless-driving': 'Reckless Driving',
  'no-license': 'No License',
  'no-insurance': 'No Insurance',
  'expired-docs': 'Expired Documents',
  other: 'Other',
};

const STATUS_COLORS: Record<string, string> = {
  issued: 'bg-blue-500/20 text-blue-700',
  paid: 'bg-green-500/20 text-green-700',
  pending: 'bg-yellow-500/20 text-yellow-700',
  appealed: 'bg-purple-500/20 text-purple-700',
};

export default function TrafficPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTraffic = mockTraffic.filter(violation => {
    const matchesSearch = violation.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         violation.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || violation.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalFines = filteredTraffic.reduce((sum, v) => sum + v.fine, 0);
  const collectedFines = filteredTraffic.filter(v => v.status === 'paid').reduce((sum, v) => sum + v.fine, 0);

  return (
    <ProtectedLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Traffic Violations</h1>
            <p className="text-muted-foreground mt-1">Manage and track traffic violations and fines</p>
          </div>
          <Link href="/traffic/new">
            <Button className="bg-primary hover:bg-primary/90 text-sidebar-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Record Violation
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
                  placeholder="Search by vehicle number or driver name..."
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
                <option value="issued">Issued</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="appealed">Appealed</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Violations List */}
        <div className="space-y-3">
          {filteredTraffic.length > 0 ? (
            filteredTraffic.map((violation) => (
              <Link key={violation.id} href={`/traffic/${violation.id}`}>
                <Card className="border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {/* Vehicle Info */}
                      <div className="md:col-span-2">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <Car className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{violation.vehicleNumber}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{violation.driverName}</p>
                            <p className="text-xs text-muted-foreground mt-1">{VIOLATION_TYPES[violation.violationType as keyof typeof VIOLATION_TYPES]}</p>
                          </div>
                        </div>
                      </div>

                      {/* Fine Amount */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Fine Amount</p>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-bold text-foreground">KES {violation.fine.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Date */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Recorded</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">{violation.recordedAt}</span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex flex-col justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium w-fit ${STATUS_COLORS[violation.status]}`}>
                          {violation.status.replace('-', ' ')}
                        </span>
                        {violation.paymentMethod && (
                          <p className="text-xs text-muted-foreground mt-2">Paid via {violation.paymentMethod}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Card className="border-border border-dashed">
              <CardContent className="pt-12 pb-12 flex flex-col items-center justify-center">
                <Car className="w-12 h-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No violations found</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Violations</p>
              <p className="text-2xl font-bold text-foreground mt-2">{filteredTraffic.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Fines (KES)</p>
              <p className="text-2xl font-bold text-foreground mt-2">{(totalFines / 1000).toFixed(1)}K</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Collected (KES)</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{(collectedFines / 1000).toFixed(1)}K</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">
                {filteredTraffic.filter(v => v.status === 'pending' || v.status === 'issued').length}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  );
}
