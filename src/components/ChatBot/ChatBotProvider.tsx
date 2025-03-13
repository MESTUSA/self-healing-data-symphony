
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ChatBotContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

const ChatBotContext = createContext<ChatBotContextType | undefined>(undefined);

interface ChatBotProviderProps {
  children: ReactNode;
}

export const ChatBotProvider = ({ children }: ChatBotProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen(prev => !prev);

  return (
    <ChatBotContext.Provider value={{ isOpen, openChat, closeChat, toggleChat }}>
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
