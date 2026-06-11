'use client';

import { useState, useMemo } from 'react';
import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import { SCHOOL_STATUS, SCHOOL_TYPES, KENYAN_COUNTIES } from '@/lib/constants';
import { School } from '@/lib/types';
import { Search, Plus, MapPin, Users, Phone } from 'lucide-react';
import Link from 'next/link';

const MOCK_SCHOOLS: School[] = [
  {
    id: '1',
    name: 'Nairobi High School',
    registrationNumber: 'NHS-001',
    type: 'secondary',
    county: 'Nairobi',
    constituency: 'Embakasi East',
    ward: 'Embakasi Central',
    location: { latitude: -1.3139, longitude: 36.8835, address: 'Nairobi' },
    principalName: 'Dr. James Kipchoge',
    principalPhone: '+254721234567',
    principalEmail: 'principal@nairobirhs.ac.ke',
    studentCount: 1200,
    teacherCount: 65,
    boardMembers: 8,
    yearEstablished: 1965,
    status: 'active',
    contactPhone: '+254201234567',
    contactEmail: 'info@nairobirhs.ac.ke',
  },
  {
    id: '2',
    name: 'Mombasa Primary School',
    registrationNumber: 'MPS-002',
    type: 'primary',
    county: 'Mombasa',
    constituency: 'Mombasa',
    ward: 'Mombasa Central',
    location: { latitude: -4.0435, longitude: 39.6682, address: 'Mombasa' },
    principalName: 'Mrs. Fatuma Mohamed',
    principalPhone: '+254722345678',
    principalEmail: 'principal@mombaspri.ac.ke',
    studentCount: 800,
    teacherCount: 40,
    boardMembers: 6,
    yearEstablished: 1980,
    status: 'active',
    contactPhone: '+254412345678',
    contactEmail: 'info@mombaspri.ac.ke',
  },
  {
    id: '3',
    name: 'Kisumu Mixed School',
    registrationNumber: 'KMS-003',
    type: 'mixed',
    county: 'Kisumu',
    constituency: 'Kisumu Central',
    ward: 'Kisumu Central',
    location: { latitude: -0.1022, longitude: 34.7617, address: 'Kisumu' },
    principalName: 'Mr. Peter Ochieng',
    principalPhone: '+254723456789',
    principalEmail: 'principal@kisumumixt.ac.ke',
    studentCount: 950,
    teacherCount: 52,
    boardMembers: 7,
    yearEstablished: 1990,
    status: 'active',
    contactPhone: '+254572345678',
    contactEmail: 'info@kisumumixt.ac.ke',
  },
  {
    id: '4',
    name: 'Nakuru Academy',
    registrationNumber: 'NAK-004',
    type: 'secondary',
    county: 'Nakuru',
    constituency: 'Nakuru Town',
    ward: 'Nakuru Central',
    location: { latitude: -0.3031, longitude: 36.0800, address: 'Nakuru' },
    principalName: 'Prof. David Kiplagat',
    principalPhone: '+254724567890',
    principalEmail: 'principal@nakurac.ac.ke',
    studentCount: 1100,
    teacherCount: 60,
    boardMembers: 8,
    yearEstablished: 1975,
    status: 'active',
    contactPhone: '+254512345678',
    contactEmail: 'info@nakurac.ac.ke',
  },
  {
    id: '5',
    name: 'Eldoret High School',
    registrationNumber: 'EHS-005',
    type: 'secondary',
    county: 'Uasin Gishu',
    constituency: 'Eldoret East',
    ward: 'Eldoret Central',
    location: { latitude: 0.5143, longitude: 35.2799, address: 'Eldoret' },
    principalName: 'Mrs. Alice Kipchoge',
    principalPhone: '+254725678901',
    principalEmail: 'principal@eldorethhs.ac.ke',
    studentCount: 1050,
    teacherCount: 58,
    boardMembers: 7,
    yearEstablished: 1985,
    status: 'active',
    contactPhone: '+254532345678',
    contactEmail: 'info@eldorethhs.ac.ke',
  },
  {
    id: '6',
    name: 'Mombasa Secondary School',
    registrationNumber: 'MSS-006',
    type: 'secondary',
    county: 'Mombasa',
    constituency: 'Mombasa',
    ward: 'Mvita',
    location: { latitude: -4.0468, longitude: 39.6642, address: 'Mombasa' },
    principalName: 'Mr. Hassan Salim',
    principalPhone: '+254726789012',
    principalEmail: 'principal@mombasess.ac.ke',
    studentCount: 1300,
    teacherCount: 70,
    boardMembers: 9,
    yearEstablished: 1970,
    status: 'active',
    contactPhone: '+254412345679',
    contactEmail: 'info@mombasess.ac.ke',
  },
];

export default function SchoolsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredSchools = useMemo(() => {
    return MOCK_SCHOOLS.filter((school) => {
      const matchesSearch =
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCounty = !selectedCounty || school.county === selectedCounty;
      const matchesType = !selectedType || school.type === selectedType;
      const matchesStatus = !selectedStatus || school.status === selectedStatus;

      return matchesSearch && matchesCounty && matchesType && matchesStatus;
    });
  }, [searchTerm, selectedCounty, selectedType, selectedStatus]);

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Schools Registry</h1>
              <p className="text-muted-foreground mt-2">Manage and track all schools across counties</p>
            </div>
            <Button className="w-full md:w-auto gap-2">
              <Plus className="w-4 h-4" />
              Register New School
            </Button>
          </div>

          {/* Filters */}
          <Card className="p-4 md:p-6 mb-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or registration number..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={selectedCounty} onValueChange={setSelectedCounty}>
                  <option value="">All Counties</option>
                  {KENYAN_COUNTIES.map((county) => (
                    <option key={county} value={county}>
                      {county}
                    </option>
                  ))}
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <option value="">All Types</option>
                  {Object.entries(SCHOOL_TYPES).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <option value="">All Status</option>
                  {Object.entries(SCHOOL_STATUS).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Select>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSelectedCounty('');
                  setSelectedType('');
                  setSelectedStatus('');
                }}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </Card>

          {/* Schools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchools.map((school) => (
              <Link key={school.id} href={`/schools/${school.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{school.name}</h3>
                      <p className="text-sm text-muted-foreground">{school.registrationNumber}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={school.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    >
                      {SCHOOL_STATUS[school.status as keyof typeof SCHOOL_STATUS]}
                    </Badge>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{school.ward}, {school.county}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{school.studentCount} students • {school.teacherCount} teachers</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{school.contactPhone}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      <strong>Principal:</strong> {school.principalName}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredSchools.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No schools found matching your criteria.</p>
            </Card>
          )}

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Total Schools</p>
              <p className="text-2xl font-bold text-foreground mt-2">{MOCK_SCHOOLS.length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Active</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{MOCK_SCHOOLS.filter(s => s.status === 'active').length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Total Students</p>
              <p className="text-2xl font-bold text-foreground mt-2">{(MOCK_SCHOOLS.reduce((sum, s) => sum + s.studentCount, 0) / 1000).toFixed(1)}k</p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Total Teachers</p>
              <p className="text-2xl font-bold text-foreground mt-2">{MOCK_SCHOOLS.reduce((sum, s) => sum + s.teacherCount, 0)}</p>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
