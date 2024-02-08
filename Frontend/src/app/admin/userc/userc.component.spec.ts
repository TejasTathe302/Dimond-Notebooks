import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercComponent } from './userc.component';

describe('UsercComponent', () => {
  let component: UsercComponent;
  let fixture: ComponentFixture<UsercComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsercComponent]
    });
    fixture = TestBed.createComponent(UsercComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
