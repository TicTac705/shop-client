import { AccountRole } from "@/models/account/account-role.enum";
import { ICreateUpdate } from "@/models/create-update-delete.interface";

export interface AuthModel {
  accountId: string;
  roles: [];
  username: string;
}

export interface IProfileModel extends ICreateUpdate {
  name: string;
  email: string;
  emailVerifiedAt: boolean;
  roles: AccountRole[];
}
