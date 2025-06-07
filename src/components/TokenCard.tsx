
import React from 'react';
import { Token } from '../types/wallet';

interface TokenCardProps {
  token: Token;
  onClick: () => void;
}

const TokenCard = ({ token, onClick }: TokenCardProps) => {
  const formatPrice = (price: number) => {
    return price < 1 ? `$${price.toFixed(4)}` : `$${price.toFixed(2)}`;
  };

  const formatBalance = (balance: number) => {
    return balance < 1 ? balance.toFixed(6) : balance.toFixed(4);
  };

  return (
    <div 
      onClick={onClick}
      className="bg-card border border-border rounded-xl p-4 hover:bg-muted/50 transition-all cursor-pointer group hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
            {token.symbol}
          </div>
          <div>
            <div className="font-semibold">{token.symbol}</div>
            <div className="text-sm text-muted-foreground">{token.name}</div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="font-semibold">{formatBalance(token.balance)} {token.symbol}</div>
          <div className="text-sm text-muted-foreground">
            {formatPrice(token.price)}
          </div>
          <div className={`text-xs ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
