import http from "@/services/rest/rest.service";
import { IToken } from "@/models/account/token.interface";

export default {
  login(body: { username: string; password: string }): Promise<IToken> {
    const formData = new FormData();
    formData.append("email", body.username);
    formData.append("password", body.password);

    return http.post(`sign-in`, formData);
  },
  logout(): Promise<void> {
    return http.post(`logout`);
  },
};
