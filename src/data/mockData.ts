
// Mock data for the Self-Healing Database Platform

// Database health data
export const databaseHealthData = [
  {
    id: 'db1',
    name: 'Production DB',
    type: 'PostgreSQL',
    health: 97,
    status: 'healthy',
    uptime: '99.98%',
    issues: 2,
    latency: 5.2,
    throughput: 1320,
    connections: 84,
    freeSpace: 72.5,
    cpuUsage: 34,
    memoryUsage: 41,
    lastHealed: '2 hours ago',
    history: [98, 97, 99, 96, 97, 98, 97, 99, 98, 97]
  },
  {
    id: 'db2',
    name: 'Analytics DB',
    type: 'MySQL',
    health: 88,
    status: 'warning',
    uptime: '99.92%',
    issues: 5,
    latency: 8.7,
    throughput: 870,
    connections: 42,
    freeSpace: 31.2,
    cpuUsage: 58,
    memoryUsage: 72,
    lastHealed: '6 hours ago',
    history: [92, 90, 88, 89, 85, 87, 90, 92, 90, 88]
  },
  {
    id: 'db3',
    name: 'Customer Data',
    type: 'MongoDB',
    health: 94,
    status: 'healthy',
    uptime: '99.97%',
    issues: 3,
    latency: 3.8,
    throughput: 2240,
    connections: 112,
    freeSpace: 68.4,
    cpuUsage: 45,
    memoryUsage: 53,
    lastHealed: '1 day ago',
    history: [93, 94, 96, 95, 94, 93, 94, 92, 93, 94]
  },
  {
    id: 'db4',
    name: 'Archive DB',
    type: 'MariaDB',
    health: 71,
    status: 'critical',
    uptime: '98.76%',
    issues: 12,
    latency: 15.3,
    throughput: 420,
    connections: 28,
    freeSpace: 12.8,
    cpuUsage: 78,
    memoryUsage: 86,
    lastHealed: '3 days ago',
    history: [75, 72, 70, 74, 76, 73, 72, 71, 69, 71]
  },
];

// Recent healing events
export const recentHealingEvents = [
  {
    id: 'event1',
    database: 'Production DB',
    timestamp: '2023-06-15T08:43:21',
    description: 'Automatic index optimization performed',
    status: 'success',
    duration: '1m 45s',
    impact: 'Improved query performance by 28%',
    aiConfidence: 96
  },
  {
    id: 'event2',
    database: 'Analytics DB',
    timestamp: '2023-06-15T06:12:05',
    description: 'Query cache optimized',
    status: 'success',
    duration: '3m 12s',
    impact: 'Reduced memory usage by 12%',
    aiConfidence: 92
  },
  {
    id: 'event3',
    database: 'Customer Data',
    timestamp: '2023-06-14T22:37:49',
    description: 'Data inconsistency detected and repaired',
    status: 'success',
    duration: '4m 38s',
    impact: 'Fixed 3 schema integrity issues',
    aiConfidence: 89
  },
  {
    id: 'event4',
    database: 'Archive DB',
    timestamp: '2023-06-14T19:54:12',
    description: 'Attempted disk space optimization',
    status: 'failed',
    duration: '2m 03s',
    impact: 'Insufficient permissions to compress tables',
    aiConfidence: 76
  },
  {
    id: 'event5',
    database: 'Production DB',
    timestamp: '2023-06-14T14:22:36',
    description: 'Connection pool rebalanced',
    status: 'success',
    duration: '0m 47s',
    impact: 'Improved connection throughput by 15%',
    aiConfidence: 94
  }
];

// Detected issues
export const detectedIssues = [
  {
    id: 'issue1',
    database: 'Analytics DB',
    severity: 'warning',
    description: 'Slow-running queries detected',
    status: 'pending',
    detectedAt: '2023-06-15T07:12:43',
    recommendation: 'Optimize query cache and indexes',
    aiConfidence: 91,
    affectedTables: ['user_analytics', 'session_data'],
    estimatedImpact: 'Medium'
  },
  {
    id: 'issue2',
    database: 'Archive DB',
    severity: 'critical',
    description: 'Low disk space (12.8% remaining)',
    status: 'pending',
    detectedAt: '2023-06-15T05:44:21',
    recommendation: 'Clean up old data or increase storage',
    aiConfidence: 98,
    affectedTables: ['system_logs', 'audit_history'],
    estimatedImpact: 'High'
  },
  {
    id: 'issue3',
    database: 'Production DB',
    severity: 'low',
    description: 'Suboptimal index usage on customer_orders table',
    status: 'pending',
    detectedAt: '2023-06-15T02:12:18',
    recommendation: 'Create composite index on (customer_id, order_date)',
    aiConfidence: 87,
    affectedTables: ['customer_orders'],
    estimatedImpact: 'Low'
  },
  {
    id: 'issue4',
    database: 'Customer Data',
    severity: 'warning',
    description: 'Potential data inconsistency in user_preferences collection',
    status: 'investigating',
    detectedAt: '2023-06-14T23:55:07',
    recommendation: 'Run data integrity check and repair',
    aiConfidence: 82,
    affectedTables: ['user_preferences'],
    estimatedImpact: 'Medium'
  }
];

