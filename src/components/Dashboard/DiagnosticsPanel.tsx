
import React, { useState } from 'react';
import { detectedIssues, aiInsights } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface DiagnosticsPanelProps {
  className?: string;
}

const DiagnosticsPanel: React.FC<DiagnosticsPanelProps> = ({ className }) => {
  const [selectedTab, setSelectedTab] = useState<'issues' | 'insights'>('issues');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 text-red-600 border-red-200';
      case 'warning': return 'bg-amber-500/10 text-amber-600 border-amber-200';
      case 'low': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-500';
      case 'Medium': return 'text-amber-500';
      case 'Low': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return 'bg-purple-500/10 text-purple-600 border-purple-200';
      case 'resource': return 'bg-green-500/10 text-green-600 border-green-200';
      case 'security': return 'bg-red-500/10 text-red-600 border-red-200';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getConfidenceClass = (value: number) => {
    if (value >= 90) return 'text-green-500';
    if (value >= 75) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className={cn('glass-card rounded-xl overflow-hidden', className)}>
      <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
        <h2 className="text-lg font-semibold">AI Diagnostics</h2>
        
        <div className="flex bg-background rounded-lg p-0.5 border border-border/60">
          <button
            className={cn(
              'px-3 py-1 rounded-md text-sm font-medium transition-colors',
              selectedTab === 'issues' ? 'bg-primary text-white' : 'text-foreground hover:bg-secondary/50'
            )}
            onClick={() => setSelectedTab('issues')}
          >
            Issues
          </button>
          <button
            className={cn(
              'px-3 py-1 rounded-md text-sm font-medium transition-colors',
              selectedTab === 'insights' ? 'bg-primary text-white' : 'text-foreground hover:bg-secondary/50'
            )}
            onClick={() => setSelectedTab('insights')}
          >
            Insights
          </button>
        </div>
      </div>

      <div className="p-3 max-h-[400px] overflow-y-auto scrollbar-thin">
        {selectedTab === 'issues' ? (
          <div className="space-y-3 fade-sequence">
            {detectedIssues.map((issue) => (
              <div key={issue.id} className="glass-card rounded-lg p-3 card-hover-effect">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-2">
                    <div className={cn('badge-pill border mt-0.5', getSeverityColor(issue.severity))}>
                      {issue.severity}
                    </div>
                    <div>
                      <h3 className="font-medium">{issue.description}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {issue.database} • Detected {new Date(issue.detectedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-right">
                    <div>AI Confidence</div>
                    <div className={getConfidenceClass(issue.aiConfidence)}>
                      {issue.aiConfidence}%
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 bg-secondary/30 rounded-lg p-2 text-sm">
                  <div className="font-medium mb-1">Recommendation:</div>
                  <p className="text-muted-foreground">{issue.recommendation}</p>
                </div>

                <div className="mt-2 flex justify-between text-xs">
                  <div>
                    <span className="text-muted-foreground">Affected:</span>{' '}
                    {issue.affectedTables.map((table, i) => (
                      <span key={table}>
                        <code className="text-xs bg-muted/40 px-1.5 py-0.5 rounded-md">
                          {table}
                        </code>
                        {i < issue.affectedTables.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Impact:</span>{' '}
                    <span className={getImpactColor(issue.estimatedImpact)}>{issue.estimatedImpact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3 fade-sequence">
            {aiInsights.map((insight) => (
              <div key={insight.id} className="glass-card rounded-lg p-3 card-hover-effect">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-2">
                    <div className={cn('badge-pill border mt-0.5', getCategoryColor(insight.category))}>
                      {insight.category}
                    </div>
                    <div>
                      <h3 className="font-medium">{insight.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Discovered {new Date(insight.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-right">
                    <div>AI Confidence</div>
                    <div className={getConfidenceClass(insight.confidence)}>
                      {insight.confidence}%
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 text-sm text-muted-foreground">
                  {insight.description}
                </div>
                
                <div className="mt-3 bg-secondary/30 rounded-lg p-2 text-sm">
                  <div className="font-medium mb-1">Suggested Action:</div>
                  <p className="text-muted-foreground">{insight.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosticsPanel;
