import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentcoursesComponent } from './currentcourses.component';

describe('CurrentcoursesComponent', () => {
  let component: CurrentcoursesComponent;
  let fixture: ComponentFixture<CurrentcoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentcoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
