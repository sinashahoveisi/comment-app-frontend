import {AxiosError, AxiosRequestConfig} from 'axios';
import {useMutation} from 'react-query';
import merge from 'lodash/merge';
import set from 'lodash/set';
import isFunction from 'lodash/isFunction';
import axios from '@/config/Axios';
import {allocateParamToString} from '@/utils/common';
import type {mutationRequestProps} from '@/types/request';

interface Props {
  url: string;
  query?: object;
  method?: 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'GET';
  isUrlencoded?: boolean;
  isMultipart?: boolean;
  onSuccess?(response: any, request?: any, params?: any): void;
  onError?(error: any, request?: any, params?: any): void;
}

/**
 *
 * @param url
 * @param method
 * @param query
 * @param isMultipart
 * @param onSuccess
 * @param onError
 * @param isUrlencoded
 */
const usePost = ({url, method = 'POST', query, isMultipart, onSuccess, onError, isUrlencoded = false}: Props) => {
  const requestConfig: AxiosRequestConfig = {
    headers: {
      'Content-type': isMultipart
        ? 'multipart/form-data'
        : isUrlencoded
        ? 'application/x-www-form-urlencoded'
        : 'application/json',
      timeout: 15000
    },
    url,
    method,
    params: query
  };

  const createRequest = ({body, queryParams, params}: mutationRequestProps) => {
    if (queryParams) set(requestConfig, 'params', merge(query, queryParams));
    if (params) set(requestConfig, 'url', allocateParamToString(url, params));
    set(requestConfig, 'data', body);
    return axios(requestConfig);
  };

  const mutationData: any = useMutation(createRequest, {
    retry: (failureCount: number, error: AxiosError): boolean => {
      if (
        error.isAxiosError ||
        error?.response?.status === 404 ||
        error?.response?.status === 500 ||
        error?.response?.status === 422
      )
        return false;
      return failureCount <= 1;
    },
    onSuccess: (data, variables) => {
      if (isFunction(onSuccess)) {
        onSuccess(data?.data, variables, variables?.params);
      }
    },
    onError: (error: AxiosError, variables) => {
      if (isFunction(onError)) {
        onError(error.request, variables, variables?.params);
      }
    }
  });

  const post = (body?: any, queryParams?: object, params?: object) => {
    mutationData.mutate({body, queryParams, params});
  };
  return {...mutationData, post, params: mutationData.variables?.params};
};

export default usePost;
