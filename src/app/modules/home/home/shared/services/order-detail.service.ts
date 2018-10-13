import { Injectable } from '@angular/core';
import { FoodItem } from '../model/food-item.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  orderDetails: OrderItemDetail[] = [];
  orderDetailsChanged$ = new Subject<OrderItemDetail[]>();

  constructor() { }

  addNewFoodItem(orderItemDetail: OrderItemDetail) {
    this.orderDetails.push(orderItemDetail);
    this.orderDetailsChanged$.next(this.orderDetails);
  }

  removeFoodItem(orderItemDetail: OrderItemDetail) {
    const itemIndex = this.orderDetails.findIndex((item) => item.foodItem.name === orderItemDetail.foodItem.name);
    this.orderDetails.splice(itemIndex, 1);
    this.orderDetailsChanged$.next(this.orderDetails);
    // this.orderDetails = [...this.orderDetails];
    // const itemIndex = this.orderDetails.findIndex((item) => item.foodItem.name === orderItemDetail.foodItem.name);
    // this.orderDetails.splice(itemIndex, 1, orderItemDetail);
  }

  increaseOrderCount(orderItemDetail: OrderItemDetail) {
    this.orderDetailsChanged$.next(this.orderDetails);
    // this.orderDetails = [...this.orderDetails];
    // const itemIndex = this.orderDetails.findIndex((item) => item.foodItem.name === orderItemDetail.foodItem.name);
    // this.orderDetails.splice(itemIndex, 1, orderItemDetail);
  }
  decreaseOrderCount(orderItemDetail: OrderItemDetail) {
    this.orderDetailsChanged$.next(this.orderDetails);
    // this.orderDetails = [...this.orderDetails];
    // const itemIndex = this.orderDetails.findIndex((item) => item.foodItem.name === orderItemDetail.foodItem.name);
    // this.orderDetails.splice(itemIndex, 1, orderItemDetail);
  }

  orderDetailsChanged() {
    return this.orderDetailsChanged$;
  }

  getDeliveryTime() {
    let time = 0;
    this.orderDetails.forEach((orderDetail) => {
      if (orderDetail.foodItem.preparationTime > time) {
        time = orderDetail.foodItem.preparationTime;
      }
    });

    return time;

  }
}

export class OrderItemDetail {
  foodItem: FoodItem;
  orderCount: number;
  totalAmount: number;
  constructor(foodItem: FoodItem, orderCount) {
    this.foodItem = foodItem;
    this.orderCount = orderCount;
    this.totalAmount = foodItem.price;
  }
}
