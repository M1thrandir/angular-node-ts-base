import { Component, EventEmitter, HostBinding, HostListener, Input, ViewChild } from "@angular/core";
import { MdMenuTrigger } from "@angular/material"

@Component({
  selector: 'udh-list-container',
  templateUrl: './udh-list-container.component.html',
  styleUrls: ['./udh-list-container.component.scss']
})
export class UdhListContainerComponent {
  private _headerText: string = "DAN'S ROUTINE"
  @Input() public get headerText(): string {
    return this._headerText
  }

  public set headerText(header: string) {
    this._headerText = header.toUpperCase()
  }

  @HostBinding("class.show")
  private hovering: boolean = false
  
  @HostListener("mouseenter")
  public onHover() {
    this.hovering = true
  }

  @HostListener("mouseleave")
  public onHoverLeave() {
    this.hovering = false
  }

  @Input() public onMenuHover = new EventEmitter<boolean>()
  @Input() public onMenuButtonClick = new EventEmitter<MouseEvent>()
  @Input() public onButtonClick = new EventEmitter<MouseEvent>()
}



