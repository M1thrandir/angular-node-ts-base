/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { UdhSpeedDialButtonComponent } from "./udh-speed-dial-button.component";

describe("UdhSpeedDialButtonComponent", () => {
  let component: UdhSpeedDialButtonComponent;
  let fixture: ComponentFixture<UdhSpeedDialButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdhSpeedDialButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdhSpeedDialButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
