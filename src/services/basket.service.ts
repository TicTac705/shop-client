import { BehaviorSubject, Subject } from "rxjs";
import { IBasket, IBasketItem } from "@/models/basket.interface";
import basketApi from "@/api/basket.api";

export default {
  basket$: new Subject<IBasket>(),
  basketCount$: new BehaviorSubject<number>(0),
  basketItems$: new BehaviorSubject<IBasketItem[]>([]),
  async updateBasket() {
    console.log("updateBasket");
    const basket = await basketApi.getBasket();
    this.basket$.next(basket);
    this.basketItems$.next(basket.items);
    this.basketCount$.next(basket.totalCount);
  },
};
