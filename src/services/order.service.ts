import authService from "@/services/auth.service";

export default {
  isCreator(creatorId: string): boolean {
    const auth = authService.getMe();
    return creatorId === auth?.accountId;
  },
};
