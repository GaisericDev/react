import { useState, useEffect } from "react"
//custom react hooks need to start with 'use' keyword else they won't work
const useFetch = (url) => {
    const [data, setData] = useState(null); 
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    //runs initially, and then every time the data changes, don't change state here if it's watched because that triggers infinite loop lol
    //add empty dependency array if you only want to run this on initial render
    //put variables in dependency array to watch for changes in those variables only
    useEffect(()=>{
        //abort controller if user quikcly switches pages during async request, will abort the fetch if that happens, will throw error so has to be handled as aborterror
        const abortCont = new AbortController();
        //set timeout to replicate server loading
        setTimeout(()=>{
            fetch(url, {signal: abortCont.signal})
            .then(res => {
                if(!res.ok){
                    throw Error("Could not fetch the data for that resource");
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                if(err.name === "AbortError"){
                    console.log("Fetch aborted");
                }
                else{
                    setIsPending(false);
                    setError(err.message);
                }
            });
        }, 1000);
        return () => abortCont.abort();
    }, [url]);

    return {data, isPending, error}
}

export default useFetch;