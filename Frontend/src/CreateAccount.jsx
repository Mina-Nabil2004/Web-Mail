import { useState } from "react";
import "./Form.css";
import axios from "axios";

export default function CreateAccount({ toggleForm, setUserId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      setError(1);
    } else if (password !== confirmPassword) {
      setError(2);
    } else {
      const response = await axios.post('http://localhost:8080/email/register',{
        "name": name,
        "email": email,
        "password":password
      });
      if(response.data == "Registered"){
        setError(3);
      }
      else{
        setError(0);
        alert("Account created successfully!");
        console.log(response.data);
        setUserId(response.data);
      }
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">Create Account</h1>
        {error == 1 && <div className="form-error">Please fill in all the fields correctly!</div>}
        {error == 2 && <div className="form-error">Wrong Password Confirm!</div>}
        {error == 3 && <div className="form-error">Registerd Already!</div>}
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
