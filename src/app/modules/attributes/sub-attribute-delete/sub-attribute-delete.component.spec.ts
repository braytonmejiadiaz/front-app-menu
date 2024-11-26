import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAttributeDeleteComponent } from './sub-attribute-delete.component';

describe('SubAttributeDeleteComponent', () => {
  let component: SubAttributeDeleteComponent;
  let fixture: ComponentFixture<SubAttributeDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubAttributeDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAttributeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
