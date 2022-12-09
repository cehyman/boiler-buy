import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupadListingComponent } from './groupad-listing.component';

describe('GroupadListingComponent', () => {
  let component: GroupadListingComponent;
  let fixture: ComponentFixture<GroupadListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupadListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupadListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
