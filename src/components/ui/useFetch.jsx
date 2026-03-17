import React, { useEffect, useState } from 'react'

const useFetch = (url) => {

    //Call log data complete data
    const[data,setData]=useState([])

    //loading state
    const[loading,setLoading] = useState(true)

    //Error state
    const[error,setError] = useState("")


    useEffect(()=>{
    const fetchCallLogs = async () => {
                try {
                    const response = await fetch(url);
                    
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

    
  return {data,error,loading}
}

export default useFetch

