import { ICategory } from "@/models/category.interface";

export interface IProduct {
  id: number;
  categories: ICategory[];
  description: string;
  images: string[];
  price: number;
  title: string;
}
