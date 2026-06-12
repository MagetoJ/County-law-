"use client";

import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../../../components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "../../../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

// ─── MOCK DATA STRUCTURES FOR KENYAN COUNTY SUITE (MURANG'A/KISII STYLE) ───

const countyOverviewStats = {
  facilityCount: 142,
  immunizationCoverage: "84.5%",
  activeAlerts: 3,
  staffingRate: "78.2%",
};

const keyIndicators = [
  { name: "Immunization Coverage", value: 84.5, target: 90, unit: "%" },
  { name: "Skilled Birth Deliveries", value: 76.1, target: 85, unit: "%" },
  { name: "ANC 4+ Visits Rate", value: 62.8, target: 75, unit: "%" },
  { name: "Healthcare Worker Staffing", value: 78.2, target: 100, unit: "%" },
  { name: "Clean Water Access in Facilities", value: 89.0, target: 95, unit: "%" },
];

const recentAlerts = [
  { id: 1, type: "Cholera", location: "Kiharu - Township Ward", cases: 14, status: "Critical", date: "2026-06-10" },
  { id: 2, type: "Measles Cluster", location: "Gatanga - Kakuzi Ward", cases: 5, status: "Active", date: "2026-06-11" },
  { id: 3, type: "Dysentery Surge", location: "Kangema - Muguru Ward", cases: 8, status: "Investigating", date: "2026-06-12" },
];

const facilitiesRegistry = [
  { name: "Murang'a County Referral Hospital", type: "Level 5 Hospital", beds: 320, staffing: "88%", constituency: "Kiharu", ward: "Township", status: "Operational" },
  { name: "Maragua Sub-County Hospital", type: "Level 4 Hospital", beds: 110, staffing: "74%", constituency: "Maragua", ward: "Ichagaki", status: "Operational" },
  { name: "Kangema Health Centre", type: "Level 3 Health Centre", beds: 24, staffing: "65%", constituency: "Kangema", ward: "Muguru", status: "Operational" },
  { name: "Kandara Dispensary", type: "Level 2 Dispensary", beds: 2, staffing: "50%", constituency: "Kandara", ward: "Muruka", status: "Understaffed" },
];

const diseaseSurveillance = [
  { illness: "Cholera", cases: 14, cluster: "Yes", trend: "Increasing", constituency: "Kiharu", ward: "Township" },
  { illness: "Measles", cases: 5, cluster: "Yes", trend: "Stable", constituency: "Gatanga", ward: "Kakuzi" },
  { illness: "Dysentery", cases: 22, cluster: "No", trend: "Increasing", constituency: "Kangema", ward: "Muguru" },
  { illness: "Malaria (Uncomplicated)", cases: 145, cluster: "No", trend: "Decreasing", constituency: "Maragua", ward: "Kambiti" },
];

const maternalChildMetrics = [
  { constituency: "Kiharu", immunization: "89%", ancRate: "68%", skilledBirth: "82%", under5Mortality: "32/1000" },
  { constituency: "Maragua", immunization: "81%", ancRate: "59%", skilledBirth: "71%", under5Mortality: "38/1000" },
  { constituency: "Gatanga", immunization: "85%", ancRate: "64%", skilledBirth: "79%", under5Mortality: "30/1000" },
  { constituency: "Kangema", immunization: "83%", ancRate: "61%", skilledBirth: "73%", under5Mortality: "35/1000" },
];

const drillDownTree = [
  {
    constituency: "Kiharu",
    facilityCount: 28,
    healthScore: 84,
    alerts: 1,
    wards: [
      { name: "Township Ward", score: 88, facilities: 12, alerts: 1 },
      { name: "Mbiri Ward", score: 81, facilities: 6, alerts: 0 },
      { name: "Mugoiri Ward", score: 83, facilities: 10, alerts: 0 },
    ]
  },
  {
    constituency: "Kangema",
    facilityCount: 18,
    healthScore: 76,
    alerts: 1,
    wards: [
      { name: "Muguru Ward", score: 72, facilities: 8, alerts: 1 },
      { name: "Kanyenyaini Ward", score: 80, facilities: 10, alerts: 0 },
    ]
  }
];

