import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMenuComponent } from './site-menu.component';

describe('SiteMenuComponent', () => {
  let component: SiteMenuComponent;
  let fixture: ComponentFixture<SiteMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
