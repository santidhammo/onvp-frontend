import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicalInstrumentRegisterComponent } from './musical-instrument-register.component';

describe('MusicalInstrumentRegisterComponent', () => {
  let component: MusicalInstrumentRegisterComponent;
  let fixture: ComponentFixture<MusicalInstrumentRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicalInstrumentRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicalInstrumentRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
