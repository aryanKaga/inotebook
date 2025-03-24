import React, { useState } from "react";
import "./Auth.css"; 
import { Login, SignIn } from "./authFunctions";

export default function AuthPage({ authorize, setAuthorize }) {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => setIsSignup(!isSignup);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents form refresh
    let result;

    if (isSignup) {
      result = await SignIn();
    } else {
      result = await Login();
    }

    if (result) {
      setAuthorize(true); // ✅ Correctly setting authorization state
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && <input name="Username" type="text" placeholder="Username" id="Sign_username" required />}
          {!isSignup && <input name="Username" type="text" placeholder="Username" id="Log_username" required />}
          {isSignup && <input name="email" type="email" placeholder="Email" id="email" required />}
          <input type="password" name="password" placeholder="Password" id="password" required />
          {isSignup && <input type="password" placeholder="Confirm Password" required />}
          <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        </form>
        <p className="toggle-text">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <span onClick={toggleForm} className="auth-link"> 
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}
