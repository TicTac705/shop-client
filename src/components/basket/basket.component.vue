<template>
  <loading-component :visible="loading"></loading-component>

  <div
    class="alert alert-secondary m-5"
    role="alert"
    v-if="basketItems.length < 1"
  >
    Your basket is empty
  </div>

  <div class="container-fluid" v-if="!loading">
    <div class="row" v-if="basketItems.length > 0">
      <div class="col-9">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Count</th>
              <th scope="col">Price</th>
              <th scope="col">Sum</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <basket-row-item-component
              v-for="(item, index) in basketItems"
              v-bind:basket-item="item"
              :key="index"
              @deleteItem="onItemDelete(item)"
              @incItem="incItem(item)"
              @decItem="decItem(item)"
            ></basket-row-item-component>
          </tbody>
        </table>
      </div>
      <div class="col-3 p-1">
        <order-creation-form-component
          :basket="basket"
        ></order-creation-form-component>

        <div class="alert alert-info mt-2" role="alert">
          <span class="fw-bold">Total:</span> {{ totalPrice }} ₽
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import { IBasket, IBasketItem } from "@/models/basket.interface";
import basketApi from "@/api/basket.api";
import basketService from "@/services/basket.service";
import NumberMapper from "@/components/mappers/number.mapper";
import BasketRowItemComponent from "@/components/basket/basket-row-item.component.vue";
import LoadingComponent from "@/containers/loading/loading.component.vue";
import OrderCreationFormComponent from "@/components/order/order-creation-form.component.vue";

@Options({
  components: {
    BasketComponent,
    BasketRowItemComponent,
    LoadingComponent,
    OrderCreationFormComponent,
  },
})
export default class BasketComponent extends Vue {
  public basket: IBasket;

  public basketItems: IBasketItem[] = [];

  public totalPrice = "0";

  public loading = false;

  async created() {
    basketService.basket$.subscribe((basket) => {
      this.basket = basket;
    });

    basketService.basketItems$.subscribe((basketItems) => {
      this.basketItems = basketItems;
    });

    if (!basketService.isInitialize$.value) {
      await basketService.updateBasket();
    }

    this.totalPrice = this.calculateTotalPrice();
  }

  async onItemDelete($event: any) {
    await basketApi.delete($event.product.id).then(async () => {
      this.basket = await basketApi.getBasket();
      this.basketItems = this.basket.items;
      this.totalPrice = this.calculateTotalPrice();
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
        await basketService.updateBasket();
      });
      return;
    }

    await basketApi
      .update({ product_id: product_id, quantity: count })
      .then(async () => {
        this.basket = await basketApi.getBasket();
        this.basketItems = this.basket.items;
        this.totalPrice = this.calculateTotalPrice();
      });
  }

  public calculateTotalPrice(): string {
    let result = 0;

    this.basketItems.forEach((value) => {
      result += value.product.price * value.count;
    });

    return NumberMapper.toMoneyFormat(result);
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
