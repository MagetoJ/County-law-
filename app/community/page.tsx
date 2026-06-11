'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Plus,
  Users2,
  Users3,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';

const mockCommunityData = {
  committees: [
    {
      id: '1',
      name: 'Nairobi CBD Community Policing Committee',
      ward: 'Nairobi CBD',
      chairman: 'James Kipchoge',
      members: 24,
      lastMeeting: '2024-01-20',
    },
    {
      id: '2',
      name: 'Parklands Community Committee',
      ward: 'Parklands',
      chairman: 'Mary Okonkwo',
      members: 18,
      lastMeeting: '2024-01-18',
    },
    {
      id: '3',
      name: 'Karen Community Forum',
      ward: 'Karen',
      chairman: 'Peter Kipchoge',
      members: 22,
      lastMeeting: '2024-01-15',
    },
  ],
  nyumbaKumi: [
    {
      id: '1',
      village: 'Kilimani Village A',
      ward: 'Kilimani',
      coordinator: 'John Kipchoge',
      households: 45,
      population: 180,
      lastReport: '2024-01-25',
    },
    {
      id: '2',
      village: 'Westlands Village B',
      ward: 'Westlands',
      coordinator: 'Sarah Mutua',
      households: 38,
      population: 152,
      lastReport: '2024-01-24',
    },
  ],
  informants: [
    {
      id: '1',
      code: 'INFO-2024-001',
      ward: 'Nairobi CBD',
      reportsSubmitted: 12,
      trustScore: 8.5,
      lastReport: '2024-01-25',
    },
    {
      id: '2',
      code: 'INFO-2024-002',
      ward: 'Parklands',
      reportsSubmitted: 8,
      trustScore: 7.2,
      lastReport: '2024-01-23',
    },
  ],
};

export default function CommunityPage() {
  return (
    <ProtectedLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community Policing</h1>
          <p className="text-muted-foreground mt-1">Manage community partnerships and grassroots engagement</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Committees</p>
              <p className="text-3xl font-bold text-foreground mt-2">{mockCommunityData.committees.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Nyumba Kumi Groups</p>
              <p className="text-3xl font-bold text-foreground mt-2">{mockCommunityData.nyumbaKumi.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Active Informants</p>
              <p className="text-3xl font-bold text-foreground mt-2">{mockCommunityData.informants.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Community Members</p>
              <p className="text-3xl font-bold text-foreground mt-2">
                {mockCommunityData.committees.reduce((sum, c) => sum + c.members, 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Committees Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Community Policing Committees</h2>
              <p className="text-muted-foreground text-sm mt-1">Ward-level community engagement forums</p>
            </div>
            <Link href="/community/committees">
              <Button className="bg-primary hover:bg-primary/90 text-sidebar-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                New Committee
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockCommunityData.committees.map((committee) => (
              <Card key={committee.id} className="border-border hover:border-primary/50 transition-all cursor-pointer">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{committee.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{committee.ward}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Chairman</p>
                      <p className="text-sm font-medium text-foreground">{committee.chairman}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg bg-muted/30">
                        <p className="text-xs text-muted-foreground">Members</p>
                        <p className="text-lg font-bold text-foreground">{committee.members}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-muted/30">
                        <p className="text-xs text-muted-foreground">Last Meeting</p>
                        <p className="text-sm font-medium text-foreground">{committee.lastMeeting}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Nyumba Kumi Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Users2 className="w-6 h-6" />
                Nyumba Kumi Registry
              </h2>
              <p className="text-muted-foreground text-sm mt-1">Household-level security groups and coordination</p>
            </div>
            <Link href="/community/nyumba-kumi">
              <Button className="bg-primary hover:bg-primary/90 text-sidebar-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Register Group
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockCommunityData.nyumbaKumi.map((group) => (
              <Card key={group.id} className="border-border hover:border-primary/50 transition-all cursor-pointer">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{group.village}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{group.ward}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Coordinator</p>
                      <p className="text-sm font-medium text-foreground">{group.coordinator}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg bg-muted/30">
                        <p className="text-xs text-muted-foreground">Households</p>
                        <p className="text-lg font-bold text-foreground">{group.households}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-muted/30">
                        <p className="text-xs text-muted-foreground">Population</p>
                        <p className="text-lg font-bold text-foreground">{group.population}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Informants Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <MessageCircle className="w-6 h-6" />
                Community Informants
              </h2>
              <p className="text-muted-foreground text-sm mt-1">Anonymous community intelligence sources</p>
            </div>
            <Link href="/community/informants">
              <Button className="bg-primary hover:bg-primary/90 text-sidebar-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Register Informant
              </Button>
            </Link>
          </div>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 font-semibold text-foreground">Code</th>
                      <th className="text-left py-2 px-3 font-semibold text-foreground">Ward</th>
                      <th className="text-center py-2 px-3 font-semibold text-foreground">Reports</th>
                      <th className="text-center py-2 px-3 font-semibold text-foreground">Trust Score</th>
                      <th className="text-left py-2 px-3 font-semibold text-foreground">Last Report</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockCommunityData.informants.map((informant) => (
                      <tr key={informant.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-3 font-medium text-foreground">{informant.code}</td>
                        <td className="py-3 px-3 text-foreground">{informant.ward}</td>
                        <td className="py-3 px-3 text-center font-medium text-foreground">{informant.reportsSubmitted}</td>
                        <td className="py-3 px-3 text-center">
                          <div className="inline-block px-2 py-1 rounded-full bg-accent/20 text-accent">
                            {informant.trustScore}/10
                          </div>
                        </td>
                        <td className="py-3 px-3 text-muted-foreground">{informant.lastReport}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Engagement Metrics */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Community Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Committee Meetings (Monthly)</p>
                <p className="text-3xl font-bold text-foreground">8</p>
                <div className="w-full h-2 bg-muted rounded-full">
                  <div className="h-full w-full bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Community Reports</p>
                <p className="text-3xl font-bold text-foreground">47</p>
                <div className="w-full h-2 bg-muted rounded-full">
                  <div className="h-full w-4/5 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Engagement Rate</p>
                <p className="text-3xl font-bold text-foreground">82%</p>
                <div className="w-full h-2 bg-muted rounded-full">
                  <div className="h-full w-5/6 bg-accent rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
}
