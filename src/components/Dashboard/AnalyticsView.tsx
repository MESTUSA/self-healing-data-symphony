
import React, { useState } from 'react';
import { performanceHistory } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import DatabaseSelector from '@/components/common/DatabaseSelector';

interface AnalyticsViewProps {
  className?: string;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ className }) => {
  const [selectedDb, setSelectedDb] = useState('db1');
  const [selectedMetric, setSelectedMetric] = useState<'queryLatency' | 'throughput' | 'cpuUsage' | 'memoryUsage'>('queryLatency');
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  
  const metrics = [
    { id: 'queryLatency', label: 'Query Latency', unit: 'ms', color: '#3b82f6' },
    { id: 'throughput', label: 'Throughput', unit: 'qps', color: '#10b981' },
    { id: 'cpuUsage', label: 'CPU Usage', unit: '%', color: '#f59e0b' },
    { id: 'memoryUsage', label: 'Memory Usage', unit: '%', color: '#8b5cf6' }
  ];

  // Get database name from id
  const getDatabaseName = (id: string) => {
    switch (id) {
      case 'db1': return 'Production DB';
      case 'db2': return 'Analytics DB';
      case 'db3': return 'Customer Data';
      case 'db4': return 'Archive DB';
      default: return '';
    }
  };
  
  // Prepare chart data
  const chartData = performanceHistory.timeframes.map((time, index) => {
    const databases = ['db1', 'db2', 'db3', 'db4'];
    const dataPoint: any = { name: time };
    
    databases.forEach(db => {
      const dbName = getDatabaseName(db);
      // @ts-ignore
      dataPoint[dbName] = performanceHistory.metrics[selectedMetric][dbName][index];
    });
    
    return dataPoint;
  });
  
  const selectedMetricConfig = metrics.find(m => m.id === selectedMetric) || metrics[0];

  return (
    <div className={cn('glass-card rounded-xl overflow-hidden', className)}>
      <div className="p-4 border-b border-border bg-muted/30">
        <h2 className="text-lg font-semibold">Performance Analytics</h2>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap justify-between gap-3 mb-4">
          <div className="flex gap-2 flex-wrap">
            {metrics.map(metric => (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id as any)}
                className={cn(
                  'px-3 py-1.5 rounded-full border text-sm font-medium transition-colors focus-ring',
                  selectedMetric === metric.id
                    ? 'bg-primary text-white border-primary'
                    : 'bg-background hover:bg-secondary/50 border-border/60'
                )}
              >
                {metric.label}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            {performanceHistory.timeframes.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTimeframe(time)}
                className={cn(
                  'px-2 py-1 rounded-md text-xs font-medium transition-colors',
                  selectedTimeframe === time
                    ? 'bg-secondary/70 text-foreground'
                    : 'bg-background hover:bg-secondary/30 text-muted-foreground'
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12 }}
                width={25}
                unit={selectedMetricConfig.unit}
              />
              <Tooltip 
                formatter={(value) => [`${value} ${selectedMetricConfig.unit}`, selectedMetricConfig.label]}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="Production DB" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                isAnimationActive={true} 
                animationDuration={1000}
                className="chart-animate"
              />
              <Line 
                type="monotone" 
                dataKey="Analytics DB" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                isAnimationActive={true} 
                animationDuration={1000}
                animationBegin={300}
                className="chart-animate"
              />
              <Line 
                type="monotone" 
                dataKey="Customer Data" 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                isAnimationActive={true} 
                animationDuration={1000}
                animationBegin={600}
                className="chart-animate"
              />
              <Line 
                type="monotone" 
                dataKey="Archive DB" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                isAnimationActive={true} 
                animationDuration={1000}
                animationBegin={900}
                className="chart-animate"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
