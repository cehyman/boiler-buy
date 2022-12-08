import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupAdComponent } from './create-group-ad.component';

describe('CreateGroupAdComponent', () => {
  let component: CreateGroupAdComponent;
  let fixture: ComponentFixture<CreateGroupAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGroupAdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGroupAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
