import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProfilePicComponent } from './change-profile-pic.component';

describe('ChangeProfilePicComponent', () => {
  let component: ChangeProfilePicComponent;
  let fixture: ComponentFixture<ChangeProfilePicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeProfilePicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeProfilePicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
