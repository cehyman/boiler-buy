import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShopComponent } from './user-shop.component';

describe('UserShopComponent', () => {
  let component: UserShopComponent;
  let fixture: ComponentFixture<UserShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
