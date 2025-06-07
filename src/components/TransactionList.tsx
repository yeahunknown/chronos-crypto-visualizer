
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Transaction } from '../types/wallet';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-3">
      {transactions.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          No transactions yet
        </div>
      ) : (
        transactions.map((tx) => (
          <div key={tx.id} className="bg-card border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  tx.type === 'send' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                }`}>
                  {tx.type === 'send' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                </div>
                <div>
                  <div className="font-medium capitalize">{tx.type} {tx.token}</div>
                  <div className="text-sm text-muted-foreground">{formatDate(tx.timestamp)}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`font-semibold ${
                  tx.type === 'send' ? 'text-red-400' : 'text-green-400'
                }`}>
                  {tx.type === 'send' ? '-' : '+'}{tx.amount.toFixed(4)} {tx.token}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  tx.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {tx.status}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;
