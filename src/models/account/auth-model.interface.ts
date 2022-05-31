import { AccountRole } from "@/models/account/account-role.enum";

export interface AuthModel {
  accountId: number;
  role: AccountRole;
  username: string;
}
