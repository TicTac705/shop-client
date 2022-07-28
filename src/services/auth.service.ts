import { AuthModel } from "@/models/account/auth-model.interface";

const TOKEN_KEY = "token";
const ME_KEY = "me";

export default {
  hasToken(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },
  storeToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  storeMe(meModel: AuthModel) {
    localStorage.setItem(ME_KEY, JSON.stringify(meModel));
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
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
};
