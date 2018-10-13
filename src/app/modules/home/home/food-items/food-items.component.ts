import { Component, OnInit, Input } from '@angular/core';
import { CardItem } from 'src/app/shared/controls/card/card.component';
import { FoodItem } from '../shared/model/food-item.model';

@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  styleUrls: ['./food-items.component.scss']
})
export class FoodItemsComponent implements OnInit {
  @Input() foodItems: Array<FoodItem>;

  constructor() { }

  ngOnInit() {
  }

}
