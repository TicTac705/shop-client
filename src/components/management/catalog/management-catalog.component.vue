<template>
  <div class="mt-5 mb-5" v-if="loading">
    <loading-component :visible="loading"></loading-component>
  </div>

  <div class="container-fluid" v-if="!loading">
    <div
      class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 justify-content-center"
    >
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Store</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <management-catalog-row-item-component
            v-for="product in items"
            v-bind:product="product"
            :key="product.id"
          ></management-catalog-row-item-component>
        </tbody>
      </table>
    </div>
  </div>

  <pagination-component
    :paginate="paginate"
    :loading="loading"
  ></pagination-component>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IProduct } from "@/models/product.interface";
import { IPaging, Paginate } from "@/models/paging.interface";
import { IProductDto, mapToProduct } from "@/dto/product.dto";

import ManagementCatalogRowItemComponent from "@/components/management/catalog/management-catalog-row-item.component.vue";
import LoadingComponent from "@/containers/loading/loading.component.vue";
import PaginationComponent from "@/components/pagination/pagination.component.vue";

import productApi from "@/api/product.api";

@Options({
  components: {
    ManagementCatalogRowItemComponent,
    LoadingComponent,
    PaginationComponent,
  },
})
export default class ManagementCatalogComponent extends Vue {
  public items: IProduct[] = [];
  public paginate: Paginate = {
    lastPage: 0,
    currentPage: 0,
    totalElements: 0,
  };

  public loading = false;

  created() {
    this.$watch(
      () => this.$route.params.number,
      async () => {
        await this.load();
      },
      { immediate: true }
    );
  }

  list(page = 1): Promise<IPaging<IProductDto>> {
    return productApi.getPageForManagement(page);
  }

  public async load() {
    if (this.loading) {
      return;
    }
    this.loading = true;

    let page;
    const pageNumber = Number(this.$route.params.number);

    try {
      if (pageNumber && Number.isInteger(pageNumber)) {
        page = await this.list(pageNumber);
        if (!(page.collection.length > 0)) {
          await this.$router.push("/404");
        }
      } else {
        page = await this.list();
      }
      this.items = page.collection.map((p) => mapToProduct(p));
      this.paginate = page.paginate;
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped></style>
