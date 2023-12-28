import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://gon-back-end.onrender.com'
})
