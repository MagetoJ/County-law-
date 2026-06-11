'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, DollarSign, Calendar } from 'lucide-react';

const FEEDING_PROGRAMS = [
  {
    schoolName: 'Nairobi High School',
    status: 'active',
    beneficiaries: 450,
    mealsPerDay: 1,
    monthlyBudget: 180000,
    fundingSource: 'Government',
    lastAudit: '2023-09-20',
    menu: {
      monday: ['Porridge', 'Beans', 'Rice'],
      tuesday: ['Ugali', 'Sukuma Wiki', 'Beans'],
      wednesday: ['Chapati', 'Vegetables', 'Eggs'],
      thursday: ['Rice', 'Meat Stew', 'Greens'],
      friday: ['Porridge', 'Beans', 'Potatoes'],
    },
  },
  {
    schoolName: 'Mombasa Primary School',
    status: 'active',
    beneficiaries: 600,
    mealsPerDay: 2,
    monthlyBudget: 240000,
    fundingSource: 'Government + NGO',
    lastAudit: '2023-08-15',
    menu: {
      monday: ['Porridge', 'Milk'],
      tuesday: ['Ugali', 'Beans'],
      wednesday: ['Rice', 'Vegetables'],
      thursday: ['Chapati', 'Eggs'],
      friday: ['Porridge', 'Beans'],
    },
  },
];

export default function FeedingPage() {
  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">School Feeding Programme</h1>
            <p className="text-muted-foreground mt-2">Monitor school nutrition and feeding programs</p>
          </div>

          {/* Programs */}
          {FEEDING_PROGRAMS.map((program, idx) => (
            <Card key={idx} className="mb-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{program.schoolName}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          program.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {program.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {program.beneficiaries} beneficiaries
                      </p>
                      <p className="flex items-center gap-2 mt-1">
                        <TrendingUp className="w-4 h-4" />
                        {program.mealsPerDay} meal(s) per day
                      </p>
                      <p className="flex items-center gap-2 mt-1">
                        <DollarSign className="w-4 h-4" />
                        KES {program.monthlyBudget.toLocaleString()} monthly
                      </p>
                      <p className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4" />
                        Last Audit: {new Date(program.lastAudit).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Funding Source</p>
                  <div className="bg-muted/50 p-4 rounded-lg mb-3">
                    <p className="text-foreground font-medium">{program.fundingSource}</p>
                  </div>
                  <p className="text-sm font-semibold text-foreground mb-3">Menu - This Week</p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    {Object.entries(program.menu).map(([day, meals]) => (
                      <p key={day}>
                        <strong className="capitalize">{day}:</strong> {meals.join(', ')}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Total Beneficiaries</p>
              <p className="text-2xl font-bold text-foreground mt-2">
                {FEEDING_PROGRAMS.reduce((sum, p) => sum + p.beneficiaries, 0)}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Active Programs</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {FEEDING_PROGRAMS.filter(p => p.status === 'active').length}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Monthly Budget</p>
              <p className="text-2xl font-bold text-foreground mt-2">
                KES {(FEEDING_PROGRAMS.reduce((sum, p) => sum + p.monthlyBudget, 0) / 1000).toFixed(0)}k
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Avg per Student</p>
              <p className="text-2xl font-bold text-foreground mt-2">
                KES {Math.round(
                  FEEDING_PROGRAMS.reduce((sum, p) => sum + p.monthlyBudget, 0) /
                  FEEDING_PROGRAMS.reduce((sum, p) => sum + p.beneficiaries, 0)
                )}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
