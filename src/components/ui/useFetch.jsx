import React, { useEffect, useState } from 'react'

const useFetch = () => {

    //Call log data complete data
    const[data,setData]=useState([])

    //loading state
    const[loading,setLoading] = useState(true)

    //Error state
    const[error,setError] = useEffect("")

    useEffect(()=>{
        const fetchdata = async()=>{
            try{
            const response = await fetch("https://69b30b45e224ec066bdb55a0.mockapi.io/api/v1/cdr")
            const Apidata = await response.json()
            setData(Apidata)
            setLoading(false)
            }catch(err){
                setError(err)
            }
        }
    },[])

    
  return (
    <div>

    </div>
  )
}

export default useFetch