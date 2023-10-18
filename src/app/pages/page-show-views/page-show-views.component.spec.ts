import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageShowViewsComponent } from './page-show-views.component';

describe('PageShowViewsComponent', () => {
  let component: PageShowViewsComponent;
  let fixture: ComponentFixture<PageShowViewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageShowViewsComponent]
    });
    fixture = TestBed.createComponent(PageShowViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
