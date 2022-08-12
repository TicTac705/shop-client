<template>
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
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-sm btn-outline-primary"
            :class="{ disabled: product.store < 1 }"
            v-on:click="addToCart($event)"
          >
            Add to cart
          </button>
        </div>
        <small class="text-muted"> {{ product.price }} ₽ </small>
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

@Options({})
export default class CatalogRowItemComponent extends Vue {
  @Prop() public product!: IProduct;

  addToCart() {
    this.$emit("addToBasket", this.product.id);
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
