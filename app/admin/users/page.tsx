'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, User, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const mockAdminUsers = [
  {
    id: '1',
    name: 'John Kipchoge',
    email: 'john.kipchoge@police.ke',
    role: 'super-admin',
    lastLogin: '2024-01-25 14:30',
    status: 'active',
  },
  {
    id: '2',
    name: 'Mary Okonkwo',
    email: 'mary.okonkwo@police.ke',
    role: 'county-admin',
    lastLogin: '2024-01-25 12:15',
    status: 'active',
  },
  {
    id: '3',
    name: 'Peter Kipchoge',
    email: 'peter.kipchoge@police.ke',
    role: 'station-admin',
    lastLogin: '2024-01-24 18:45',
    status: 'active',
  },
  {
    id: '4',
    name: 'Sarah Mutua',
    email: 'sarah.mutua@police.ke',
    role: 'county-admin',
    lastLogin: '2024-01-23 10:20',
    status: 'inactive',
  },
];

const ROLE_COLORS: Record<string, string> = {
  'super-admin': 'bg-red-500/20 text-red-700',
  'county-admin': 'bg-blue-500/20 text-blue-700',
  'station-admin': 'bg-purple-500/20 text-purple-700',
};

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = mockAdminUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">System Users</h1>
            <p className="text-muted-foreground mt-1">Manage administrative user accounts and permissions</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-sidebar-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Search */}
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>Total: {filteredUsers.length} users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">User</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Last Login</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-medium text-foreground">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${ROLE_COLORS[user.role]}`}>
                          {user.role.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {user.status === 'active' ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-green-600 font-medium">Active</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-yellow-600" />
                              <span className="text-yellow-600 font-medium">Inactive</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground text-xs">{user.lastLogin}</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold text-foreground mt-2">{mockAdminUsers.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {mockAdminUsers.filter(u => u.status === 'active').length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Inactive Users</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">
                {mockAdminUsers.filter(u => u.status === 'inactive').length}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  );
}
