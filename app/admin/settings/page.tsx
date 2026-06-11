'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Bell, Lock, Settings, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    systemName: 'KauniSalama',
    maintenanceMode: false,
    maxLoginAttempts: 5,
    sessionTimeout: 30,
    requireMFA: false,
    dataRetention: 7,
    emailNotifications: true,
    smsNotifications: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key],
    }));
  };

  const handleInputChange = (key: keyof typeof settings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <ProtectedLayout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">System Settings</h1>
          <p className="text-muted-foreground">Manage system configuration and preferences</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Backup</span>
            </TabsTrigger>
            <TabsTrigger value="users">API Keys</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-4 mt-6">
            <Card className="bg-card border-secondary">
              <CardHeader>
                <CardTitle className="text-foreground">General Configuration</CardTitle>
                <CardDescription>Basic system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">System Name</label>
                  <input
                    type="text"
                    value={settings.systemName}
                    onChange={(e) => handleInputChange('systemName', e.target.value)}
                    className="w-full px-4 py-2 bg-secondary/50 border border-secondary text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg border border-secondary">
                  <div>
                    <p className="font-medium text-foreground">Maintenance Mode</p>
                    <p className="text-sm text-muted-foreground">System will show maintenance notice to users</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.maintenanceMode}
                      onChange={() => handleToggle('maintenanceMode')}
                      className="w-4 h-4 rounded border border-secondary"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Data Retention (days)</label>
                  <input
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) => handleInputChange('dataRetention', parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-secondary/50 border border-secondary text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <p className="text-xs text-muted-foreground mt-2">How long to keep logs and audit records</p>
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Save General Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-4 mt-6">
            <Card className="bg-card border-secondary">
              <CardHeader>
                <CardTitle className="text-foreground">Security Settings</CardTitle>
                <CardDescription>Configure authentication and access control</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Max Login Attempts</label>
                  <input
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => handleInputChange('maxLoginAttempts', parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-secondary/50 border border-secondary text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Failed attempts before account lockout</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-secondary/50 border border-secondary text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg border border-secondary">
                  <div>
                    <p className="font-medium text-foreground">Require Multi-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Enforce MFA for all users</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.requireMFA}
                      onChange={() => handleToggle('requireMFA')}
                      className="w-4 h-4 rounded border border-secondary"
                    />
                  </label>
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-4 mt-6">
            <Card className="bg-card border-secondary">
              <CardHeader>
                <CardTitle className="text-foreground">Notification Preferences</CardTitle>
                <CardDescription>Configure how users receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg border border-secondary">
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Send alerts via email</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={() => handleToggle('emailNotifications')}
                      className="w-4 h-4 rounded border border-secondary"
                    />
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg border border-secondary">
                  <div>
                    <p className="font-medium text-foreground">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Send critical alerts via SMS</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={() => handleToggle('smsNotifications')}
                      className="w-4 h-4 rounded border border-secondary"
                    />
                  </label>
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backup & Disaster Recovery */}
          <TabsContent value="backup" className="space-y-4 mt-6">
            <Card className="bg-card border-secondary">
              <CardHeader>
                <CardTitle className="text-foreground">Backup & Recovery</CardTitle>
                <CardDescription>Manage data backups and recovery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-secondary/20 border border-secondary rounded-lg p-4">
                  <p className="font-medium text-foreground mb-2">Last Backup</p>
                  <p className="text-foreground">January 15, 2024 at 02:00 AM</p>
                  <p className="text-sm text-muted-foreground mt-1">Size: 2.4 GB</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="border-secondary">
                    Create Backup Now
                  </Button>
                  <Button variant="outline" className="border-secondary">
                    View Backup History
                  </Button>
                </div>

                <div className="border-t border-secondary pt-4">
                  <p className="font-medium text-foreground mb-2">Automated Backups</p>
                  <select className="w-full px-4 py-2 bg-secondary/50 border border-secondary text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-accent">
                    <option>Daily at 2:00 AM</option>
                    <option>Weekly on Monday</option>
                    <option>Monthly on the 1st</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Keys */}
          <TabsContent value="users" className="space-y-4 mt-6">
            <Card className="bg-card border-secondary">
              <CardHeader>
                <CardTitle className="text-foreground">API Keys</CardTitle>
                <CardDescription>Manage system API keys for integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 bg-secondary/20 rounded-lg border border-secondary">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm text-foreground">kaunisalama_test_abc123xyz...</span>
                      <Badge className="bg-green-600 text-white">Active</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">Created: January 10, 2024</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-secondary">
                        Copy
                      </Button>
                      <Button size="sm" variant="outline" className="border-secondary">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Generate New API Key
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedLayout>
  );
}
