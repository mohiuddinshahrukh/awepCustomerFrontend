import { createContext } from "react";
import io from "socket.io-client";

export var socket = {
  socket: io(https://a-wep-production.herokuapp.com", {
    // export const socket = io("192.168.10.18:8081", {
    // export const socket = io("http://localhost:8081", {
    auth: {
      token: localStorage.getItem("customerToken"),
    },
  }),
};
export const socketContext = createContext();
