import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaIncidenciasPage } from './lista-incidencias.page';

describe('ListaIncidenciasPage', () => {
  let component: ListaIncidenciasPage;
  let fixture: ComponentFixture<ListaIncidenciasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaIncidenciasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaIncidenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
