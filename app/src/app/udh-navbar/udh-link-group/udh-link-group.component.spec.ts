/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { UdhLinkGroupComponent } from "./udh-link-group.component";

describe("UdhLinkGroupComponent", () => {
  let component: UdhLinkGroupComponent;
  let fixture: ComponentFixture<UdhLinkGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdhLinkGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdhLinkGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
