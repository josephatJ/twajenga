import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityBuildingComponent } from './capacity-building.component';

describe('CapacityBuildingComponent', () => {
  let component: CapacityBuildingComponent;
  let fixture: ComponentFixture<CapacityBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacityBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
