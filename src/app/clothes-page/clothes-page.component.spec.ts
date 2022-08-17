import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesPageComponent } from './clothes-page.component';

describe('ClothesPageComponent', () => {
  let component: ClothesPageComponent;
  let fixture: ComponentFixture<ClothesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClothesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClothesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
