import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPageDetailsComponent } from './edit-page-details.component';

describe('EditPageDetailsComponent', () => {
  let component: EditPageDetailsComponent;
  let fixture: ComponentFixture<EditPageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPageDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
