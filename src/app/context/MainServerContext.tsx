import axios from "axios";
import React from "react";
import domain from "../util/config/domain";

const axiosInstance = axios.create({
  baseURL: domain,
  timeout: 4000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const MainServerContext = React.createContext(axiosInstance);
