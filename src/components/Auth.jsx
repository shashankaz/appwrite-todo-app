import React, { useState } from "react";
import { account, ID } from "../appwriteConfig";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        await account.createEmailPasswordSession(email, password);
        alert("Logged in successfully!");
      } catch (error) {
        console.error("Login Error:", error);
        alert("Login failed! " + error.message);
      }
    } else {
      try {
        await account.create(ID.unique(), email, password, name);
        alert("Signed up successfully! Now log in.");
        setIsLogin(true);
      } catch (error) {
        console.error("Sign Up Error:", error);
        alert("Sign up failed! " + error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="auth">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleAuth}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <div className="or-divider">
          <span>or</span>
        </div>
        <div onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? (
            <p>
              Don&apos;t have an account? <span>Sign Up</span>
            </p>
          ) : (
            <p>
              Already have an account? <span>Login</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
