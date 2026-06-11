'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Building2, Users, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const mockStations = [
  {
    id: '1',
    name: 'Parklands Police Station',
    location: 'Nairobi, Parklands',
    commander: 'John Kipchoge',
    phone: '+254712345678',
    staffCount: 45,
    capacity: 50,
  },
  {
    id: '2',
    name: 'Karen Police Station',
    location: 'Nairobi, Karen',
    commander: 'Mary Okonkwo',
    phone: '+254712345679',
    staffCount: 32,
    capacity: 40,
  },
  {
    id: '3',
    name: 'Kasarani Police Station',
    location: 'Nairobi, Kasarani',
    commander: 'Peter Kipchoge',
    phone: '+254712345680',
    staffCount: 28,
    capacity: 35,
  },
  {
    id: '4',
    name: 'Westlands Police Station',
    location: 'Nairobi, Westlands',
    commander: 'Sarah Mutua',
    phone: '+254712345681',
    staffCount: 38,
    capacity: 45,
  },
  {
    id: '5',
    name: 'Mombasa Road Police Station',
    location: 'Nairobi, Mombasa Road',
    commander: 'David Okonkwo',
    phone: '+254712345682',
    staffCount: 22,
    capacity: 30,
  },
];

export default function StationsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStations = mockStations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Police Stations</h1>
            <p className="text-muted-foreground mt-1">Manage police stations and resources</p>
          </div>
          <Link href="/stations/new">
            <Button className="bg-primary hover:bg-primary/90 text-sidebar-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              New Station
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search stations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStations.length > 0 ? (
            filteredStations.map((station) => (
              <Link key={station.id} href={`/stations/${station.id}`}>
                <Card className="border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Station Header */}
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{station.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="w-4 h-4" />
                            <span>{station.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Commander */}
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Station Commander</p>
                        <p className="font-medium text-foreground">{station.commander}</p>
                      </div>

                      {/* Contact */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{station.phone}</span>
                      </div>

                      {/* Staff Stats */}
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">Current Staff</p>
                          <p className="text-lg font-bold text-foreground mt-1">{station.staffCount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Capacity</p>
                          <p className="text-lg font-bold text-foreground mt-1">{station.capacity}</p>
                        </div>
                      </div>

                      {/* Staffing Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Staffing Level</span>
                          <span className="text-xs font-medium text-foreground">
                            {Math.round((station.staffCount / station.capacity) * 100)}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full transition-all"
                            style={{ width: `${(station.staffCount / station.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Card className="border-border border-dashed md:col-span-2">
              <CardContent className="pt-12 pb-12 flex flex-col items-center justify-center">
                <Building2 className="w-12 h-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No stations found</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Stations</p>
              <p className="text-2xl font-bold text-foreground mt-2">{mockStations.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Staff</p>
              <p className="text-2xl font-bold text-foreground mt-2">
                {mockStations.reduce((sum, s) => sum + s.staffCount, 0)}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Capacity</p>
              <p className="text-2xl font-bold text-foreground mt-2">
                {mockStations.reduce((sum, s) => sum + s.capacity, 0)}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  );
}
