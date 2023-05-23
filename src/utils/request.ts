import {AxiosError} from 'axios';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import values from 'lodash/values';
import {onlineManager} from 'react-query';
import {toast} from 'react-toastify';

export const ResponseErrorHandler = (error: AxiosError): Promise<AxiosError> => {
  const response: any = error?.response?.data;
  const status: number | undefined = error?.response?.status;
  let message: string = '';

  if (status === 422) message = values(response?.errors).join('\n');
  else if (status === 401) message = 'not Found';
  else if (status === 404 || status === 419 || status === 429 || status === 403) message = response?.message;
  else if (error.code === 'ECONNABORTED') message = 'serverBusy';
  else if (!onlineManager.isOnline()) message = 'connection error';
  else if (status === 500 || (error.isAxiosError && isNil(error?.response)))
    message = response?.message || 'server error';
  if (!isEmpty(message) && !error?.config?.headers?.silentError) {
    toast.error(message);
  }
  return Promise.reject(error);
};
