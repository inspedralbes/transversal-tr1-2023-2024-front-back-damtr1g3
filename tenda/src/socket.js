import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  recarregar: false
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io("http://localhost:3000",{
  withCredentials: true
});

socket.on("connect", () => {
  console.log("hola")
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("comandaNova", ()=>{
  state.recarregar = true;
})