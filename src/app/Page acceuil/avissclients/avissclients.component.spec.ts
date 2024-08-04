import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvissclientsComponent } from './avissclients.component';

describe('AvissclientsComponent', () => {
  let component: AvissclientsComponent;
  let fixture: ComponentFixture<AvissclientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvissclientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvissclientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
