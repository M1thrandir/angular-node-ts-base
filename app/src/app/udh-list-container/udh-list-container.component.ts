import { BehaviorSubject, Observable } from "rxjs/Rx"
import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  QueryList,
  ViewChild
} from "@angular/core"
import { MdMenuTrigger } from "@angular/material"
import { UdhCardComponent } from "./udh-card/udh-card.component"

@Component({
  selector: 'udh-list-container',
  templateUrl: './udh-list-container.component.html',
  styleUrls: ['./udh-list-container.component.scss']
})
export class UdhListContainerComponent implements AfterViewInit {
  @ContentChildren(UdhCardComponent) cards: QueryList<UdhCardComponent>
  private curCardSelected: UdhCardComponent | null = null

  public getCurCardTitle() {
    return this.curCardSelected ? this.curCardSelected.title : ""
  }

  private _headerText: string = "DAN'S ROUTINE"
  @Input() public get headerText(): string {
    return this._headerText
  }

  public set headerText(header: string) {
    this._headerText = header.toUpperCase()
  }

  @HostBinding("class.show-card-details")
  private get showCardDetails() {
    return !!this.curCardSelected
  } 
  
  @HostBinding("class.show-speed-dial")
  private hovering: boolean = false
  
  public ngAfterViewInit() {
    window.addEventListener("click", event => {
      if (!event.srcElement.closest("udh-card")
          && !event.srcElement.closest(".list-menu")
          && !event.srcElement.closest("udh-card-details")) {
        this.handleCardSelection(false, null)
      }
    })
    this.cards.forEach(card => {
      card.selected$.subscribe((selected: boolean) => {
        this.handleCardSelection(selected, card)
      })
    })
  }

  private handleCardSelection(selected: boolean, card: UdhCardComponent) {
    this.curCardSelected = null
    if (selected) {
      this.curCardSelected = card
    }

    this.deselectOtherCards(card)
  }

  private deselectOtherCards(cardToIgnore: UdhCardComponent) {
    this.cards.filter(card => !cardToIgnore || card.title !== cardToIgnore.title)
      .forEach(card => card.selected = false)
  }

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
