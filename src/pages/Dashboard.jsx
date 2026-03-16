import CallActivityTimeline from '@/components/ui/CallActivityTimeline'
import CallCostAnalytics from '@/components/ui/CallCostAnalytics'
import CallDuration from '@/components/ui/CallDuration'
import { CallLogTable } from '@/components/ui/CallLogTable'
import CallsByCities from '@/components/ui/CallsByCities'
import KPISummaryCard from '@/components/ui/KPISummaryCard'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    


     //Call log data complete data
        const[data,setData]=useState([])
    
        //loading state
        const[loading,setLoading] = useState(true)
    
        //Error state
        const[error,setError] = useState("")
    
        
        //useEffect to ftech the data 
        useEffect(() => {
  
                const fetchCallLogs = async () => {
                try {
                    const response = await fetch('https://69b30b45e224ec066bdb55a0.mockapi.io/api/v1/cdr');
                    
                    if (!response.ok) {
                    throw new Error('Failed to fetch call data');
                    }

                    const result = await response.json();
                    setData(result); 
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
                };
                fetchCallLogs();
         }, []); 

     if (loading) return <div>Loading dashboard data...</div>;
     if (error) return <div>Error: {error}</div>;

 return (
  <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-900">
    <div className="max-w-[1440px] mx-auto space-y-8">
      
      {/* 1. Header Section */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Analytical Call Dashboard</h1>
        <p className="text-slate-500">Real-time insights and call performance metrics.</p>
      </header>

      {/* 2. KPI Summary Section */}
      <section>
        <KPISummaryCard data={data} />
      </section>

      {/* 3. Primary Chart: Full Width Activity Timeline */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-800">Call Activity (24h)</h2>
          <p className="text-sm text-slate-500">Peak call volumes throughout the day</p>
        </div>
        <CallActivityTimeline data={data} />
      </section>

      {/* 4. Analytics Grid: Cost, Duration, and Pie Chart */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cost Analysis (Takes up 1 column) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-800">Cost by City</h2>
          </div>
          <CallCostAnalytics data={data} />
        </div>

        {/* Duration Analysis (Takes up 1 column) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-800">Duration Metrics</h2>
          </div>
          <CallDuration data={data} />
        </div>

        {/* Pie Chart: Calls By Cities (Takes up 1 column) */}
        {/* Note: No extra div needed around CallsByCities because the component handles its own card styling now */}
        <CallsByCities data={data} />
        
      </section>

      {/* 5. Table Section */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">Recent Call Logs</h2>
          <span className="text-xs font-semibold bg-slate-100 px-2 py-1 rounded text-slate-600">
            {data.length} Total Records
          </span>
        </div>
        <CallLogTable data={data} />
      </section>
      
    </div>
  </div>
);
}

export default Dashboard