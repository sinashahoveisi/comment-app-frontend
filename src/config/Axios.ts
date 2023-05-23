import axios, {AxiosResponse, AxiosError} from 'axios';
import {toast} from 'react-toastify';
import {ResponseErrorHandler} from '@/utils/request';
import type {ResponseProps} from '@/types/request';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000
});
instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse<ResponseProps> => {
    if (response.config.method !== 'get' && !response?.config?.headers?.silentSuccess) {
      toast.success(response?.config?.headers?.successMessage || 'success');
    }
    return {
      ...response,
      data: response?.data?.total
        ? {
            data: response?.data?.data,
            meta: {
              page: response?.data?.page,
              last_page: response?.data?.total_pages,
              per_page: response?.data?.per_page,
              total: response?.data?.total_pages
            }
          }
        : response?.data
    };
  },
  (error: AxiosError) => ResponseErrorHandler(error)
);
export default instance;
