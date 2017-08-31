import { Component, HostBinding, OnInit } from "@angular/core";
import { FlexDirections } from "../udh-fab-speed-dial.model"

@Component({
  selector: "udh-fab-actions",
  templateUrl: "./udh-fab-actions.component.html",
  styleUrls: ["./udh-fab-actions.component.scss"]
})
export class UdhFabActionsComponent {
  @HostBinding("style.flexDirection")
  public flexDirection: FlexDirections = "column"
}
