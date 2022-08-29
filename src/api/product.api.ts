import http from "@/services/rest/rest.service";

import { IPaging } from "@/models/paging.interface";
import { IProductDto } from "@/dto/product.dto";

export default {
  getPage(page = 1): Promise<IPaging<IProductDto>> {
    return http.get(`/?page=` + page);
  },

  getPageForManagement(page = 1): Promise<IPaging<IProductDto>> {
    return http.get(`profile/catalog-management/products/?page=` + page);
  },

  destroy(productId: string) {
    return http.delete(`profile/catalog-management/products/` + productId);
  },

  destroyMany(productIds: string[]) {
    return http.delete(`profile/catalog-management/products/`, {
      params: { productIds: productIds },
    });
  },
};
