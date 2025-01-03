import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkgroupRecipientComponent } from './workgroup-recipient.component';

describe('WorkgroupRecipientComponent', () => {
  let component: WorkgroupRecipientComponent;
  let fixture: ComponentFixture<WorkgroupRecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkgroupRecipientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkgroupRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
