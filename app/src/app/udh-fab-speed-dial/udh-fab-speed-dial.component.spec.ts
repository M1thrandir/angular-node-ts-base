/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { UdhFabSpeedDialComponent } from "./udh-fab-speed-dial.component";

describe("UdhFabSpeedDialComponent", () => {
  let component: UdhFabSpeedDialComponent;
  let fixture: ComponentFixture<UdhFabSpeedDialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdhFabSpeedDialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdhFabSpeedDialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
