import { Component, Input } from "@angular/core"
import { Router } from "@angular/router"
import { UserService } from "./services"
import { MdIconRegistry } from "@angular/material"
import { DomSanitizer } from "@angular/platform-browser"

@Component({
  selector: "udh-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(public router: Router, private userService: UserService,
              private iconRegistry: MdIconRegistry, private domSanitize: DomSanitizer) {
    // iconRegistry.addSvgIcon("impart", domSanitize.bypassSecurityTrustResourceUrl("assets/img/impart.svg"))
  }

  isLoggedIn(): boolean {
    return this.userService.isAuthenticated()
  }
}
