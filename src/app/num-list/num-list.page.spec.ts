import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumListPage } from './num-list.page';

describe('NumListPage', () => {
  let component: NumListPage;
  let fixture: ComponentFixture<NumListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
