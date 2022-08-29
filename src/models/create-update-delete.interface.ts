export interface ICreateUpdate {
  createdAt: number;
  updatedAt: number;
}

export interface ICreateUpdateDelete extends ICreateUpdate {
  deletedAt: number | null;
}
