import axios from 'axios';
import setting from '../setting';

const axiosProxy = axios.create({
  baseURL: setting.host,
  timeout: 15000
})

axiosProxy.interceptors.request.use(request => {
  const token = sessionStorage.getItem("token");
  if (token) request.headers['Authorization'] = `Bearer ${token}`;
  return request;
}, function (error) {
  return Promise.reject(error);
});
axiosProxy.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.dev(error.response);
    return Promise.reject(error)
  }
)

export default axiosProxy