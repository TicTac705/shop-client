<template>
  <header-component></header-component>

  <div class="mt-5" v-if="loading">
    <loading-component :visible="loading"></loading-component>
  </div>

  <div
    class="alert alert-secondary m-5"
    role="alert"
    v-if="!loading && orders.length < 1"
  >
    You have no orders
  </div>

  <div
    class="accordion accordion-flush container mt-2"
    id="accordionFlush"
    v-if="!loading && orders.length > 0"
  >
    <order-item-component
      v-for="(order, index) in orders"
      v-bind:order="order"
      v-bind:index="index"
      :key="order.id"
      @recallOrder="recallOrder(order)"
    ></order-item-component>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import HeaderComponent from "@/components/common/header.component.vue";

import LoadingComponent from "@/containers/loading/loading.component.vue";
import { IOrder } from "@/models/order/order.interface";
import orderApi from "@/api/order.api";
import OrderItemComponent from "@/components/order/order-item.component.vue";
import basketService from "@/services/basket.service";

@Options({
  components: {
    OrderItemComponent,
    HeaderComponent,
    LoadingComponent,
  },
})
export default class OrderListComponent extends Vue {
  public orders: IOrder[] = [];
  public loading = false;

  created() {
    this.load();
  }

  async list(): Promise<IOrder[]> {
    await basketService.updateBasket();
    return orderApi.getList();
  }

  public async load() {
    if (this.loading) {
      return;
    }
    this.loading = true;

    try {
      this.orders = await this.list();
    } finally {
      this.loading = false;
    }
  }

  recallOrder($event: any) {
    orderApi.recall($event.id);
    this.load();
  }
}
</script>

<style lang="scss" scoped></style>
