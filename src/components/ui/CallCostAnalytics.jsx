import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

const CallCostAnalytics = ({ data }) => {
  const processCostData = (callData) => {
    if (!callData || callData.length === 0) return { cityData: [] };

    const cityMap = {};
    callData.forEach(call => {
      const city = call.city || 'Unknown';
      const cost = parseFloat(call.callCost) || 0;
      cityMap[city] = (cityMap[city] || 0) + cost;
    });

    return Object.keys(cityMap)
      .map(city => ({
        city: city,
        totalCost: parseFloat(cityMap[city].toFixed(2))
      }))
      .sort((a, b) => b.totalCost - a.totalCost)
      .slice(0, 6); // Matches the 6 bars in your screenshot
  };

  const cityData = processCostData(data);

  return (
    <div className="h-[400px] w-full p-4">
      <h2 className="text-2xl font-semibold mb-6 text-slate-800">Call Cost by City</h2>
      <ResponsiveContainer width="100%" height="100%">
        {/* Removed layout="vertical" to make bars go up */}
        <BarChart data={cityData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" />
          <XAxis 
            dataKey="city" 
            axisLine={{ stroke: '#64748b' }} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }}
            dy={10} 
          />
          <YAxis 
            axisLine={{ stroke: '#64748b' }} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 14 }}
            tickFormatter={(value) => `$${value}`}
            domain={[0, 1000]} // Adjust based on your data range
          />
          <Tooltip 
            cursor={{ fill: '#f1f5f9' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            formatter={(value) => [`$${value}`, 'Cost']}
          />
          <Bar 
            dataKey="totalCost" 
            fill="#10b981" // That specific Emerald/Green color
            radius={[4, 4, 0, 0]} // Rounded top corners
            barSize={60} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CallCostAnalytics;