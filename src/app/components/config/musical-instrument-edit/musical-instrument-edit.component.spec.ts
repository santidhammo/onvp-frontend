import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicalInstrumentEditComponent } from './musical-instrument-edit.component';

describe('MusicalInstrumentEditComponent', () => {
  let component: MusicalInstrumentEditComponent;
  let fixture: ComponentFixture<MusicalInstrumentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicalInstrumentEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicalInstrumentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
