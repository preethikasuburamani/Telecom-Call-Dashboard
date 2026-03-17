import { LayoutDashboard,  Activity, PoundSterling, Clock, MapPin, Table } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {


        //tab change array
        const tabs = [
            
      { id: 'Duration Analysis',label: 'Duration Analysis',   icon: Clock },
      { id: 'Cost Analysis',    label: 'Cost Analysis',   icon: PoundSterling },
      { id: 'Active Time Line', label: 'Active Time Line',   icon: Activity },
      { id: 'cities',    label: 'Cities',          icon: MapPin },
      { id: 'logs',      label: 'Call Logs',       icon: Table },
    ];
    
    

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
  <div className="flex overflow-x-auto">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
          ${activeTab === tab.id
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
          }`}
      >
        <tab.icon size={15} />
        {tab.label}
      </button>
    ))}
  </div>
</nav>
    
  )
}

export default Navbar