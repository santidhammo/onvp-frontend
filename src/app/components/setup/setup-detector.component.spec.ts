import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupDetectorComponent } from './setup-detector.component';

describe('OnceComponent', () => {
  let component: SetupDetectorComponent;
  let fixture: ComponentFixture<SetupDetectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupDetectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SetupDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
