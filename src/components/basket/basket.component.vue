<template>
  <header-component></header-component>

  <loading-component :visible="loading"></loading-component>

  <div class="mx-2" v-if="!loading">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Count</th>
          <th scope="col">Price</th>
          <th scope="col">Sum</th>
        </tr>
      </thead>
      <tbody>
        <basket-row-item-component
          v-for="item in basketItems"
          v-bind:basket-item="item"
          :key="item.id"
          @deleteItem="onItemDelete(item)"
          @incItem="incItem(item)"
          @decItem="decItem(item)"
        ></basket-row-item-component>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import HeaderComponent from "@/components/common/header.component.vue";

import { IBasket, IBasketItem } from "@/models/basket.interface";
import basketApi from "@/api/basket.api";
import basketService from "@/services/basket.service";
import BasketRowItemComponent from "@/components/basket/basket-row-item.component.vue";
import LoadingComponent from "@/containers/loading/loading.component.vue";

@Options({
  components: {
    BasketComponent,
    HeaderComponent,
    BasketRowItemComponent,
    LoadingComponent,
  },
})
export default class BasketComponent extends Vue {
  public basket: IBasket;

  public basketItems: IBasketItem[] = [];

  public loading = false;

  async created() {
    basketService.basket$.subscribe((basket) => {
      this.basket = basket;
    });

    basketService.basketItems$.subscribe((basketItems) => {
      this.basketItems = basketItems;
    });
  }

  public async load() {
    this.loading = true;

    try {
      await basketService.updateBasket();
      // this.basket = await basketApi.getBasket();
      // this.basketItems = this.basket.items;
    } finally {
      this.loading = false;
    }
  }

  async onItemDelete($event: any) {
    await basketApi.delete($event.product.id).then(async () => {
      this.basket = await basketApi.getBasket();
      this.basketItems = this.basket.items;
    });
  }

  async incItem($event: any) {
    const count = $event.count + 1;
    await this._changeQuantity($event.product.id, count);
  }

  async decItem($event: any) {
    const count = $event.count > 0 ? $event.count - 1 : 0;
    await this._changeQuantity($event.product.id, count);
  }

  async _changeQuantity(product_id: number, count: number) {
    if (count === 0) {
      await basketApi.delete(product_id).then(async () => {
        this.load();
      });
      return;
    }

    await basketApi
      .update({ product_id: product_id, quantity: count })
      .then(async () => {
        this.basket = await basketApi.getBasket();
        this.basketItems = this.basket.items;
      });
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
