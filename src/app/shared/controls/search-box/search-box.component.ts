import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { mergeMap, distinctUntilChanged, debounceTime, startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  @Input() placeholder: string;
  @Input() options: string[] = [];
  @Output() searchTextChanged = new EventEmitter<string>();

  subscription;
  searchTextChanged$ = new Subject<any>();

  searchControl = new FormControl();

  filteredOptions: Observable<any[]>;

  myControl = new FormControl();
  optionsa: string[] = ['One', 'Two', 'Three'];

  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map((name) => {
          if (name && this.options) {
            return this.filter(name);
          } else if (this.options) {
            return this.options.slice();
          }
          return [];
        })
      );

    this.subscription = this.searchTextChanged$
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(mergeMap(search => this.emitSearchText(search)))
      .subscribe();
  }

  onSearchTextChanged(event) {
    event = event.target.value || '';
    this.searchTextChanged$.next(event);
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    this.searchTextChanged$.next(event.option.value);
  }

  displayFn(user?): string | undefined {
    return user ? user.name : undefined;
  }

  emitSearchText(search) {
    this.searchTextChanged.emit(search);
    return of(search);
  }

  private filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) > -1);
  }

}
