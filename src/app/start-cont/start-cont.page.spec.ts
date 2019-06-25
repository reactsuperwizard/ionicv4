import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartContPage } from './start-cont.page';

describe('StartContPage', () => {
  let component: StartContPage;
  let fixture: ComponentFixture<StartContPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartContPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartContPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
