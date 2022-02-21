import { useState, useEffect } from "react"
import BlogList from "./BlogList";

const Home = () => {
    const [blogs, setBlogs] = useState(null); 
    const [isPending, setIsPending] = useState(true);
    //runs initially, and then every time the data changes, don't change state here if it's watched because that triggers infinite loop lol
    //add empty dependency array if you only want to run this on initial render
    //put variables in dependency array to watch for changes in those variables only
    useEffect(()=>{
        setTimeout(()=>{fetch("http://localhost:8000/blogs")
        .then(res => {
            return res.json();
        })
        .then(data => {
            setBlogs(data);
            setIsPending(false);
        })}, 1000)
    }, []);

    return (
        <div className="home">
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All blogs!" />}
        </div>
    );
}
 
export default Home;