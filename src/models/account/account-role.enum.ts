export enum AccountRole {
  Admin = 10,
  User = 20,
}

export function translateAccountRole(role: AccountRole): string {
  switch (role) {
    case AccountRole.Admin:
      return "Admin";
    case AccountRole.User:
      return "User";
    default:
      return "role";
  }
}
