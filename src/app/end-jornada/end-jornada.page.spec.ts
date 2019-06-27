import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndJornadaPage } from './end-jornada.page';

describe('EndJornadaPage', () => {
  let component: EndJornadaPage;
  let fixture: ComponentFixture<EndJornadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndJornadaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndJornadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
