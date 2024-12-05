import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationTestComponent } from './animation-test.component';

describe('AnimationTestComponent', () => {
  let component: AnimationTestComponent;
  let fixture: ComponentFixture<AnimationTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimationTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
