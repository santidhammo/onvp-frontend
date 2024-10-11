import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisterMemberComponent } from './unregister-member.component';

describe('UnregisterMemberComponent', () => {
  let component: UnregisterMemberComponent;
  let fixture: ComponentFixture<UnregisterMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnregisterMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregisterMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
