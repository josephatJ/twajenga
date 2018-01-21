import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListCardComponent } from './products-list-card.component';

describe('ProductsListCardComponent', () => {
  let component: ProductsListCardComponent;
  let fixture: ComponentFixture<ProductsListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
