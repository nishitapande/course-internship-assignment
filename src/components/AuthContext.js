import axios from "axios";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthContextProvided = ({ children }) => {
  const [user, setUser] = useState(() => {
    let userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      return JSON.parse(userProfile);
    }
    return null;
  });
  const navigate = useNavigate();
  const loginApiCall = async (payload) => {
    await axios.post("http://localhost:8080/v1/api/user/login", payload, {
      withCredentials: true,
    });
    const apiResponse = await axios.get("http://localhost:8080/v1/api/user", {
      withCredentials: true,
    });
    setUser(apiResponse.data);
    localStorage.setItem("userProfile", JSON.stringify(apiResponse.data));
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ loginApiCall, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
