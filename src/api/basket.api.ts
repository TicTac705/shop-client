import http from "@/services/rest/rest.service";
import { IBasket, IBasketItem } from "@/models/basket.interface";
import { IBasketItemUpdateDto } from "@/dto/basket.dto";

export default {
  update(updateDto: IBasketItemUpdateDto): Promise<IBasketItem> {
    return http.put(`basket/product`, updateDto);
  },
  delete(id: number): Promise<void> {
    return http.delete(`basket/product/${id}`);
  },
  addItem(id: number): Promise<IBasketItem> {
    const formData = new FormData();
    formData.append("product_id", id.toString());
    return http.post(`basket/product`, formData);
  },
  getBasket(): Promise<IBasket> {
    return http.get(`basket`);
  },
};
