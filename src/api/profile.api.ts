import http from "@/services/rest/rest.service";
import { IToken } from "@/models/account/token.interface";
import { IProfileModel } from "@/models/account/auth-model.interface";

export default {
  getUserProfile(): Promise<IProfileModel> {
    return http.get(`profile`);
  },
};
