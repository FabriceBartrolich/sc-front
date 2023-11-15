import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageShowDetailsComponent } from './page-show-details.component';

describe('PageShowDetailsComponent', () => {
  let component: PageShowDetailsComponent;
  let fixture: ComponentFixture<PageShowDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageShowDetailsComponent]
    });
    fixture = TestBed.createComponent(PageShowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
