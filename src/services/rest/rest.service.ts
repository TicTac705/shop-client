import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API } from "../config/config.service";
import authService from "@/services/auth.service";
import router from "@/router";
// import * as utils from "@/utils";

export interface IRest {
  get<T>(endpoint: string): Promise<T>;

  post<T>(endpoint: string, body?: any): Promise<T>;

  put<T>(endpoint: string, body?: any): Promise<T>;
}

export interface IResponseErrorCustom {
  message: string;
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
    if (error.response?.status === 444) {
      authService.clear();
    }

    if (error.response?.status === 401) {
      authService.clear();
      router.push({
        name: "login",
        query: { returnUrl: router.currentRoute.value.path },
      });
      return Promise.reject(
        (error.response?.data as IResponseErrorCustom).message as string
      );
    }

    // const responseError: IResponseError = error.response
    //   ?.data as IResponseError;
    // debugger;
    // if (responseError.errorCode === ResponseCode.ValidationError) {
    //   return Promise.reject(responseError);
    // }
    //
    // if (responseError.errorCode === ResponseCode.InvalidToken) {
    //   authService.clear();
    //   router.push({
    //     name: "login",
    //     query: { returnUrl: router.currentRoute.value.path },
    //   });
    //   return Promise.reject(responseError);
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
  const token = authService.getToken();

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
