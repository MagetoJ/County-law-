'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Phone, Shield, Calendar, MapPin, Edit2, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'John Kipchoge',
    email: 'commander@police.ke',
    phone: '+254 712 345 678',
    role: 'Commander',
    department: 'Operations',
    station: 'Nairobi Central Police Station',
    dateJoined: 'January 5, 2020',
    jurisdiction: 'Nairobi County',
    badge: 'KES-2020-0847',
    serialNumber: 'OP-8473-NBI',
    rank: 'Chief Superintendent',
    divisions: ['Command & Control', 'Personnel Management', 'Incident Oversight'],
    permissions: ['View Incidents', 'Manage Cases', 'Assign Officers', 'Generate Reports', 'View Analytics'],
  });

  return (
    <ProtectedLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
            <p className="text-muted-foreground">View and manage your account information</p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Edit2 className="w-4 h-4" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal" className="space-y-4 mt-6">
            <Card className="bg-card border-secondary">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Full Name</p>
                      <p className="text-lg text-foreground font-medium">{profile.fullName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </p>
                      <p className="text-lg text-foreground font-medium">{profile.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone
                      </p>
                      <p className="text-lg text-foreground font-medium">{profile.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Member Since
                      </p>
                      <p className="text-lg text-foreground font-medium">{profile.dateJoined}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/50 border border-secondary text-foreground rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/50 border border-secondary text-foreground rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/50 border border-secondary text-foreground rounded-lg"
                      />
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Save Changes</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Information */}
          <TabsContent value="professional" className="space-y-4 mt-6">
            <Card className="bg-card border-secondary">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Professional Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Rank</p>
                    <p className="text-lg text-foreground font-medium">{profile.rank}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Role</p>
                    <Badge className="bg-accent text-accent-foreground">{profile.role}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Department</p>
                    <p className="text-lg text-foreground font-medium">{profile.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Station
                    </p>
                    <p className="text-lg text-foreground font-medium text-sm">{profile.station}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Badge Number</p>
                    <p className="text-lg text-foreground font-medium font-mono">{profile.badge}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Serial Number</p>
                    <p className="text-lg text-foreground font-medium font-mono">{profile.serialNumber}</p>
                  </div>
                </div>

                <div className="border-t border-secondary pt-6">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-3">Divisions</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.divisions.map((div) => (
                      <Badge key={div} variant="secondary" className="bg-secondary/50">
                        {div}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permissions */}
          <TabsContent value="permissions" className="space-y-4 mt-6">
            <Card className="bg-card border-secondary">
              <CardHeader>
                <CardTitle className="text-foreground">System Permissions</CardTitle>
                <CardDescription>Your assigned roles and access rights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {profile.permissions.map((perm) => (
                    <div key={perm} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg border border-secondary">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-foreground">{perm}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-4 mt-6">
            <Card className="bg-card border-secondary">
              <CardHeader>
                <CardTitle className="text-foreground">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg border border-secondary">
                    <div>
                      <p className="font-medium text-foreground">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Badge className="bg-yellow-600 text-white">Disabled</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg border border-secondary">
                    <div>
                      <p className="font-medium text-foreground">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Get alerts about incidents</p>
                    </div>
                    <Badge className="bg-green-600 text-white">Enabled</Badge>
                  </div>

                  <div className="border-t border-secondary pt-4 mt-4">
                    <p className="font-medium text-foreground mb-3">Danger Zone</p>
                    <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600/10">
                      <LogOut className="w-4 h-4 mr-2" />
                      Log Out of All Sessions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedLayout>
  );
}
