import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnceComponent } from './once.component';

describe('OnceComponent', () => {
  let component: OnceComponent;
  let fixture: ComponentFixture<OnceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
