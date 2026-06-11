'use client';

import { useState } from 'react';
import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import { TEACHER_DESIGNATION, TEACHER_STATUS } from '@/lib/constants';
import { Teacher } from '@/lib/types';
import { Search, Mail, Phone, BookOpen } from 'lucide-react';

const MOCK_TEACHERS: Teacher[] = [
  {
    id: '1',
    schoolId: '1',
    tscNumber: 'TSC123456',
    firstName: 'John',
    lastName: 'Kipchoge',
    email: 'john.kipchoge@school.ac.ke',
    phone: '+254721234567',
    subjects: ['Mathematics', 'Physics'],
    joinDate: '2010-01-15',
    qualifications: ['B.Sc. Mathematics', 'Diploma in Education'],
    status: 'active',
    designation: 'teacher',
  },
  {
    id: '2',
    schoolId: '1',
    tscNumber: 'TSC123457',
    firstName: 'Sarah',
    lastName: 'Njoroge',
    email: 'sarah.njoroge@school.ac.ke',
    phone: '+254722345678',
    subjects: ['English', 'Literature'],
    joinDate: '2015-06-10',
    qualifications: ['B.A. English', 'Diploma in Education'],
    status: 'active',
    designation: 'teacher',
  },
  {
    id: '3',
    schoolId: '1',
    tscNumber: 'TSC123458',
    firstName: 'James',
    lastName: 'Mwangi',
    email: 'james.mwangi@school.ac.ke',
    phone: '+254723456789',
    subjects: ['Biology', 'Chemistry'],
    joinDate: '2012-03-20',
    qualifications: ['B.Sc. Biology', 'Diploma in Education'],
    status: 'active',
    designation: 'deputy-head',
  },
  {
    id: '4',
    schoolId: '1',
    tscNumber: 'TSC123459',
    firstName: 'Dr. Peter',
    lastName: 'Kimani',
    email: 'peter.kimani@school.ac.ke',
    phone: '+254724567890',
    subjects: ['Mathematics', 'Additional Mathematics'],
    joinDate: '2005-08-01',
    qualifications: ['Ph.D. Mathematics', 'M.Ed', 'Diploma in Education'],
    status: 'active',
    designation: 'head-teacher',
  },
];

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');

  const filteredTeachers = MOCK_TEACHERS.filter((teacher) => {
    const matchesSearch =
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.tscNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || teacher.status === selectedStatus;
    const matchesDesignation = !selectedDesignation || teacher.designation === selectedDesignation;
    return matchesSearch && matchesStatus && matchesDesignation;
  });

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Teacher Management</h1>
            <p className="text-muted-foreground mt-2">Monitor and manage teacher profiles and assignments</p>
          </div>

          {/* Filters */}
          <Card className="p-4 md:p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Name or TSC number..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={selectedDesignation} onValueChange={setSelectedDesignation}>
                <option value="">All Designations</option>
                {Object.entries(TEACHER_DESIGNATION).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <option value="">All Status</option>
                {Object.entries(TEACHER_STATUS).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Select>
            </div>
          </Card>

          {/* Teachers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
              <Card key={teacher.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {teacher.firstName} {teacher.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">{teacher.tscNumber}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      teacher.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {TEACHER_STATUS[teacher.status as keyof typeof TEACHER_STATUS]}
                  </Badge>
                </div>

                <div className="mb-4 pb-4 border-b border-border">
                  <Badge variant="secondary" className="mb-2">
                    {TEACHER_DESIGNATION[teacher.designation as keyof typeof TEACHER_DESIGNATION]}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    Joined: {new Date(teacher.joinDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground truncate">{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{teacher.phone}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    Subjects
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map((subject) => (
                      <Badge key={subject} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground mb-2">Qualifications</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {teacher.qualifications.map((qual, idx) => (
                      <li key={idx}>• {qual}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>

          {filteredTeachers.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No teachers found matching your criteria.</p>
            </Card>
          )}

          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Total Teachers</p>
              <p className="text-2xl font-bold text-foreground mt-2">{MOCK_TEACHERS.length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Active</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {MOCK_TEACHERS.filter(t => t.status === 'active').length}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Head Teachers</p>
              <p className="text-2xl font-bold text-foreground mt-2">
                {MOCK_TEACHERS.filter(t => t.designation === 'head-teacher').length}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Unique Subjects</p>
              <p className="text-2xl font-bold text-foreground mt-2">
                {new Set(MOCK_TEACHERS.flatMap(t => t.subjects)).size}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
