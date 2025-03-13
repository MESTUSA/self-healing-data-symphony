
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { databaseHealthData, detectedIssues, recentHealingEvents } from '@/data/mockData';

// Define AI capability types
interface AICapabilities {
  autonomousOrchestration: boolean;
  queryOptimization: boolean;
  continuousLearning: boolean;
  federatedLearning: boolean;
  cognitiveIndexing: boolean;
  predictiveThreat: boolean;
  workloadShaping: boolean;
}

// Define training data types
interface TrainingData {
  trained: boolean;
  lastTrainedAt: Date | null;
  accuracy: number;
  knowledgeBase: Record<string, string>;
  databasePatterns: any[];
  capabilities: AICapabilities;
  learningIterations: number;
  adaptiveModels: string[];
}

interface ChatBotContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  trainingData: TrainingData;
  trainModel: () => Promise<void>;
  isTraining: boolean;
  resetTraining: () => void;
  getAIResponse: (query: string) => Promise<string>;
  enableCapability: (capability: keyof AICapabilities) => void;
  disableCapability: (capability: keyof AICapabilities) => void;
  runContinuousLearning: () => Promise<void>;
  isLearning: boolean;
}

const ChatBotContext = createContext<ChatBotContextType | undefined>(undefined);

// Enhanced knowledge base with advanced capabilities
const initialKnowledgeBase: Record<string, string> = {
  'health': 'Database health is currently at {health}%. All systems are operating normally with minor optimizations recommended for query performance.',
  'performance': 'Current database performance metrics: Average query time: {latency}ms, Connections: {connections}/100, CPU usage: {cpuUsage}%, Memory: {memoryUsage}%.',
  'backup': 'Last backup completed 3 hours ago. Full weekly backup scheduled for tonight at 1:00 AM. All recent backups have been verified.',
  'error': 'Recent error logs show {issues} minor exceptions in the past 24 hours related to timeout connections. These are being monitored but no action is required.',
  'help': 'I can assist with: checking system health, monitoring performance, providing alerts, scheduling maintenance, answering questions about your database, query optimization, threat detection, and autonomous orchestration.',
  'optimize': 'I\'ve identified {issues} slow queries that could benefit from optimization. Would you like me to suggest index improvements?',
  'hello': 'Hello! I\'m your AI database co-pilot. How can I help manage your database ecosystem today?',
  'hi': 'Hi there! How can I assist with your database needs today?',
  'query': 'Based on your query patterns, I can recommend optimizations for tables {affectedTables}. My cognitive indexing engine suggests adding indexes to improve throughput.',
  'connection': 'There are currently {connections} active connections to your database. Peak usage today was at 10:45 AM with 92 connections.',
  'storage': 'Current storage utilization is at {freeSpace}% free space. Based on current trends, you will need to expand storage in approximately 45 days.',
  'index': 'Index analysis shows potential for 3 new indexes that would improve query performance by up to 28%. My cognitive indexing engine can implement these automatically.',
  'latency': 'Average query latency is {latency}ms, which is within healthy parameters. 95th percentile is 210ms.',
  'throughput': 'Current throughput is {throughput} queries per second, well within capacity limits.',
  'model': 'The database model has been trained with data from {dbCount} databases, featuring {issueCount} detected issues and {healingCount} healing events.',
  'capabilities': 'I\'m equipped with autonomous orchestration, query optimization, continuous learning, federated learning, cognitive indexing, predictive threat detection, and workload shaping capabilities.',
  'orchestration': 'My autonomous orchestration engine is monitoring your database cluster. Current intent: "Maintain 99.99% uptime" - all systems are within acceptable parameters.',
  'threat': 'Predictive threat intelligence has identified 0 critical vulnerabilities in your current configuration. Standard security protocols are active.',
  'learn': 'My continuous learning loop has completed {learningIterations} iterations, improving self-healing accuracy by approximately 12% since initial training.',
  'federated': 'Federated learning is active across {dbCount} databases, improving anomaly detection without compromising data privacy.',
  'workload': 'The self-tuning workload shaper is actively monitoring traffic patterns. Current priority: OLTP transactions > batch processing > reporting queries.',
  'compliance': 'Autonomous data masking identified 37 fields containing potential PII across your databases. Would you like me to recommend masking policies?',
  'version': 'Smart data versioning has created {healingCount} recovery points in the last 24 hours. Time-travel queries are available for forensic analysis.',
  'sql': 'I can help optimize your SQL queries. Would you like me to analyze a specific query or suggest improvements to your most resource-intensive ones?'
};

interface ChatBotProviderProps {
  children: ReactNode;
}

