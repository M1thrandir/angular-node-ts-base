/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { RoutinesComponent } from "./routines.component";

describe("RoutinesComponent", () => {
  let component: RoutinesComponent;
  let fixture: ComponentFixture<RoutinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
