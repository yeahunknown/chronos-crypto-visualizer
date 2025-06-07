
import React from 'react';
import { Settings, User } from 'lucide-react';
import ChronosLogo from './ChronosLogo';

interface WalletHeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isLocked: boolean;
  username: string;
}

const WalletHeader = ({ currentView, onViewChange, isLocked, username }: WalletHeaderProps) => {
  if (isLocked) return null;

  return (
    <div className="flex items-center justify-between p-4 bg-card border-b border-border">
      <div className="flex items-center space-x-3">
        <ChronosLogo size={36} />
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Chronos
        </h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onViewChange('profile')}
          className={`p-2 rounded-lg transition-colors ${
            currentView === 'profile' 
              ? 'bg-blue-500/20 text-blue-400' 
              : 'hover:bg-muted text-muted-foreground'
          }`}
        >
          <User size={20} />
        </button>
        <button
          onClick={() => onViewChange('settings')}
          className={`p-2 rounded-lg transition-colors ${
            currentView === 'settings' 
              ? 'bg-blue-500/20 text-blue-400' 
              : 'hover:bg-muted text-muted-foreground'
          }`}
        >
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
};

export default WalletHeader;
