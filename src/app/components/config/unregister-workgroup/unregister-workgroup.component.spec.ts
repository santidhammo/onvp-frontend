import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisterWorkgroupComponent } from './unregister-workgroup.component';

describe('UnregisterWorkgroupComponent', () => {
  let component: UnregisterWorkgroupComponent;
  let fixture: ComponentFixture<UnregisterWorkgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnregisterWorkgroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregisterWorkgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