export default function AdminHealthPage() {
  const [expandedConstituency, setExpandedConstituency] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Public Health & Sanitation</h1>
          <p className="text-muted-foreground">County surveillance, maternal indicators, and infrastructure registry management.</p>
        </div>
        <Button>Export KHIS Report</Button>
      </div>

      {/* ─── OVERVIEW METRICS CARDS ─── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Health Facilities</CardDescription>
            <CardTitle className="text-2xl">{countyOverviewStats.facilityCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Immunization Coverage</CardDescription>
            <CardTitle className="text-2xl text-green-600">{countyOverviewStats.immunizationCoverage}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Disease Alerts</CardDescription>
            <CardTitle className="text-2xl text-red-600">{countyOverviewStats.activeAlerts}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Staffing Capacity Rate</CardDescription>
            <CardTitle className="text-2xl text-blue-600">{countyOverviewStats.staffingRate}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* ─── MODULE NAVIGATION TABS ─── */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="overview">County Overview</TabsTrigger>
          <TabsTrigger value="facilities">Health Facilities</TabsTrigger>
          <TabsTrigger value="surveillance">Disease Surveillance</TabsTrigger>
          <TabsTrigger value="maternal">Maternal & Child</TabsTrigger>
          <TabsTrigger value="regional">Regional Trees</TabsTrigger>
        </TabsList>

        {/* TAB 1: COUNTY OVERVIEW */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Key Indicator Target Progress Bars */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Core Public Health Target Identifiers</CardTitle>
                <CardDescription>Current performance metrics aligned against targets.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {keyIndicators.map((ind) => (
                  <div key={ind.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{ind.name}</span>
                      <span className="text-muted-foreground">{ind.value}{ind.unit} / Target: {ind.target}{ind.unit}</span>
                    </div>
                    <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${ind.value >= ind.target ? 'bg-green-500' : 'bg-amber-500'}`} 
                        style={{ width: `${Math.min((ind.value / ind.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Outbreak Alerts Section */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Outbreak Alerts</CardTitle>
                <CardDescription>Immediate action nodes requiring clinic dispatch.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 border rounded-lg flex justify-between items-start space-x-2">
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">{alert.type} Cluster</p>
                      <p className="text-xs text-muted-foreground">{alert.location}</p>
                      <p className="text-xs font-medium">Cases Identified: {alert.cases}</p>
                    </div>
                    <Badge variant={alert.status === "Critical" ? "destructive" : "default"}>
                      {alert.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Composite Ward Health Heatmap Visualization Layer */}
          <Card>
            <CardHeader>
              <CardTitle>Ward-Level Composite Health-Status Heatmap</CardTitle>
              <CardDescription>Aggregated performance indexing calculated across sanitation, delivery targets, and caseload indexes.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {Array.from({ length: 18 }).map((_, i) => {
                  const scores = [88, 92, 74, 55, 68, 81, 79, 42, 90, 61, 73, 85];
                  const currentScore = scores[i % scores.length];
                  let colorClass = "bg-green-100 text-green-800 border-green-200";
                  if (currentScore < 60) colorClass = "bg-red-100 text-red-800 border-red-200";
                  else if (currentScore < 80) colorClass = "bg-amber-100 text-amber-800 border-amber-200";

                  return (
                    <div key={i} className={`p-3 border rounded-lg text-center font-medium ${colorClass}`}>
                      <div className="text-xs opacity-80">Ward index {101 + i}</div>
                      <div className="text-lg font-bold">{currentScore}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: HEALTH FACILITIES REGISTRY */}
        <TabsContent value="facilities">
          <Card>
            <CardHeader>
              <CardTitle>Infrastructure & Staffing Registry</CardTitle>
              <CardDescription>Active validation schema for managed dispensaries and sub-county networks.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Facility Name</TableHead>
                    <TableHead>Tier Classification</TableHead>
                    <TableHead>Bed Capacity</TableHead>
                    <TableHead>Staffing Ratio</TableHead>
                    <TableHead>Regional Mapping</TableHead>
                    <TableHead>Operational Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facilitiesRegistry.map((fac, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{fac.name}</TableCell>
                      <TableCell>{fac.type}</TableCell>
                      <TableCell>{fac.beds}</TableCell>
                      <TableCell>{fac.staffing}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{fac.constituency} / {fac.ward}</TableCell>
                      <TableCell>
                        <Badge variant={fac.status === "Operational" ? "outline" : "destructive"}>
                          {fac.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: DISEASE SURVEILLANCE */}
        <TabsContent value="surveillance">
          <Card>
            <CardHeader>
              <CardTitle>Epidemiological Surveillance Tracker</CardTitle>
              <CardDescription>Real-time vector clusters monitored by statutory public tracking guidelines.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reportable Condition</TableHead>
                    <TableHead>Registered Cases</TableHead>
                    <TableHead>Cluster Threshold Flag</TableHead>
                    <TableHead>Vector Trend</TableHead>
                    <TableHead>Constituency Border</TableHead>
                    <TableHead>Target Ward</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {diseaseSurveillance.map((disease, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-bold text-red-900">{disease.illness}</TableCell>
                      <TableCell className="font-semibold">{disease.cases}</TableCell>
                      <TableCell>
                        <Badge variant={disease.cluster === "Yes" ? "destructive" : "secondary"}>
                          {disease.cluster === "Yes" ? "ALARM TRIGGERED" : "Isolated"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`text-xs font-bold ${
                          disease.trend === "Increasing" ? "text-red-600" : disease.trend === "Stable" ? "text-amber-600" : "text-green-600"
                        }`}>
                          {disease.trend === "Increasing" ? "▲ Upward" : disease.trend === "Stable" ? "■ Flat" : "▼ Downward"}
                        </span>
                      </TableCell>
                      <TableCell>{disease.constituency}</TableCell>
                      <TableCell>{disease.ward}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 4: IMMUNIZATION & MATERNAL HEALTH */}
        <TabsContent value="maternal">
          <Card>
            <CardHeader>
              <CardTitle>Constituency Maternal & Under-5 Metrics</CardTitle>
              <CardDescription>Reproductive and early childhood survival indicator panels.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Constituency Area Node</TableHead>
                    <TableHead>Fully Immunized Child (FIC) %</TableHead>
                    <TableHead>ANC 4+ Visit Compliance</TableHead>
                    <TableHead>Skilled Birth Delivery Rate</TableHead>
                    <TableHead>Under-5 Mortality Metric</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maternalChildMetrics.map((mat, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{mat.constituency}</TableCell>
                      <TableCell>{mat.immunization}</TableCell>
                      <TableCell>{mat.ancRate}</TableCell>
                      <TableCell>{mat.skilledBirth}</TableCell>
                      <TableCell className="text-red-700 font-medium">{mat.under5Mortality}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 5: REGIONAL DRILL-DOWN ACCORDION TREE */}
        <TabsContent value="regional">
          <Card>
            <CardHeader>
              <CardTitle>Administrative Boundary Drill-Down Mapping</CardTitle>
              <CardDescription>Select a sub-county cluster to drill down into ward level performance and active health signals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {drillDownTree.map((con) => (
                <div key={con.constituency} className="border rounded-lg overflow-hidden">
                  <div 
                    className="p-4 bg-muted/40 flex justify-between items-center cursor-pointer hover:bg-muted transition"
                    onClick={() => setExpandedConstituency(expandedConstituency === con.constituency ? null : con.constituency)}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="font-bold text-lg">{con.constituency} Constituency</span>
                      <Badge variant="outline">{con.facilityCount} Facilities</Badge>
                      {con.alerts > 0 && <Badge variant="destructive">{con.alerts} Active Alert</Badge>}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Composite Health Score: <strong className="text-blue-700">{con.healthScore}/100</strong></span>
                      <span>{expandedConstituency === con.constituency ? "▼" : "▶"}</span>
                    </div>
                  </div>

                  {expandedConstituency === con.constituency && (
                    <div className="p-4 bg-white border-t space-y-2 divide-y divide-gray-100">
                      {con.wards.map((ward) => (
                        <div key={ward.name} className="pt-2 first:pt-0 flex justify-between items-center text-sm">
                          <div className="space-y-0.5">
                            <span className="font-semibold text-gray-800">{ward.name}</span>
                            <div className="text-xs text-muted-foreground">{ward.facilities} Facilities registered</div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-xs font-semibold">Ward Score: <strong className="text-green-700">{ward.score}</strong></span>
                            {ward.alerts > 0 ? (
                              <Badge variant="destructive">ALERT BOUND</Badge>
                            ) : (
                              <Badge variant="secondary">Stable</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}