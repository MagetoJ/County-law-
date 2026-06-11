'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Plus, Edit2, Trash2 } from 'lucide-react';

export default function RolesPage() {
  const roles = [
    {
      id: '1',
      name: 'Administrator',
      description: 'Full system access and configuration',
      users: 3,
      permissions: ['All'],
      status: 'Active',
    },
    {
      id: '2',
      name: 'Commander',
      description: 'Manage incidents and personnel',
      users: 8,
      permissions: ['View Incidents', 'Assign Officers', 'Generate Reports', 'Manage Cases'],
      status: 'Active',
    },
    {
      id: '3',
      name: 'Officer',
      description: 'Field operations and incident reporting',
      users: 152,
      permissions: ['View Incidents', 'Report Incident', 'View Cases'],
      status: 'Active',
    },
    {
      id: '4',
      name: 'Dispatcher',
      description: 'Manage incident dispatch and assignment',
      users: 12,
      permissions: ['View Incidents', 'Assign Officers', 'Update Incident Status'],
      status: 'Active',
    },
    {
      id: '5',
      name: 'Analyst',
      description: 'Data analysis and report generation',
      users: 5,
      permissions: ['View Analytics', 'Generate Reports', 'View Statistics'],
      status: 'Active',
    },
  ];

  return (
    <ProtectedLayout>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Shield className="w-8 h-8" />
              Roles & Permissions
            </h1>
            <p className="text-muted-foreground">Manage user roles and access control</p>
          </div>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Role
          </Button>
        </div>

        <div className="grid gap-4">
          {roles.map((role) => (
            <Card key={role.id} className="bg-card border-secondary">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{role.name}</h3>
                      <Badge className="bg-green-600 text-white">{role.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{role.description}</p>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Users</p>
                        <p className="text-2xl font-bold text-accent">{role.users}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Permissions</p>
                        <div className="flex flex-wrap gap-2">
                          {role.permissions.map((perm) => (
                            <Badge key={perm} variant="secondary" className="bg-secondary/50">
                              {perm}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-secondary">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-secondary">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Role Creation Form */}
        <Card className="bg-card border-secondary mt-8">
          <CardHeader>
            <CardTitle className="text-foreground">Create New Role</CardTitle>
            <CardDescription>Define a new role with specific permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Role Name</label>
              <input
                type="text"
                placeholder="e.g., Supervisor"
                className="w-full px-4 py-2 bg-secondary/50 border border-secondary text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                placeholder="Describe the role and its responsibilities"
                rows={3}
                className="w-full px-4 py-2 bg-secondary/50 border border-secondary text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Permissions</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'View Incidents',
                  'Report Incident',
                  'Manage Cases',
                  'Assign Officers',
                  'View Analytics',
                  'Generate Reports',
                  'Manage Users',
                  'System Settings',
                ].map((perm) => (
                  <label key={perm} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border border-secondary" />
                    <span className="text-sm text-foreground">{perm}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Create Role
            </Button>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
}
