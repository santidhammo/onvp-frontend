import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisterMusicalInstrumentComponent } from './unregister-musical-instrument.component';

describe('UnregisterMusicalInstrumentComponent', () => {
  let component: UnregisterMusicalInstrumentComponent;
  let fixture: ComponentFixture<UnregisterMusicalInstrumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnregisterMusicalInstrumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregisterMusicalInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
