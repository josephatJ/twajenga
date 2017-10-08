import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidingProductsComponent } from './sliding-products.component';

describe('SlidingProductsComponent', () => {
  let component: SlidingProductsComponent;
  let fixture: ComponentFixture<SlidingProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidingProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
