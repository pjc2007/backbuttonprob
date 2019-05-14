import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Feature1Page } from './feature1.page';

describe('Feature1Page', () => {
  let component: Feature1Page;
  let fixture: ComponentFixture<Feature1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Feature1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Feature1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
