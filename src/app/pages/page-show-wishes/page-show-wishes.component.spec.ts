import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageShowWishesComponent } from './page-show-wishes.component';

describe('PageShowWishesComponent', () => {
  let component: PageShowWishesComponent;
  let fixture: ComponentFixture<PageShowWishesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageShowWishesComponent]
    });
    fixture = TestBed.createComponent(PageShowWishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
