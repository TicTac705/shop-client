<template>
  <tr id="product">
    <td>
      {{ product.id }}
    </td>

    <td class="productImage">
      <img
        v-if="product.images.length"
        class="mx-auto d-block"
        :src="product.images[0]"
        alt="photo"
        height="50"
      />
      <img
        v-if="!product.images.length"
        class="mx-auto d-block"
        src="@/assets/no-image.jpg"
        alt="photo"
        height="50pt"
      />
    </td>

    <td class="productTitle">
      {{ product.title }}
    </td>
    <td>
      <span v-for="cat in product.categories" v-bind:key="cat.code">
        {{ cat.title }}</span
      >
    </td>
    <td class="productPrice">{{ product.price }} RUB</td>
    <td>
      <button class="btn btn-primary" v-on:click="addToCart($event)">
        Add to cart
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { IProduct } from "@/models/product.interface";

@Options({})
export default class CatalogRowItemComponent extends Vue {
  @Prop() public product!: IProduct;

  addToCart() {
    console.log("click addToCart ", this.product.title);
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
