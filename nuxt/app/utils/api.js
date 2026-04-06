const API_TASK_URL = "http://localhost:3001/api";
const API_AUTH_URL = "http://localhost:3001/api/auth";

import uiStore from "../store/ui";

let requests = 0;

const startLoading = () => {
  requests++;
  uiStore.commit("setLoading", true);
};

const stopLoading = () => {
  requests--;
  if (requests === 0) {
    uiStore.commit("setLoading", false);
  }
};

export const apiTaskRequest = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  startLoading();
  try {
    const data = await $fetch(API_TASK_URL + url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

    return data;
  } catch (err) {
    console.error("API error:", err);

    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }

    throw err;
  } finally {
    stopLoading();
  }
};

export const apiAuthRequest = async (url, options = {}) => {
  startLoading();
  try {
    const data = await $fetch(API_AUTH_URL + url, {
      ...options,
      headers: {
        ...(options.headers || {}),
      },
    });

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (err) {
    console.error("API error:", err);

    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }

    throw err;
  } finally {
    stopLoading();
  }
};