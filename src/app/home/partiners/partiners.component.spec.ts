import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartinersComponent } from './partiners.component';

describe('PartinersComponent', () => {
  let component: PartinersComponent;
  let fixture: ComponentFixture<PartinersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartinersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartinersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
