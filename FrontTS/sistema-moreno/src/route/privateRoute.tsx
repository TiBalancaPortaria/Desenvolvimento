import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("access_token");
  const lastLoginTimeStr = localStorage.getItem("lastLoginTime");
  const lastLoginTime = lastLoginTimeStr ? parseInt(lastLoginTimeStr, 10) : 0;

  const now = Date.now();
  const MAX_INACTIVITY = 30 * 60 * 1000; // 30 min

  if (!token) return <Navigate to="/" replace />;
  if (lastLoginTime && now - lastLoginTime > MAX_INACTIVITY) {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
