import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureUploadNewComponent } from './picture-upload-new.component';

describe('PictureUploadNewComponent', () => {
  let component: PictureUploadNewComponent;
  let fixture: ComponentFixture<PictureUploadNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureUploadNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureUploadNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
