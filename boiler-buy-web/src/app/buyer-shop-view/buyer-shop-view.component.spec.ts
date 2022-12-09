import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerShopViewComponent } from './buyer-shop-view.component';

describe('BuyerShopViewComponent', () => {
  let component: BuyerShopViewComponent;
  let fixture: ComponentFixture<BuyerShopViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerShopViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerShopViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
