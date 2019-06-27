import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Incidencias1Page } from './incidencias1.page';

describe('Incidencias1Page', () => {
  let component: Incidencias1Page;
  let fixture: ComponentFixture<Incidencias1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Incidencias1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Incidencias1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
