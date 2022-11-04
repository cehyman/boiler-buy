import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopHistoryItemComponent } from './shop-history-item.component';

describe('ShopHistoryItemComponent', () => {
  let component: ShopHistoryItemComponent;
  let fixture: ComponentFixture<ShopHistoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopHistoryItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopHistoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
