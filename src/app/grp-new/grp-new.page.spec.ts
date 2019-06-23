import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpNewPage } from './grp-new.page';

describe('GrpNewPage', () => {
  let component: GrpNewPage;
  let fixture: ComponentFixture<GrpNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrpNewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrpNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
