import { IProduct } from "@/models/product.interface";
import { IIdName } from "@/models/id-name.interface";
import { ICreateUpdate } from "@/models/create-update-delete.interface";

export interface IBasketItemDto extends ICreateUpdate {
  description: string;
  price: number;
  unitMeasure: IIdName;
  store: number;
  categories: IIdName[];
  images: string[];
  creator: IIdName;
  isActive: boolean;
}

// export function mapToProduct(dto: IProductDto): IProduct {
//   return {
//     id: dto.id,
//     name: dto.name,
//     description: dto.description,
//     price: dto.price,
//     unitMeasure: dto.unitMeasure,
//     store: dto.store,
//     categories: dto.categories,
//     images: dto.images,
//     creator: dto.creator,
//     isActive: dto.isActive,
//     createdAt: dto.createdAt,
//     updatedAt: dto.updatedAt,
//   };
// }

export interface IBasketAddItemDto {
  product_id: number;
}

export interface IBasketItemUpdateDto {
  product_id: number;
  quantity: number;
}
