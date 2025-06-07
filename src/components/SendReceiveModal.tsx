
import React, { useState } from 'react';
import { X, ArrowUp, ArrowDown, Copy, Check } from 'lucide-react';

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
  const [copied, setCopied] = useState(false);

  // Realistic wallet address
  const myWalletAddress = '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM';

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || (type === 'send' && !address)) return;

    setIsLoading(true);
    
    // Realistic loading time
    await new Promise(resolve => setTimeout(resolve, 2500 + Math.random() * 1500));
    
    onSubmit(parseFloat(amount), selectedToken, address);
    setIsLoading(false);
    setAmount('');
    setAddress('');
    onClose();
  };

  const copyAddress = async () => {
    await navigator.clipboard.writeText(myWalletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedTokenData = tokens.find(t => t.symbol === selectedToken);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="wallet-card rounded-2xl p-6 w-full max-w-md slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              type === 'send' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
            }`}>
              {type === 'send' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            </div>
            <h2 className="text-xl font-bold capitalize">{type} {selectedToken}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {type === 'receive' && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your {selectedToken} Address</label>
            <div className="bg-muted border border-border rounded-lg p-3 flex items-center justify-between">
              <span className="text-sm font-mono break-all mr-2">{myWalletAddress}</span>
              <button
                onClick={copyAddress}
                className="p-1 hover:bg-background rounded transition-colors"
              >
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        )}

        {type === 'send' && (
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
                    {token.symbol} ({token.balance.toFixed(4)} available)
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
                max={selectedTokenData?.balance}
                className="w-full bg-muted border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
                required
              />
              {selectedTokenData && (
                <div className="text-sm text-muted-foreground mt-1">
                  Available: {selectedTokenData.balance.toFixed(4)} {selectedToken}
                </div>
              )}
            </div>

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

            <button
              type="submit"
              disabled={isLoading || !amount || !address}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-all wallet-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full loading-spinner"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <span>Confirm Send</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SendReceiveModal;
