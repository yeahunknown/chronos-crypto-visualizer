
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ArrowUp } from 'lucide-react';

interface TokenChartProps {
  token: { symbol: string; name: string; price: number; priceChange24h: number };
  onBack: () => void;
}

const TokenChart = ({ token, onBack }: TokenChartProps) => {
  const [chartData, setChartData] = useState<Array<{ time: string; price: number }>>([]);

  useEffect(() => {
    // Generate mock chart data
    const generateChartData = () => {
      const data = [];
      const basePrice = token.price;
      const now = new Date();
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        const randomChange = (Math.random() - 0.5) * 0.1;
        const price = basePrice * (1 + randomChange);
        
        data.push({
          time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          price: price
        });
      }
      
      return data;
    };

    setChartData(generateChartData());
  }, [token.price]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowUp size={20} className="rotate-[-90deg]" />
        </button>
        <div>
          <h2 className="text-2xl font-bold">{token.symbol}</h2>
          <p className="text-muted-foreground">{token.name}</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="mb-6">
          <div className="text-3xl font-bold">${token.price.toFixed(2)}</div>
          <div className={`text-sm flex items-center space-x-1 ${
            token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            <span>{token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%</span>
            <span className="text-muted-foreground">24h</span>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: '#888' }}
              />
              <YAxis 
                domain={['dataMin - 5', 'dataMax + 5']}
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: '#888' }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={token.priceChange24h >= 0 ? '#10b981' : '#ef4444'}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-sm text-muted-foreground">24h High</div>
          <div className="text-lg font-semibold">${(token.price * 1.05).toFixed(2)}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-sm text-muted-foreground">24h Low</div>
          <div className="text-lg font-semibold">${(token.price * 0.95).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default TokenChart;
