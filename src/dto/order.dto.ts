export interface IOrderCreationDto {
  basket_id: string;
  delivery_id: number;
  delivery_address: string | null;
}
