import { Component, Input } from "@angular/core";

@Component({
  selector: "udh-speed-dial-button",
  templateUrl: "./udh-speed-dial-button.component.html",
  styleUrls: ["./udh-speed-dial-button.component.scss"]
})
export class UdhSpeedDialButtonComponent {
  @Input() public color: string = "primary"
  @Input() public size: "sm" | "lg" = "sm"

  private _icon: string = ""
  @Input() public get icon(): string {
    return this._icon
  }

  public set icon(icon: string) {
    this._icon = `mdi mdi-${icon}`
  }
}
