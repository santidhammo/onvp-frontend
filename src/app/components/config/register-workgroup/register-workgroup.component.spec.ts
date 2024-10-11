import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterWorkgroupComponent } from './register-workgroup.component';

describe('RegisterWorkgroupComponent', () => {
  let component: RegisterWorkgroupComponent;
  let fixture: ComponentFixture<RegisterWorkgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterWorkgroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterWorkgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
