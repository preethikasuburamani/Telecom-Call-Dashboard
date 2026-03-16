import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

const CallsByCities = ({ data }) => {
  // 1. Process the API data
  const chartData = React.useMemo(() => {
    if (!data || data.length === 0) return [];

    const cityCounts = data.reduce((acc, call) => {
      const city = call.city || "Unknown";
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    // Professional dashboard colors
    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

    return Object.entries(cityCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([city, count], index) => ({
        name: city,
        value: count,
        fill: colors[index % colors.length],
      }));
  }, [data]);

  const totalCalls = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    /* We replaced the Shadcn <Card> with this standard div */
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-800">Calls by City</h2>
        <p className="text-sm text-slate-500">Distribution of Top 5 Cities</p>
      </div>
      
      <div className="h-[300px] w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
              }}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}  /* Makes it a donut */
              outerRadius={90}
              paddingAngle={5}
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Legend 
              verticalAlign="bottom" 
              align="center"
              iconType="circle"
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Total label manually placed in the bottom or center */}
      <div className="text-center mt-2">
        <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
          Total Sample: {totalCalls} Calls
        </span>
      </div>
    </div>
  );
};

export default CallsByCities;