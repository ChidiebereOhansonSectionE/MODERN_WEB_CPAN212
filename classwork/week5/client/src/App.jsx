import { useState } from "react";

const App = () => {

  //Add our useStates here

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  // promises -> pending , success, failed


  const handleButton = async () => {
    try {
      const response = await fetch(`http://localhost:8000/data`);
        const data = await response.json();
        console.log(data);
      
    } catch (error) {
        console.log(error);
    }
  };

  //login form handler
  const handleLogin = async (e) =>{
    e.preventDefault();
    const loginForm = {username, password};
    


    try {
      const response = await fetch(`http://localhost:8000/login`, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(loginForm),
      });
      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.log(error);
    }
    
  };

  const handleFileUpload = async (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file)
    


    try {
      const response = await fetch(`http://localhost:8000/upload`, {
        method: "POST",
        
        body: formData,
      });
      const data = await response.json();
      setMessage(data);

    } catch (error) {
      console.log(error);
    }
    
  };

  return(
    <div>
      <button onClick={handleButton}>Click Me Plz</button>
      <p>-------------------------------------------------</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>---------------------------------------------------------</p>
      <form onSubmit={handleFileUpload}>
        <input
          type="file"
          value={file}
          onChange={(e)=>setFile(e.target.value)}
        
        />
        <button type="submit">Upload File</button>
      </form>
      <p>{message}</p>
    </div>
  )
}


export default App;