
import React, { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Bot, X, BrainCircuit, RefreshCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
    content: 'Hello! I\'m your AI database assistant. How can I help you today?',
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
    getAIResponse
  } = useChatBot();
  
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showModelInfo, setShowModelInfo] = useState(false);
  
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
        content: 'Training database model... This will enhance my responses based on your database patterns.',
        type: 'system',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, trainingStartedMessage]);
    } else if (trainingData.lastTrainedAt) {
      const formattedTime = trainingData.lastTrainedAt.toLocaleTimeString();
      const trainingCompletedMessage: Message = {
        id: Date.now().toString(),
        content: `Model training complete at ${formattedTime}. Accuracy: ${trainingData.accuracy.toFixed(1)}%`,
        type: 'system',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, trainingCompletedMessage]);
    }
  }, [isTraining, trainingData.lastTrainedAt]);

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
    toast.success('Database model retrained successfully');
  };

  const toggleModelInfo = () => {
    setShowModelInfo(prev => !prev);
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
              <h3 className="font-semibold">Database Assistant</h3>
              {trainingData.trained && (
                <Badge variant="outline" className="text-xs bg-green-100 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300">
                  Trained
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                title="Model info"
                onClick={toggleModelInfo}
              >
                <BrainCircuit className="h-4 w-4" />
              </Button>
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
          
          {showModelInfo && (
            <div className="mt-3 p-3 bg-secondary/50 rounded-md text-xs">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">Model Status:</span>
                <span>{trainingData.trained ? 'Trained' : 'Untrained'}</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">Accuracy:</span>
                <span>{trainingData.accuracy.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">Database Knowledge:</span>
                <span>{Object.keys(trainingData.knowledgeBase).length} topics</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Last Trained:</span>
                <span>{trainingData.lastTrainedAt ? trainingData.lastTrainedAt.toLocaleString() : 'Never'}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs"
                onClick={handleRetrainModel}
                disabled={isTraining}
              >
                <RefreshCcw className="h-3 w-3 mr-1" />
                {isTraining ? 'Training...' : 'Retrain Model'}
              </Button>
              {isTraining && (
                <Progress value={45} className="h-1 mt-2" />
              )}
            </div>
          )}
        </div>
        
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
        
        <div className="p-4 border-t mt-auto">
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
          {isTraining && (
            <div className="mt-2 text-xs text-center text-muted-foreground">
              Training model... Please wait.
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatBotDialog;
