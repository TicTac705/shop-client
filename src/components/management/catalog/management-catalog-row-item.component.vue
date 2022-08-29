<template>
  <tr
    class="align-middle"
    :class="{
      'bg-warning': !product.isActive,
    }"
  >
    <td>
      <input
        type="checkbox"
        class="form-check-input"
        :value="product.id"
        v-model="itemIdsToDestroyLocal"
        @change="addToDestroy()"
      />
    </td>
    <td class="productImage">
      <img
        v-if="product.images.length"
        :src="product.images[0]['src']"
        class="mx-auto d-block"
        :alt="product.name"
        height="50"
      />
      <img
        v-if="!product.images.length"
        src="@/assets/no-image.jpg"
        class="mx-auto d-block"
        :alt="product.name"
        height="50"
      />
    </td>

    <td class="productTitle">
      {{ product.name }}
    </td>

    <td>
      {{ product.store }}
    </td>

    <td class="productPrice">{{ toMoneyFormat(product.price) }} ₽</td>

    <td>
      <div class="w-100 d-flex gap-1 justify-content-center">
        <button
          type="button"
          class="btn btn-sm btn-outline-primary"
          data-bs-toggle="modal"
          :data-bs-target="'#' + modalProductEditingId"
          @click="edit($event)"
        >
          Edit
        </button>
        <button
          type="button"
          class="btn btn-sm btn-outline-danger"
          v-on:click="destroy($event)"
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { IProduct } from "@/models/product.interface";

import NumberMapper from "@/components/mappers/number.mapper";

@Options({})
export default class ManagementCatalogRowItemComponent extends Vue {
  @Prop() public product!: IProduct;
  @Prop() public modalProductEditingId: string;
  @Prop() public itemIdsToDestroy: string[];

  public itemIdsToDestroyLocal: string[];

  created() {
    this.itemIdsToDestroyLocal = this.itemIdsToDestroy;

    this.$watch(
      () => this.itemIdsToDestroy,
      async () => {
        this.itemIdsToDestroyLocal = this.itemIdsToDestroy;
      },
      { immediate: true }
    );
  }

  public toMoneyFormat(number: number): string {
    return NumberMapper.toMoneyFormat(number);
  }

  public destroy() {
    this.$emit("destroy", this.product);
  }

  public edit() {
    this.$emit("edit", this.product);
  }

  public addToDestroy() {
    this.$emit("addToDestroy", this.product.id);
  }
}
</script>

<style lang="scss" scoped>
.bg-warning {
  background-color: rgb(192, 192, 192) !important;
}
</style>
