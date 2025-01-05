import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetParentPageComponent } from './set-parent-page.component';

describe('SetParentPageComponent', () => {
  let component: SetParentPageComponent;
  let fixture: ComponentFixture<SetParentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetParentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetParentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
