'use client';

import { ProtectedLayout } from '@/components/layout/protected-layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { INFRASTRUCTURE_CATEGORIES, PROJECT_STATUS } from '@/lib/constants';
import { InfrastructureProject } from '@/lib/types';
import { Building2, DollarSign, Calendar, AlertCircle } from 'lucide-react';

const MOCK_PROJECTS: InfrastructureProject[] = [
  {
    id: '1',
    schoolId: '1',
    projectName: 'New Science Laboratory',
    description: 'Construction of modern science lab with equipment',
    category: 'lab',
    status: 'in-progress',
    estimatedCost: 2500000,
    amountSpent: 1800000,
    startDate: '2023-06-01',
    expectedEndDate: '2024-02-28',
    fundingSource: 'Government Education Funds',
    contractor: 'BuildRight Contractors',
  },
  {
    id: '2',
    schoolId: '1',
    projectName: 'Library Extension',
    description: 'Expand library space and add digital resources',
    category: 'library',
    status: 'completed',
    estimatedCost: 1800000,
    amountSpent: 1800000,
    startDate: '2022-09-01',
    expectedEndDate: '2023-06-30',
    actualEndDate: '2023-06-15',
    fundingSource: 'NGO Partnership',
  },
  {
    id: '3',
    schoolId: '1',
    projectName: 'Improved Water System',
    description: 'Installation of new water storage and distribution',
    category: 'water',
    status: 'approved',
    estimatedCost: 1200000,
    amountSpent: 0,
    startDate: '2024-01-15',
    expectedEndDate: '2024-06-30',
    fundingSource: 'World Bank Grant',
  },
  {
    id: '4',
    schoolId: '1',
    projectName: 'New Classroom Block',
    description: 'Construction of 6 additional classrooms',
    category: 'classroom',
    status: 'planning',
    estimatedCost: 4500000,
    amountSpent: 0,
    startDate: '2024-06-01',
    expectedEndDate: '2025-12-31',
    fundingSource: 'Government Allocation',
  },
];

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    planning: 'bg-blue-100 text-blue-800',
    approved: 'bg-purple-100 text-purple-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    stalled: 'bg-red-100 text-red-800',
  };
  return colors[status] || colors.planning;
};

export default function InfrastructurePage() {
  const totalBudget = MOCK_PROJECTS.reduce((sum, p) => sum + p.estimatedCost, 0);
  const totalSpent = MOCK_PROJECTS.reduce((sum, p) => sum + p.amountSpent, 0);
  const totalProgress = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Infrastructure Projects</h1>
            <p className="text-muted-foreground mt-2">Track school infrastructure development</p>
          </div>

          {/* Overall Progress */}
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Overall Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Budget Utilization</span>
                  <span className="text-sm font-semibold text-foreground">{totalProgress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-accent to-orange-500 h-3 rounded-full transition-all"
                    style={{ width: `${totalProgress}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Budget</p>
                  <p className="text-lg font-bold text-foreground">KES {(totalBudget / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Spent</p>
                  <p className="text-lg font-bold text-foreground">KES {(totalSpent / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Remaining</p>
                  <p className="text-lg font-bold text-foreground">KES {((totalBudget - totalSpent) / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Projects */}
          <div className="space-y-4">
            {MOCK_PROJECTS.map((project) => {
              const progress = project.estimatedCost > 0 ? (project.amountSpent / project.estimatedCost) * 100 : 0;
              return (
                <Card key={project.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <Building2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{project.projectName}</h3>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">
                          {INFRASTRUCTURE_CATEGORIES[project.category as keyof typeof INFRASTRUCTURE_CATEGORIES]}
                        </Badge>
                        <Badge className={getStatusColor(project.status)}>
                          {PROJECT_STATUS[project.status as keyof typeof PROJECT_STATUS]}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs mb-1 flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        Budget
                      </p>
                      <p className="font-semibold text-foreground">KES {(project.estimatedCost / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Spent</p>
                      <p className="font-semibold text-foreground">KES {(project.amountSpent / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Timeline
                      </p>
                      <p className="font-semibold text-foreground text-xs">
                        {new Date(project.startDate).toLocaleDateString()} - {new Date(project.expectedEndDate!).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Funding</p>
                      <p className="font-semibold text-foreground text-xs">{project.fundingSource}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-semibold text-foreground">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Total Projects</p>
              <p className="text-2xl font-bold text-foreground mt-2">{MOCK_PROJECTS.length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">
                {MOCK_PROJECTS.filter(p => p.status === 'in-progress').length}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Completed</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {MOCK_PROJECTS.filter(p => p.status === 'completed').length}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-muted-foreground text-sm">Planning</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {MOCK_PROJECTS.filter(p => p.status === 'planning').length}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
