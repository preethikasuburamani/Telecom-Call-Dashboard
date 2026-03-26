

const BASE_URL = 'https://pinevox-backend-cyte.onrender.com/api';

//Token helpers
export const getToken  = ()         => localStorage.getItem('token');
export const setToken  = (token)    => localStorage.setItem('token', token);
export const clearToken = ()        => localStorage.removeItem('token');
export const getRole   = ()         => localStorage.getItem('role');

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// Auth
export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  setToken(data.token);
  localStorage.setItem('role', data.role);
  localStorage.setItem('email', data.email);
  return data;
};

export const logout = () => {
  clearToken();
  localStorage.removeItem('role');
  localStorage.removeItem('email');
};

// Cities dropdown 
export const fetchCities = async () => {
  const res = await fetch(`${BASE_URL}/calls/cities`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch cities');
  return res.json();   // string[]
};

// All calls (for charts & KPIs) 
export const fetchAllCalls = async (city = '') => {
  const params = city ? `?city=${encodeURIComponent(city)}` : '';
  const res = await fetch(`${BASE_URL}/calls/all${params}`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch calls');
  return res.json();
};

// Paginated calls (for table) 
export const fetchCalls = async ({ page = 1, limit = 20, city = '', startDate = '', endDate = '', caller = '' } = {}) => {
  const params = new URLSearchParams({ page, limit });
  if (city)      params.append('city', city);
  if (startDate) params.append('startDate', startDate);
  if (endDate)   params.append('endDate', endDate);
  if (caller)    params.append('caller', caller);

  const res = await fetch(`${BASE_URL}/calls?${params}`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch calls');
  return res.json();  
};