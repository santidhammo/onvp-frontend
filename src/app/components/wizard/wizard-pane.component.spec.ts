import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardPaneComponent } from './wizard-pane.component';

describe('WizardComponent', () => {
  let component: WizardPaneComponent;
  let fixture: ComponentFixture<WizardPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardPaneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WizardPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
