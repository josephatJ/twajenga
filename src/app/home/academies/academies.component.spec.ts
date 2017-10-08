import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademiesComponent } from './academies.component';

describe('AcademiesComponent', () => {
  let component: AcademiesComponent;
  let fixture: ComponentFixture<AcademiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
