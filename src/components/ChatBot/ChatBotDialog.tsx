
import React, { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  X, 
  BrainCircuit, 
  RefreshCcw, 
  AlertCircle,
  Database,
  Shield,
  Zap,
  BarChart4,
  Cog,
  Network
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useChatBot } from './ChatBotProvider';

// Define message types
type MessageType = 'user' | 'bot' | 'system';

interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}

// Initial bot messages
const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Hello! I\'m your AI database co-pilot. How can I help manage your database ecosystem today? Try asking about "capabilities" to see what I can do.',
    type: 'bot',
    timestamp: new Date(),
  },
];

const ChatBotDialog = () => {
  const { 
    isOpen, 
    openChat, 
    closeChat,
    trainingData, 
    trainModel, 
    isTraining, 
    resetTraining,
    getAIResponse,
    enableCapability,
    disableCapability,
    runContinuousLearning,
    isLearning
  } = useChatBot();
  
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [suggestedQueries] = useState([
    "What's the current database health?",
    "Can you optimize my queries?",
    "Check for potential threats",
    "Show me your capabilities",
    "Start continuous learning"
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Display training status as system message when training starts/completes
  useEffect(() => {
    if (isTraining) {
      const trainingStartedMessage: Message = {
        id: Date.now().toString(),
        content: 'Training advanced database model... This will enhance my responses with autonomous capabilities.',
        type: 'system',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, trainingStartedMessage]);
    } else if (trainingData.lastTrainedAt) {
      const formattedTime = trainingData.lastTrainedAt.toLocaleTimeString();
      const trainingCompletedMessage: Message = {
        id: Date.now().toString(),
        content: `Model training complete at ${formattedTime}. Accuracy: ${trainingData.accuracy.toFixed(1)}%. Added ${trainingData.adaptiveModels.length} adaptive models.`,
        type: 'system',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, trainingCompletedMessage]);
    }
  }, [isTraining, trainingData.lastTrainedAt]);

  // Display continuous learning status
  useEffect(() => {
    if (isLearning && trainingData.capabilities.continuousLearning) {
      const learningMessage: Message = {
        id: Date.now().toString(),
        content: `Continuous learning cycle ${trainingData.learningIterations + 1} in progress...`,
        type: 'system',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, learningMessage]);
    }
  }, [isLearning]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      type: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      // Get response from trained model
      const botResponse = await getAIResponse(input.trim());
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        type: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);

      // Check for continuous learning trigger
      if (input.toLowerCase().includes('learn') && !trainingData.capabilities.continuousLearning) {
        enableCapability('continuousLearning');
        toast.success('Continuous Learning enabled');
      }
      
      // Check for query optimization trigger
      if (input.toLowerCase().includes('optimize') && !trainingData.capabilities.queryOptimization) {
        enableCapability('queryOptimization');
        toast.success('Query Optimization enabled');
      }
    } catch (error) {
      // Fallback response in case of error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble processing that request. My training model might need a refresh.",
        type: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    toast.success('Chat history cleared');
  };

  const handleRetrainModel = async () => {
    resetTraining();
    await trainModel();
    toast.success('Advanced database model retrained successfully');
  };

  const handleSuggestedQuery = (query: string) => {
    setInput(query);
    inputRef.current?.focus();
  };

  const handleToggleCapability = (capability: keyof typeof trainingData.capabilities) => {
    if (trainingData.capabilities[capability]) {
      disableCapability(capability);
      toast.info(`${formatCapabilityName(capability)} disabled`);
    } else {
      enableCapability(capability);
      toast.success(`${formatCapabilityName(capability)} enabled`);
    }
  };

  const formatCapabilityName = (capability: string): string => {
    // Convert camelCase to Title Case with spaces
    return capability
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  const handleStartLearning = async () => {
    if (!trainingData.trained) {
      toast.error('Model must be trained before starting continuous learning');
      return;
    }
    
    await runContinuousLearning();
    toast.success(`Learning cycle ${trainingData.learningIterations} completed`);
  };

  const getCapabilityIcon = (capability: string) => {
    switch (capability) {
      case 'autonomousOrchestration': return <Cog className="h-4 w-4" />;
      case 'queryOptimization': return <Database className="h-4 w-4" />;
      case 'continuousLearning': return <BrainCircuit className="h-4 w-4" />;
      case 'federatedLearning': return <Network className="h-4 w-4" />;
      case 'cognitiveIndexing': return <BarChart4 className="h-4 w-4" />;
      case 'predictiveThreat': return <Shield className="h-4 w-4" />;
      case 'workloadShaping': return <Zap className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={isOpen => isOpen ? openChat() : closeChat()}>
      <SheetTrigger asChild>
        <Button 
          className="rounded-full fixed bottom-6 right-6 h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          variant="default"
          size="icon"
          onClick={() => openChat()}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      
      <SheetContent className="sm:max-w-md p-0 flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Database Co-Pilot</h3>
              {trainingData.trained && (
                <Badge variant="outline" className="text-xs bg-green-100 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300">
                  AI-Powered
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleClearChat}
              >
                Clear
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => closeChat()}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="border-b px-4">
            <TabsList className="h-10">
              <TabsTrigger value="chat" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Chat
              </TabsTrigger>
              <TabsTrigger value="capabilities" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Capabilities
              </TabsTrigger>
              <TabsTrigger value="models" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                AI Models
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
            <ScrollArea className="flex-1 p-4">
              <div className="flex flex-col gap-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === 'user' 
                        ? 'justify-end' 
                        : message.type === 'system' 
                          ? 'justify-center' 
                          : 'justify-start'
                    }`}
                  >
                    <div
                      className={`${
                        message.type === 'user'
                          ? 'max-w-[80%] bg-primary text-primary-foreground'
                          : message.type === 'system'
                          ? 'max-w-full w-full bg-muted/50 text-center'
                          : 'max-w-[80%] bg-secondary'
                      } px-4 py-2 rounded-lg`}
                    >
                      <p className="text-sm">{message.content}</p>
                      {message.type !== 'system' && (
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-secondary max-w-[80%] px-4 py-2 rounded-lg">
                      <div className="flex gap-1">
                        <span className="animate-bounce">●</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
                        <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>●</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            {/* Suggested queries */}
            <div className="p-3 border-t border-b flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {suggestedQueries.map((query) => (
                <Button 
                  key={query} 
                  variant="outline" 
                  size="sm" 
                  className="whitespace-nowrap text-xs"
                  onClick={() => handleSuggestedQuery(query)}
                >
                  {query}
                </Button>
              ))}
            </div>
            
            <div className="p-4 mt-auto">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  placeholder="Ask about your database..."
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                  disabled={isTraining}
                />
                <Button 
                  onClick={handleSendMessage} 
                  size="icon"
                  disabled={!input.trim() || isTraining}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {(isTraining || isLearning) && (
                <div className="mt-2 text-xs text-center text-muted-foreground">
                  {isTraining ? 'Training model...' : 'Learning cycle in progress...'} Please wait.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="capabilities" className="flex-1 p-4 m-0 overflow-auto">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-2">AI Capabilities</h3>
                <div className="space-y-3">
                  {Object.entries(trainingData.capabilities).map(([capability, enabled]) => (
                    <div key={capability} className="flex items-center justify-between bg-muted/30 p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        {getCapabilityIcon(capability)}
                        <span className="text-sm">{formatCapabilityName(capability)}</span>
                      </div>
                      <Switch 
                        checked={enabled} 
                        onCheckedChange={() => handleToggleCapability(capability as keyof typeof trainingData.capabilities)}
                        disabled={isTraining || isLearning}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-2">Learning Control</h3>
                <div className="space-y-3">
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Learning Iterations</span>
                      <span className="text-sm font-medium">{trainingData.learningIterations}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm">Model Accuracy</span>
                      <span className={`text-sm font-medium ${trainingData.accuracy > 90 ? 'text-green-500' : 'text-amber-500'}`}>
                        {trainingData.accuracy.toFixed(1)}%
                      </span>
                    </div>
                    <Button 
                      className="w-full text-sm"
                      variant="secondary"
                      onClick={handleStartLearning}
                      disabled={isTraining || isLearning || !trainingData.trained}
                    >
                      <BrainCircuit className="h-4 w-4 mr-2" />
                      Run Learning Cycle
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-2">Training Control</h3>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="mb-2 text-sm">
                    {trainingData.lastTrainedAt 
                      ? `Last trained: ${trainingData.lastTrainedAt.toLocaleString()}`
                      : 'Model not yet trained'
                    }
                  </div>
                  <Button 
                    className="w-full text-sm"
                    variant="default"
                    onClick={handleRetrainModel}
                    disabled={isTraining}
                  >
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    {isTraining ? 'Training...' : 'Retrain Advanced Model'}
                  </Button>
                  {isTraining && (
                    <Progress value={45} className="h-1 mt-2" />
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="models" className="flex-1 p-4 m-0 overflow-auto">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Adaptive ML Models</h3>
                <div className="space-y-2">
                  {trainingData.adaptiveModels.map((model, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted/30 p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <BrainCircuit className="h-4 w-4 text-primary" />
                        <span className="text-sm">{model}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Active
                      </Badge>
                    </div>
                  ))}
                  {trainingData.adaptiveModels.length === 0 && (
                    <div className="text-sm text-muted-foreground text-center py-2">
                      No models trained yet
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-2">Model Registry Stats</h3>
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Total Models</span>
                    <span className="text-sm font-medium">{trainingData.adaptiveModels.length}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Knowledge Base Size</span>
                    <span className="text-sm font-medium">{Object.keys(trainingData.knowledgeBase).length} topics</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Analyzed Databases</span>
                    <span className="text-sm font-medium">{trainingData.databasePatterns.length}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-2">Available Model Types</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-muted/30 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Query Optimizer</span>
                    </div>
                    <Badge variant={trainingData.capabilities.queryOptimization ? "default" : "outline"} className="text-xs">
                      {trainingData.capabilities.queryOptimization ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between bg-muted/30 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Threat Detector</span>
                    </div>
                    <Badge variant={trainingData.capabilities.predictiveThreat ? "default" : "outline"} className="text-xs">
                      {trainingData.capabilities.predictiveThreat ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between bg-muted/30 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Cog className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Orchestration Engine</span>
                    </div>
                    <Badge variant={trainingData.capabilities.autonomousOrchestration ? "default" : "outline"} className="text-xs">
                      {trainingData.capabilities.autonomousOrchestration ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between bg-muted/30 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">Workload Shaper</span>
                    </div>
                    <Badge variant={trainingData.capabilities.workloadShaping ? "default" : "outline"} className="text-xs">
                      {trainingData.capabilities.workloadShaping ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default ChatBotDialog;
