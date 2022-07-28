import { IProduct } from "@/models/product.interface";
import { ICreateUpdate } from "@/models/create-update-delete.interface";

export interface IBasket extends ICreateUpdate {
  id: number;
  items: IBasketItem[];
  totalCount: number;
}

export interface IBasketItem {
  product: IProduct;
  count: number;
}

