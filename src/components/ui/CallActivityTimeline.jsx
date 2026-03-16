import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CallActivityTimeline = ({ data }) => {
  const processTimelineData = (callData) => {
    if (!callData || !Array.isArray(callData) || callData.length === 0) {
        return Array.from({ length: 24 }, (_, i) => ({ time: `${i}:00`, calls: 0 }));
    }

    // 1. Initialize the map for all 24 hours
    const hoursMap = {};
    for (let i = 0; i < 24; i++) {
      hoursMap[i] = 0;
    }

    // 2. Count calls by hour
    callData.forEach((call) => {
      if (call.createdAt) {
        const date = new Date(call.createdAt);
        // Check if the date is valid before getting hours
        if (!isNaN(date.getTime())) {
          const hour = date.getHours();
          hoursMap[hour] += 1;
        }
      }
    });

    // 3. Format for Recharts
    return Object.keys(hoursMap).map((hour) => ({
      time: `${hour}:00`,
      calls: hoursMap[hour],
    }));
  };

  const timelineData = processTimelineData(data);

  return (
    <div className="h-[400px] w-full">
      <h2 className="text-xl font-bold mb-6 text-slate-800">Call Activity (24h)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={timelineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            interval={3} 
          />
          
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            allowDecimals={false}
          />
          
          <Tooltip 
            contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
            }}
          />
          
          <Area 
            type="monotone" // This makes the line "wavy"
            dataKey="calls" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorCalls)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CallActivityTimeline;