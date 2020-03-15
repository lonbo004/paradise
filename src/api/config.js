import axios from 'axios';
import setting from '../setting';
import store from '@/store';

const axiosProxy = axios.create({
  baseURL: setting.host,
  timeout: 30000
})

axiosProxy.interceptors.request.use(request => {
  store.state.isLoading = true;
  const token = sessionStorage.getItem("token");
  if (token) request.headers['Authorization'] = `Bearer ${token}`;
  return request;
}, function (error) {
  store.state.isLoading = false;
  return Promise.reject(error);
});
axiosProxy.interceptors.response.use(
  response => {
    store.state.isLoading = false;
    return response.data
  },
  error => {
    store.state.isLoading = false;
    console.dev(error.response);
    return Promise.reject(error)
  }
)

export default axiosProxy