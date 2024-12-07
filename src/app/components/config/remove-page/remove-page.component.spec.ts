import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePageComponent } from './remove-page.component';

describe('RemovePageComponent', () => {
  let component: RemovePageComponent;
  let fixture: ComponentFixture<RemovePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemovePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemovePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
