'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, School, MapPin, User, FileText, RefreshCw } from 'lucide-react';

interface PendingSchool {
  name: string;
  registrationNumber: string;
  type: string;
  county: string;
  constituency: string;
  ward: string;
  principalName: string;
  principalPhone: string;
  principalEmail: string;
  yearEstablished: number;
  status: 'pending' | 'approved' | 'rejected';
}

export default function AdminSchoolVerificationDashboard() {
  const [schools, setSchools] = useState<PendingSchool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPendingList = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/schools/pending');
      if (res.ok) {
        const data = await res.json();
        setSchools(data);
      }
    } catch (err) {
      console.error("Failed fetching pipeline registers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingList();
  }, []);

  const handleAction = async (regNumber: string, action: 'approve' | 'reject') => {
    try {
      const res = await fetch(`http://localhost:3001/api/schools/verify/${encodeURIComponent(regNumber)}?action=${action}`, {
        method: 'POST',
      });
      if (res.ok) {
        // Optimistically update status local array state to maintain smooth animation flow
        setSchools(prev => prev.map(s => s.registrationNumber === regNumber ? { ...s, status: action === 'approve' ? 'approved' : 'rejected' } : s));
      }
    } catch (err) {
      console.error("Action transmission crash:", err);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <School className="w-6 h-6 text-primary" /> Educational Gatekeeping Workspace
          </h1>
          <p className="text-muted-foreground text-sm">
            Review, validate, and issue operational permissions for public self-registered regional academic centers.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchPendingList} disabled={loading} className="gap-2">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Sync Live Registers
        </Button>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-md font-medium text-muted-foreground">Inbound Institution Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {schools.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No registration applications found in processing queues.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Institution Particulars</TableHead>
                  <TableHead>Location Details</TableHead>
                  <TableHead>Administrative Head</TableHead>
                  <TableHead>Audit Status</TableHead>
                  <TableHead className="text-right">Verification Action Matrix</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schools.map((school) => (
                  <TableRow key={school.registrationNumber} className="hover:bg-muted/40 transition-colors">
                    {/* Column 1: Info */}
                    <TableCell className="space-y-1">
                      <div className="font-semibold text-foreground text-sm">{school.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Reg: {school.registrationNumber} • Est: {school.yearEstablished}
                      </div>
                      <Badge variant="outline" className="text-[10px] capitalize font-medium px-1.5 py-0">
                        {school.type}
                      </Badge>
                    </TableCell>

                    {/* Column 2: Location */}
                    <TableCell className="text-xs text-muted-foreground space-y-0.5">
                      <div className="font-medium text-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" /> {school.county} County
                      </div>
                      <div>{school.constituency} Constituency, {school.ward} Ward</div>
                    </TableCell>

                    {/* Column 3: Principal Contact */}
                    <TableCell className="text-xs text-muted-foreground space-y-0.5">
                      <div className="font-medium text-foreground flex items-center gap-1">
                        <User className="w-3 h-3 text-muted-foreground" /> {school.principalName}
                      </div>
                      <div>{school.principalEmail}</div>
                      <div>{school.principalPhone}</div>
                    </TableCell>

                    {/* Column 4: Status Badge */}
                    <TableCell>
                      <Badge 
                        className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5`}
                        variant={
                          school.status === 'approved' ? 'default' : 
                          school.status === 'rejected' ? 'destructive' : 'secondary'
                        }
                      >
                        {school.status}
                      </Badge>
                    </TableCell>

                    {/* Column 5: Action Switches */}
                    <TableCell className="text-right">
                      {school.status === 'pending' ? (
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 border-green-600/30 text-green-600 hover:bg-green-600/10 hover:text-green-600 gap-1"
                            onClick={() => handleAction(school.registrationNumber, 'approve')}
                          >
                            <Check className="w-3.5 h-3.5" /> Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 border-red-600/30 text-red-600 hover:bg-red-600/10 hover:text-red-600 gap-1"
                            onClick={() => handleAction(school.registrationNumber, 'reject')}
                          >
                            <X className="w-3.5 h-3.5" /> Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">
                          Audited and Locked
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}