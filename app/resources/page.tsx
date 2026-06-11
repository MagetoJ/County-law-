'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Truck, Wrench, AlertTriangle, Plus, Edit2 } from 'lucide-react';

export default function ResourcesPage() {
  const vehicles = [
    {
      id: 'V-001',
      type: 'Patrol Car',
      make: 'Toyota Probox',
      plate: 'KES-001-A',
      status: 'In Service',
      mileage: '45,230 km',
      lastService: '2024-01-10',
      nextService: '2024-02-10',
      location: 'Nairobi Central',
      driver: 'John Kipchoge',
    },
    {
      id: 'V-002',
      type: 'Patrol Car',
      make: 'Toyota Probox',
      plate: 'KES-002-A',
      status: 'In Service',
      mileage: '52,100 km',
      lastService: '2023-12-20',
      nextService: '2024-01-20',
      location: 'Westlands',
      driver: 'Jane Muthoni',
    },
    {
      id: 'V-003',
      type: 'Van',
      make: 'Ford Transit',
      plate: 'KES-003-A',
      status: 'Maintenance',
      mileage: '78,500 km',
      lastService: '2023-11-15',
      nextService: '2024-02-15',
      location: 'Central Workshop',
      driver: 'Pending',
    },
    {
      id: 'V-004',
      type: 'Motorcycle',
      make: 'Honda CB 150',
      plate: 'KES-004-A',
      status: 'In Service',
      mileage: '12,340 km',
      lastService: '2024-01-05',
      nextService: '2024-02-05',
      location: 'Traffic Division',
      driver: 'David Kipchoge',
    },
  ];

  const equipment = [
    {
      id: 'E-001',
      name: 'Body Cameras',
      quantity: 125,
      available: 98,
      condition: 'Good',
      status: 'Sufficient',
    },
    {
      id: 'E-002',
      name: 'Tasers',
      quantity: 85,
      available: 72,
      condition: 'Good',
      status: 'Sufficient',
    },
    {
      id: 'E-003',
      name: 'Handcuffs (pairs)',
      quantity: 200,
      available: 145,
      condition: 'Good',
      status: 'Sufficient',
    },
    {
      id: 'E-004',
      name: 'Ballistic Vests',
      quantity: 150,
      available: 98,
      condition: 'Good',
      status: 'Critical',
    },
    {
      id: 'E-005',
      name: 'Radio Units',
      quantity: 180,
      available: 142,
      condition: 'Fair',
      status: 'Low Stock',
    },
    {
      id: 'E-006',
      name: 'First Aid Kits',
      quantity: 90,
      available: 67,
      condition: 'Good',
      status: 'Sufficient',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Service':
        return 'bg-green-600/10 text-green-600 border-green-600/20';
      case 'Maintenance':
        return 'bg-yellow-600/10 text-yellow-600 border-yellow-600/20';
      case 'Out of Service':
        return 'bg-red-600/10 text-red-600 border-red-600/20';
      default:
        return 'bg-gray-600/10 text-gray-600 border-gray-600/20';
    }
  };

  const getEquipmentStatus = (status: string) => {
    switch (status) {
      case 'Sufficient':
        return 'bg-green-600 text-white';
      case 'Low Stock':
        return 'bg-yellow-600 text-white';
      case 'Critical':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <ProtectedLayout>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Resources & Inventory</h1>
            <p className="text-muted-foreground">Manage vehicles and equipment inventory</p>
          </div>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Resource
          </Button>
        </div>

        <Tabs defaultValue="vehicles" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="vehicles" className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span className="hidden sm:inline">Vehicles</span>
            </TabsTrigger>
            <TabsTrigger value="equipment" className="flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              <span className="hidden sm:inline">Equipment</span>
            </TabsTrigger>
          </TabsList>

          {/* Vehicles */}
          <TabsContent value="vehicles" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="bg-card border-secondary">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Truck className="w-5 h-5 text-accent" />
                          <div>
                            <h3 className="font-semibold text-foreground">{vehicle.type}</h3>
                            <p className="text-sm text-muted-foreground">{vehicle.make}</p>
                          </div>
                        </div>
                      </div>
                      <Badge className={`border ${getStatusColor(vehicle.status)}`}>
                        {vehicle.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Plate</p>
                        <p className="text-sm font-mono text-foreground">{vehicle.plate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Mileage</p>
                        <p className="text-sm text-foreground">{vehicle.mileage}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Location</p>
                        <p className="text-sm text-foreground">{vehicle.location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Driver</p>
                        <p className="text-sm text-foreground">{vehicle.driver}</p>
                      </div>
                    </div>

                    <div className="border-t border-secondary pt-4 flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Last service: {vehicle.lastService} • Next: {vehicle.nextService}
                      </div>
                      <Button size="sm" variant="outline" className="border-secondary">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Equipment */}
          <TabsContent value="equipment" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {equipment.map((item) => (
                <Card key={item.id} className="bg-card border-secondary">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Wrench className="w-5 h-5 text-accent" />
                          <h3 className="font-semibold text-foreground">{item.name}</h3>
                        </div>
                      </div>
                      <Badge className={getEquipmentStatus(item.status)}>
                        {item.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Total</p>
                        <p className="text-2xl font-bold text-foreground">{item.quantity}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Available</p>
                        <p className="text-2xl font-bold text-accent">{item.available}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Utilization</p>
                        <p className="text-2xl font-bold text-foreground">
                          {Math.round(((item.quantity - item.available) / item.quantity) * 100)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Condition</p>
                        <p className="text-sm text-foreground font-medium">{item.condition}</p>
                      </div>
                    </div>

                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent"
                        style={{ width: `${(item.available / item.quantity) * 100}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedLayout>
  );
}
