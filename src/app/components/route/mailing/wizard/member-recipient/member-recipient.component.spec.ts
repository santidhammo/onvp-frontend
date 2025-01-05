import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRecipientComponent } from './member-recipient.component';

describe('MemberRecipientComponent', () => {
  let component: MemberRecipientComponent;
  let fixture: ComponentFixture<MemberRecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberRecipientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
