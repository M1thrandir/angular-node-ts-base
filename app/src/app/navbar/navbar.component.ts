import { Component, ViewChild, Input } from "@angular/core"
import { Link } from "./navbar.model"

@Component({
  selector: "u-dh-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  @ViewChild("menuLeft") menu: any
  @Input() brand: Link
  @Input() topHeading: string
  @Input() topLinks: Link[]
  @Input() bottomHeading: string
  @Input() bottomLinks: Link[]

  constructor() {}

  openMenu() {
    if (this.menu) {
      this.menu.open()
    }
  }
}
