import { useState } from "react";
import "./Form.css";
import axios from "axios";

export default function Form({ onLoginSuccess, toggleForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError(true);
    } else {
      /*await axios.post('http://localhost:8080/email/login',{
        "email": email,
        "password":password
      });*/
      setError(false);
      onLoginSuccess();
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">User Registration</h1>
        {error && (
          <div className="form-error">Please fill in all the fields!</div>
        )}
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button type="submit" className="form-button">
          Login
        </button>
        <button
          type="button"
          className="form-button secondary"
          onClick={toggleForm}
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
