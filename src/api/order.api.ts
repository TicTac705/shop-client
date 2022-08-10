import http from "@/services/rest/rest.service";
import { IOrderCreationDto } from "@/dto/order.dto";
import { IOrder } from "@/models/order/order.interface";

export default {
  create(createDto: IOrderCreationDto): Promise<IOrder> {
    return http.post(`profile/orders`, createDto);
  },
  getList(): Promise<IOrder[]> {
    return http.get(`profile/orders`);
  },
  recall(id: string) {
    return http.put("profile/orders/" + id + "/recall");
  },
};
