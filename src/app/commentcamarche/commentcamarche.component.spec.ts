import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentcamarcheComponent } from './commentcamarche.component';

describe('CommentcamarcheComponent', () => {
  let component: CommentcamarcheComponent;
  let fixture: ComponentFixture<CommentcamarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentcamarcheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentcamarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
