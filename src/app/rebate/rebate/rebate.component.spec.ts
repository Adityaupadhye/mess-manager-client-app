import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RebateComponent } from './rebate.component';

describe('RebateComponent', () => {
  let component: RebateComponent;
  let fixture: ComponentFixture<RebateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RebateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RebateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
