import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodItem } from '../model/food-item.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private httpClient: HttpClient) { }

  getFilterConfig() {
    return this.httpClient.get('assets/jsons/filter-config.json');
  }

  filter(foodItems: Array<FoodItem>, filterConfigs: FilterConfig[]) {
    return foodItems.filter((foodItem) => {
      let filterCofig = filterConfigs.find(x => x.key === FilterConfigType.dietPreference);
      if (!this.filterDiet(foodItem, filterCofig)) {
        return false;
      }
      filterCofig = filterConfigs.find(x => x.key === FilterConfigType.category);
      if (!this.filterCategory(foodItem, filterCofig)) {
        return false;
      }

      filterCofig = filterConfigs.find(x => x.key === FilterConfigType.price);
      if (!this.filterPrice(foodItem, filterCofig)) {
        return false;
      }

      filterCofig = filterConfigs.find(x => x.key === FilterConfigType.rating);
      if (!this.filterRating(foodItem, filterCofig)) {
        return false;
      }
      return true;
    });
  }

  filterRating(foodItem: FoodItem, filterConfig: FilterConfig) {
    const ratingConfigs: ValueRange[] = filterConfig.filters.filter((x: KeyValue) => x.value === true);
    // { "key": "American",  "name": "American",  "value": false  }
    ratingConfigs.forEach((ratingConfig) => {
      if (foodItem.rating < ratingConfig.low) {
        return false;
      }
    });
    return true;
  }

  filterPrice(foodItem: FoodItem, filterConfig: FilterConfig) {
    const priceConfigs: ValueRange[] = filterConfig.filters.filter((x: ValueRange) => x.value === true);
    // { "key": "American",  "name": "American",  "value": false  }
    priceConfigs.forEach((priceConfig) => {
      if (foodItem.price < priceConfig.low && foodItem.price > priceConfig.high) {
        return false;
      }
    });
    return true;
  }

  filterCategory(foodItem: FoodItem, filterConfig: FilterConfig) {
    const categories: KeyValue[] = filterConfig.filters.filter((x: KeyValue) => x.value === true);
    // { "key": "American",  "name": "American",  "value": false  }
    categories.forEach((category) => {
      if (foodItem.tags.filter((f) => f === category.name).length > 0) {
        return true;
      } else {
        return false;
      }
    });
    return true;
  }

  filterDiet(foodItem, filterConfig) {
    let include;
    const dietPreferences: KeyValue[] =
      filterConfig.filters.filter((x: KeyValue) => x.value === true);
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
