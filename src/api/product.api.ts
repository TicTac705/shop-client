import http from "@/services/rest/rest.service";

import { IPaging } from "@/models/paging.interface";
import { IProductDto } from "@/dto/product.dto";

export default {
  getPage(): Promise<IPaging<IProductDto>> {
    return http.get(``);
  },
};
