'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AlertCircle, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface KPIData {
  totalIncidents: number;
  incidentsThisMonth: number;
  averageResponseTime: number;
  caseClearanceRate: number;
  trafficFinesCollected: number;
  communityAlerts: number;
  activeOfficers: number;
  openCases: number;
}

const mockKPIData: KPIData = {
  totalIncidents: 1247,
  incidentsThisMonth: 89,
  averageResponseTime: 12,
  caseClearanceRate: 78,
  trafficFinesCollected: 2450000,
  communityAlerts: 34,
  activeOfficers: 156,
  openCases: 42,
};

const mockRecentIncidents = [
  { id: '1', title: 'Armed Robbery - Nairobi CBD', type: 'robbery', time: '2 hours ago', status: 'in-progress' },
  { id: '2', title: 'Vehicle Theft - Kilimani', type: 'theft', time: '4 hours ago', status: 'in-progress' },
  { id: '3', title: 'Assault - Westlands', type: 'assault', time: '6 hours ago', status: 'resolved' },
  { id: '4', title: 'Fraud - Parklands', type: 'fraud', time: '1 day ago', status: 'resolved' },
  { id: '5', title: 'Vandalism - Mombasa Road', type: 'vandalism', time: '2 days ago', status: 'closed' },
];

const mockTopOfficers = [
  { name: 'John Kipchoge', rank: 'Inspector', cases: 23, satisfaction: 4.8 },
  { name: 'Mary Okonkwo', rank: 'Sergeant', cases: 19, satisfaction: 4.7 },
  { name: 'Peter Kipchoge', rank: 'Constable', cases: 18, satisfaction: 4.6 },
];

function KPICard({ 
  title, 
  value, 
  unit = '', 
  icon: Icon, 
  trend,
  trendLabel,
}: {
  title: string;
  value: number | string;
  unit?: string;
  icon: React.ElementType;
  trend?: number;
  trendLabel?: string;
}) {
  const isPositive = trend !== undefined && trend > 0;
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-3xl font-bold text-foreground mt-2">
              {typeof value === 'number' && value > 1000 ? `${(value / 1000).toFixed(1)}K` : value}
              <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>
            </p>
            {trend !== undefined && (
              <p className={`text-xs mt-2 flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <TrendIcon className="w-3 h-3" />
                {Math.abs(trend)}% {trendLabel || 'change'}
              </p>
            )}
          </div>
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [kpiData, setKpiData] = useState<KPIData>(mockKPIData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In a real app, fetch data from API
    // const fetchData = async () => {
    //   try {
    //     const response = await apiClient.get<KPIData>(API_ENDPOINTS.dashboard);
    //     setKpiData(response);
    //   } catch (error) {
    //     console.error('Failed to fetch dashboard data:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchData();
  }, []);

  return (
    <ProtectedLayout>
      <div className="p-6 md:p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.firstName}
          </h1>
          <p className="text-muted-foreground mt-1">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Incidents"
            value={kpiData.totalIncidents}
            icon={AlertCircle}
            trend={5}
            trendLabel="vs last month"
          />
          <KPICard
            title="This Month"
            value={kpiData.incidentsThisMonth}
            icon={TrendingUp}
            trend={-8}
            trendLabel="vs previous"
          />
          <KPICard
            title="Avg Response Time"
            value={kpiData.averageResponseTime}
            unit="min"
            icon={Clock}
            trend={-12}
            trendLabel="improvement"
          />
          <KPICard
            title="Case Clearance"
            value={kpiData.caseClearanceRate}
            unit="%"
            icon={CheckCircle}
            trend={3}
            trendLabel="improvement"
          />
        </div>

        {/* Secondary KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KPICard
            title="Traffic Fines (KES)"
            value={kpiData.trafficFinesCollected}
            icon={DollarSign}
            trend={15}
            trendLabel="collected"
          />
          <KPICard
            title="Active Officers"
            value={kpiData.activeOfficers}
            icon={Users}
          />
          <KPICard
            title="Open Cases"
            value={kpiData.openCases}
            icon={AlertTriangle}
            trend={-5}
            trendLabel="reduction"
          />
        </div>

        {/* Recent Activity and Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Incidents */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Recent Incidents</CardTitle>
                <CardDescription>Latest incident reports in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentIncidents.map((incident) => (
                    <div
                      key={incident.id}
                      className="flex items-start justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{incident.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{incident.time}</p>
                      </div>
                      <div className="ml-4 flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          incident.status === 'in-progress' 
                            ? 'bg-yellow-500/20 text-yellow-700'
                            : incident.status === 'resolved'
                            ? 'bg-green-500/20 text-green-700'
                            : 'bg-gray-500/20 text-gray-700'
                        }`}>
                          {incident.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Officers */}
          <div>
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Highest performing officers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTopOfficers.map((officer, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-foreground text-sm">{officer.name}</p>
                          <p className="text-xs text-muted-foreground">{officer.rank}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground text-sm">{officer.cases}</p>
                          <p className="text-xs text-muted-foreground">cases</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent rounded-full"
                            style={{ width: `${(officer.satisfaction / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">{officer.satisfaction}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Summary */}
        <Card className="border-border bg-gradient-to-r from-primary/10 to-accent/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Active Cases</p>
                <p className="text-2xl font-bold text-foreground mt-1">156</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-foreground mt-1">23</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-foreground mt-1">34</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Community Alerts</p>
                <p className="text-2xl font-bold text-foreground mt-1">{kpiData.communityAlerts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
}
