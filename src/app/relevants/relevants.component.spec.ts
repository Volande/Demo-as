import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevantsComponent } from './relevants.component';

describe('RelevantsComponent', () => {
  let component: RelevantsComponent;
  let fixture: ComponentFixture<RelevantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelevantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelevantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
