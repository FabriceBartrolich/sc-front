import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAddShowComponent } from './page-add-show.component';

describe('PageAddShowComponent', () => {
  let component: PageAddShowComponent;
  let fixture: ComponentFixture<PageAddShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageAddShowComponent]
    });
    fixture = TestBed.createComponent(PageAddShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
