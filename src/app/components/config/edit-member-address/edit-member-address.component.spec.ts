import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberAddressComponent } from './edit-member-address.component';

describe('EditMemberAddressComponent', () => {
  let component: EditMemberAddressComponent;
  let fixture: ComponentFixture<EditMemberAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMemberAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMemberAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
