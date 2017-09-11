import { Component, ContentChild, HostBinding, HostListener, Input } from "@angular/core";
import { UdhFabTriggerDirective } from "./udh-fab-trigger/udh-fab-trigger.directive"
import { UdhFabActionsComponent } from "./udh-fab-actions/udh-fab-actions.component"
import { FlexDirections, getFlexDirection, SpeedDialDirections } from "./udh-fab-speed-dial.model"

@Component({
  selector: "udh-fab-speed-dial",
  templateUrl: "./udh-fab-speed-dial.component.html",
  styleUrls: ["./udh-fab-speed-dial.component.scss"]
})
export class UdhFabSpeedDialComponent {
  @ContentChild(UdhFabTriggerDirective) trigger: UdhFabTriggerDirective
  @ContentChild(UdhFabActionsComponent) actions: UdhFabActionsComponent
  
  @HostBinding("class.opened")
  @Input() public opened: boolean = false

  @HostBinding("style.flexDirection")
  private flexDirection: FlexDirections = "column-reverse"

  private _direction: SpeedDialDirections = "up"
  @Input() public get direction(): SpeedDialDirections {
    return this._direction
  }

  public set direction(direction: SpeedDialDirections) {
    this._direction = direction
    this.flexDirection = getFlexDirection(direction)
    this.actions.flexDirection = this.flexDirection
  }

  @Input() public openOn: "click" | "hover" = "hover"

  @HostListener("mouseenter", ["$event"])
  @HostListener("mouseleave", ["$event"])
  public onHover(event: MouseEvent) {
    if (this.openOn === "hover") {
      if (event.type === "mouseenter") {
        this.opened = true
      } else {
        this.opened = false
      }
    }
  }
  
  @HostListener("click", ["$event"])
  public onClick(event: MouseEvent) {
    if (this.openOn === "click" || (this.opened && this.openOn === "hover")) {
      this.opened = !this.opened
    }   
  }
}