// Performance metrics over time
export const performanceHistory = {
  timeframes: ['1h', '3h', '6h', '12h', '24h', '48h', '7d'],
  metrics: {
    queryLatency: {
      'Production DB': [5.2, 5.4, 5.1, 5.3, 5.8, 5.5, 5.2],
      'Analytics DB': [8.7, 8.9, 9.3, 8.5, 8.2, 7.8, 8.1],
      'Customer Data': [3.8, 3.7, 3.9, 4.1, 3.8, 3.6, 3.9],
      'Archive DB': [15.3, 16.1, 15.8, 14.9, 15.7, 16.2, 15.5]
    },
    throughput: {
      'Production DB': [1320, 1280, 1350, 1410, 1380, 1290, 1340],
      'Analytics DB': [870, 840, 810, 890, 920, 880, 850],
      'Customer Data': [2240, 2180, 2270, 2310, 2250, 2290, 2220],
      'Archive DB': [420, 410, 390, 430, 450, 410, 400]
    },
    cpuUsage: {
      'Production DB': [34, 36, 33, 35, 38, 37, 34],
      'Analytics DB': [58, 61, 63, 59, 56, 57, 60],
      'Customer Data': [45, 44, 46, 48, 47, 45, 44],
      'Archive DB': [78, 80, 79, 76, 77, 81, 79]
    },
    memoryUsage: {
      'Production DB': [41, 43, 40, 42, 44, 43, 41],
      'Analytics DB': [72, 74, 76, 73, 70, 71, 73],
      'Customer Data': [53, 52, 54, 55, 54, 52, 53],
      'Archive DB': [86, 88, 87, 85, 87, 89, 86]
    }
  }
};

// Healing recommendations
export const healingRecommendations = [
  {
    id: 'rec1',
    database: 'Analytics DB',
    issue: 'Slow-running queries',
    recommendation: 'Create optimized indexes for frequent queries',
    impact: 'Estimated 30% query performance improvement',
    complexity: 'medium',
    aiConfidence: 92,
    automationPossible: true
  },
  {
    id: 'rec2',
    database: 'Archive DB',
    issue: 'Low disk space',
    recommendation: 'Archive data older than 6 months',
    impact: 'Recover approximately 45% disk space',
    complexity: 'high',
    aiConfidence: 96,
    automationPossible: true
  },
  {
    id: 'rec3',
    database: 'Production DB',
    issue: 'Suboptimal index usage',
    recommendation: 'Rebuild indexes on customer_orders table',
    impact: 'Estimated 15% improvement for order lookups',
    complexity: 'low',
    aiConfidence: 89,
    automationPossible: true
  },
  {
    id: 'rec4',
    database: 'Customer Data',
    issue: 'Data inconsistency',
    recommendation: 'Run full integrity check and repair',
    impact: 'Fix potential data corruption issues',
    complexity: 'medium',
    aiConfidence: 84,
    automationPossible: false
  }
];

// AI insights
export const aiInsights = [
  {
    id: 'insight1',
    title: 'Potential Performance Pattern Detected',
    description: 'Analytics DB shows cyclical performance issues every Monday at 9 AM, correlating with weekly reporting jobs.',
    recommendation: 'Consider staggering report generation or optimizing the involved queries.',
    confidence: 86,
    category: 'performance',
    timestamp: '2023-06-15T07:30:22'
  },
  {
    id: 'insight2',
    title: 'Resource Allocation Inefficiency',
    description: 'Archive DB is over-provisioned by approximately 40% based on actual usage patterns over the last 30 days.',
    recommendation: 'Consider downscaling to reduce costs while maintaining performance.',
    confidence: 92,
    category: 'resource',
    timestamp: '2023-06-14T18:45:39'
  },
  {
    id: 'insight3',
    title: 'Anomalous Access Pattern',
    description: 'Unusual query pattern detected on Production DB outside normal business hours.',
    recommendation: 'Review security logs and access controls for potential unauthorized access.',
    confidence: 79,
    category: 'security',
    timestamp: '2023-06-14T03:12:56'
  }
];

// System health metrics
export const systemHealthMetrics = {
  overallHealth: 88,
  databasesMonitored: 4,
  activeIssues: 7,
  issuesByPriority: {
    critical: 1,
    high: 2,
    medium: 3,
    low: 1
  },
  healingSuccess: 94,
  avgResponseTime: 1.8,
  meanTimeToHeal: 7.3,
  autoHealingEnabled: 3
};

// Database connections
export const databaseConnections = [
  {
    id: 'conn1',
    database: 'Production DB',
    status: 'connected',
    authenticationType: 'certificate',
    lastChecked: '2023-06-15T08:55:22',
    encryptionStatus: 'enabled',
    host: 'prod-db-cluster.internal',
    port: 5432
  },
  {
    id: 'conn2',
    database: 'Analytics DB',
    status: 'connected',
    authenticationType: 'password',
    lastChecked: '2023-06-15T08:54:18',
    encryptionStatus: 'enabled',
    host: 'analytics-db.internal',
    port: 3306
  },
  {
    id: 'conn3',
    database: 'Customer Data',
    status: 'connected',
    authenticationType: 'certificate',
    lastChecked: '2023-06-15T08:53:45',
    encryptionStatus: 'enabled',
    host: 'customer-db-cluster.internal',
    port: 27017
  },
  {
    id: 'conn4',
    database: 'Archive DB',
    status: 'intermittent',
    authenticationType: 'password',
    lastChecked: '2023-06-15T08:52:33',
    encryptionStatus: 'enabled',
    host: 'archive-db.internal',
    port: 3306
  }
];
