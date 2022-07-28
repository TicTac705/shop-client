<template>
  <tr id="product">
    <td>
      {{ basketItem.product.id }}
    </td>

    <td class="productImage">
      <img
        v-if="basketItem.product.images.length"
        class="mx-auto d-block"
        :src="product.images[0]"
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

    <td class="productPrice">{{ basketItem.product.price }} RUB</td>

    <td>{{ basketItem.count * basketItem.product.price }} RUB</td>
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
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { IBasketItem } from "@/models/basket.interface";
import HeaderComponent from "@/components/common/header.component.vue";
import LoadingComponent from "@/containers/loading/loading.component.vue";
import BasketComponent from "@/components/basket/basket.component.vue";

@Options({
  components: {
    BasketRowItemComponent,
  },
})
export default class BasketRowItemComponent extends Vue {
  @Prop() public basketItem!: IBasketItem;

  // emits: ["deleteItem", "incItem", "decItem"];

  public deleteItem() {
    this.$emit("deleteItem", this.basketItem);
  }

  public incItem() {
    this.$emit("incItem", this.basketItem);
  }

  public decItem() {
    this.$emit("decItem", this.basketItem);
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
