import Axios from 'axios'
import { cookies } from 'next/headers'

/**
  Axios instance to send requests
*/
const API = Axios.create({
  baseURL: `http://localhost:4000`,
  timeout: 10000,
})

// Add a request interceptor to add the token to each request
API.interceptors.request.use(async (config) => {
  // Retrieve the token from the cache or Next.js authentication
  const accessToken = cookies().get('chatToken')?.value
  // If the token exists, add it to the Authorization header
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

export default API
