import { useState, useEffect } from "react"
import BlogList from "./BlogList";

const Home = () => {
    const [blogs, setBlogs] = useState([
        { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
        { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
        { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
    ]); 

    const [name, setName] = useState('mario');

    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog=> blog.id !== id);
        setBlogs(newBlogs);
    }
    //runs initially, and then every time the data changes, don't change state here because that triggers infinite loop lol
    //add empty dependency array if you only want to run this on initial render
    //put variables in dependency array to watch for changes in those variables only
    useEffect(()=>{
        console.log("useEffect ran");
        console.log(name);
    }, [name]);

    return (
        <div className="home">
            <BlogList blogs={blogs} title="All blogs!" handleDelete={handleDelete} />
            <button onClick={() => setName('luigi')}>change name</button>
            <p>{name}</p>
        </div>
    );
}
 
export default Home;