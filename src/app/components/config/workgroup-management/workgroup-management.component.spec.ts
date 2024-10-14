import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkgroupManagementComponent } from './workgroup-management.component';

describe('WorkgroupManagementComponent', () => {
  let component: WorkgroupManagementComponent;
  let fixture: ComponentFixture<WorkgroupManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkgroupManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkgroupManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
