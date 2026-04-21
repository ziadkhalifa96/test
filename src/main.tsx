import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios from 'axios';
import { useAuthStore } from './stores/authStore';

// Global HTTP interceptor to inject Authorization header
axios.interceptors.request.use((config) => {
  const state = useAuthStore.getState();
  if (state.accessToken) {
    config.headers.Authorization = `Bearer ${state.accessToken}`;
  }
  return config;
});

createRoot(document.getElementById("root")!).render(<App />);

