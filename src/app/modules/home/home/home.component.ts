import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SearchService } from './shared/services/search.service';
import { FoodItemService } from './shared/services/food-item.service';
import { FoodItem } from './shared/model/food-item.model';
import { OrderDetailService } from './shared/services/order-detail.service';
import { MatSnackBar } from '@angular/material';
import { FilterService, FilterConfig } from './shared/services/filter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('filterDialog', { read: ElementRef }) filterDialog: ElementRef;

  objectKeys = Object.keys;

  searchText: string;
  originalFoodItems: Array<FoodItem> = [];
  foodItems: Array<FoodItem> = [];
  filterredFoodItems: Array<FoodItem> = [];
  tags: string[] = [];


  showFilterDialog = false;
  filterConfigs: FilterConfig[] = [];

  constructor(private foodItemService: FoodItemService, private searchService: SearchService,
    private orderDetailService: OrderDetailService,
    private filterService: FilterService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllTags();
    this.getAllFoodItems();
    this.getFilterConfig();

    this.orderDetailService.orderDetailsChanged().subscribe((orderDetails) => {
      if (orderDetails && orderDetails.length === 0) {
        const foodItemList = [];
        this.originalFoodItems.forEach((foodItem) => {
          foodItemList.push({ ...foodItem });

        });
        this.foodItems = foodItemList;
        this.filterredFoodItems = foodItemList;
      }
    });
  }
  getFilterConfig() {
    this.filterService.getFilterConfig().subscribe((filterConfigs: FilterConfig[]) => {
      this.filterConfigs = filterConfigs;
    });
  }
  getAllTags() {
    this.foodItemService.getAllTags().subscribe(
      (tags: Array<string>) => {
        this.tags = tags;
      },
      (error) => {
        console.error('Error while fetching the tags.');
      }
    );
  }

  filterCancelClick() {
    this.showFilterDialog = false;
    this.filterDialog.nativeElement.classList.add('d-none');
    this.filterDialog.nativeElement.classList.remove('overlay-popup');
  }

  filterSubmitClick() {
    this.openSnackBar('Filtering');
    this.filterredFoodItems = this.filterService.filter(this.foodItems, this.filterConfigs);
    this.filterDialog.nativeElement.classList.add('d-none');
    this.filterDialog.nativeElement.classList.remove('overlay-popup');
  }

  getAllFoodItems() {
    this.foodItemService.getAllFoodItems().subscribe(
      (foodItems: Array<FoodItem>) => {
        this.foodItems = foodItems;
        this.filterredFoodItems = foodItems;
        this.foodItems.forEach((foodItem) => {
          this.originalFoodItems.push({ ...foodItem });

        });
      },
      (error) => {
        console.error('Error while fetching the food items.');
      }
    );
  }
  searchTextChanged(value: string) {
    this.searchText = value;
    console.log('searchTextChanged => ', value);
    if (this.searchText) {
      this.filterredFoodItems = this.filter(value);
    } else {
      this.filterredFoodItems = this.foodItems;
    }
  }

  filterClicked() {
    this.showFilterDialog = true;
    this.filterDialog.nativeElement.classList.remove('d-none');
    this.filterDialog.nativeElement.classList.add('overlay-popup');
  }

  sort(sortType) {
    let message = '';
    if (sortType === 'price') {
      this.filterredFoodItems.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      });
      message = 'Sorted By Price';
    } else if (sortType === 'rating') {
      this.filterredFoodItems.sort((a, b) => {
        if (a.rating < b.rating) {
          return -1;
        }
        if (a.rating > b.rating) {
          return 1;
        }
        return 0;
      });
      message = 'Sorted By Rating';
    }
    this.openSnackBar(message);
  }

  openSnackBar(message) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }

  compare(a, b) {

  }

  private filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.foodItems.filter((option) => {
      if (option.name.toLowerCase().indexOf(filterValue) > -1) {
        return true;
      }
      if (option.tags.filter((tag) => tag.toLowerCase().indexOf(filterValue) > -1).length > 0) {
        return true;
      }
      if (option.categories.filter((category) => category.toLowerCase().indexOf(filterValue) > -1).length > 0) {
        return true;
      }
      return false;
    });
  }

  searchNow(event) {
    if (event && event.target && event.target.value) {
      this.searchService.searchCousines(event.target.value);
    }
  }
}
