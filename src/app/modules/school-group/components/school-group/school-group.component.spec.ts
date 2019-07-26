import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGroupComponent } from './school-group.component';

describe('SchoolGroupComponent', () => {
  let component: SchoolGroupComponent;
  let fixture: ComponentFixture<SchoolGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
