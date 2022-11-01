import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerReviewComponent } from './seller-review.component';

describe('SellerReviewComponent', () => {
  let component: SellerReviewComponent;
  let fixture: ComponentFixture<SellerReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
