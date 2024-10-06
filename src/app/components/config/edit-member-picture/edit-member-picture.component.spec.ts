import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberPictureComponent } from './edit-member-picture.component';

describe('EditMemberPictureComponent', () => {
  let component: EditMemberPictureComponent;
  let fixture: ComponentFixture<EditMemberPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMemberPictureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMemberPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
