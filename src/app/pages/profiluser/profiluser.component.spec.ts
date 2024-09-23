import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiluserComponent } from './profiluser.component';

describe('ProfiluserComponent', () => {
  let component: ProfiluserComponent;
  let fixture: ComponentFixture<ProfiluserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfiluserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
