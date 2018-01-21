import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorRelationComponent } from './investor-relation.component';

describe('InvestorRelationComponent', () => {
  let component: InvestorRelationComponent;
  let fixture: ComponentFixture<InvestorRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
