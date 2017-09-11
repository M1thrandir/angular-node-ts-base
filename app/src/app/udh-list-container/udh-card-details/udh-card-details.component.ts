import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'udh-card-details',
  templateUrl: './udh-card-details.component.html',
  styleUrls: ['./udh-card-details.component.scss']
})
export class UdhCardDetailsComponent {
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
}
