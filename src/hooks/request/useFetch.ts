import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {useQuery} from 'react-query';
import compact from 'lodash/compact';
import isString from 'lodash/isString';
import axios from '@/config/Axios';

interface IGetConfig {
  url?: string;
  name?: Array<string | number | undefined | null> | string;
  query?: object;
  staleTime?: number;
  cacheTime?: number;
  showError?: boolean;
  enabled?: boolean;
  onSuccess?(data: AxiosResponse): void;
  onError?(error: AxiosError): void;
}
const useFetch = ({
  url,
  name = 'notLongTimeAvailable',
  query,
  showError = true,
  onSuccess,
  onError,
  enabled = false,
  staleTime = 180000,
  cacheTime = 600000
}: IGetConfig) => {
  const prettyName = isString(name) ? name : compact(name);
  if (prettyName === 'notLongTimeAvailable') {
    staleTime = 0;
    cacheTime = 0;
  }

  const requestConfig: AxiosRequestConfig = {
    headers: {
      silent: !showError,
      silentError: !showError
    },
    url,
    method: 'GET',
    params: query
  };

  const fetchData = useQuery(prettyName, () => axios(requestConfig), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    keepPreviousData: false,
    enabled,
    staleTime,
    cacheTime,
    retryDelay: 5000,
    onSuccess,
    onError,
    retry: (failureCount: number, error: AxiosError): boolean => {
      if (error?.response?.status === 404 || error?.response?.status === 500 || error?.response?.status === 422)
        return false;
      return failureCount <= 1;
    }
  });

  const refresh = () => fetchData.remove();
  return {
    ...fetchData,
    refresh,
    data: fetchData?.data?.data?.data,
    query
  };
};

export default useFetch;
