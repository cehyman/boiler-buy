import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotVerifiedComponent } from './not-verified.component';

describe('NotVerifiedComponent', () => {
  let component: NotVerifiedComponent;
  let fixture: ComponentFixture<NotVerifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotVerifiedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
