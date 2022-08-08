import { ICreateUpdate } from "@/models/create-update-delete.interface";
import { IIdName } from "@/models/id-name.interface";

export interface IOrder extends ICreateUpdate {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  deliveryId: number;
  deliveryAddress: string;
  items: IOrderItem[];
  orderStatusId: number;
  paymentStatusId: number;
}

export interface IOrderItem extends IIdName {
  product: IOrderItemProduct;
  price: number;
  count: number;
}

export interface IOrderItemProduct extends IIdName {
  id: string;
  name: string;
  unitMeasure: IIdName;
  images: string[];
}
