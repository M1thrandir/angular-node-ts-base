import { Component, EventEmitter, HostListener, Input, ViewChild } from "@angular/core";
import { MdMenuTrigger } from "@angular/material"

@Component({
  selector: "udh-routine-item",
  templateUrl: "./routine-item.component.html",
  styleUrls: ["./routine-item.component.scss"]
})
export class RoutineItemComponent {
  @Input() public udhItemTitle: string = ""
  @Input() public udhItemDescription: string = ""
  @Input() public udhItemIcon: string = ""
  @Input() public onMenuHover = new EventEmitter<boolean>()
  @Input() public onMenuButtonClick = new EventEmitter<MouseEvent>()
  @Input() public onButtonClick = new EventEmitter<MouseEvent>()
}