export const ChatBotProvider = ({ children }: ChatBotProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [isLearning, setIsLearning] = useState(false);
  const [trainingData, setTrainingData] = useState<TrainingData>({
    trained: false,
    lastTrainedAt: null,
    accuracy: 0,
    knowledgeBase: initialKnowledgeBase,
    databasePatterns: [],
    capabilities: {
      autonomousOrchestration: false,
      queryOptimization: true,
      continuousLearning: false,
      federatedLearning: false,
      cognitiveIndexing: true,
      predictiveThreat: false,
      workloadShaping: false
    },
    learningIterations: 0,
    adaptiveModels: ['base-classifier', 'anomaly-detector']
  });

  // Enhanced train model with more advanced features
  const trainModel = async (): Promise<void> => {
    setIsTraining(true);
    
    // Simulate training process with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Extract more complex patterns from database health data
    const patterns = databaseHealthData.map(db => ({
      name: db.name,
      health: db.health,
      issues: db.issues,
      patterns: {
        healthTrend: db.history,
        latencyCorrelation: db.latency > 10 ? 'high' : 'normal',
        issueFrequency: db.issues > 5 ? 'frequent' : 'rare',
        workloadPattern: getWorkloadPattern(db),
        securityProfile: getSecurityProfile(db)
      }
    }));
    
    // Create a more dynamic knowledge base
    const enhancedKnowledgeBase = { ...initialKnowledgeBase };
    
    // Simulate successful training with more capabilities
    setTrainingData(prev => ({
      ...prev,
      trained: true,
      lastTrainedAt: new Date(),
      accuracy: 87 + Math.random() * 10, // Random accuracy between 87-97%
      knowledgeBase: enhancedKnowledgeBase,
      databasePatterns: patterns,
      adaptiveModels: [...prev.adaptiveModels, 'healing-policy-v2', 'query-optimizer-v1']
    }));
    
    setIsTraining(false);
  };

  // Simulate continuous learning loop
  const runContinuousLearning = async (): Promise<void> => {
    if (!trainingData.trained) return;
    
    setIsLearning(true);
    
    // Simulate learning process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setTrainingData(prev => ({
      ...prev,
      accuracy: Math.min(99.5, prev.accuracy + 0.5 + Math.random() * 0.5),
      learningIterations: prev.learningIterations + 1,
      adaptiveModels: prev.learningIterations % 3 === 0 
        ? [...prev.adaptiveModels, `enhanced-model-v${prev.learningIterations + 1}`]
        : prev.adaptiveModels
    }));
    
    setIsLearning(false);
  };

  // Reset training data
  const resetTraining = () => {
    setTrainingData({
      trained: false,
      lastTrainedAt: null,
      accuracy: 0,
      knowledgeBase: initialKnowledgeBase,
      databasePatterns: [],
      capabilities: {
        autonomousOrchestration: false,
        queryOptimization: false,
        continuousLearning: false,
        federatedLearning: false,
        cognitiveIndexing: false,
        predictiveThreat: false,
        workloadShaping: false
      },
      learningIterations: 0,
      adaptiveModels: ['base-classifier']
    });
  };

  // Helper functions for pattern detection
  const getWorkloadPattern = (db: any) => {
    const hour = new Date().getHours();
    const isBusinessHours = hour >= 9 && hour <= 17;
    return {
      type: isBusinessHours ? 'transactional' : 'reporting',
      intensity: db.connections > 50 ? 'high' : 'normal',
      peakHours: [10, 14, 16]
    };
  };

  const getSecurityProfile = (db: any) => {
    return {
      vulnerabilities: Math.max(0, Math.floor(Math.random() * 3)),
      lastScan: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)),
      sensitiveDataFields: Math.floor(Math.random() * 50) + 10
    };
  };

  // Toggle AI capabilities
  const enableCapability = (capability: keyof AICapabilities) => {
    setTrainingData(prev => ({
      ...prev,
      capabilities: {
        ...prev.capabilities,
        [capability]: true
      }
    }));
  };

  const disableCapability = (capability: keyof AICapabilities) => {
    setTrainingData(prev => ({
      ...prev,
      capabilities: {
        ...prev.capabilities,
        [capability]: false
      }
    }));
  };

  // Enhanced AI response generation
  const getAIResponse = async (query: string): Promise<string> => {
    // Lowercase query for matching
    const queryLower = query.toLowerCase();
    
    // Default response if no match
    let response = "I don't have specific information about that yet. Would you like me to analyze your database to find the answer?";
    
    // Check for capability-specific queries
    if (queryLower.includes('capabilities') || queryLower.includes('what can you do')) {
      const enabledCapabilities = Object.entries(trainingData.capabilities)
        .filter(([_, enabled]) => enabled)
        .map(([capability]) => formatCapabilityName(capability));
      
      return `I'm currently enabled with: ${enabledCapabilities.join(', ')}. You can enable more capabilities to expand my functionality.`;
    }
    
    // Check for specific AI capabilities
    if (queryLower.includes('orchestrat') && trainingData.capabilities.autonomousOrchestration) {
      return "My autonomous orchestration engine is actively monitoring your database cluster. Current intent: \"Maintain 99.99% uptime\" with automatic scaling and load balancing active. No immediate actions required.";
    }
    
    if (queryLower.includes('optimize query') && trainingData.capabilities.queryOptimization) {
      return "My query optimization engine can analyze and improve your SQL. Would you like me to:\n1. Optimize a specific query\n2. Review your most expensive queries\n3. Suggest better query patterns for your application?";
    }
    
    if (queryLower.includes('learn') && trainingData.capabilities.continuousLearning) {
      return `My continuous learning loop has completed ${trainingData.learningIterations} iterations, improving healing accuracy by approximately ${(trainingData.learningIterations * 2.5).toFixed(1)}% since initial training. Would you like me to run another learning cycle?`;
    }
    
    if (queryLower.includes('federated') && trainingData.capabilities.federatedLearning) {
      return `Federated learning is active across ${databaseHealthData.length} databases, sharing anomaly patterns without sharing sensitive data. This improves detection accuracy by approximately 23% compared to isolated learning.`;
    }
    
    if (queryLower.includes('index') && trainingData.capabilities.cognitiveIndexing) {
      return "My cognitive indexing engine has analyzed your query patterns and suggests 3 new indexes that could improve performance by up to 28%. I can also safely remove 2 unused indexes to reduce write overhead. Would you like me to implement these changes?";
    }
    
    if (queryLower.includes('threat') && trainingData.capabilities.predictiveThreat) {
      return "Predictive threat intelligence is active. I've analyzed access patterns and found 1 anomalous login sequence that may require investigation. User 'admin_backup' accessed tables outside their normal pattern at 2:13 AM. Would you like me to restrict this account temporarily?";
    }
    
    if (queryLower.includes('workload') && trainingData.capabilities.workloadShaping) {
      return "Self-tuning workload shaper is active and managing traffic based on priority rules. I've automatically throttled 3 long-running reporting queries to ensure OLTP transaction performance remains optimal during peak hours.";
    }
    
    // Check for keyword matches in the knowledge base
    for (const [keyword, template] of Object.entries(trainingData.knowledgeBase)) {
      if (queryLower.includes(keyword)) {
        // Find the most relevant database for context
        const relevantDB = databaseHealthData.find(db => 
          queryLower.includes(db.name.toLowerCase())
        ) || databaseHealthData[0]; // Default to first DB if no specific match
        
        // Replace template variables with actual values
        response = template
          .replace('{health}', relevantDB.health.toString())
          .replace('{latency}', relevantDB.latency.toString())
          .replace('{connections}', relevantDB.connections.toString())
          .replace('{cpuUsage}', relevantDB.cpuUsage.toString())
          .replace('{memoryUsage}', relevantDB.memoryUsage.toString())
          .replace('{issues}', relevantDB.issues.toString())
          .replace('{throughput}', relevantDB.throughput.toString())
          .replace('{freeSpace}', relevantDB.freeSpace.toString())
          .replace('{affectedTables}', detectedIssues[0]?.affectedTables?.join(', ') || 'user_analytics, session_data')
          .replace('{dbCount}', databaseHealthData.length.toString())
          .replace('{issueCount}', detectedIssues.length.toString())
          .replace('{healingCount}', recentHealingEvents.length.toString())
          .replace('{learningIterations}', trainingData.learningIterations.toString());
        
        break;
      }
    }
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return response;
  };

  // Format capability name for display
  const formatCapabilityName = (capability: string): string => {
    // Convert camelCase to Title Case with spaces
    return capability
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  // Auto-train on first load
  useEffect(() => {
    if (!trainingData.trained) {
      trainModel();
    }
  }, []);

  // Run continuous learning every 30 seconds if enabled
  useEffect(() => {
    if (trainingData.capabilities.continuousLearning && trainingData.trained) {
      const interval = setInterval(() => {
        runContinuousLearning();
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [trainingData.capabilities.continuousLearning, trainingData.trained]);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen(prev => !prev);

  return (
    <ChatBotContext.Provider 
      value={{ 
        isOpen, 
        openChat, 
        closeChat, 
        toggleChat, 
        trainingData, 
        trainModel, 
        isTraining, 
        resetTraining,
        getAIResponse,
        enableCapability,
        disableCapability,
        runContinuousLearning,
        isLearning
      }}
    >
      {children}
    </ChatBotContext.Provider>
  );
};

export const useChatBot = () => {
  const context = useContext(ChatBotContext);
  if (context === undefined) {
    throw new Error('useChatBot must be used within a ChatBotProvider');
  }
  return context;
};
