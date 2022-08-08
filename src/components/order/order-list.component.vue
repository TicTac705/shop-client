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
    <div v-for="(order, key) in orders" :key="key" class="accordion-item">
      <h2 class="accordion-header" :id="'flush-heading' + key">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#flush-collapse' + key"
          aria-expanded="false"
          :aria-controls="'flush-collapse' + key"
        >
          Order #{{ key + 1 }}
          <span
            class="badge m-1"
            v-bind:class="getColorOrderStatus(order.orderStatusId)"
          >
            {{ getTranslateOrderStatus(order.orderStatusId) }}
          </span>
        </button>
      </h2>
      <div
        :id="'flush-collapse' + key"
        class="accordion-collapse collapse"
        :aria-labelledby="'flush-heading' + key"
        data-bs-parent="#accordionFlush"
      >
        <div class="accordion-body d-flex flex-column">
          <div class="">
            <ul class="list-group list-group-flush">
              <li class="list-group-item align-self-end">
                <button type="button" class="btn btn-warning">Recall</button>
              </li>
              <li class="list-group-item">
                <b>Customer:</b> {{ order.userName }} | {{ order.userEmail }}
              </li>
              <li class="list-group-item">
                <b>Payment status:</b>
                {{ getTranslatePaymentStatus(order.paymentStatusId) }}
              </li>
              <li class="list-group-item">
                <b>Delivery:</b> {{ getTranslateDelivery(order.deliveryId) }}
              </li>
              <li
                class="list-group-item"
                v-if="order.deliveryId === deliveryStatuses.CourierDelivery"
              >
                <b>Delivery address:</b> {{ order.deliveryAddress }}
              </li>
              <li class="list-group-item"><b>Total cost:</b></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import HeaderComponent from "@/components/common/header.component.vue";

import LoadingComponent from "@/containers/loading/loading.component.vue";
import { IOrder } from "@/models/order/order.interface";
import { OrderDeliveryStatusesEnum } from "@/models/order/orderDeliveryStatuses.enum";
import orderApi from "@/api/order.api";
import {
  getColorOrderStatus,
  translateOrderStatuses,
} from "@/models/order/orderStatuses.enum";
import { translateDelivery } from "@/models/order/orderDeliveryStatuses.enum";
import { translatePaymentStatus } from "@/models/order/order-payment-statuses.enum";

@Options({
  components: {
    HeaderComponent,
    LoadingComponent,
  },
})
export default class OrderListComponent extends Vue {
  public orders: IOrder[] = [];
  public deliveryStatuses = OrderDeliveryStatusesEnum;
  public loading = false;

  created() {
    this.load();
  }

  list(): Promise<IOrder[]> {
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

  getTranslateOrderStatus($status: number): string {
    return translateOrderStatuses($status);
  }

  getColorOrderStatus($status: number): string | null {
    return getColorOrderStatus($status);
  }

  getTranslateDelivery($delivery: number): string {
    return translateDelivery($delivery);
  }

  getTranslatePaymentStatus($status: number): string {
    return translatePaymentStatus($status);
  }
}
</script>

<style lang="scss" scoped>
.list-group-item {
  text-align: left;
}
</style>
