import {
  AuthModel,
  IProfileModel,
} from "@/models/account/auth-model.interface";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import profileApi from "@/api/profile.api";

const TOKEN_KEY = "token";
const TOKEN_DATA_KEY = "token_data";
const ME_KEY = "me";

export default {
  profileModel$: new ReplaySubject<IProfileModel>(),
  isInitialize$: new BehaviorSubject<boolean>(false),

  hasToken(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },
  storeToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  storeTokenData() {
    if (!this.hasToken()) {
      return;
    }

    const token = this.getToken();

    if (token === null) {
      localStorage.setItem(TOKEN_DATA_KEY, "token_data");
      return;
    }

    const token_data = JSON.parse(atob(token.split(".")[1]));

    localStorage.setItem(TOKEN_DATA_KEY, JSON.stringify(token_data));
  },

  getTokenData(): any | null {
    const token_data = localStorage.getItem(TOKEN_DATA_KEY);
    if (!token_data || token_data === "token_data") {
      return null;
    }

    return JSON.parse(token_data);
  },

  storeMe(meModel: AuthModel) {
    localStorage.setItem(ME_KEY, JSON.stringify(meModel));
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_DATA_KEY);
    localStorage.removeItem(ME_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getMe(): AuthModel | null {
    const t = localStorage.getItem(ME_KEY);
    if (!t) {
      return null;
    }
    return JSON.parse(t);
  },

  async getProfile() {
    console.log("getProfile");
    const tokenData = this.getTokenData();
    const profile = await profileApi.getUserProfile();

    if (tokenData !== null) {
      this.storeMe({
        accountId: tokenData.sub,
        roles: tokenData.roles.map((role: any) => role.slug),
        username: profile.name,
      });
    }

    this.profileModel$.next(profile);
    this.isInitialize$.next(true);
  },
};
