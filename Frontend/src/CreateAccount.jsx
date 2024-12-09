import { useState } from "react";
import "./Form.css";

export default function CreateAccount({ toggleForm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      setError(true);
    } else if (password !== confirmPassword) {
      setError(true);
    } else {
      setError(false);
      alert("Account created successfully!");
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">Create Account</h1>
        {error && <div className="form-error">Please fill in all the fields correctly!</div>}
        <label className="form-label" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
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
        <label className="form-label" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="form-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
        />
        <button type="submit" className="form-button">
          Register
        </button>
        <button
          type="button"
          className="form-button secondary"
          onClick={toggleForm}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}
