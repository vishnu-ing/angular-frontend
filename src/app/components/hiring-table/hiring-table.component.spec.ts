import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringTableComponent } from './hiring-table.component';

describe('HiringTableComponent', () => {
  let component: HiringTableComponent;
  let fixture: ComponentFixture<HiringTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HiringTableComponent]
    });
    fixture = TestBed.createComponent(HiringTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
