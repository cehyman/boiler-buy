import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialResetPasswordComponent } from './special-reset-password.component';

describe('SpecialResetPasswordComponent', () => {
  let component: SpecialResetPasswordComponent;
  let fixture: ComponentFixture<SpecialResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialResetPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
