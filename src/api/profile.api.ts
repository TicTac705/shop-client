import http from "@/services/rest/rest.service";
import { IProfileModel } from "@/models/account/auth-model.interface";

export default {
  getUserProfile(): Promise<IProfileModel> {
    return http.get(`profile`);
  },
};
