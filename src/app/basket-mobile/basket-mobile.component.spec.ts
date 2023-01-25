import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketMobileComponent } from './basket-mobile.component';

describe('BasketMobileComponent', () => {
  let component: BasketMobileComponent;
  let fixture: ComponentFixture<BasketMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
