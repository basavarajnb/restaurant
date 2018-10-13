import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { OrderDetailService, OrderItemDetail } from '../shared/services/order-detail.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  @ViewChild('orderSummary', { read: ElementRef }) orderSummary: ElementRef;

  orderDetails: OrderItemDetail[];
  totalValue = 0;

  offsetTop;


  constructor(public orderDetailService: OrderDetailService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.orderDetailService.orderDetailsChanged().subscribe((orderDetails) => {
      if (orderDetails) {
        this.orderDetails = [...orderDetails];
        this.setTotalValue();
      }
    });

    this.scrollInitialize();
  }
  setTotalValue() {
    this.totalValue = 0;
    this.orderDetails.forEach((orderDetail) => {
      this.totalValue = this.totalValue + orderDetail.totalAmount;
    });
  }

  confirmOrderClicked() {
    const deliveryTime = this.orderDetailService.getDeliveryTime() + ' minutes.';
    this.openSnackBar('Order Confirmed. Items will be delivered in ' + deliveryTime);
    this.closeOverlay();
    this.orderDetailService.orderDetails = [];
    this.orderDetailService.orderDetailsChanged$.next([]);
  }

  viewOrderDetailClicked() {
    this.orderSummary.nativeElement.classList.remove('d-none');
    this.orderSummary.nativeElement.classList.add('overlay-popup');
  }

  openSnackBar(message) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }

  overlayCloseClicked() {
    this.closeOverlay();
  }

  closeOverlay() {
    this.orderSummary.nativeElement.classList.add('d-none');
    this.orderSummary.nativeElement.classList.remove('overlay-popup');
  }

  trackByFn(index, item: OrderItemDetail) {
    return item.orderCount;
  }
  scrollInitialize() {
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    if (window.pageYOffset > this.orderSummary.nativeElement.offsetTop) {
      this.orderSummary.nativeElement.classList.add('sticky');
    } else {
      this.orderSummary.nativeElement.classList.remove('sticky');
    }
  }
}

