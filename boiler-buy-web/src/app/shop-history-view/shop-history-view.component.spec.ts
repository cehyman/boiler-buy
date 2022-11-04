import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopHistoryViewComponent } from './shop-history-view.component';

describe('ShopHistoryViewComponent', () => {
  let component: ShopHistoryViewComponent;
  let fixture: ComponentFixture<ShopHistoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopHistoryViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
