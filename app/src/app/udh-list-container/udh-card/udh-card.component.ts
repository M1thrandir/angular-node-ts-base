import { Component, EventEmitter, HostBinding, Input, OnInit } from "@angular/core"
import { BehaviorSubject } from "rxjs/BehaviorSubject"

@Component({
  selector: 'udh-card',
  templateUrl: './udh-card.component.html',
  styleUrls: ['./udh-card.component.scss']
})
export class UdhCardComponent implements OnInit {
  @Input() title: string = "New Title"

  @HostBinding("class.selected")
  public selected: boolean = false

  public selected$ = new EventEmitter<boolean>()

  public ngOnInit() {
    this.selected$.subscribe((selected: boolean) => this.selected = selected)
  }
}
