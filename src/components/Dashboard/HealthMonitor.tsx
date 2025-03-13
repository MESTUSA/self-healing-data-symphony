
import React, { useState } from 'react';
import { databaseHealthData } from '@/data/mockData';
import { cn } from '@/lib/utils';
import StatCard from '@/components/common/StatCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface HealthMonitorProps {
  className?: string;
}

const HealthMonitor: React.FC<HealthMonitorProps> = ({ className }) => {
  const [selectedDb, setSelectedDb] = useState(databaseHealthData[0].id);
  
  const selectedDatabase = databaseHealthData.find(db => db.id === selectedDb) || databaseHealthData[0];
  
  const getHealthColor = (health: number) => {
    if (health >= 90) return 'rgb(74, 222, 128)'; // green-500
    if (health >= 70) return 'rgb(251, 191, 36)'; // amber-500
    return 'rgb(248, 113, 113)'; // red-500
  };
  
  const getStatusClasses = (status: string) => {
    if (status === 'healthy') return 'bg-green-500/10 text-green-600 border-green-200';
    if (status === 'warning') return 'bg-amber-500/10 text-amber-600 border-amber-200';
    return 'bg-red-500/10 text-red-600 border-red-200';
  };

  const chartData = selectedDatabase.history.map((value, index) => ({
    name: `T-${selectedDatabase.history.length - index}`,
    value
  }));

  return (
    <div className={cn('glass-card rounded-xl overflow-hidden', className)}>
      <div className="p-4 border-b border-border bg-muted/30">
        <h2 className="text-lg font-semibold">Database Health Monitor</h2>
      </div>

      <div className="p-3">
        <div className="flex flex-wrap gap-2 mb-4">
          {databaseHealthData.map((db) => (
            <button
              key={db.id}
              onClick={() => setSelectedDb(db.id)}
              className={cn(
                'px-3 py-1.5 rounded-full border text-sm font-medium transition-colors focus-ring',
                db.id === selectedDb
                  ? 'bg-primary text-white border-primary'
                  : 'bg-background hover:bg-secondary/50 border-border/60'
              )}
            >
              {db.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="col-span-1 lg:col-span-2 glass-card p-4 rounded-xl h-full flex flex-col justify-center relative overflow-hidden">
            <div className="flex items-baseline gap-2 ml-3 mb-2">
              <div className={cn(
                'badge-pill border',
                getStatusClasses(selectedDatabase.status)
              )}>
                {selectedDatabase.status}
              </div>
              <h3 className="text-xl font-bold">
                Health Score: {selectedDatabase.health}%
              </h3>
            </div>
            
            <div className="h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Health']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={24} className="chart-animate">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getHealthColor(entry.value)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="absolute top-3 right-3 text-xs text-muted-foreground">
              {selectedDatabase.type} • Last healed: {selectedDatabase.lastHealed}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <StatCard 
              title="CPU Usage" 
              value={selectedDatabase.cpuUsage} 
              formatValue={(v) => `${v}%`}
              variant="glass"
              size="sm" 
            />
            <StatCard 
              title="Memory Usage" 
              value={selectedDatabase.memoryUsage} 
              formatValue={(v) => `${v}%`}
              variant="glass"
              size="sm" 
            />
            <StatCard 
              title="Free Space" 
              value={selectedDatabase.freeSpace} 
              formatValue={(v) => `${v}%`}
              variant="glass"
              size="sm" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard 
            title="Latency" 
            value={selectedDatabase.latency} 
            formatValue={(v) => `${v} ms`}
            variant="glass"
            size="sm" 
          />
          <StatCard 
            title="Throughput" 
            value={selectedDatabase.throughput} 
            formatValue={(v) => `${v} qps`}
            variant="glass"
            size="sm" 
          />
          <StatCard 
            title="Active Connections" 
            value={selectedDatabase.connections}
            variant="glass" 
            size="sm" 
          />
        </div>
      </div>
    </div>
  );
};

export default HealthMonitor;
