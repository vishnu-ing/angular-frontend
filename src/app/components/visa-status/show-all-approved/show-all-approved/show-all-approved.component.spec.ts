import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllApprovedComponent } from './show-all-approved.component';

describe('ShowAllApprovedComponent', () => {
  let component: ShowAllApprovedComponent;
  let fixture: ComponentFixture<ShowAllApprovedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAllApprovedComponent]
    });
    fixture = TestBed.createComponent(ShowAllApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
