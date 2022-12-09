import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupadDetailsComponent } from './groupad-details.component';

describe('GroupadDetailsComponent', () => {
  let component: GroupadDetailsComponent;
  let fixture: ComponentFixture<GroupadDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupadDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
