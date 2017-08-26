import { Component, Input } from "@angular/core"
import { Router } from "@angular/router"
import { Link } from "./navbar/navbar.model"
import { UserService } from "./services"
import { MdIconRegistry } from "@angular/material"
import { DomSanitizer } from "@angular/platform-browser"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(public router: Router, private userService: UserService,
              private iconRegistry: MdIconRegistry, private domSanitize: DomSanitizer) {
    // iconRegistry.addSvgIcon("impart", domSanitize.bypassSecurityTrustResourceUrl("assets/img/impart.svg"))
  }

  public brand: Link = new Link("Node & Angular Base", "mdi mdi-check mdi-30px", null, "/", {})

  public bottomHeading: string = "Account"
  public bottomLinks: Link[] = [
    new Link("Login", "fa-sign-in", null, "/login", {}, this.notLoggedIn.bind(this)),
    new Link("Logout", "fa-sign-out", null, "/logout", {}, this.isLoggedIn.bind(this)),
  ]

  public topLinks: Link[] = [
    new Link("My Account", "fa-user", null, "/account", {}, this.isLoggedIn.bind(this)),
  ]

  isLoggedIn(): boolean {
    return this.userService.isAuthenticated()
  }

  notLoggedIn(): boolean {
    return !this.userService.isAuthenticated()
  }
}
