import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInProgressOnlyComponent } from './show-in-progress-only.component';

describe('ShowInProgressOnlyComponent', () => {
  let component: ShowInProgressOnlyComponent;
  let fixture: ComponentFixture<ShowInProgressOnlyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowInProgressOnlyComponent]
    });
    fixture = TestBed.createComponent(ShowInProgressOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
