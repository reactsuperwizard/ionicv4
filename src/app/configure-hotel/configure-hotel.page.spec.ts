import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureHotelPage } from './configure-hotel.page';

describe('ConfigureHotelPage', () => {
  let component: ConfigureHotelPage;
  let fixture: ComponentFixture<ConfigureHotelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureHotelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureHotelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
