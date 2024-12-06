import { useState } from "react";
import "./Form.css";

export default function CreateAccount({ toggleForm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      setError(true);
      setMessage("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError(true);
      setMessage("Passwords do not match.");
      return;
    }

    setError(false);

    // Prepare the data to send
    const user = {
      username: name,
      email: email,
      password: password,
    };

    try {
      // Send the POST request to the signup endpoint
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Account created successfully!");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setMessage(""); // Clear any previous error messages
      } else {
        const errorData = await response.json();
        setError(true);
        setMessage(errorData.message || "Failed to create an account.");
      }
    } catch (err) {
      setError(true);
      setMessage("An error occurred while signing up. Please try again later.");
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
