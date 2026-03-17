import CallActivityTimeline from '@/components/ui/CallActivityTimeline'
import CallCostAnalytics from '@/components/ui/CallCostAnalytics'
import CallDuration from '@/components/ui/CallDuration'
import { CallLogTable } from '@/components/ui/CallLogTable'
import CallsByCities from '@/components/ui/CallsByCities'
import KPISummaryCard from '@/components/ui/KPISummaryCard'
import Navbar from '@/components/ui/Navbar'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom'

const Dashboard = () => {
    


     //Call log data complete data
        const[data,setData]=useState([])
    
        //loading state
        const[loading,setLoading] = useState(true)
    
        //Error state
        const[error,setError] = useState("")

         //tab state
        const[activeTab,setActiveTab] = useState("Duration Analysis")

        
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

    
    {/* KPI Summary Section */}
   
    <>
      <section><KPISummaryCard data={data} /></section>
      {/* optionally show all sections in overview */}
    </>
      
     {/* Nav bar section*/ }
     <section>
        <Navbar  activeTab={activeTab} setActiveTab={setActiveTab}  />
    </section>    

    
     <main className="p-6 space-y-6">


  {activeTab === 'Active Time Line' && (
    <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <CallActivityTimeline data={data} />
    </section>
  )}

  {activeTab === 'Cost Analysis' && (
    <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Cost by City</h2>
      <CallCostAnalytics data={data} />
    </section>
  )}

  {activeTab === 'Duration Analysis' && (
    <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Duration Metrics</h2>
      <CallDuration data={data} />
    </section>
  )}

  {activeTab === 'cities' && (
    <section><CallsByCities data={data} /></section>
  )}

  {activeTab === 'logs' && (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">Recent Call Logs</h2>
        <span className="text-xs font-semibold bg-slate-100 px-2 py-1 rounded text-slate-600">
          {data.length} Total Records
        </span>
      </div>
      <CallLogTable data={data} />
    </section>
  )}

</main>
      
    </div>
  </div>
);
}

export default Dashboard