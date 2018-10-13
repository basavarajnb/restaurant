import { Component, OnInit, Input } from '@angular/core';
import { FoodItem } from '../../shared/model/food-item.model';
import { OrderDetailService, OrderItemDetail } from '../../shared/services/order-detail.service';

@Component({
  selector: 'app-food-item-card',
  templateUrl: './food-item-card.component.html',
  styleUrls: ['./food-item-card.component.scss']
})
export class FoodItemCardComponent implements OnInit {
  @Input() foodItem: FoodItem;

  showAdd = true;

  orderItemDetail: OrderItemDetail;
  constructor(private orderDetailService: OrderDetailService) { }

  ngOnInit() {
  }

  addClicked() {
    this.showAdd = false;
    if (this.orderItemDetail) {
      this.orderItemDetail.orderCount = 1;
      this.orderItemDetail.totalAmount = this.orderItemDetail.foodItem.price;
    } else {
      this.orderItemDetail = new OrderItemDetail(this.foodItem, 1);
    }
    this.orderDetailService.addNewFoodItem(this.orderItemDetail);
  }

  increaseCount() {
    this.orderItemDetail.orderCount = this.orderItemDetail.orderCount + 1;
    this.orderItemDetail.totalAmount = this.orderItemDetail.foodItem.price * this.orderItemDetail.orderCount;
    this.orderDetailService.increaseOrderCount(this.orderItemDetail);
  }

  decreaseCount() {
    this.orderItemDetail.orderCount = this.orderItemDetail.orderCount - 1;
    this.orderItemDetail.totalAmount = this.orderItemDetail.foodItem.price * this.orderItemDetail.orderCount;
    if (this.orderItemDetail.orderCount === 0) {
      this.showAdd = true;
      this.orderDetailService.removeFoodItem(this.orderItemDetail);
    } else {
      this.orderDetailService.decreaseOrderCount(this.orderItemDetail);
    }
  }
}
