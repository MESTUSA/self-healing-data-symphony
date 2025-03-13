
import React from 'react';
import { systemHealthMetrics } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  className?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ className }) => {
  const { overallHealth, databasesMonitored, activeIssues, healingSuccess } = systemHealthMetrics;

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-500';
    if (health >= 70) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <header className={cn('mb-6', className)}>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Self-Healing Database Symphony</h1>
          <div className="px-2 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
            AI-powered
          </div>
        </div>
        <p className="text-muted-foreground">
          Intelligent monitoring and automated healing for your database ecosystem
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="glass-card p-4 rounded-xl animate-slide-up" style={{ animationDelay: '0ms' }}>
          <div className="text-sm font-medium text-muted-foreground">System Health</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={cn('text-2xl font-bold', getHealthColor(overallHealth))}>
              {overallHealth}%
            </span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="text-sm font-medium text-muted-foreground">Databases Monitored</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold">{databasesMonitored}</span>
            <span className="text-xs text-muted-foreground">instances</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="text-sm font-medium text-muted-foreground">Active Issues</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold">{activeIssues}</span>
            <span className="text-xs text-muted-foreground">detected</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="text-sm font-medium text-muted-foreground">Healing Success Rate</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-green-500">{healingSuccess}%</span>
            <span className="text-xs text-muted-foreground">last 30 days</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
