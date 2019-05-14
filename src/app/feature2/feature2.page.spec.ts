import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Feature2Page } from './feature2.page';

describe('Feature2Page', () => {
  let component: Feature2Page;
  let fixture: ComponentFixture<Feature2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Feature2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Feature2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
