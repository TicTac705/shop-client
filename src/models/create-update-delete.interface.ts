export interface ICreateUpdate {
  createdAt: number;
  updatedAt: string;
}

export interface ICreateUpdateDelete extends ICreateUpdate {
  deletedAt: string;
}
