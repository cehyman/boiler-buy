import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureButtonsComponent } from './feature-buttons.component';

describe('FeatureButtonsComponent', () => {
  let component: FeatureButtonsComponent;
  let fixture: ComponentFixture<FeatureButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
