import { springApi } from "../config/axiosInstance";

export const getEssaysList = () => springApi.get('/essays/list')
