
import React, { useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import HealthMonitor from '@/components/Dashboard/HealthMonitor';
import DiagnosticsPanel from '@/components/Dashboard/DiagnosticsPanel';
import HealingCenter from '@/components/Dashboard/HealingCenter';
import AnalyticsView from '@/components/Dashboard/AnalyticsView';
import ConfigPanel from '@/components/Dashboard/ConfigPanel';

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-radial from-background to-background/95 py-6 px-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <DashboardHeader />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 lg:col-span-2 space-y-6">
              <HealthMonitor />
              <AnalyticsView />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DiagnosticsPanel />
                <HealingCenter />
              </div>
            </div>
            
            <div className="col-span-1 space-y-6">
              <ConfigPanel />
            </div>
          </div>
          
          <footer className="mt-12 text-center text-sm text-muted-foreground">
            <p>
              Self-Healing Database Symphony • AI-Powered Database Management
            </p>
          </footer>
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
