import { Component, ContentChild, HostBinding } from "@angular/core"
import { MdMenu } from "@angular/material"
import { Link } from "./udh-navbar.model"
import { UdhNavigationComponent } from "./udh-navigation/udh-navigation.component"

@Component({
  selector: "udh-navbar",
  templateUrl: "./udh-navbar.component.html",
  styleUrls: ["./udh-navbar.component.scss"]
})
export class UdhNavbarComponent {
  @ContentChild(UdhNavigationComponent) public navigation: UdhNavigationComponent

  @HostBinding("class.menu-closed")
  public get isClosed(): boolean {
    return this.navigation.menu ? !this.navigation.menu.opened : false
  }

  public toggleMenu(event: MouseEvent) {
    if (event.srcElement.closest("button")) {
      this.navigation.menu.toggle()
    }
  }
}
