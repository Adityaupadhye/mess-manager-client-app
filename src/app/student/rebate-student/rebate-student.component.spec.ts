import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RebateStudentComponent } from './rebate-student.component';

describe('RebateStudentComponent', () => {
  let component: RebateStudentComponent;
  let fixture: ComponentFixture<RebateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RebateStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RebateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
