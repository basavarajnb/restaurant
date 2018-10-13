import { Component, OnInit, Input } from '@angular/core';
import { OrderItemDetail } from '../../shared/services/order-detail.service';

@Component({
  selector: 'app-ordered-item',
  templateUrl: './ordered-item.component.html',
  styleUrls: ['./ordered-item.component.scss']
})
export class OrderedItemComponent implements OnInit {

  @Input() set orderedItem(value: OrderItemDetail) {
    if (value) {
      this.setValues(value);
    }
  }

  itemName = '';
  orderCount = 0;
  itemTotalAmount = 0;

  constructor() { }

  ngOnInit() {
  }

  setValues(orderItemDetail: OrderItemDetail) {
    this.itemName = orderItemDetail.foodItem.name;
    this.orderCount = orderItemDetail.orderCount;
    this.itemTotalAmount = orderItemDetail.foodItem.price * orderItemDetail.orderCount;
  }
}
