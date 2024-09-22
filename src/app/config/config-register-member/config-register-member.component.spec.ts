import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigRegisterMemberComponent } from './config-register-member.component';

describe('ConfigRegisterMemberComponent', () => {
  let component: ConfigRegisterMemberComponent;
  let fixture: ComponentFixture<ConfigRegisterMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigRegisterMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigRegisterMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
