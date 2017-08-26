import { Component, OnInit } from "@angular/core"
import { UserService } from "../services/user.service"

@Component({
  selector: `u-dh-logout`,
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"]
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService) {}

  public ngOnInit() {
    this.userService.logout()
  }
}
