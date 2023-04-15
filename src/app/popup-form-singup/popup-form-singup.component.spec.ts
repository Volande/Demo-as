import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFormSingupComponent } from './popup-form-singup.component';

describe('PopupFormSingupComponent', () => {
  let component: PopupFormSingupComponent;
  let fixture: ComponentFixture<PopupFormSingupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupFormSingupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupFormSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
