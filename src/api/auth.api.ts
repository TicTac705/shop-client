import http from "@/services/rest/rest.service";
import { IToken } from "@/models/account/token.interface";

export default {
  login(body: { username: string; password: string }): Promise<IToken> {
    const formData = new FormData();
    formData.append("email", body.username);
    formData.append("password", body.password);

    return http.post(`sign-in`, formData);
  },
  register(body: {
    userName: string;
    userEmail: string;
    password: string;
    passwordConfirmed: string;
  }) {
    const formData = new FormData();
    formData.append("name", body.userName);
    formData.append("email", body.userEmail);
    formData.append("password", body.password);
    formData.append("password_confirmation", body.passwordConfirmed);

    return http.post(`signup`, formData);
  },
  logout(): Promise<void> {
    return http.post(`logout`);
  },
};
