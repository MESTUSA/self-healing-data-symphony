
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import DatabaseSelector from '@/components/common/DatabaseSelector';
import { databaseConnections } from '@/data/mockData';

interface ConfigPanelProps {
  className?: string;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ className }) => {
  const [selectedDb, setSelectedDb] = useState('conn1');
  const [autoHealingEnabled, setAutoHealingEnabled] = useState(true);
  const [smartBackupsEnabled, setSmartBackupsEnabled] = useState(true);
  const [threatDetectionEnabled, setThreatDetectionEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const selectedDatabase = databaseConnections.find(db => db.id === selectedDb) || databaseConnections[0];

  return (
    <div className={cn('glass-card rounded-xl overflow-hidden', className)}>
      <div className="p-4 border-b border-border bg-muted/30">
        <h2 className="text-lg font-semibold">Configuration</h2>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Select Database</label>
          <DatabaseSelector 
            selectedDatabaseId={selectedDb}
            onSelectDatabase={setSelectedDb}
            className="w-full md:w-auto"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-card rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Auto-Healing</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Automatically fix detected issues
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={autoHealingEnabled}
                  onChange={() => setAutoHealingEnabled(!autoHealingEnabled)}
                />
                <div className="w-10 h-5 bg-secondary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <div className="glass-card rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Smart Backups</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  AI-optimized backup scheduling
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={smartBackupsEnabled}
                  onChange={() => setSmartBackupsEnabled(!smartBackupsEnabled)}
                />
                <div className="w-10 h-5 bg-secondary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <div className="glass-card rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Threat Detection</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  AI-based security monitoring
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={threatDetectionEnabled}
                  onChange={() => setThreatDetectionEnabled(!threatDetectionEnabled)}
                />
                <div className="w-10 h-5 bg-secondary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <div className="glass-card rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notifications</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Real-time alerts and updates
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notificationsEnabled}
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                />
                <div className="w-10 h-5 bg-secondary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="glass-card rounded-lg p-3">
          <h3 className="font-medium mb-2">Connection Settings</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Host:</span>
              <div className="font-mono mt-0.5">{selectedDatabase.host}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Port:</span>
              <div className="font-mono mt-0.5">{selectedDatabase.port}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Auth Type:</span>
              <div className="font-mono mt-0.5">{selectedDatabase.authenticationType}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Encryption:</span>
              <div className="font-mono mt-0.5">{selectedDatabase.encryptionStatus}</div>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <button className="px-3 py-1.5 rounded-md text-sm font-medium bg-secondary hover:bg-secondary/70 focus-ring transition-colors">
              Edit Connection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;
