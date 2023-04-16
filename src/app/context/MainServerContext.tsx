import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const MainServerContext = React.createContext(axiosInstance);
