import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyViewedItemsComponent } from './recently-viewed-items.component';

describe('RecentlyViewedItemsComponent', () => {
  let component: RecentlyViewedItemsComponent;
  let fixture: ComponentFixture<RecentlyViewedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyViewedItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentlyViewedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
