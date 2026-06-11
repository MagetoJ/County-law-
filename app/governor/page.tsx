'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, AlertCircle, Users, MapPin, Target } from 'lucide-react';

export default function GovernorDashboardPage() {
  const countyStats = {
    name: 'Nairobi County',
    population: '4,397,073',
    crimeIndex: 72,
    crimeIndexTrend: -8,
    incidentsMonth: 847,
    incidentsTrend: -12,
    caseClearance: '68%',
    caseTrend: 5,
    policeForce: 2150,
    responseTime: '12.4 min',
    responseTrend: -2.1,
  };

  const subCounties = [
    { name: 'Nairobi Central', incidents: 245, clearance: 72, officers: 450 },
    { name: 'Embakasi', incidents: 189, clearance: 65, officers: 380 },
    { name: 'Westlands', incidents: 156, clearance: 71, officers: 340 },
    { name: 'Dagoretti', incidents: 134, clearance: 68, officers: 320 },
    { name: 'Kasarani', incidents: 123, clearance: 64, officers: 300 },
  ];

  const topCrimes = [
    { type: 'Theft', count: 289, trend: -15 },
    { type: 'Robbery', count: 156, trend: -8 },
    { type: 'Assault', count: 143, trend: 5 },
    { type: 'Fraud', count: 98, trend: 3 },
    { type: 'Vehicle Theft', count: 87, trend: -20 },
  ];

  const initiatives = [
    {
      name: 'Community Policing Program',
      status: 'Active',
      counties: 3,
      impact: '+15% community engagement',
    },
    {
      name: 'Traffic Safety Campaign',
      status: 'In Progress',
      counties: 8,
      impact: '-23% traffic incidents',
    },
    {
      name: 'Cybercrime Task Force',
      status: 'Active',
      counties: 5,
      impact: '+45% arrests',
    },
  ];

  return (
    <ProtectedLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{countyStats.name} Command Center</h1>
          <p className="text-muted-foreground">County-level security overview and KPIs</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-secondary">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Crime Index</p>
                  {countyStats.crimeIndexTrend < 0 ? (
                    <TrendingDown className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <p className="text-3xl font-bold text-foreground">{countyStats.crimeIndex}</p>
                <p className={`text-xs ${countyStats.crimeIndexTrend < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {countyStats.crimeIndexTrend}% from last month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-secondary">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Incidents This Month</p>
                  {countyStats.incidentsTrend < 0 ? (
                    <TrendingDown className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <p className="text-3xl font-bold text-accent">{countyStats.incidentsMonth}</p>
                <p className={`text-xs ${countyStats.incidentsTrend < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {countyStats.incidentsTrend}% from last month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-secondary">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Case Clearance Rate</p>
                  {countyStats.caseTrend > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <p className="text-3xl font-bold text-foreground">{countyStats.caseClearance}</p>
                <p className={`text-xs ${countyStats.caseTrend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  +{countyStats.caseTrend}% from last month
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="subcounties" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="subcounties">Sub-Counties</TabsTrigger>
            <TabsTrigger value="crimes">Crime Trends</TabsTrigger>
            <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Sub-Counties */}
          <TabsContent value="subcounties" className="space-y-4 mt-6">
            <Card className="bg-card border-secondary">
              <CardHeader>
                <CardTitle className="text-foreground">Sub-County Performance</CardTitle>
                <CardDescription>Incident and clearance rates by division</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {subCounties.map((sub) => (
                    <div key={sub.name} className="p-4 bg-secondary/20 rounded-lg border border-secondary">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-accent" />
                          <div>
                            <p className="font-semibold text-foreground">{sub.name}</p>
                            <p className="text-xs text-muted-foreground">{sub.officers} officers</p>
                          </div>
                        </div>
                        <Badge className="bg-accent text-accent-foreground">{sub.clearance}% clearance</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{sub.incidents} incidents</span>
                        <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent"
                            style={{ width: `${(sub.incidents / 250) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Crime Trends */}
          <TabsContent value="crimes" className="space-y-4 mt-6">
            <Card className="bg-card border-secondary">
              <CardHeader>
                <CardTitle className="text-foreground">Top Crime Types</CardTitle>
                <CardDescription>Most prevalent crime categories this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCrimes.map((crime) => (
                    <div key={crime.type} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{crime.type}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-accent">{crime.count}</span>
                          <span className={`text-xs ${crime.trend < 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {crime.trend > 0 ? '+' : ''}{crime.trend}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent"
                          style={{ width: `${(crime.count / 289) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Initiatives */}
          <TabsContent value="initiatives" className="space-y-4 mt-6">
            <Card className="bg-card border-secondary">
              <CardHeader>
                <CardTitle className="text-foreground">Security Initiatives</CardTitle>
                <CardDescription>Ongoing county security programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {initiatives.map((init) => (
                    <div key={init.name} className="p-4 bg-secondary/20 rounded-lg border border-secondary">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{init.name}</h4>
                        <Badge
                          className={init.status === 'Active' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'}
                        >
                          {init.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{init.counties} participating counties</p>
                      <p className="text-sm text-accent font-medium">{init.impact}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources */}
          <TabsContent value="resources" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-card border-secondary">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Police Force
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent">{countyStats.policeForce}</p>
                  <p className="text-sm text-muted-foreground mt-2">Active personnel</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-secondary">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Avg Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground">{countyStats.responseTime}</p>
                  <p className={`text-sm ${countyStats.responseTrend < 0 ? 'text-green-600' : 'text-red-600'} mt-2`}>
                    {countyStats.responseTrend}% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedLayout>
  );
}
