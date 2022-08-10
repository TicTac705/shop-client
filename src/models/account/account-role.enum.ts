export enum AccountRole {
  Admin = "admin",
  Manager = "manager",
  User = "user",
}

export function translateAccountRole(role: AccountRole): string {
  switch (role) {
    case AccountRole.Admin:
      return "Admin";
    case AccountRole.User:
      return "User";
    case AccountRole.Manager:
      return "Manager";
    default:
      return "Unknown role";
  }
}
