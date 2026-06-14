import axios from 'axios'

// Backend base URL. Override at build time with VITE_API_URL.
// A bare host (e.g. "caretrack-backend.onrender.com" from a platform service
// reference) is allowed — we prepend https:// when no scheme is present.
let baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
if (baseURL && !/^https?:\/\//i.test(baseURL)) {
  baseURL = `https://${baseURL}`
}

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

export default api
