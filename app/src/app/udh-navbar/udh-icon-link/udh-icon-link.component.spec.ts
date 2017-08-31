/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { UdhIconLinkComponent } from "./udh-icon-link.component";

describe("UdhIconLinkComponent", () => {
  let component: UdhIconLinkComponent;
  let fixture: ComponentFixture<UdhIconLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdhIconLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdhIconLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
