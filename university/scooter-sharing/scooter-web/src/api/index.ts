import axios from 'axios';
import { AuthApi, Configuration as AuthConfiguration } from './auth';
import { UsersApi, Configuration as UsersConfiguration } from './users';
import { ScooterControllerApi, Configuration as ScootersConfiguration } from './scooters';

import { useAuthStore } from '@/store/authStore';
import router from '@/router';

// JWT TOKEN HOOK
const authInterceptor = (config: any) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};


// JWT TOKEN CHECK
const errorInterceptor = (error: any) => {
  if (error.response && error.response.status === 401) {
    const authStore = useAuthStore();
    authStore.logout();
    router.push({name: 'login'});
  }
  return Promise.reject(error);
};


// BASE API
// const baseApiPath = import.meta.env.VITE_BASE_API;
const baseApiPath = "";
console.log(baseApiPath);

const axiosInstance = axios.create({
  baseURL: baseApiPath,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(authInterceptor, (error) => Promise.reject(error));
axiosInstance.interceptors.response.use((response) => response, errorInterceptor);
export { authInterceptor, errorInterceptor, axiosInstance };


// AUTH API
const authConfiguration = new AuthConfiguration({ basePath: baseApiPath});
const authApi = new AuthApi(authConfiguration);
//@ts-ignore
authApi.axios.interceptors.response.use((response) => response, errorInterceptor);
//@ts-ignore
authApi.axios.interceptors.request.use(authInterceptor, (error) => {Promise.reject(error)});
export * as auth from './auth';
export { authApi, authConfiguration };


// USERS API
const usersConfiguration = new UsersConfiguration({ basePath: baseApiPath});
const usersApi = new UsersApi(usersConfiguration);
//@ts-ignore
usersApi.axios.interceptors.response.use((response) => response, errorInterceptor);
//@ts-ignore
usersApi.axios.interceptors.request.use(authInterceptor, (error) => {Promise.reject(error)});
export * as users from './users';
export { usersApi, usersConfiguration };


// SCOOTERS API
const scootersConfiguration = new ScootersConfiguration({ basePath: baseApiPath});
const scootersApi = new ScooterControllerApi(scootersConfiguration);
//@ts-ignore
scootersApi.axios.interceptors.response.use((response) => response, errorInterceptor);
//@ts-ignore
scootersApi.axios.interceptors.request.use(authInterceptor, (error) => {Promise.reject(error)});
export * as cars from './scooters';
export { scootersApi, scootersConfiguration };