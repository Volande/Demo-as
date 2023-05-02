import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothePageComponent } from './clothe-page.component';

describe('ClothesPageComponent', () => {
  let component: ClothePageComponent;
  let fixture: ComponentFixture<ClothePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClothePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClothePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
