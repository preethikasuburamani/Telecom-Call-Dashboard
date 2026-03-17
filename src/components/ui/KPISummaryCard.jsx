import React from 'react'
import { Phone, PoundSterlingIcon, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function KPISummaryCard({ data}) {

    //data filter,reduce for toal call,cost,sucess,failed,duration
    const Calculatedstate =(data)=>{
        if (!data || data.length === 0) return {};
  
            const totalCalls = data.length;
            const totalCost = data.reduce((acc, curr) => acc + parseFloat(curr.callCost), 0);
            const avgDuration = data.reduce((acc, curr) => acc + curr.callDuration, 0) / totalCalls;
            const successfulCalls = data.filter(c => c.callStatus === true).length;
            const failedCalls = totalCalls - successfulCalls;

             return { totalCalls, totalCost, avgDuration, successfulCalls, failedCalls };
    }

    const CalculatedData = Calculatedstate(data);

    
 const KpiCard = ({ title, value, icon }) => (
  <div className="p-4 bg-white rounded-xl border border-blue-500 shadow-sm">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-blue-500">{title}</span>
      <span className="text-gray-400">{icon}</span>
    </div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <KpiCard title="Total Calls" value={ CalculatedData.totalCalls} icon={<Phone size={18}/>} />
      <KpiCard title="Total Cost" value={`${ CalculatedData.totalCost?.toFixed(2)}`} icon={< PoundSterlingIcon size={18}/>} />
      <KpiCard title="Avg Duration" value={`${ CalculatedData.avgDuration?.toFixed(0)}s`} icon={<Clock size={18}/>} />
      <KpiCard title="Success" value={ CalculatedData.successfulCalls} icon={<CheckCircle size={18} className="text-green-500"/>} />
      <KpiCard title="Failed" value={CalculatedData.failedCalls} icon={<XCircle size={18} className="text-red-500"/>} />
    </div>
  );
}