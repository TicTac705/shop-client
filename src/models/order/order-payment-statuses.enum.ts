export enum OrderPaymentStatusesEnum {
  NOT_PAID = 1,
  PARTIALLY_PAID = 2,
  PAID = 3,
}

export function translatePaymentStatus(
  status: OrderPaymentStatusesEnum
): string {
  switch (status) {
    case OrderPaymentStatusesEnum.NOT_PAID:
      return "Not paid";
    case OrderPaymentStatusesEnum.PARTIALLY_PAID:
      return "Partially paid";
    case OrderPaymentStatusesEnum.PAID:
      return "Paid";
    default:
      return "Unknown status";
  }
}
