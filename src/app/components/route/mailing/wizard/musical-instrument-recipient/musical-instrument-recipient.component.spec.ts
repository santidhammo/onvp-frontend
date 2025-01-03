import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicalInstrumentRecipientComponent } from './musical-instrument-recipient.component';

describe('MusicalInstrumentRecipientComponent', () => {
  let component: MusicalInstrumentRecipientComponent;
  let fixture: ComponentFixture<MusicalInstrumentRecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicalInstrumentRecipientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicalInstrumentRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
