import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WastageAdminComponent } from './wastage-admin.component';

describe('WastageAdminComponent', () => {
  let component: WastageAdminComponent;
  let fixture: ComponentFixture<WastageAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WastageAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WastageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
