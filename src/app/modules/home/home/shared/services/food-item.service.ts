import { Injectable } from '@angular/core';
import { FoodItem } from '../model/food-item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {
  foodItems: Array<FoodItem> = [];

  constructor(private httpClient: HttpClient) { }

  getAllFoodItems() {
    return this.httpClient.get('assets/jsons/food-item-list.json');
  }

  getAllTags() {
    return this.httpClient.get('assets/jsons/tags.json');
  }
}
