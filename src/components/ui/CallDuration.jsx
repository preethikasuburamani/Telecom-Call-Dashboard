import React from 'react';
import {BarChart,Bar, XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,Cell} from 'recharts';

const CallDuration= ({ data }) => {
 
//variabel to calculate Avg,lon,short call
  const calculateDurationMetrics = (callData) => {
    if (!callData || callData.length === 0) return [];

    const durations = callData.map(c => Number(c.callDuration) || 0);
    const totalCalls = callData.length;
    
    const longest = Math.max(...durations);
    const shortest = Math.min(...durations);
    const average = durations.reduce((a, b) => a + b, 0) / totalCalls;

    // 2. Format data for Recharts
    return [
      { name: 'Shortest', duration: shortest, color: '#60a5fa' }, // Blue-400
      { name: 'Average', duration: Math.round(average), color: '#3b82f6' }, // Blue-500
      { name: 'Longest', duration: longest, color: '#1d4ed8' }, // Blue-700
    ];
  };

  const chartData = calculateDurationMetrics(data);

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <YAxis 
            unit="s" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <Tooltip 
            cursor={{ fill: '#f8fafc' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            formatter={(value) => [`${value} seconds`, 'Duration']}
          />
          <Bar dataKey="duration" radius={[4, 4, 0, 0]} barSize={60}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CallDuration;