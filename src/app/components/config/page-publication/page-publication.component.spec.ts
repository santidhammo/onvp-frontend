import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePublicationComponent } from './page-publication.component';

describe('PagePublicationComponent', () => {
  let component: PagePublicationComponent;
  let fixture: ComponentFixture<PagePublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePublicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
