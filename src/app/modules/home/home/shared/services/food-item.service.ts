import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { FoodItem } from '../model/food-item.model';
import { UrlConstants } from 'src/app/shared/constants/url.constants';
import { ApiResponse } from '../model/api.model';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {
  foodItems: Array<FoodItem> = [];

  constructor(private httpClient: HttpClient) { }

  getAllFoodItems() {
    return this.httpClient.get(UrlConstants.getAllFoodItems).pipe(map((response: ApiResponse) => {
      if (response && response.data) {
        return response.data;
      }
      return [];
    }));
  }

  getAllTags() {
    return this.httpClient.get(UrlConstants.getAllTags).pipe(map((response: ApiResponse) => {
      if (response && response.data) {
        return response.data;
      }
      return [];
    }));
  }
}
