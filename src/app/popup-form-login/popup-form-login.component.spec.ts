import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFormLoginComponent } from './popup-form-login.component';

describe('PopupFormLoginComponent', () => {
  let component: PopupFormLoginComponent;
  let fixture: ComponentFixture<PopupFormLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupFormLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupFormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
