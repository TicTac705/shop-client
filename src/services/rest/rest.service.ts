import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API } from "../config/config.service";
// import * as utils from "@/utils";

export interface IRest {
  get<T>(endpoint: string): Promise<T>;

  post<T>(endpoint: string, body?: any): Promise<T>;

  put<T>(endpoint: string, body?: any): Promise<T>;
}

export enum ResponseCode {
  ValidationError = "VALIDATION_ERROR",
  InvalidToken = "INVALID_TOKEN",
}

export interface IResponse {
  response: any | IResponseError;
}

export interface IResponseError {
  status_code: number;
  message: string; // validation
  data: any; // validation
  errorCode: ResponseCode; // validation
}

const instanse = axios.create({
  baseURL: API,
});

instanse.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const responseError: IResponseError = error.response
      ?.data as IResponseError;

    if (responseError.errorCode === ResponseCode.ValidationError) {
      console.info("validation", responseError);
      return Promise.reject(responseError);
    }

    // if (responseError.errorCode === ResponseCode.InvalidToken) {
    //     store.dispatch(types.AUTH_LOGOUT);
    //     router.push({
    //         name: 'login'
    //         // query: { returnUrl: router.currentRoute.path }
    //     });
    //     return Promise.reject(responseError);
    // }

    // console.info(responseError);
    // let payload: INote = {
    //     total: 1,
    //     guid: utils.guid(),
    //     type: NoteType.Error,
    //     heading: 'Something Went Wrong',
    //     body: responseError.message
    // };

    // store.commit(types.ADD_NOTE, payload);

    return Promise.reject(error);
  }
);

instanse.interceptors.request.use((config: AxiosRequestConfig) => {
  //const token = store.state['auth'].token;
  const token = "test token";
  config.headers = {
    Pragma: "no-cache",
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  get<T>(endpoint: string, params: any = null): Promise<T> {
    if (params) {
      //endpoint = utils.addParams(endpoint, params);
    }
    return instanse
      .get(endpoint)
      .then((response: AxiosResponse) => response.data);
  },

  post<T>(endpoint: string, body: any = null): Promise<T> {
    return instanse
      .post(endpoint, body)
      .then((response: AxiosResponse) => response.data);
  },

  put<T>(endpoint: string, body: any = null): Promise<T> {
    return instanse
      .put(endpoint, body)
      .then((response: AxiosResponse) => response.data);
  },
  delete<T>(endpoint: string): Promise<T> {
    return instanse
      .delete(endpoint)
      .then((response: AxiosResponse) => response.data);
  },
};
