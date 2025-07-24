import { springApi } from "../config/axiosInstance";

export const login = (email, password) => {
  console.log("회원가입 데이터 >>>>>>> " + email, password)
  return springApi.post('/login', {email, password});
}
export const setRegisterUser = (userData) => {
  console.log('회원가입 데이터 >>>>>> ', userData)
  return springApi.post('/join', userData)
}
