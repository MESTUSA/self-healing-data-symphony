
import React, { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Bot, X } from 'lucide-react';
import { toast } from 'sonner';

// Define message types
type MessageType = 'user' | 'bot';

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
    content: 'Hello! I\'m your database assistant. How can I help you today?',
    type: 'bot',
    timestamp: new Date(),
  },
];

// Sample responses for demo purposes
const SAMPLE_RESPONSES: Record<string, string> = {
  'health': 'Database health is currently at 98%. All systems are operating normally with minor optimizations recommended for query performance.',
  'performance': 'Current database performance metrics: Average query time: 45ms, Connections: 32/100, CPU usage: 24%, Memory: 3.2GB/8GB.',
  'backup': 'Last backup completed 3 hours ago. Full weekly backup scheduled for tonight at 1:00 AM. All recent backups have been verified.',
  'error': 'Recent error logs show 3 minor exceptions in the past 24 hours related to timeout connections. These are being monitored but no action is required.',
  'help': 'I can assist with: checking system health, monitoring performance, providing alerts, scheduling maintenance, and answering questions about your database.',
  'optimize': 'I\'ve identified 3 slow queries that could benefit from optimization. Would you like me to suggest index improvements?',
  'hello': 'Hello! I\'m your AI database assistant. How can I help you manage your database today?',
  'hi': 'Hi there! How can I assist with your database needs today?',
};

const ChatBotDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
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

  const handleSendMessage = () => {
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
    
    // Simulate bot response with a small delay
    setTimeout(() => {
      const botResponse = generateBotResponse(input.trim().toLowerCase());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        type: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const generateBotResponse = (query: string): string => {
    // Check for keywords in the user's message
    for (const [keyword, response] of Object.entries(SAMPLE_RESPONSES)) {
      if (query.includes(keyword)) {
        return response;
      }
    }
    
    // Default response if no keywords matched
    return "I don't have specific information about that yet. Would you like me to analyze your database to find the answer?";
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    toast.success('Chat history cleared');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          className="rounded-full fixed bottom-6 right-6 h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          variant="default"
          size="icon"
          onClick={() => setIsOpen(true)}
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
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
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
            />
            <Button 
              onClick={handleSendMessage} 
              size="icon"
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatBotDialog;
