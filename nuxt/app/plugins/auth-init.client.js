// plugins/auth-init.client.js
import {jwtDecode} from "jwt-decode"; 
import authStore from "../store/auth";

export default defineNuxtPlugin(() => {
  const token = localStorage.getItem("token"); 
  if (token) {
    try {
      const payload = jwtDecode(token); 
      authStore.commit("setAuth", {
        user: {
          id: payload.id,
          name: payload.name || "", 
          role: payload.role,
        },
        token,
      });
    } catch (err) {
      console.error("Invalid token in localStorage", err);
      localStorage.removeItem("token");
    }
  }
});