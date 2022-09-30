import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListingComponent } from './create-listing.component';

describe('CreateListingComponent', () => {
  let component: CreateListingComponent;
  let fixture: ComponentFixture<CreateListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
