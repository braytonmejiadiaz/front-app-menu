import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaMenu3Component } from './plantilla-menu-3.component';

describe('PlantillaMenu3Component', () => {
  let component: PlantillaMenu3Component;
  let fixture: ComponentFixture<PlantillaMenu3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaMenu3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaMenu3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
