'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  FileText,
  User,
  Calendar,
  Gavel,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const mockCase = {
  id: '1',
  caseNumber: 'CR/2024/001',
  title: 'Armed Robbery - Nairobi CBD',
  incidentId: '1',
  status: 'investigation',
  priority: 'high',
  assignedTo: 'John Kipchoge',
  relatedIncidents: ['INC/2024/001'],
  description: 'Armed robbery at ABC Bank. Three suspects armed with firearms. Bank manager statement recorded. Security footage obtained.',
  createdAt: '2024-01-15',
  updatedAt: '2024-01-25',
  evidence: [
    { id: '1', type: 'CCTV Footage', description: 'Bank security camera footage', collectedDate: '2024-01-15' },
    { id: '2', type: 'Witness Statement', description: 'Statement from bank manager', collectedDate: '2024-01-15' },
    { id: '3', type: 'Physical Evidence', description: 'Weapon recovered at scene', collectedDate: '2024-01-16' },
  ],
  witnesses: [
    { id: '1', name: 'Jane Mwangi', statement: 'Witnessed the entire incident from inside the bank', date: '2024-01-15' },
    { id: '2', name: 'Michael Kipchoge', statement: 'Bank manager, provided security footage access', date: '2024-01-15' },
  ],
  courtDate: '2024-03-20',
  prosecutor: 'Mwangi Otiengo',
  charges: ['Armed Robbery', 'Possession of Illegal Firearm', 'Conspiracy'],
};

const STATUS_COLORS: Record<string, string> = {
  open: 'bg-blue-500/20 text-blue-700',
  investigation: 'bg-purple-500/20 text-purple-700',
  'awaiting-prosecution': 'bg-orange-500/20 text-orange-700',
  'in-court': 'bg-yellow-500/20 text-yellow-700',
  closed: 'bg-green-500/20 text-green-700',
};

export default function CaseDetailPage({ params }: { params: { id: string } }) {
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
              <h1 className="text-3xl font-bold text-foreground">{mockCase.title}</h1>
              <p className="text-muted-foreground mt-1">Case Number: {mockCase.caseNumber}</p>
            </div>
            <div className="flex gap-2">
              <span className={`text-sm px-3 py-1 rounded-full font-medium ${STATUS_COLORS[mockCase.status]}`}>
                {mockCase.status.replace('-', ' ')}
              </span>
              <Button className="bg-primary hover:bg-primary/90 text-sidebar-primary-foreground">
                Update Status
              </Button>
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Case Status</p>
              <span className={`text-sm px-3 py-1 rounded-full font-medium inline-block ${STATUS_COLORS[mockCase.status]}`}>
                {mockCase.status.replace('-', ' ')}
              </span>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Priority</p>
              <p className="text-sm font-semibold text-red-600 capitalize">{mockCase.priority}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Evidence Items</p>
              <p className="text-2xl font-bold text-foreground">{mockCase.evidence.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Witnesses</p>
              <p className="text-2xl font-bold text-foreground">{mockCase.witnesses.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Case Description */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Case Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{mockCase.description}</p>
              </CardContent>
            </Card>

            {/* Evidence */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Evidence</CardTitle>
                <CardDescription>{mockCase.evidence.length} items collected</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockCase.evidence.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg border border-border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{item.type}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">Collected: {item.collectedDate}</p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Witness Statements */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Witness Statements</CardTitle>
                <CardDescription>{mockCase.witnesses.length} witness statements recorded</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockCase.witnesses.map((witness) => (
                  <div key={witness.id} className="p-3 rounded-lg border border-border">
                    <h4 className="font-semibold text-foreground">{witness.name}</h4>
                    <p className="text-sm text-foreground mt-1">{witness.statement}</p>
                    <p className="text-xs text-muted-foreground mt-1">Recorded: {witness.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Case Information */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Case Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Assigned To</p>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-foreground font-medium">{mockCase.assignedTo}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Created</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{mockCase.createdAt}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Last Updated</p>
                  <span className="text-foreground">{mockCase.updatedAt}</span>
                </div>
              </CardContent>
            </Card>

            {/* Charges */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Charges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockCase.charges.map((charge, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-foreground text-sm">{charge}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Court Information */}
            <Card className="border-border bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="w-5 h-5" />
                  Court Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Court Date</p>
                  <p className="text-foreground font-semibold">{mockCase.courtDate || 'Not Set'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Prosecutor</p>
                  <p className="text-foreground font-semibold">{mockCase.prosecutor}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
