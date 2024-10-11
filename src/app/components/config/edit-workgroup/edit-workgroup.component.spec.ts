import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkgroupComponent } from './edit-workgroup.component';

describe('EditWorkgroupComponent', () => {
  let component: EditWorkgroupComponent;
  let fixture: ComponentFixture<EditWorkgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWorkgroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWorkgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
