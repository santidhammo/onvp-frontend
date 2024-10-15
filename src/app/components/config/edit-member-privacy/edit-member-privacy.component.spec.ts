import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberPrivacyComponent } from './edit-member-privacy.component';

describe('EditMemberPrivacyComponent', () => {
  let component: EditMemberPrivacyComponent;
  let fixture: ComponentFixture<EditMemberPrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMemberPrivacyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMemberPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
