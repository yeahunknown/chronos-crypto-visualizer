
import React, { useState } from 'react';
import { X, ArrowUp, ArrowDown } from 'lucide-react';

interface SendReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'send' | 'receive';
  onSubmit: (amount: number, token: string, address?: string) => void;
  tokens: Array<{ symbol: string; balance: number }>;
}

const SendReceiveModal = ({ isOpen, onClose, type, onSubmit, tokens }: SendReceiveModalProps) => {
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('SOL');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || (type === 'send' && !address)) return;

    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit(parseFloat(amount), selectedToken, address);
    setIsLoading(false);
    setAmount('');
    setAddress('');
    onClose();
  };

  const selectedTokenData = tokens.find(t => t.symbol === selectedToken);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              type === 'send' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
            }`}>
              {type === 'send' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            </div>
            <h2 className="text-xl font-bold capitalize">{type}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Token</label>
            <select
              value={selectedToken}
              onChange={(e) => setSelectedToken(e.target.value)}
              className="w-full bg-muted border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {tokens.map(token => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol} ({token.balance.toFixed(4)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              step="0.000001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              max={type === 'send' ? selectedTokenData?.balance : undefined}
              className="w-full bg-muted border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              required
            />
            {type === 'send' && selectedTokenData && (
              <div className="text-sm text-muted-foreground mt-1">
                Available: {selectedTokenData.balance.toFixed(4)} {selectedToken}
              </div>
            )}
          </div>

          {type === 'send' && (
            <div>
              <label className="block text-sm font-medium mb-2">To Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-muted border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter wallet address..."
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !amount || (type === 'send' && !address)}
            className={`w-full py-3 rounded-lg font-medium transition-all ${
              type === 'send' 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full loading-spinner"></div>
                <span>Processing...</span>
              </>
            ) : (
              <span>Confirm {type}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendReceiveModal;
