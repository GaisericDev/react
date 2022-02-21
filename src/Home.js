import { useState, useEffect } from "react"
import BlogList from "./BlogList";

const Home = () => {
    const [blogs, setBlogs] = useState(null); 

    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog=> blog.id !== id);
        setBlogs(newBlogs);
    }
    //runs initially, and then every time the data changes, don't change state here if it's watched because that triggers infinite loop lol
    //add empty dependency array if you only want to run this on initial render
    //put variables in dependency array to watch for changes in those variables only
    useEffect(()=>{
        fetch("http://localhost:8000/blogs")
        .then(res => {
            return res.json();
        })
        .then(data => {
            setBlogs(data);
        })
    }, []);

    return (
        <div className="home">
            {blogs && <BlogList blogs={blogs} title="All blogs!" handleDelete={handleDelete} />}
        </div>
    );
}
 
export default Home;