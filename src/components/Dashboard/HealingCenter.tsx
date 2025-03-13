
import React, { useState } from 'react';
import { healingRecommendations, recentHealingEvents } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface HealingCenterProps {
  className?: string;
}

const HealingCenter: React.FC<HealingCenterProps> = ({ className }) => {
  const [selectedTab, setSelectedTab] = useState<'recommendations' | 'history'>('recommendations');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return 'bg-green-500/10 text-green-600 border-green-200';
      case 'medium': return 'bg-amber-500/10 text-amber-600 border-amber-200';
      case 'high': return 'bg-red-500/10 text-red-600 border-red-200';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500/10 text-green-600 border-green-200';
      case 'failed': return 'bg-red-500/10 text-red-600 border-red-200';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className={cn('glass-card rounded-xl overflow-hidden', className)}>
      <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Self-Healing Center</h2>
        
        <div className="flex bg-background rounded-lg p-0.5 border border-border/60">
          <button
            className={cn(
              'px-3 py-1 rounded-md text-sm font-medium transition-colors',
              selectedTab === 'recommendations' ? 'bg-primary text-white' : 'text-foreground hover:bg-secondary/50'
            )}
            onClick={() => setSelectedTab('recommendations')}
          >
            Recommendations
          </button>
          <button
            className={cn(
              'px-3 py-1 rounded-md text-sm font-medium transition-colors',
              selectedTab === 'history' ? 'bg-primary text-white' : 'text-foreground hover:bg-secondary/50'
            )}
            onClick={() => setSelectedTab('history')}
          >
            History
          </button>
        </div>
      </div>

      <div className="p-3 max-h-[400px] overflow-y-auto scrollbar-thin">
        {selectedTab === 'recommendations' ? (
          <div className="space-y-3 fade-sequence">
            {healingRecommendations.map((rec) => (
              <div key={rec.id} className="glass-card rounded-lg p-3 card-hover-effect">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{rec.issue}</h3>
                      <div className={cn('badge-pill border', getComplexityColor(rec.complexity))}>
                        {rec.complexity}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {rec.database}
                    </p>
                  </div>
                  <div className="text-xs font-medium text-right">
                    <div>AI Confidence</div>
                    <div className={rec.aiConfidence >= 90 ? 'text-green-500' : 'text-amber-500'}>
                      {rec.aiConfidence}%
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>{rec.recommendation}</p>
                </div>
                
                <div className="mt-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Impact:</span>{' '}
                    <span className="text-foreground">{rec.impact}</span>
                  </div>
                </div>

                <div className="mt-3 flex gap-2 justify-end">
                  <button className="px-3 py-1.5 rounded-md text-sm font-medium bg-secondary hover:bg-secondary/70 focus-ring transition-colors">
                    Details
                  </button>
                  {rec.automationPossible && (
                    <button className="px-3 py-1.5 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90 focus-ring transition-colors">
                      Heal Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3 fade-sequence">
            {recentHealingEvents.map((event) => (
              <div key={event.id} 
                className={cn(
                  "glass-card rounded-lg p-3 card-hover-effect transition-all duration-300",
                  expandedId === event.id ? "ring-1 ring-primary/30" : ""
                )}
              >
                <div className="flex justify-between items-start" 
                  onClick={() => toggleExpand(event.id)} 
                  role="button" 
                  tabIndex={0}
                >
                  <div className="flex items-start gap-2">
                    <div className={cn('badge-pill border mt-0.5', getStatusColor(event.status))}>
                      {event.status}
                    </div>
                    <div>
                      <h3 className="font-medium">{event.description}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {event.database} • {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground mr-2">{event.duration}</span>
                    <svg 
                      className={cn(
                        "w-4 h-4 transition-transform duration-300",
                        expandedId === event.id ? "transform rotate-180" : ""
                      )} 
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                
                {expandedId === event.id && (
                  <div className="mt-3 text-sm animate-fade-in">
                    <div className="bg-secondary/30 rounded-lg p-2">
                      <div>
                        <span className="text-muted-foreground">Impact:</span>{' '}
                        <span>{event.impact}</span>
                      </div>
                      <div className="mt-1">
                        <span className="text-muted-foreground">AI Confidence:</span>{' '}
                        <span className={event.aiConfidence >= 90 ? 'text-green-500' : 'text-amber-500'}>
                          {event.aiConfidence}%
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <button className="px-2 py-1 rounded-md text-xs font-medium bg-secondary hover:bg-secondary/70 focus-ring transition-colors">
                        View Full Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HealingCenter;
