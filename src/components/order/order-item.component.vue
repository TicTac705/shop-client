<template>
  <div class="accordion-item">
    <h2 class="accordion-header" :id="'flush-heading' + index">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#flush-collapse' + index"
        aria-expanded="false"
        :aria-controls="'flush-collapse' + index"
      >
        Order #{{ index + 1 }}
        <span
          class="badge m-1"
          v-bind:class="getColorOrderStatus(order.orderStatusId)"
        >
          {{ getTranslateOrderStatus(order.orderStatusId) }}
        </span>
      </button>
    </h2>
    <div
      :id="'flush-collapse' + index"
      class="accordion-collapse collapse"
      :aria-labelledby="'flush-heading' + index"
      data-bs-parent="#accordionFlush"
    >
      <div class="accordion-body d-flex flex-column">
        <div class="">
          <ul class="list-group list-group-flush">
            <li class="list-group-item align-self-end">
              <button
                type="button"
                class="btn btn-warning"
                :class="{ disabled: !canRecallOrder() }"
                @click="recallOrder($event)"
              >
                Recall
              </button>
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
          </ul>
        </div>
        <hr />
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">count</th>
                <th scope="col">Price</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, key) in order.items" :key="key">
                <th scope="row">{{ key + 1 }}</th>
                <td>{{ item.product.name }}</td>
                <td>{{ item.count }}</td>
                <td>{{ toMoneyFormat(item.price) }} ₽</td>
                <td>{{ toMoneyFormat(item.price * item.count) }} ₽</td>
              </tr>
              <tr>
                <td colspan="4" class="align-right"><b>Total:</b></td>
                <td>
                  <b>{{ orderTotalSum }} ₽</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { IOrder, IOrderItem } from "@/models/order/order.interface";
import { OrderDeliveryStatusesEnum } from "@/models/order/orderDeliveryStatuses.enum";
import {
  getColorOrderStatus,
  OrderStatusesEnum,
  translateOrderStatuses,
} from "@/models/order/orderStatuses.enum";
import { translateDelivery } from "@/models/order/orderDeliveryStatuses.enum";
import {
  OrderPaymentStatusesEnum,
  translatePaymentStatus,
} from "@/models/order/order-payment-statuses.enum";
import orderService from "@/services/order.service";
import userService from "@/services/user.service";
import NumberMapper from "@/components/mappers/number.mapper";

export default class OrderItemComponent extends Vue {
  @Prop() public order: IOrder;
  @Prop() public index: number;
  public deliveryStatuses = OrderDeliveryStatusesEnum;
  public orderTotalSum: string;

  created() {
    this.orderTotalSum = this.calculateOrderTotalSum(this.order.items);
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

  calculateOrderTotalSum(items: IOrderItem[]): string {
    let sum = 0;
    items.forEach((value) => {
      sum += value.price * value.count;
    });

    return this.toMoneyFormat(sum);
  }

  public toMoneyFormat(number: number): string {
    return NumberMapper.toMoneyFormat(number);
  }

  public recallOrder() {
    this.$emit("recallOrder", this.order);
  }

  canRecallOrder(): boolean {
    if (orderService.isCreator(this.order.userId) || userService.isManager()) {
      if (this.order.orderStatusId === OrderStatusesEnum.CANCELED) {
        return false;
      }

      if (
        this.order.orderStatusId !== OrderStatusesEnum.PROCESSING &&
        this.order.orderStatusId !== OrderStatusesEnum.ASSEMBLY
      ) {
        return false;
      }

      return this.order.paymentStatusId === OrderPaymentStatusesEnum.NOT_PAID;
    }

    return false;
  }
}
</script>

<style lang="scss" scoped>
.list-group-item {
  text-align: left;
}

.align-right {
  text-align: right;
}
</style>
