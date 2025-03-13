
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { databaseHealthData, detectedIssues, recentHealingEvents } from '@/data/mockData';

// Define training data types
interface TrainingData {
  trained: boolean;
  lastTrainedAt: Date | null;
  accuracy: number;
  knowledgeBase: Record<string, string>;
  databasePatterns: any[];
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
}

const ChatBotContext = createContext<ChatBotContextType | undefined>(undefined);

// Initial knowledge base with expanded database terminology
const initialKnowledgeBase: Record<string, string> = {
  'health': 'Database health is currently at {health}%. All systems are operating normally with minor optimizations recommended for query performance.',
  'performance': 'Current database performance metrics: Average query time: {latency}ms, Connections: {connections}/100, CPU usage: {cpuUsage}%, Memory: {memoryUsage}%.',
  'backup': 'Last backup completed 3 hours ago. Full weekly backup scheduled for tonight at 1:00 AM. All recent backups have been verified.',
  'error': 'Recent error logs show {issues} minor exceptions in the past 24 hours related to timeout connections. These are being monitored but no action is required.',
  'help': 'I can assist with: checking system health, monitoring performance, providing alerts, scheduling maintenance, and answering questions about your database.',
  'optimize': 'I\'ve identified {issues} slow queries that could benefit from optimization. Would you like me to suggest index improvements?',
  'hello': 'Hello! I\'m your AI database assistant. How can I help you manage your database today?',
  'hi': 'Hi there! How can I assist with your database needs today?',
  'query': 'Based on your query patterns, I can recommend optimizations for tables {affectedTables}.',
  'connection': 'There are currently {connections} active connections to your database. Peak usage today was at 10:45 AM with 92 connections.',
  'storage': 'Current storage utilization is at {freeSpace}% free space. Based on current trends, you will need to expand storage in approximately 45 days.',
  'index': 'Index analysis shows potential for 3 new indexes that would improve query performance by up to 28%.',
  'latency': 'Average query latency is {latency}ms, which is within healthy parameters. 95th percentile is 210ms.',
  'throughput': 'Current throughput is {throughput} queries per second, well within capacity limits.',
  'model': 'The database model has been trained with data from {dbCount} databases, featuring {issueCount} detected issues and {healingCount} healing events.'
};

interface ChatBotProviderProps {
  children: ReactNode;
}

export const ChatBotProvider = ({ children }: ChatBotProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingData, setTrainingData] = useState<TrainingData>({
    trained: false,
    lastTrainedAt: null,
    accuracy: 0,
    knowledgeBase: initialKnowledgeBase,
    databasePatterns: []
  });

  // Train the model with existing mock data
  const trainModel = async (): Promise<void> => {
    setIsTraining(true);
    
    // Simulate training process with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Extract patterns from database health data
    const patterns = databaseHealthData.map(db => ({
      name: db.name,
      health: db.health,
      issues: db.issues,
      patterns: {
        healthTrend: db.history,
        latencyCorrelation: db.latency > 10 ? 'high' : 'normal',
        issueFrequency: db.issues > 5 ? 'frequent' : 'rare'
      }
    }));
    
    // Create a more dynamic knowledge base
    const enhancedKnowledgeBase = { ...initialKnowledgeBase };
    
    // Simulate successful training
    setTrainingData({
      trained: true,
      lastTrainedAt: new Date(),
      accuracy: 87 + Math.random() * 10, // Random accuracy between 87-97%
      knowledgeBase: enhancedKnowledgeBase,
      databasePatterns: patterns
    });
    
    setIsTraining(false);
  };

  // Reset training data
  const resetTraining = () => {
    setTrainingData({
      trained: false,
      lastTrainedAt: null,
      accuracy: 0,
      knowledgeBase: initialKnowledgeBase,
      databasePatterns: []
    });
  };

  // Get AI response based on training data
  const getAIResponse = async (query: string): Promise<string> => {
    // Lowercase query for matching
    const queryLower = query.toLowerCase();
    
    // Default response if no match
    let response = "I don't have specific information about that yet. Would you like me to analyze your database to find the answer?";
    
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
          .replace('{healingCount}', recentHealingEvents.length.toString());
        
        break;
      }
    }
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return response;
  };

  // Auto-train on first load
  useEffect(() => {
    if (!trainingData.trained) {
      trainModel();
    }
  }, []);

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
        getAIResponse
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
