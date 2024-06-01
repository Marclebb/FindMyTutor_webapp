import { useState,useEffect } from "react";

const usefetch = (url) => {

    const [data, setdata] = useState(null);
    const[loading,setloading]=useState(true);
    const[errmessage,seterrmessage]=useState(null);  

    useEffect(()=>{
        fetch(url)
        .then(res=>{
        if(!res.ok){
          throw Error("Couldn't load the page, Refresh or try again later")
        }
         return res.json()
        }).
        then(data=>{
        setdata(data);
        setloading(false);
        seterrmessage(null);
        }).
        catch(err=>{
          console.log(err.message);
           seterrmessage(err.message);
           setloading(false);
           setCards(null);
        })
        }, [url])

    return {data,loading,errmessage}    
}

export default usefetch