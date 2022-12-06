import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveUsernameComponent } from './retrieve-username.component';

describe('RetrieveUsernameComponent', () => {
  let component: RetrieveUsernameComponent;
  let fixture: ComponentFixture<RetrieveUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetrieveUsernameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetrieveUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
