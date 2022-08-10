import { BehaviorSubject, ReplaySubject } from "rxjs";
import { IBasket, IBasketItem } from "@/models/basket.interface";
import basketApi from "@/api/basket.api";

export default {
  basket$: new ReplaySubject<IBasket>(),
  basketCount$: new BehaviorSubject<number>(0),
  basketItems$: new BehaviorSubject<IBasketItem[]>([]),
  isInitialize$: new BehaviorSubject<boolean>(false),
  async updateBasket() {
    console.log("updateBasket");
    const basket = await basketApi.getBasket();
    this.basket$.next(basket);
    this.basketItems$.next(basket.items);
    this.basketCount$.next(basket.totalCount);
    this.isInitialize$.next(true);
  },
};
