import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule, MatButtonModule, MatSnackBarModule, MatMenuModule } from '@angular/material';

import { CardComponent } from './card/card.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatSnackBarModule,
    MatMenuModule
  ],
  declarations: [CardComponent, SearchBoxComponent],
  exports: [CardComponent, SearchBoxComponent, MatCardModule,
    MatInputModule, MatButtonModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatMenuModule]
})
export class ControlsModule { }
