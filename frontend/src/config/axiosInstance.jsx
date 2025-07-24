import axios from 'axios'

export const springApi = axios.create({
  baseURL: '/spring', 
  headers: {
    'Content-Type':'application/json'
  }, 
  withCredentials: true
})