import axios from 'axios';

import { ApiResponse } from '../types/http';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
  maxContentLength: 20000, // in bytes
  withCredentials: false
});

export function del(endpoint: string): Promise<ApiResponse> {
  return instance.delete(endpoint)
    .then((res) => res.data);
}

export function get(endpoint: string): Promise<ApiResponse> {
  return instance.get(endpoint)
    .then((res) => res.data);
}

export function patch(endpoint: string, postData?: any): Promise<ApiResponse> {
  return instance.patch(endpoint, postData)
    .then((res) => res.data);
}

export function post(endpoint: string, postData?: any): Promise<ApiResponse> {
  return instance.post(endpoint, postData)
    .then((res) => res.data);
}
