'use client';

import { useState, useMemo } from 'react';
import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RANKING_TIERS, EXAM_TYPES, KENYAN_COUNTIES } from '@/lib/constants';
import { SchoolRanking, AcademicResult } from '@/lib/types';
import { Search, TrendingUp, TrendingDown, Minus, Star } from 'lucide-react';

const MOCK_RANKINGS: SchoolRanking[] = [
  {
    id: '1',
    schoolId: '1',
    schoolName: 'Nairobi High School',
    county: 'Nairobi',
    rankingYear: 2023,
    position: 1,
    tier: 'platinum',
    score: 9.2,
    previousRank: 2,
    trendingDirection: 'up',
  },
  {
    id: '2',
    schoolId: '2',
    schoolName: 'Nakuru Academy',
    county: 'Nakuru',
    rankingYear: 2023,
    position: 2,
    tier: 'platinum',
    score: 8.9,
    previousRank: 1,
    trendingDirection: 'down',
  },
  {
    id: '3',
    schoolId: '3',
    schoolName: 'Mombasa Secondary School',
    county: 'Mombasa',
    rankingYear: 2023,
    position: 3,
    tier: 'gold',
    score: 8.6,
    previousRank: 3,
    trendingDirection: 'stable',
  },
  {
    id: '4',
    schoolId: '4',
    schoolName: 'Eldoret High School',
    county: 'Uasin Gishu',
    rankingYear: 2023,
    position: 4,
    tier: 'gold',
    score: 8.3,
    previousRank: 5,
    trendingDirection: 'up',
  },
  {
    id: '5',
    schoolId: '5',
    schoolName: 'Kisumu Mixed School',
    county: 'Kisumu',
    rankingYear: 2023,
    position: 5,
    tier: 'gold',
    score: 8.0,
    previousRank: 4,
    trendingDirection: 'down',
  },
];

const MOCK_RESULTS: AcademicResult[] = [
  {
    id: '1',
    schoolId: '1',
    examYear: 2023,
    examType: 'kcse',
    totalStudents: 250,
    totalMarks: 2100,
    averageMarks: 535,
    passRate: 95,
    gradeDistribution: { a: 45, b: 60, c: 100, d: 40, e: 5 },
    topScore: 413,
    uploadedDate: '2023-09-15',
    uploadedBy: 'Principal',
  },
  {
    id: '2',
    schoolId: '2',
    examYear: 2023,
    examType: 'kcpe',
    totalStudents: 200,
    totalMarks: 1600,
    averageMarks: 420,
    passRate: 92,
    gradeDistribution: { a: 35, b: 55, c: 80, d: 25, e: 5 },
    topScore: 426,
    uploadedDate: '2023-09-20',
    uploadedBy: 'Principal',
  },
];

const getTierColor = (tier: string) => {
  const colors: Record<string, string> = {
    platinum: 'from-slate-300 to-slate-500',
    gold: 'from-yellow-300 to-yellow-500',
    silver: 'from-gray-300 to-gray-500',
    bronze: 'from-orange-300 to-orange-500',
  };
  return colors[tier] || colors.bronze;
};

export default function AcademicPerformancePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedExam, setSelectedExam] = useState('');

  const filteredRankings = useMemo(() => {
    return MOCK_RANKINGS.filter((ranking) => {
      const matchesSearch = ranking.schoolName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCounty = !selectedCounty || ranking.county === selectedCounty;
      return matchesSearch && matchesCounty;
    });
  }, [searchTerm, selectedCounty]);

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Academic Performance & Rankings</h1>
            <p className="text-muted-foreground mt-2">Track school rankings and examination results</p>
          </div>

          {/* Filters */}
          <Card className="p-4 md:p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Search School</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by school name..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={selectedCounty} onValueChange={setSelectedCounty}>
                <option value="">All Counties</option>
                {KENYAN_COUNTIES.slice(0, 10).map((county) => (
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
              </Select>
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <option value="">All Exams</option>
                {Object.entries(EXAM_TYPES).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Select>
            </div>
          </Card>

          {/* Rankings Table */}
          <Card className="mb-8 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">School Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">County</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Score</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Tier</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRankings.map((ranking) => (
                    <tr key={ranking.id} className="border-b border-border hover:bg-muted/30">
                      <td className="px-6 py-4 text-foreground font-semibold">#{ranking.position}</td>
                      <td className="px-6 py-4 text-foreground">{ranking.schoolName}</td>
                      <td className="px-6 py-4 text-muted-foreground">{ranking.county}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-foreground">{ranking.score.toFixed(1)}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge className={`bg-gradient-to-r ${getTierColor(ranking.tier)} text-white`}>
                          <Star className="w-3 h-3 mr-1" />
                          {RANKING_TIERS[ranking.tier as keyof typeof RANKING_TIERS]}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {ranking.trendingDirection === 'up' && (
                          <div className="flex items-center justify-center gap-1 text-green-600">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm">Up</span>
                          </div>
                        )}
                        {ranking.trendingDirection === 'down' && (
                          <div className="flex items-center justify-center gap-1 text-red-600">
                            <TrendingDown className="w-4 h-4" />
                            <span className="text-sm">Down</span>
                          </div>
                        )}
                        {ranking.trendingDirection === 'stable' && (
                          <div className="flex items-center justify-center gap-1 text-yellow-600">
                            <Minus className="w-4 h-4" />
                            <span className="text-sm">Stable</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Exam Results */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Recent Exam Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_RESULTS.map((result) => (
                <Card key={result.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {EXAM_TYPES[result.examType as keyof typeof EXAM_TYPES]} {result.examYear}
                      </Badge>
                      <h3 className="text-lg font-semibold text-foreground">School Results</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">Total Students</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{result.totalStudents}</p>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">Average Score</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{result.averageMarks}</p>
                    </div>
                  </div>

                  <div className="bg-green-100/50 border border-green-200 p-3 rounded-lg mb-4">
                    <p className="text-xs text-green-700 font-medium">Pass Rate</p>
                    <p className="text-2xl font-bold text-green-700 mt-1">{result.passRate}%</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Grade Distribution</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Grade A:</span>
                        <span className="font-semibold">{result.gradeDistribution.a}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Grade B:</span>
                        <span className="font-semibold">{result.gradeDistribution.b}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Grade C:</span>
                        <span className="font-semibold">{result.gradeDistribution.c}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Grade D:</span>
                        <span className="font-semibold">{result.gradeDistribution.d}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Grade E:</span>
                        <span className="font-semibold">{result.gradeDistribution.e}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                    <p>Uploaded: {new Date(result.uploadedDate).toLocaleDateString()}</p>
                    <p>By: {result.uploadedBy}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
