<template>
  <h5>Order</h5>
  <form @submit.prevent="submit">
    <select
      class="form-select"
      name="delivery"
      id="delivery"
      v-model="delivery"
      @change="delivery_address = null"
    >
      <option v-for="type in deliveryTypesInt" :value="type" :key="type">
        {{ translateDelivery(type) }}
      </option>
    </select>
    <br />
    <input
      class="form-control"
      type="text"
      placeholder="Delivery address"
      aria-label="Delivery address"
      v-model="delivery_address"
      v-if="delivery === deliveryTypes.CourierDelivery"
      required
    />
    <br v-if="delivery === deliveryTypes.CourierDelivery" />
    <button :disabled="loading" type="submit" class="btn btn-wide btn-primary">
      <span v-if="!loading"> Place order </span>
      <loading-component :visible="loading"></loading-component>
    </button>
  </form>

  <div class="text-center alert alert-danger mt-2" v-if="error.length > 0">
    {{ error }}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import LoadingComponent from "@/containers/loading/loading.component.vue";
import { OrderDeliveryStatusesEnum } from "@/models/order/orderDeliveryStatuses.enum";
import { IBasket } from "@/models/basket.interface";
import orderApi from "@/api/order.api";
import basketService from "@/services/basket.service";
import { translateDelivery } from "@/models/order/orderDeliveryStatuses.enum";

@Options({
  components: {
    OrderCreationFormComponent,
    LoadingComponent,
  },
})
export default class OrderCreationFormComponent extends Vue {
  @Prop() public basket: IBasket;

  public loading = false;

  public deliveryTypes = OrderDeliveryStatusesEnum;
  public deliveryTypesInt = Object.values(this.deliveryTypes).filter(
    (x) => !isNaN(Number(x))
  );

  public delivery = null;
  public delivery_address = null;

  public error = "";

  public translateDelivery(number: string): string {
    return translateDelivery(Number(number));
  }

  public submit() {
    this.createOrder();
  }

  public async createOrder() {
    this.loading = true;
    this.error = "";

    let delivery_id = this.delivery;
    let delivery_address = this.delivery_address;
    let basket_id = this.basket.id;

    if (!delivery_id) {
      this.loading = false;
      this.error = "Choose a shipping method";
      return;
    }

    await orderApi
      .create({
        basket_id,
        delivery_id,
        delivery_address,
      })
      .then(async () => {
        await basketService.updateBasket();
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.error = err.response.data.message;
      });
  }
}
</script>

<style lang="scss" scoped></style>
