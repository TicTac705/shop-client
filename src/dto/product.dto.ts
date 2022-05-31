import { ICategory } from "@/models/category.interface";
import { IProduct } from "@/models/product.interface";

export interface IProductDto {
  id: number;
  categories: ICategory[];
  description: string;
  images: string;
  price: number;
  title: string;
}

export function mapToProduct(dto: IProductDto): IProduct {
  return {
    id: dto.id,
    categories: dto.categories,
    description: dto.description,
    images: JSON.parse(dto.images),
    price: dto.price,
    title: dto.title,
  };
}
