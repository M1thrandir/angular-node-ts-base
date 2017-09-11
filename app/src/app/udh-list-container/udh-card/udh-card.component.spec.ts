/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UdhCardComponent } from './udh-card.component';

describe('UdhCardComponent', () => {
  let component: UdhCardComponent;
  let fixture: ComponentFixture<UdhCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdhCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdhCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
