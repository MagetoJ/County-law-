'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, TrendingUp, Award } from 'lucide-react';

const COMPARISON_SCHOOLS = [
  {
    name: 'Nairobi High School',
    county: 'Nairobi',
    students: 1200,
    teachers: 65,
    ranking: 1,
    avgScore: 535,
    passRate: 95,
  },
  {
    name: 'Nakuru Academy',
    county: 'Nakuru',
    students: 1100,
    teachers: 60,
    ranking: 2,
    avgScore: 528,
    passRate: 93,
  },
  {
    name: 'Mombasa Secondary School',
    county: 'Mombasa',
    students: 1300,
    teachers: 70,
    ranking: 3,
    avgScore: 520,
    passRate: 91,
  },
];

export default function ComparisonPage() {
  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">School Comparison</h1>
            <p className="text-muted-foreground mt-2">Compare performance metrics across schools</p>
          </div>

          {/* Comparison Table */}
          <Card className="overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">School</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">County</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Students</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Teachers</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Ranking</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Avg Score</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Pass Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_SCHOOLS.map((school, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/30">
                      <td className="px-6 py-4 text-foreground font-semibold">{school.name}</td>
                      <td className="px-6 py-4 text-center text-muted-foreground">{school.county}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{school.students}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{school.teachers}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge variant="secondary">#{school.ranking}</Badge>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-foreground">{school.avgScore}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 bg-green-100/50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          <TrendingUp className="w-4 h-4" />
                          {school.passRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Student Capacity</h3>
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div className="space-y-3">
                {COMPARISON_SCHOOLS.map((school) => (
                  <div key={school.name} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{school.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full"
                          style={{ width: `${(school.students / 1300) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-foreground">{school.students}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Academic Performance</h3>
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div className="space-y-3">
                {COMPARISON_SCHOOLS.map((school) => (
                  <div key={school.name} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{school.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(school.passRate / 100) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-foreground">{school.passRate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Staff Strength</h3>
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-3">
                {COMPARISON_SCHOOLS.map((school) => (
                  <div key={school.name} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{school.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(school.teachers / 70) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-foreground">{school.teachers}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Key Insights */}
          <Card className="mt-8 p-6 bg-blue-50 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Key Insights</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Nairobi High School leads in pass rate at 95% with consistent performance</li>
              <li>• Mombasa Secondary School has the highest student enrollment at 1,300</li>
              <li>• Average pass rate across selected schools is 93%</li>
              <li>• Student-to-teacher ratio averages 1:18.5 across all schools</li>
            </ul>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  );
}
