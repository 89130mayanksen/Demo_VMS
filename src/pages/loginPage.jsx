import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Login from "../components/LoginAuthentication";

export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  return (
    <div>
      {isLoggedIn ? (
        <main>
          <Outlet />
        </main>
      ) : (
        <Login onAuthSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
