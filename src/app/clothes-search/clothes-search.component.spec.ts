import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesSearchComponent } from './clothes-search.component';

describe('ClothesSearchComponent', () => {
  let component: ClothesSearchComponent;
  let fixture: ComponentFixture<ClothesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClothesSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClothesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
