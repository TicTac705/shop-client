export enum OrderDeliveryStatusesEnum {
  Pickup = 1,
  CourierDelivery = 2,
}

export function translateDelivery(delivery: OrderDeliveryStatusesEnum): string {
  switch (delivery) {
    case OrderDeliveryStatusesEnum.Pickup:
      return "Pickup";
    case OrderDeliveryStatusesEnum.CourierDelivery:
      return "Courier delivery";
    default:
      return "Unknown delivery";
  }
}
