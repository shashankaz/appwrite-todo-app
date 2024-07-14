import React, { useState, useEffect } from "react";
import Auth from "./components/Auth";
import Todo from "./components/Todo";
import { account } from "./appwriteConfig";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const accountData = await account.get();
        setUser(accountData);
      } catch (error) {
        setUser(null);
      }
    };
    getUser();
  }, []);

  return (
    <div>
      {user ? (
        <div className="main">
          <div className="nav">
            <span className="user-name">Hello, {user.name}</span>
            <button
              className="logout"
              onClick={async () => {
                await account.deleteSession("current");
                setUser(null);
              }}
            >
              Logout
            </button>
          </div>
          <Todo />
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default App;
