'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  Car,
  User,
  DollarSign,
  Calendar,
  MapPin,
  FileText,
  CheckCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const mockViolation = {
  id: '1',
  vehicleNumber: 'KCN 123 A',
  violationNumber: 'VIO/2024/001',
  status: 'issued',
  driverName: 'James Kipchoge',
  driverPhone: '+254712345678',
  driverLicense: 'DL/2018/456789',
  vehicleRegDate: '2020-06-15',
  location: 'Nairobi CBD, Tom Mboya Street',
  recordedAt: '2024-01-25 10:30',
  recordedBy: 'Officer John Kipchoge',
  violationType: 'speeding',
  fine: 5000,
  speedLimit: 50,
  recordedSpeed: 78,
  paymentDeadline: '2024-02-25',
  paymentStatus: null,
  paymentMethod: null,
  paymentDate: null,
  appealStatus: null,
  notes: 'Driver was speeding in a school zone. Warning issued for future compliance.',
  evidence: [
    { id: '1', type: 'Photo', description: 'Vehicle speed measurement', url: '#' },
    { id: '2', type: 'Report', description: 'Officer violation report', url: '#' },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  issued: 'bg-blue-500/20 text-blue-700',
  paid: 'bg-green-500/20 text-green-700',
  pending: 'bg-yellow-500/20 text-yellow-700',
  appealed: 'bg-purple-500/20 text-purple-700',
};

export default function TrafficDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <ProtectedLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div>
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">{mockViolation.vehicleNumber}</h1>
              <p className="text-muted-foreground mt-1">Violation: {mockViolation.violationNumber}</p>
            </div>
            <div className="flex gap-2">
              <span className={`text-sm px-3 py-1 rounded-full font-medium ${STATUS_COLORS[mockViolation.status]}`}>
                {mockViolation.status.replace('-', ' ')}
              </span>
              <Button className="bg-primary hover:bg-primary/90 text-sidebar-primary-foreground">
                Update Status
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Fine Amount</p>
              <p className="text-2xl font-bold text-foreground">KES {mockViolation.fine.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Violation Type</p>
              <p className="text-sm font-semibold text-foreground capitalize">
                {mockViolation.violationType.replace('-', ' ')}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Speed Recorded</p>
              <p className="text-2xl font-bold text-red-600">{mockViolation.recordedSpeed} km/h</p>
              <p className="text-xs text-muted-foreground mt-1">Limit: {mockViolation.speedLimit} km/h</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Payment Deadline</p>
              <p className="text-sm font-semibold text-foreground">{mockViolation.paymentDeadline}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Driver Information */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Driver Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Driver Name</p>
                    <p className="text-foreground font-medium">{mockViolation.driverName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">License Number</p>
                    <p className="text-foreground font-medium">{mockViolation.driverLicense}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="text-foreground font-medium">{mockViolation.driverPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Vehicle Reg Date</p>
                    <p className="text-foreground font-medium">{mockViolation.vehicleRegDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Violation Details */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Violation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-foreground">{mockViolation.location}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
                    <p className="text-foreground">{mockViolation.recordedAt}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Recorded By</p>
                  <p className="text-foreground">{mockViolation.recordedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Officer Notes</p>
                  <p className="text-foreground leading-relaxed">{mockViolation.notes}</p>
                </div>
              </CardContent>
            </Card>

            {/* Evidence */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Evidence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockViolation.evidence.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg border border-border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{item.type}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Vehicle Information */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Vehicle Number</p>
                  <p className="text-lg font-bold text-foreground">{mockViolation.vehicleNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Registration Date</p>
                  <p className="text-foreground">{mockViolation.vehicleRegDate}</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="border-border bg-gradient-to-br from-orange-500/10 to-orange-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Fine Amount</p>
                  <p className="text-2xl font-bold text-foreground">KES {mockViolation.fine.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Payment Status</p>
                  <p className="text-sm font-semibold text-yellow-600">Not Paid</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Payment Deadline</p>
                  <p className="text-foreground">{mockViolation.paymentDeadline}</p>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-sidebar-primary-foreground mt-2">
                  Record Payment
                </Button>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  Send Notice
                </Button>
                <Button className="w-full" variant="outline">
                  Track Appeal
                </Button>
                <Button className="w-full" variant="outline">
                  Print Ticket
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
