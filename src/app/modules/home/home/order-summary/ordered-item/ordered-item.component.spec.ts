import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedItemComponent } from './ordered-item.component';

describe('OrderedItemComponent', () => {
  let component: OrderedItemComponent;
  let fixture: ComponentFixture<OrderedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
