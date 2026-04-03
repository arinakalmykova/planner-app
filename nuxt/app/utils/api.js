const API_TASK_URL = "http://localhost:3001/api";
const API_AUTH_URL = "http://localhost:3001/api/auth";

export const apiTaskRequest = async (url, options) => {
  const token = localStorage.getItem("token");

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
      window.location.href = "/login";
    }

    throw err;
  }
};

export const apiAuthRequest = async (url, options) => {
  try {
    const data = await $fetch(API_AUTH_URL + url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });
    localStorage.setItem("token", data.token);

    return data;
  } catch (err) {
    console.error("API error:", err);
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    throw err;
  }
};