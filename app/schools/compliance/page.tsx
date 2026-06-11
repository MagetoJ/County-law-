'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { INSPECTION_CATEGORIES } from '@/lib/constants';
import { SchoolInspection } from '@/lib/types';
import { CheckCircle, AlertCircle, Calendar } from 'lucide-react';

const MOCK_INSPECTIONS: SchoolInspection[] = [
  {
    id: '1',
    schoolId: '1',
    inspectionDate: '2023-11-10',
    inspectorName: 'Dr. Margaret Kipchoge',
    inspectorId: 'INS-001',
    overallRating: 8.5,
    findings: [
      {
        category: 'infrastructure',
        rating: 8,
        comment: 'Good condition of buildings. Library needs renovation.',
      },
      {
        category: 'teaching',
        rating: 9,
        comment: 'Excellent teaching standards and lesson preparation observed.',
      },
      {
        category: 'safety',
        rating: 8,
        comment: 'Fire safety measures in place. Security fence needs improvement.',
      },
      {
        category: 'health',
        rating: 8.5,
        comment: 'Good health and sanitation practices. Water supply adequate.',
      },
      {
        category: 'management',
        rating: 8.5,
        comment: 'Strong school management. Records well maintained.',
      },
    ],
    recommendations: [
      'Renovate library wing to modern standards',
      'Upgrade security fence around school compound',
      'Conduct staff training on emergency procedures',
      'Implement student mentorship program',
    ],
    nextInspectionDate: '2024-11-10',
    status: 'completed',
  },
  {
    id: '2',
    schoolId: '1',
    inspectionDate: '2022-11-15',
    inspectorName: 'Mr. John Mwangi',
    inspectorId: 'INS-002',
    overallRating: 7.8,
    findings: [
      {
        category: 'infrastructure',
        rating: 7,
        comment: 'Some classrooms require maintenance.',
      },
      {
        category: 'teaching',
        rating: 8,
        comment: 'Good teaching practices observed.',
      },
      {
        category: 'safety',
        rating: 7.5,
        comment: 'Security measures need strengthening.',
      },
      {
        category: 'health',
        rating: 8,
        comment: 'Health facilities adequate.',
      },
      {
        category: 'management',
        rating: 8.5,
        comment: 'Excellent school management.',
      },
    ],
    recommendations: [
      'Repair damaged classroom desks',
      'Install security gates',
      'Upgrade water storage facilities',
    ],
    nextInspectionDate: '2023-11-15',
    status: 'completed',
  },
];

export default function CompliancePage() {
  const averageRating = (
    MOCK_INSPECTIONS.reduce((sum, i) => sum + i.overallRating, 0) / MOCK_INSPECTIONS.length
  ).toFixed(1);

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">School Inspections & Compliance</h1>
            <p className="text-muted-foreground mt-2">Track school inspection reports and compliance status</p>
          </div>

          {/* Overall Rating */}
          <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-2">Overall Compliance Rating</p>
                <p className="text-4xl font-bold text-foreground">{averageRating}/10</p>
                <p className="text-sm text-muted-foreground mt-2">Based on {MOCK_INSPECTIONS.length} inspections</p>
              </div>
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-200/50 text-blue-700">
                <p className="text-3xl font-bold">{averageRating}</p>
              </div>
            </div>
          </Card>

          {/* Inspections */}
          <div className="space-y-6">
            {MOCK_INSPECTIONS.map((inspection) => (
              <Card key={inspection.id} className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6 pb-4 border-b border-border">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {new Date(inspection.inspectionDate).toLocaleDateString()}
                      </p>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Inspection Report</h3>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {inspection.status === 'completed' ? 'Completed' : 'Pending'}
                    </Badge>
                    <p className="text-2xl font-bold text-foreground">{inspection.overallRating}/10</p>
                  </div>
                </div>

                {/* Inspector Details */}
                <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Inspector</p>
                  <p className="font-semibold text-foreground">{inspection.inspectorName} ({inspection.inspectorId})</p>
                </div>

                {/* Findings */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold text-foreground mb-4">Findings by Category</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {inspection.findings.map((finding) => {
                      const ratingColor =
                        finding.rating >= 8
                          ? 'text-green-600'
                          : finding.rating >= 6
                          ? 'text-yellow-600'
                          : 'text-red-600';
                      return (
                        <div key={finding.category} className="border border-border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <p className="font-semibold text-foreground capitalize">
                              {INSPECTION_CATEGORIES[finding.category as keyof typeof INSPECTION_CATEGORIES]}
                            </p>
                            <span className={`text-lg font-bold ${ratingColor}`}>{finding.rating}/10</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{finding.comment}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-base font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {inspection.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm text-blue-800 flex gap-2">
                        <span className="font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Inspection */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Next Inspection Due</p>
                  <p className="font-semibold text-foreground">
                    {new Date(inspection.nextInspectionDate).toLocaleDateString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Compliance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="p-4">
              <p className="text-muted-foreground text-sm mb-2">Total Inspections</p>
              <p className="text-3xl font-bold text-foreground">{MOCK_INSPECTIONS.length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground text-sm mb-2">Compliance Status</p>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-lg font-bold text-foreground">Compliant</p>
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground text-sm mb-2">Outstanding Issues</p>
              <p className="text-3xl font-bold text-orange-600">
                {MOCK_INSPECTIONS.reduce((sum, i) => sum + i.recommendations.length, 0)}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
