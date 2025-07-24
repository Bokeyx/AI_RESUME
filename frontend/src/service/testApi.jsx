import { springApi } from "../config/axiosInstance"

export const getTest = () => {
  return springApi.get('/test/spring_test')
}