'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle2, Info, Clock, Trash2, Archive } from 'lucide-react';
import { useState } from 'react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'Critical Incident Reported',
      message: 'Armed robbery in progress at Nairobi CBD. 2 officers assigned.',
      time: '5 minutes ago',
      read: false,
      icon: AlertCircle,
    },
    {
      id: 2,
      type: 'info',
      title: 'Case Status Update',
      message: 'Case #2024-0145 has been updated to Resolved.',
      time: '1 hour ago',
      read: false,
      icon: Info,
    },
    {
      id: 3,
      type: 'success',
      title: 'Officer Assignment Complete',
      message: 'Officer John Kipchoge has been assigned to Incident #2024-001.',
      time: '2 hours ago',
      read: true,
      icon: CheckCircle2,
    },
    {
      id: 4,
      type: 'alert',
      title: 'Traffic Violation Report',
      message: 'New traffic violation recorded on Mombasa Road.',
      time: '3 hours ago',
      read: true,
      icon: AlertCircle,
    },
    {
      id: 5,
      type: 'info',
      title: 'System Maintenance Notice',
      message: 'System maintenance scheduled for January 20, 2024 from 02:00 AM to 04:00 AM.',
      time: '1 day ago',
      read: true,
      icon: Info,
    },
  ]);

  const getIconColor = (type: string) => {
    switch (type) {
      case 'alert':
        return 'text-red-600';
      case 'success':
        return 'text-green-600';
      case 'info':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <ProtectedLayout>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
            <p className="text-muted-foreground">Stay updated on system alerts and incidents</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-secondary">
              Mark all as read
            </Button>
            <Button variant="outline" className="border-secondary">
              Clear all
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          {/* All Notifications */}
          <TabsContent value="all" className="space-y-3 mt-6">
            {notifications.length === 0 ? (
              <Card className="bg-card border-secondary">
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">No notifications</p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notif) => {
                const IconComponent = notif.icon;
                return (
                  <Card
                    key={notif.id}
                    className={`bg-card border-secondary cursor-pointer transition-colors hover:bg-secondary/10 ${
                      !notif.read ? 'border-accent' : ''
                    }`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <IconComponent className={`w-6 h-6 flex-shrink-0 mt-1 ${getIconColor(notif.type)}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{notif.title}</h3>
                            {!notif.read && (
                              <Badge className="bg-accent text-accent-foreground text-xs">New</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notif.message}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {notif.time}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {!notif.read && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-secondary"
                              onClick={() => handleMarkAsRead(notif.id)}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-secondary"
                            onClick={() => handleDelete(notif.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          {/* Unread */}
          <TabsContent value="unread" className="space-y-3 mt-6">
            {notifications.filter((n) => !n.read).length === 0 ? (
              <Card className="bg-card border-secondary">
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">All caught up!</p>
                </CardContent>
              </Card>
            ) : (
              notifications
                .filter((n) => !n.read)
                .map((notif) => {
                  const IconComponent = notif.icon;
                  return (
                    <Card key={notif.id} className="bg-card border-secondary border-accent">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <IconComponent className={`w-6 h-6 flex-shrink-0 mt-1 ${getIconColor(notif.type)}`} />
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">{notif.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{notif.message}</p>
                            <p className="text-xs text-muted-foreground">{notif.time}</p>
                          </div>
                          <Button size="sm" variant="outline" className="border-secondary">
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
            )}
          </TabsContent>

          {/* Alerts */}
          <TabsContent value="alerts" className="space-y-3 mt-6">
            {notifications.filter((n) => n.type === 'alert').length === 0 ? (
              <Card className="bg-card border-secondary">
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">No alerts</p>
                </CardContent>
              </Card>
            ) : (
              notifications
                .filter((n) => n.type === 'alert')
                .map((notif) => {
                  const IconComponent = notif.icon;
                  return (
                    <Card key={notif.id} className="bg-card border-secondary">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <IconComponent className={`w-6 h-6 flex-shrink-0 mt-1 ${getIconColor(notif.type)}`} />
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">{notif.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{notif.message}</p>
                            <p className="text-xs text-muted-foreground">{notif.time}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
            )}
          </TabsContent>

          {/* Archived */}
          <TabsContent value="archived" className="space-y-3 mt-6">
            <Card className="bg-card border-secondary">
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No archived notifications</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedLayout>
  );
}
