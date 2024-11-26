import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliteAttributeComponent } from './delite-attribute.component';

describe('DeliteAttributeComponent', () => {
  let component: DeliteAttributeComponent;
  let fixture: ComponentFixture<DeliteAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliteAttributeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliteAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
