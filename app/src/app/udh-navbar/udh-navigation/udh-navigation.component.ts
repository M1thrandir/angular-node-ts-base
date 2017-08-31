import { Component, ViewChild } from "@angular/core";
import { MdSidenav } from "@angular/material"

@Component({
  selector: "udh-navigation",
  templateUrl: "./udh-navigation.component.html",
  styleUrls: ["./udh-navigation.component.scss"]
})
export class UdhNavigationComponent {
  @ViewChild("menuLeft") public menu: MdSidenav
}
