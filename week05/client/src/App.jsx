import { useState, useEffect } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleButton = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/data`);
      const data = await response.json();
      //------------------- This is all front end from here
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // check if something is blank or condition for password not met
    try {
      const submission = { email, password };
      const response = await fetch(`http://localhost:8000/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      const data = await response.json();
      setMessage(JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1></h1>
      <p>---------------------</p>
      Message: {message}
      <p>---------------------</p>
      <button onClick={handleButton}>Click me to fetch /data</button>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default App;
