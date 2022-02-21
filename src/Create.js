import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("mario");
    const [isPending, setIsPending] = useState(false);
    //use history hook, will redirect user forwards and backwards
    const history = useHistory();

    const handleSubmit = (e) => {
        //prevents page refresh
        e.preventDefault();
        //blog object
        const blog = {title, body, author};
        //set pending status
        setIsPending(true);
        //post blog
        fetch("http://localhost:8000/blogs", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(()=>{
            console.log("New blog added");
            setIsPending(false);
            // history.go(-1); <- go to previous page
            //go to home page
            history.push("/");
        })
    }
    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input type="text" required value={title} onChange={(e)=> setTitle(e.target.value)}/>
                <label>Blog body:</label>
                <textarea required value={body} onChange={(e)=> setBody(e.target.value)}></textarea>
                <label>Blog author:</label>
                <select value={author} onChange={(e)=> setAuthor(e.target.value)}>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {isPending?<button disabled>Adding Blog...</button>:<button>Add Blog</button>}
            </form>
        </div>
    );
}
 
export default Create;