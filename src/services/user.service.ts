import authService from "@/services/auth.service";
import { AccountRole } from "@/models/account/account-role.enum";

export default {
  isAdmin(): boolean {
    const auth = authService.getMe();
    if (!auth) {
      return false;
    }

    return auth.roles.some((role) => role === AccountRole.Admin);
  },

  isManager(): boolean {
    const auth = authService.getMe();
    if (!auth) {
      return false;
    }

    return auth.roles.some(
      (role) => role === AccountRole.Admin || role === AccountRole.Manager
    );
  },
};
