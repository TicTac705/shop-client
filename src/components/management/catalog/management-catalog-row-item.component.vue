<template>
  <tr id="product">
    <td class="productImage">
      <img
        v-if="basketItem.product.images.length"
        class="mx-auto d-block"
        :src="basketItem.product.images[0]['src']"
        alt="photo"
        height="50"
      />
      <img
        v-if="!basketItem.product.images.length"
        class="mx-auto d-block"
        src="@/assets/no-image.jpg"
        alt="photo"
        height="50"
      />
    </td>

    <td class="productTitle">
      {{ basketItem.product.name }}
    </td>

    <td>
      {{ basketItem.count }}
    </td>

    <td class="productPrice">
      {{ toMoneyFormat(basketItem.product.price) }} ₽
    </td>

    <td>{{ toMoneyFormat(basketItem.count * basketItem.product.price) }} ₽</td>
    <td>
      <div class="w-100 d-flex gap-1 justify-content-center">
        <button
          type="button"
          class="btn btn-primary"
          v-on:click="deleteItem($event)"
        >
          Delete
        </button>
        <button
          type="button"
          class="btn btn-primary"
          v-on:click="incItem($event)"
        >
          +
        </button>
        <button
          type="button"
          class="btn btn-primary"
          v-on:click="decItem($event)"
        >
          -
        </button>
      </div>
    </td>
  </tr>
  <div class="card shadow-sm pt-1" style="width: 18rem" id="{{ product.id }}">
    <img
      v-if="product.images.length"
      :src="product.images[0]['src']"
      class="card-img-top"
      :alt="product.name"
    />
    <img
      v-if="!product.images.length"
      src="@/assets/no-image.jpg"
      class="card-img-top"
      :alt="product.name"
    />

    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <ul class="list-group-horizontal-lg justify-content-center small">
        <li
          v-for="category in product.categories"
          :key="category.id"
          class="list-group-item m-0 font-monospace"
        >
          {{ category.name }}
        </li>
      </ul>
      <hr />
      <!--      <p class="card-text">{{ product.description }}</p>-->
      <div
        class="d-flex justify-content-between align-items-center"
        v-if="product.store > 0"
      >
        <small class="text-muted"> {{ toMoneyFormat(product.price) }} ₽ </small>
      </div>
      <div
        class="d-flex justify-content-center align-items-center"
        v-if="product.store < 1"
      >
        <span class="text-info">Not available</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { IProduct } from "@/models/product.interface";

import NumberMapper from "@/components/mappers/number.mapper";

@Options({})
export default class ManagementCatalogRowItemComponent extends Vue {
  @Prop() public product!: IProduct;

  public toMoneyFormat(number: number): string {
    return NumberMapper.toMoneyFormat(number);
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
