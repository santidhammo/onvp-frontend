import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveParentPageComponent } from './remove-parent-page.component';

describe('RemoveParentPageComponent', () => {
  let component: RemoveParentPageComponent;
  let fixture: ComponentFixture<RemoveParentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveParentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveParentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
