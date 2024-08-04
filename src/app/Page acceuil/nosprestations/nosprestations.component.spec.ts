import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosprestationsComponent } from './nosprestations.component';

describe('NosprestationsComponent', () => {
  let component: NosprestationsComponent;
  let fixture: ComponentFixture<NosprestationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosprestationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosprestationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
