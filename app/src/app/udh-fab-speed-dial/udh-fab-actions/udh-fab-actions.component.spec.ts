/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { UdhFabActionsComponent } from "./udh-fab-actions.component";

describe("UdhFabActionsComponent", () => {
  let component: UdhFabActionsComponent;
  let fixture: ComponentFixture<UdhFabActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdhFabActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UdhFabActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
