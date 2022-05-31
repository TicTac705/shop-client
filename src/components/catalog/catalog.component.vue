<template>
  <loading-component :visible="loading"></loading-component>

  <div class="" v-if="!loading">
    <h1>{{ items.length }}</h1>

    <table>
      <catalog-row-item-component
        v-for="product in items"
        v-bind:product="product"
        :key="product.id"
      ></catalog-row-item-component>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import { IProduct } from "@/models/product.interface";
import { IPaging } from "@/models/paging.interface";

import productApi from "@/api/product.api";
import CatalogRowItemComponent from "@/components/catalog/catalog-row-item.component.vue";
import LoadingComponent from "@/components/common/loading/loading.component.vue";
import { IProductDto, mapToProduct } from "@/dto/product.dto";

@Options({
  components: { CatalogRowItemComponent, LoadingComponent },
})
export default class CatalogComponent extends Vue {
  public items: IProduct[] = [];

  public loading = false;

  created() {
    this.load();
  }

  list(): Promise<IPaging<IProductDto>> {
    return productApi.getPage();
  }

  public async load() {
    if (this.loading) {
      return;
    }
    this.loading = true;

    try {
      const page = await this.list();
      this.items = page.items.map((p) => mapToProduct(p));
    } finally {
      this.loading = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
