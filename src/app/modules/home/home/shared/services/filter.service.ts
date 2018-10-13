import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { FoodItem } from '../model/food-item.model';
import { UrlConstants } from 'src/app/shared/constants/url.constants';
import { ApiResponse } from '../model/api.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private httpClient: HttpClient) { }

  getFilterConfig() {
    return this.httpClient.get(UrlConstants.getFilterConfig).pipe(map((response: ApiResponse) => {
      if (response && response.data) {
        return response.data;
      }
      return [];
    }));
  }

  filter(foodItems: Array<FoodItem>, filterConfigs: FilterConfig[]) {
    return foodItems.filter((foodItem) => {
      let filterConfig = filterConfigs.find(x => x.key === FilterConfigType.dietPreference);
      const dietPreferences: KeyValue[] =
        filterConfig.filters.filter((x: KeyValue) => x.value === true);
      if (dietPreferences.length > 0 && !this.filterDiet(foodItem, dietPreferences)) {
        return false;
      }

      filterConfig = filterConfigs.find(x => x.key === FilterConfigType.category);
      const categoryConfigs: KeyValue[] = filterConfig.filters.filter((x: KeyValue) => x.value === true);
      if (categoryConfigs.length > 0 && !this.filterCategory(foodItem, categoryConfigs)) {
        return false;
      }

      filterConfig = filterConfigs.find(x => x.key === FilterConfigType.price);
      const priceConfigs: ValueRange[] = filterConfig.filters.filter((x: ValueRange) => x.value === true);
      if (priceConfigs.length > 0 && !this.filterPrice(foodItem, priceConfigs)) {
        return false;
      }

      filterConfig = filterConfigs.find(x => x.key === FilterConfigType.rating);
      const ratingConfigs: ValueRange[] = filterConfig.filters.filter((x: KeyValue) => x.value === true);
      if (ratingConfigs.length > 0 && !this.filterRating(foodItem, ratingConfigs)) {
        return false;
      }
      return true;
    });
  }

  filterRating(foodItem: FoodItem, ratingConfigs: ValueRange[]) {
    let found = false;
    ratingConfigs.forEach((ratingConfig) => {
      if (foodItem.rating > ratingConfig.low) {
        found = true;
        return;
      }
    });
    return found;
  }

  filterPrice(foodItem: FoodItem, priceConfigs: ValueRange[]) {
    let found = false;
    priceConfigs.forEach((priceConfig) => {
      if (foodItem.price > priceConfig.low && foodItem.price < priceConfig.high) {
        found = true;
        return;
      }
    });
    return found;
  }

  filterCategory(foodItem: FoodItem, categories: KeyValue[]) {
    let found = false;
    categories.forEach((category) => {
      if (foodItem.tags.filter((f) => f === category.name).length > 0) {
        found = true;
        return;
      }
    });
    return found;
  }

  filterDiet(foodItem, dietPreferences: KeyValue[]) {
    let include;

    let vegChecked = false;
    let nonVegChecked = false;

    dietPreferences.forEach((dietPreference) => {
      if (dietPreference.key === DietPreferenceType.veg) {
        vegChecked = dietPreference.value;
      }
      if (dietPreference.key === DietPreferenceType.nonVeg) {
        nonVegChecked = dietPreference.value;
      }
    });
    if ((vegChecked && nonVegChecked) || (!vegChecked && !nonVegChecked)) {
      include = true;
    } else if (vegChecked && foodItem.isVeg) {
      include = true;
    } else if (nonVegChecked && !foodItem.isVeg) {
      include = true;
    } else {
      return false;
    }
    return include;
  }
}

export enum FilterConfigType {
  dietPreference = 'dietPreference',
  category = 'category',
  price = 'price',
  rating = 'rating'
}

export enum DietPreferenceType {
  veg = 'Veg',
  nonVeg = 'Non Veg'

}

export class FilterConfig {
  key: string;
  name: string;
  filters: any[];
}

export enum DietPreference {
  veg = 'Veg',
  nonVeg = 'Non Veg'
}

export class KeyValue {
  key: string;
  name: string;
  value: boolean;
}

export class ValueRange {
  key: string;
  name: string;
  low: number;
  high: number;
  value: boolean;
}
