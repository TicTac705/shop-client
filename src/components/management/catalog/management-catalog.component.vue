<template>
  <div class="mt-5 mb-5" v-if="loading">
    <loading-component :visible="loading"></loading-component>
  </div>

  <div class="container" v-if="!loading">
    <div class="alert alert-secondary m-5" role="alert" v-if="items.length < 1">
      Empty
    </div>

    <div
      class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 justify-content-center"
    >
      <table class="table table-bordered table-hover" v-if="items.length > 0">
        <thead>
          <tr>
            <th scope="col">
              <input
                type="checkbox"
                class="form-check-input"
                id="allToDestroy"
                v-model="addAllItems"
                @change="addAllToDestroy"
              />
            </th>
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
            :product="product"
            :modalProductEditingId="modalProductEditingId"
            :key="product.id"
            :itemIdsToDestroy="itemIdsToDestroy"
            @destroy="destroy(product)"
            @edit="edit(product)"
            @addToDestroy="addToDestroy(product.id)"
          ></management-catalog-row-item-component>
        </tbody>
      </table>
    </div>
  </div>

  <pagination-component
    :paginate="paginate"
    :loading="loading"
    :routeName="'managementCatalogPagination'"
  ></pagination-component>

  <main-modal-component
    :id="modalProductEditingId"
    :modalTitle="'Product Editing'"
    :secondButtonTile="'Save changes'"
    @secondButtonAction="saveChanges"
  ></main-modal-component>

  <div
    class="position-fixed btn-delete-fixed"
    v-if="itemIdsToDestroy.length > 0"
  >
    <button
      type="button"
      class="btn btn-danger"
      @click="destroySelectedItems()"
    >
      Delete {{ itemIdsToDestroy.length }} items
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IProduct } from "@/models/product.interface";
import { IPaging, Paginate } from "@/models/paging.interface";
import { IProductDto, mapToProduct } from "@/dto/product.dto";
import { notify } from "@kyvg/vue3-notification";

import ManagementCatalogRowItemComponent from "@/components/management/catalog/management-catalog-row-item.component.vue";
import LoadingComponent from "@/containers/loading/loading.component.vue";
import PaginationComponent from "@/components/pagination/pagination.component.vue";
import MainModalComponent from "@/components/modal/main-modal.component.vue";

import productApi from "@/api/product.api";

@Options({
  components: {
    MainModalComponent,
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

  public modalProductEditingId = "editProduct";
  public editableProduct: IProduct | null = null;

  public itemIdsToDestroy: string[] = [];
  public addAllItems = false;

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

  public destroy($event: any) {
    this.addAllItems = false;
    this.itemIdsToDestroy = [];
    if (confirm("Are you sure you want to delete the product?")) {
      const indexItem = this.items.indexOf($event);
      const items = this.items;

      productApi
        .destroy($event.id)
        .then(function (response: any) {
          notify({
            text: response.message ?? "Request completed successfully",
            type: "success",
          });
          items.splice(indexItem, 1);
        })
        .catch(function (error: any) {
          const response = error.response.data;
          notify({
            text: response.message ?? "Error in query execution",
            type: "error",
          });
        });

      if (this.items.length < 1) {
        this.load();
      }
      return true;
    }

    return false;
  }

  public addAllToDestroy() {
    if (this.addAllItems) {
      this.itemIdsToDestroy = this.items.map((p) => p.id);
    } else {
      this.itemIdsToDestroy = [];
    }
  }

  public addToDestroy(id: string) {
    const index = this.itemIdsToDestroy.indexOf(id);
    if (index >= 0) {
      this.itemIdsToDestroy.splice(index, 1);
      this.addAllItems = false;
    } else {
      this.itemIdsToDestroy.push(id);

      if (this.items.length === this.itemIdsToDestroy.length) {
        this.addAllItems = true;
      }
    }
  }

  public edit($event: any) {
    this.editableProduct = $event;
  }

  public destroySelectedItems() {
    const items = this.items;
    const itemIdsToDestroy = this.itemIdsToDestroy;
    if (
      confirm(
        "Are you sure you want to delete the " +
          this.itemIdsToDestroy.length +
          " items?"
      )
    ) {
      productApi
        .destroyMany(this.itemIdsToDestroy)
        .then(function (response: any) {
          notify({
            text: response.message ?? "Request completed successfully",
            type: "success",
          });
          itemIdsToDestroy.forEach((value: string) => {
            let product = items.find((item) => item.id === value);
            if (product) {
              items.splice(items.indexOf(product), 1);
            }
          });
        })
        .catch(function (error: any) {
          const response = error.response.data;
          let result: string[] = [];
          if (response.data.length > 0) {
            response.data.forEach((value: string) => {
              let productName = items.find((item) => item.id === value)?.name;
              if (productName) {
                result.push(productName);
              }
            });
          }
          notify({
            text: `${response.message ?? "Error in query execution"}<br />${
              result.length > 0 ? result.join("<br />") : ""
            }`,
            type: "error",
          });
        });
    }

    this.addAllItems = false;
    this.itemIdsToDestroy = [];
  }

  public saveChanges() {
    console.log(this.editableProduct?.name);
  }
}
</script>

<style lang="scss" scoped>
.btn-delete-fixed {
  bottom: 30px;
}
</style>
