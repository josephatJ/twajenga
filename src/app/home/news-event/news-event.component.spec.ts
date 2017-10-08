import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsEventComponent } from './news-event.component';

describe('NewsEventComponent', () => {
  let component: NewsEventComponent;
  let fixture: ComponentFixture<NewsEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
