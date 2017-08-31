/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { UdhNavbarIconsComponent } from "./udh-navbar-icons.component";

describe("UdhNavbarIconsComponent", () => {
  let component: UdhNavbarIconsComponent;
  let fixture: ComponentFixture<UdhNavbarIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdhNavbarIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdhNavbarIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
