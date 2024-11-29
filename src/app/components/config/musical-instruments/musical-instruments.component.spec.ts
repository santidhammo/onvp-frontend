import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicalInstrumentsComponent } from './musical-instruments.component';

describe('MusicalInstrumentsComponent', () => {
  let component: MusicalInstrumentsComponent;
  let fixture: ComponentFixture<MusicalInstrumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicalInstrumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicalInstrumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
