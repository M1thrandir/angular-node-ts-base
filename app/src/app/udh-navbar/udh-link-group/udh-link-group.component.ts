import { Component, Input } from "@angular/core"

@Component({
  selector: "udh-link-group",
  templateUrl: "./udh-link-group.component.html",
  styleUrls: ["./udh-link-group.component.scss"]
})
export class UdhLinkGroupComponent {
  @Input() public heading: string = ""
  @Input() public divider: boolean = true
}
