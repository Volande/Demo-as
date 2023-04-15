import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDeleteProductComponent } from './confirmation-delete-product.component';

describe('ConfirmationComponent', () => {
  let component: ConfirmationDeleteProductComponent;
  let fixture: ComponentFixture<ConfirmationDeleteProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDeleteProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDeleteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
