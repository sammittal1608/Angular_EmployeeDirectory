import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCardContainerComponent } from './employee-card-container.component';

describe('EmployeeCardContainerComponent', () => {
  let component: EmployeeCardContainerComponent;
  let fixture: ComponentFixture<EmployeeCardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeCardContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
