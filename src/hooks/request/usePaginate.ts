import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {useQuery} from 'react-query';
import isString from 'lodash/isString';
import compact from 'lodash/compact';
import concat from 'lodash/concat';
import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';
import without from 'lodash/without';
import {useEffect} from 'react';
import axios from '@/config/Axios';

interface IGetConfig {
  name?: Array<string | number | undefined | null> | string;
  url: string;
  page: number;
  staleTime?: number;
  cacheTime?: number;
  query?: object;
  search?: object;
  enabled?: boolean;
  onSuccess?(data: AxiosResponse): void;
  onError?(error: AxiosError): void;
}
const usePagination = ({
  name = 'notLongTimeAvailable',
  url,
  page = 1,
  query,
  search,
  onSuccess,
  onError,
  enabled = false,
  staleTime = 180000,
  cacheTime = 600000
}: IGetConfig) => {
  let prettyName: Array<string | number | undefined | null> | string = isString(name) ? name : compact(name);

  if (prettyName === 'notLongTimeAvailable' || !isEmpty(without(values(search), undefined, null))) {
    prettyName = concat(name, ['search']);
    staleTime = 0;
    cacheTime = 0;
  }

  const requestConfig: AxiosRequestConfig = {
    url,
    method: 'GET',
    params: {page, ...query, ...search}
  };

  const paginateQuery = useQuery(without(concat(prettyName, page), undefined, null), () => axios(requestConfig), {
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
  const refresh = () => paginateQuery.remove();

  return {...paginateQuery, refresh, data: paginateQuery?.data?.data?.data, meta: paginateQuery?.data?.data?.meta};
};

export default usePagination;
