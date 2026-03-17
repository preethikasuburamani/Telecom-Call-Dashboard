import React from 'react'
import { CallLogTable } from './components/ui/CallLogTable'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div className="w-full p-6 space-y-6 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-black tracking-widest uppercase text-center">Call Analytics Dashboard</h1>
      <div>
          <Dashboard/>
      </div>
    
    </div>
  )
}

export default App