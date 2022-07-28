import { IIdName } from "@/models/id-name.interface";
import { ICreateUpdate } from "@/models/create-update-delete.interface";

export interface IProduct extends IIdName, ICreateUpdate {
  description: string;
  price: number;
  unitMeasure: IIdName;
  store: number;
  categories: IIdName[];
  images: string[];
  creator: IIdName;
  isActive: boolean;
}
