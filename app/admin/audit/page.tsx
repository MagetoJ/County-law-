'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Edit3, Trash2, Eye, Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function AuditLogsPage() {
  const [filterType, setFilterType] = useState('all');

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-01-15 14:32:10',
      user: 'John Kipchoge',
      action: 'Logged in',
      resource: 'User Session',
      type: 'LOGIN',
      details: 'Login from IP 192.168.1.100',
      status: 'Success',
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:15:43',
      user: 'Jane Muthoni',
      action: 'Created incident',
      resource: 'Incident #2024-001',
      type: 'CREATE',
      details: 'Armed Robbery - Nairobi CBD',
      status: 'Success',
    },
    {
      id: 3,
      timestamp: '2024-01-15 13:48:22',
      user: 'David Kipchoge',
      action: 'Updated case status',
      resource: 'Case #2024-0145',
      type: 'UPDATE',
      details: 'Changed status from In Progress to Resolved',
      status: 'Success',
    },
    {
      id: 4,
      timestamp: '2024-01-15 13:22:15',
      user: 'Admin User',
      action: 'Failed login attempt',
      resource: 'User Session',
      type: 'LOGIN',
      details: 'Invalid password',
      status: 'Failed',
    },
    {
      id: 5,
      timestamp: '2024-01-15 12:45:33',
      user: 'Peter Kamau',
      action: 'Deleted traffic violation',
      resource: 'Violation #2024-567',
      type: 'DELETE',
      details: 'Duplicate entry removed',
      status: 'Success',
    },
    {
      id: 6,
      timestamp: '2024-01-15 12:10:22',
      user: 'Sarah Wanjiru',
      action: 'Accessed user list',
      resource: 'Users Admin',
      type: 'VIEW',
      details: 'Exported user list to CSV',
      status: 'Success',
    },
    {
      id: 7,
      timestamp: '2024-01-15 11:35:44',
      user: 'System Admin',
      action: 'Changed system settings',
      resource: 'System Configuration',
      type: 'UPDATE',
      details: 'Updated session timeout to 30 minutes',
      status: 'Success',
    },
    {
      id: 8,
      timestamp: '2024-01-15 11:00:18',
      user: 'Unknown',
      action: 'Unauthorized access attempt',
      resource: 'Admin Panel',
      type: 'SECURITY',
      details: 'Attempted access without proper permissions',
      status: 'Failed',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'LOGIN':
        return <LogIn className="w-4 h-4" />;
      case 'CREATE':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'UPDATE':
        return <Edit3 className="w-4 h-4" />;
      case 'DELETE':
        return <Trash2 className="w-4 h-4" />;
      case 'VIEW':
        return <Eye className="w-4 h-4" />;
      case 'SECURITY':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Lock className="w-4 h-4" />;
    }
  };

  const getActionColor = (type: string, status: string) => {
    if (status === 'Failed') return 'bg-red-600/10 text-red-600 border-red-600/20';
    switch (type) {
      case 'LOGIN':
        return 'bg-blue-600/10 text-blue-600 border-blue-600/20';
      case 'CREATE':
        return 'bg-green-600/10 text-green-600 border-green-600/20';
      case 'UPDATE':
        return 'bg-yellow-600/10 text-yellow-600 border-yellow-600/20';
      case 'DELETE':
        return 'bg-red-600/10 text-red-600 border-red-600/20';
      case 'VIEW':
        return 'bg-purple-600/10 text-purple-600 border-purple-600/20';
      case 'SECURITY':
        return 'bg-orange-600/10 text-orange-600 border-orange-600/20';
      default:
        return 'bg-gray-600/10 text-gray-600 border-gray-600/20';
    }
  };

  const filteredLogs =
    filterType === 'all'
      ? auditLogs
      : auditLogs.filter((log) => log.type.toLowerCase() === filterType.toLowerCase());

  return (
    <ProtectedLayout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Audit Logs</h1>
          <p className="text-muted-foreground">System activity and security events</p>
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {['all', 'LOGIN', 'CREATE', 'UPDATE', 'DELETE', 'SECURITY'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === type
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
              }`}
            >
              {type === 'all' ? 'All Events' : type}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-secondary">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">Total Events</p>
                <p className="text-3xl font-bold text-foreground">{auditLogs.length}</p>
                <p className="text-xs text-muted-foreground mt-2">Last 24 hours</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-secondary">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">Successful</p>
                <p className="text-3xl font-bold text-green-600">
                  {auditLogs.filter((l) => l.status === 'Success').length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-secondary">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">Failed</p>
                <p className="text-3xl font-bold text-red-600">
                  {auditLogs.filter((l) => l.status === 'Failed').length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-secondary">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">Unique Users</p>
                <p className="text-3xl font-bold text-accent">
                  {new Set(auditLogs.map((l) => l.user)).size}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Logs Table */}
        <Card className="bg-card border-secondary">
          <CardHeader>
            <CardTitle className="text-foreground">Activity Log</CardTitle>
            <CardDescription>Recent system events and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-screen overflow-y-auto">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className={`p-4 rounded-lg border ${getActionColor(log.type, log.status)} transition-all`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1 flex-shrink-0">{getIcon(log.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold">{log.action}</p>
                          <Badge variant="outline" className="border-current text-current">
                            {log.resource}
                          </Badge>
                          <Badge variant="outline" className="border-current text-current text-xs">
                            {log.status}
                          </Badge>
                        </div>
                        <p className="text-sm mt-1 opacity-80">{log.details}</p>
                        <p className="text-xs mt-1 opacity-60">
                          User: {log.user} • {log.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
}
