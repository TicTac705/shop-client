import { IProduct } from "@/models/product.interface";
import { IIdName } from "@/models/id-name.interface";
import {
  ICreateUpdate,
  ICreateUpdateDelete,
} from "@/models/create-update-delete.interface";

export interface IProductDto
  extends IIdName,
    ICreateUpdate,
    ICreateUpdateDelete {
  description: string;
  price: number;
  unitMeasure: IIdName;
  store: number;
  categories: IIdName[];
  images: string[];
  creator: IIdName;
  isActive: boolean;
}

export function mapToProduct(dto: IProductDto): IProduct {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    price: dto.price,
    unitMeasure: dto.unitMeasure,
    store: dto.store,
    categories: dto.categories,
    images: dto.images,
    creator: dto.creator,
    isActive: dto.isActive,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
    deletedAt: dto.deletedAt,
  };
}
