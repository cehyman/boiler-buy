import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShopComponent } from './my-shop.component';

describe('MyShopComponent', () => {
  let component: MyShopComponent;
  let fixture: ComponentFixture<MyShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
