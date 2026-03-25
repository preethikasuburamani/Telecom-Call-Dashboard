import React, { useState, useEffect, useCallback } from 'react';
import { getToken, logout, fetchAllCalls, fetchCalls } from './services/Api';

import Navbar                from './components/ui/Navbar';
import KPISummaryCard        from './components/ui/KPISummaryCard';
import CallActivityTimeline  from './components/ui/CallActivityTimeline';
import CallCostAnalytics     from './components/ui/CallCostAnalytics';
import CallDuration          from './components/ui/CallDuration';
import {CallLogTable}          from './components/ui/CallLogTable';
import CallsByCities         from './components/ui/CallsByCities';
import CitySearchDropdown    from './components/ui/CitySearchDropdown';
import { LogOut, RefreshCw } from 'lucide-react';
import LoginPage from './pages/LoginPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [activeTab,    setActiveTab]    = useState('Duration Analysis');
  const [selectedCity, setSelectedCity] = useState('');
  const [allCalls,     setAllCalls]     = useState([]);
  const [allLoading,   setAllLoading]   = useState(true);
  const [allError,     setAllError]     = useState('');
  const [tableCalls,   setTableCalls]   = useState([]);
  const [tableTotal,   setTableTotal]   = useState(0);
  const [tablePage,    setTablePage]    = useState(1);
  const [tableLoading, setTableLoading] = useState(false);

  const loadAllCalls = useCallback(async () => {
    setAllLoading(true);
    setAllError('');
    try {
      const data = await fetchAllCalls(selectedCity);
      setAllCalls(data);
    } catch (err) {
      setAllError(err.message);
    } finally {
      setAllLoading(false);
    }
  }, [selectedCity]);

  const loadTableCalls = useCallback(async (page = 1) => {
    setTableLoading(true);
    try {
      const res = await fetchCalls({ page, limit: 20, city: selectedCity });
      setTableCalls(res.calls);
      setTableTotal(res.total);
      setTablePage(res.page);
    } catch (err) {
      console.error(err);
    } finally {
      setTableLoading(false);
    }
  }, [selectedCity]);

  
  useEffect(() => {
    if (isAuthenticated) {
      loadAllCalls();
      loadTableCalls(1);
    }
  }, [isAuthenticated, selectedCity]);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  const email = localStorage.getItem('email') || '';
  const role  = localStorage.getItem('role')  || '';

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-slate-800">📡 PineVox Analytics</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium uppercase">
            {role}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <CitySearchDropdown selectedCity={selectedCity} onCityChange={setSelectedCity} />
          <span className="text-sm text-slate-500 hidden sm:block">{email}</span>
          <button onClick={loadAllCalls} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
            <RefreshCw size={15} />
          </button>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-500 transition-colors">
            <LogOut size={15} />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </header>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="p-6 max-w-7xl mx-auto space-y-6">
        {allError && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
            ⚠️ {allError} — make sure the backend is running on port 5000.
          </div>
        )}

        {selectedCity && (
          <div className="flex items-center gap-2 text-sm text-blue-600 font-medium bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 w-fit">
            📍 Showing data for: <strong>{selectedCity}</strong>
          </div>
        )}

        <div>
          {allLoading
            ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-24 bg-white rounded-xl border border-slate-200 animate-pulse" />
                ))}
              </div>
            : <KPISummaryCard data={allCalls} />
          }
        </div>

        {activeTab === 'Duration Analysis' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Call Duration Analysis</h2>
            {allLoading ? <Skeleton h="300px" /> : <CallDuration data={allCalls} />}
          </div>
        )}

        {activeTab === 'Cost Analysis' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            {allLoading ? <Skeleton h="400px" /> : <CallCostAnalytics data={allCalls} />}
          </div>
        )}

        {activeTab === 'Active Time Line' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            {allLoading ? <Skeleton h="400px" /> : <CallActivityTimeline data={allCalls} />}
          </div>
        )}

        {activeTab === 'cities' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-lg">
            {allLoading ? <Skeleton h="400px" /> : <CallsByCities data={allCalls} />}
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-800">Call Logs</h2>
              <span className="text-sm text-slate-500">{tableTotal} records</span>
            </div>
            {tableLoading ? <Skeleton h="300px" /> : <CallLogTable data={tableCalls} />}
            {tableTotal > 20 && (
              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  disabled={tablePage <= 1}
                  onClick={() => loadTableCalls(tablePage - 1)}
                  className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ← Previous
                </button>
                <span className="text-sm text-slate-500">
                  Page {tablePage} of {Math.ceil(tableTotal / 20)}
                </span>
                <button
                  disabled={tablePage >= Math.ceil(tableTotal / 20)}
                  onClick={() => loadTableCalls(tablePage + 1)}
                  className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

const Skeleton = ({ h }) => (
  <div className="w-full bg-slate-100 rounded-xl animate-pulse" style={{ height: h }} />
);