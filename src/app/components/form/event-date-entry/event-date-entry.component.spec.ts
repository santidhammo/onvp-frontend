import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDateEntryComponent } from './event-date-entry.component';

describe('EventDateEntryComponent', () => {
  let component: EventDateEntryComponent;
  let fixture: ComponentFixture<EventDateEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDateEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDateEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
