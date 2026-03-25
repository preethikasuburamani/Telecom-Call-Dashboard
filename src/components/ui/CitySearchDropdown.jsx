import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown, X } from 'lucide-react';
import { fetchCities } from '../../services/Api';


export default function CitySearchDropdown({ selectedCity, onCityChange }) {
  const [cities, setCities]   = useState([]);
  const [search, setSearch]   = useState('');
  const [open, setOpen]       = useState(false);
  const containerRef          = useRef(null);

  useEffect(() => {
    fetchCities().then(setCities).catch(console.error);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = cities.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (city) => {
    onCityChange(city);
    setOpen(false);
    setSearch('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onCityChange('');
    setSearch('');
  };

  return (
    <div ref={containerRef} className="relative w-64">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm shadow-sm hover:border-blue-400 transition-colors"
      >
        <MapPin size={15} className="text-blue-500 shrink-0" />
        <span className={`flex-1 text-left truncate ${selectedCity ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
          {selectedCity || 'Filter by city…'}
        </span>
        {selectedCity
          ? <X size={14} className="text-slate-400 hover:text-red-500 transition-colors" onClick={handleClear} />
          : <ChevronDown size={14} className="text-slate-400" />
        }
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
          <div className="p-2 border-b border-slate-100">
            <input
              autoFocus
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search city…"
              className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="max-h-52 overflow-y-auto">
            <button
              onClick={() => handleSelect('')}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${!selectedCity ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-slate-50 text-slate-700'}`}
            >
              All Cities
            </button>
            {filtered.map(city => (
              <button
                key={city}
                onClick={() => handleSelect(city)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedCity === city ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-slate-50 text-slate-700'}`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}