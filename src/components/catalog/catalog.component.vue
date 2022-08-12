<template>
  <header-component></header-component>

  <div class="mt-5" v-if="loading">
    <loading-component :visible="loading"></loading-component>
  </div>

  <div class="container-fluid mt-1" v-if="!loading">
    <div
      class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 justify-content-center"
    >
      <catalog-row-item-component
        v-for="product in items"
        v-bind:product="product"
        :key="product.id"
        @addToBasket="addToBasket"
      ></catalog-row-item-component>
    </div>
  </div>

  <pagination-component :paginate="paginate" @getList="getList">
  </pagination-component>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import { IProduct } from "@/models/product.interface";
import { IPaging, Paginate } from "@/models/paging.interface";

import productApi from "@/api/product.api";
import CatalogRowItemComponent from "@/components/catalog/catalog-row-item.component.vue";
import HeaderComponent from "@/components/common/header.component.vue";
import LoadingComponent from "@/containers/loading/loading.component.vue";
import PaginationComponent from "@/components/pagination/pagination.component.vue";
import { IProductDto, mapToProduct } from "@/dto/product.dto";
import basketApi from "@/api/basket.api";
import basketService from "@/services/basket.service";

@Options({
  components: {
    HeaderComponent,
    CatalogRowItemComponent,
    LoadingComponent,
    PaginationComponent,
  },
})
export default class CatalogComponent extends Vue {
  public items: IProduct[] = [];
  public paginate: Paginate = {
    lastPage: 0,
    currentPage: 0,
    totalElements: 0,
  };

  public loading = false;

  created() {
    this.load();
  }

  list(page = 1): Promise<IPaging<IProductDto>> {
    return productApi.getPage(page);
  }

  async getList(pageNumber: number) {
    const page = await this.list(pageNumber);
    this.items = page.collection.map((p) => mapToProduct(p));
    this.paginate = page.paginate;
  }

  public async load() {
    if (this.loading) {
      return;
    }
    this.loading = true;

    try {
      await basketService.updateBasket();
      const page = await this.list();
      this.items = page.collection.map((p) => mapToProduct(p));
      this.paginate = page.paginate;
    } finally {
      this.loading = false;
    }
  }

  async addToBasket(id: number) {
    await basketApi.addItem(id);
    await basketService.updateBasket();
  }
}
</script>

<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
