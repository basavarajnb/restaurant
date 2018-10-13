import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ControlsModule } from 'src/app/shared/controls/controls.module';
import { FoodItemsComponent } from './home/food-items/food-items.component';
import { FoodItemCardComponent } from './home/food-items/food-item-card/food-item-card.component';
import { OrderSummaryComponent } from './home/order-summary/order-summary.component';
import { OrderedItemComponent } from './home/order-summary/ordered-item/ordered-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ControlsModule
  ],
  declarations: [HomeComponent, FoodItemsComponent, FoodItemCardComponent, OrderSummaryComponent, OrderedItemComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
