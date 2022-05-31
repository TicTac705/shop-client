import http from "@/services/rest/rest.service";
import { IProduct } from "@/models/product.interface";
import { IPaging } from "@/models/paging.interface";
import { IProductDto } from "@/dto/product.dto";

export default {
  // get(id): Promise<IProduct> {
  //     return http.get(`product/${id}`);
  // }
  // create(model: IProduct): Promise<number> {
  //     return http.put(`product`, model);
  // },
  // update(id: number, model: IProductEdit): Promise<number> {
  //     return http.post(`product/${id}`, model);
  // },
  // delete(id: number): Promise<void> {
  //     return http.delete(`product/${id}`);
  // },
  // list(): Promise<IProduct[]> {
  //     let url = `'catalog';
  //     return http.get(url);
  // },
  getPage(): Promise<IPaging<IProductDto>> {
    return http.get(`catalog`);
  },
};
