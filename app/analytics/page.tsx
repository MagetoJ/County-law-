'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
} from 'lucide-react';

export default function AnalyticsPage() {
  const mockCrimeTrends = [
    { month: 'Jan', assaults: 45, robberies: 32, thefts: 58, frauds: 12 },
    { month: 'Feb', assaults: 52, robberies: 28, thefts: 65, frauds: 15 },
    { month: 'Mar', assaults: 38, robberies: 45, thefts: 48, frauds: 18 },
    { month: 'Apr', assaults: 61, robberies: 38, thefts: 72, frauds: 22 },
    { month: 'May', assaults: 55, robberies: 42, thefts: 68, frauds: 19 },
    { month: 'Jun', assaults: 48, robberies: 35, thefts: 62, frauds: 16 },
  ];

  const mockResponseTimes = [
    { month: 'Jan', avgTime: 18 },
    { month: 'Feb', avgTime: 16 },
    { month: 'Mar', avgTime: 14 },
    { month: 'Apr', avgTime: 12 },
    { month: 'May', avgTime: 11 },
    { month: 'Jun', avgTime: 12 },
  ];

  const mockOfficerPerformance = [
    { name: 'John Kipchoge', cases: 45, avgTime: '5.2 days', satisfaction: 4.8 },
    { name: 'Mary Okonkwo', cases: 38, avgTime: '6.1 days', satisfaction: 4.7 },
    { name: 'Peter Kipchoge', cases: 35, avgTime: '5.8 days', satisfaction: 4.6 },
    { name: 'Sarah Mutua', cases: 32, avgTime: '6.5 days', satisfaction: 4.5 },
    { name: 'David Okonkwo', cases: 28, avgTime: '7.2 days', satisfaction: 4.4 },
  ];

  return (
    <ProtectedLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">Crime trends, performance metrics, and operational insights</p>
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Crime Incidents (6mo)</p>
                  <p className="text-3xl font-bold text-foreground mt-2">1,247</p>
                  <p className="text-xs text-green-600 mt-2">↓ 12% vs previous</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-3xl font-bold text-foreground mt-2">12 min</p>
                  <p className="text-xs text-green-600 mt-2">↓ 33% improvement</p>
                </div>
                <Clock className="w-8 h-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Case Clearance Rate</p>
                  <p className="text-3xl font-bold text-foreground mt-2">78%</p>
                  <p className="text-xs text-green-600 mt-2">↑ 5% increase</p>
                </div>
                <CheckCircle className="w-8 h-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Cases</p>
                  <p className="text-3xl font-bold text-foreground mt-2">156</p>
                  <p className="text-xs text-yellow-600 mt-2">42 awaiting prosecution</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Crime Trends */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Crime Trends (6 Months)</CardTitle>
              <CardDescription>Monthly incident statistics by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCrimeTrends.map((trend) => (
                  <div key={trend.month}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">{trend.month}</span>
                      <span className="text-sm text-muted-foreground">
                        {trend.assaults + trend.robberies + trend.thefts + trend.frauds} total
                      </span>
                    </div>
                    <div className="flex gap-1 h-8">
                      <div 
                        className="bg-red-600 rounded-l" 
                        style={{ flex: trend.assaults }}
                        title={`Assaults: ${trend.assaults}`}
                      ></div>
                      <div 
                        className="bg-orange-600" 
                        style={{ flex: trend.robberies }}
                        title={`Robberies: ${trend.robberies}`}
                      ></div>
                      <div 
                        className="bg-yellow-600" 
                        style={{ flex: trend.thefts }}
                        title={`Thefts: ${trend.thefts}`}
                      ></div>
                      <div 
                        className="bg-purple-600 rounded-r" 
                        style={{ flex: trend.frauds }}
                        title={`Frauds: ${trend.frauds}`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                  <span>Assaults</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                  <span>Robberies</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                  <span>Thefts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                  <span>Frauds</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Response Times */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Average Response Time</CardTitle>
              <CardDescription>Monthly trend in response efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockResponseTimes.map((item) => (
                  <div key={item.month}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">{item.month}</span>
                      <span className="text-sm font-semibold text-primary">{item.avgTime} min</span>
                    </div>
                    <div className="w-full h-6 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                        style={{ width: `${(30 - item.avgTime) / 30 * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm text-green-700 font-medium">↓ 33% improvement in response time this year</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Officer Performance */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Top Performing Officers</CardTitle>
            <CardDescription>Based on cases handled, resolution time, and satisfaction ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Officer</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">Cases</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">Avg Resolution</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">Satisfaction</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOfficerPerformance.map((officer, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-foreground">{officer.name}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="font-semibold text-foreground">{officer.cases}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-foreground">{officer.avgTime}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span 
                                key={i}
                                className={`text-xs ${i < Math.round(officer.satisfaction) ? '⭐' : '☆'}`}
                              >
                                {i < Math.round(officer.satisfaction) ? '⭐' : '☆'}
                              </span>
                            ))}
                          </div>
                          <span className="text-sm font-medium text-foreground">{officer.satisfaction}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
}
