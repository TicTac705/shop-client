export enum OrderStatusesEnum {
  PROCESSING = 1,
  ASSEMBLY = 2,
  SENDING = 3,
  DELIVERY = 4,
  DELIVERED = 5,
  COMPLETED = 6,
  CANCELED = 7,
}

export function translateOrderStatuses(status: OrderStatusesEnum): string {
  switch (status) {
    case OrderStatusesEnum.PROCESSING:
      return "Processing";
    case OrderStatusesEnum.ASSEMBLY:
      return "Assembly";
    case OrderStatusesEnum.SENDING:
      return "Sending";
    case OrderStatusesEnum.DELIVERY:
      return "Delivery";
    case OrderStatusesEnum.DELIVERED:
      return "Delivered";
    case OrderStatusesEnum.COMPLETED:
      return "Completed";
    case OrderStatusesEnum.CANCELED:
      return "Canceled";
    default:
      return "Unknown status";
  }
}

export function getColorOrderStatus(status: OrderStatusesEnum): string | null {
  switch (status) {
    case OrderStatusesEnum.PROCESSING:
      return "bg-secondary";
    case OrderStatusesEnum.ASSEMBLY:
      return "bg-primary";
    case OrderStatusesEnum.SENDING:
    case OrderStatusesEnum.DELIVERY:
      return "bg-info text-dark";
    case OrderStatusesEnum.DELIVERED:
      return "bg-warning text-dark";
    case OrderStatusesEnum.COMPLETED:
      return "bg-success";
    case OrderStatusesEnum.CANCELED:
      return "bg-danger";
    default:
      return null;
  }
}
