
import React, { useState } from 'react';
import { databaseConnections } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface DatabaseSelectorProps {
  selectedDatabaseId: string;
  onSelectDatabase: (databaseId: string) => void;
  className?: string;
}

const DatabaseSelector: React.FC<DatabaseSelectorProps> = ({
  selectedDatabaseId,
  onSelectDatabase,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedDatabase = databaseConnections.find(db => db.id === selectedDatabaseId) || databaseConnections[0];

  const getStatusIndicatorClass = (status: string) => {
    return cn(
      'w-2 h-2 rounded-full',
      status === 'connected' ? 'bg-green-500' : 
      status === 'intermittent' ? 'bg-amber-500' : 'bg-red-500',
      status === 'connected' ? 'animate-pulse-slow' : ''
    );
  };

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background hover:bg-secondary/50 transition-colors focus-ring"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={getStatusIndicatorClass(selectedDatabase.status)} />
        <span className="font-medium">{selectedDatabase.database}</span>
        <svg
          className={cn("w-4 h-4 transition-transform", isOpen && "transform rotate-180")}
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full min-w-[240px] rounded-lg border border-border bg-background shadow-elevated py-1 animate-scale-in origin-top">
          <div className="max-h-64 overflow-y-auto scrollbar-thin">
            {databaseConnections.map((db) => (
              <button
                key={db.id}
                type="button"
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-secondary/50 transition-colors",
                  db.id === selectedDatabaseId && "bg-primary/5 font-medium"
                )}
                onClick={() => {
                  onSelectDatabase(db.id);
                  setIsOpen(false);
                }}
              >
                <div className={getStatusIndicatorClass(db.status)} />
                <div className="flex-1">
                  <div className="font-medium">{db.database}</div>
                  <div className="text-xs text-muted-foreground">
                    {db.host}:{db.port}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseSelector;
