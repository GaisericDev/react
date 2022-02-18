import { useState } from "react"

const Home = () => {
    const [name, setName] = useState("Gankerjack");
    const [age, setAge] = useState(27);
    const handleClick = () => {
        setName("Gaiseric");
        setAge(28);
    }
    return (
        <div className="home">
            <h2>Homepage</h2>
                <p>{name} is {age} years old</p>
            <button onClick={handleClick}>Click me</button>
        </div>
    );
}
 
export default Home;