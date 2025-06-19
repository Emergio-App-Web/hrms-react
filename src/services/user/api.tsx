import axios from "axios"
import { store } from "@/context/store";
import { setToken, logout } from "@/context/reducers/authSlice";


export const api = axios.create({
    withCredentials: true,
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  });

  const refreshApi = axios.create({
    withCredentials: true,
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  })

  //REFRESHING FUNCTION
  const refreshToken = async() => {
    try {
      const response = await refreshApi.post("user/refresh")
      const {accessToken} = response.data
      store.dispatch(setToken({token:accessToken}))
      return accessToken      
    } catch (error){
      store.dispatch(logout())
      throw error
    }
  }

  //REQUEST INTERCEPTOR
  api.interceptors.request.use(
    async (config) => {
      const state = store.getState();
      const authToken = state.auth.token
      config.headers["Authorization"] = `Bearer ${authToken}`;
      return config
    },
    async(error) => {
      return Promise.reject(error)
    }
  )

  //RESPONSE INTERCEPTOR
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      if(error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true
        try {
          const newAccessToken = await refreshToken()
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
          return api(originalRequest)
        } catch(refreshError){
          return Promise.reject(refreshError) 
        }
      }
      return Promise.reject(error)
    }
  )