import { useState } from "react";
import "./Form.css";
import axios from "axios";

export default function Form({ onLoginSuccess, toggleForm, setUserId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError(1);
    } else {
      const response = await axios.post('http://localhost:8088/email/login', {
        "email": email,
        "password": password
      });

      if (response.data === "Not Registered") {
        setError(2);
      } else if (response.data === "Incorrect Password") {
        setError(3);
      } else {
        setError(0);
        setUserId(response.data);
      }
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">User Registration</h1>
        {error === 1 && <div className="form-error">Please fill in all the fields!</div>}
        {error === 2 && <div className="form-error">Please Register First!</div>}
        {error === 3 && <div className="form-error">Incorrect Password!</div>}
        
        <label className="form-label" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label className="form-label" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <button type="submit" className="form-button">Login</button>
        <button type="button" className="form-button secondary" onClick={toggleForm}>Create Account</button>
      </form>
    </div>
  );
}
