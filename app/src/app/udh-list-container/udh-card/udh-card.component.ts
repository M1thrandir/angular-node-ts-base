import { Component, Input } from "@angular/core"

@Component({
  selector: 'udh-card',
  templateUrl: './udh-card.component.html',
  styleUrls: ['./udh-card.component.scss']
})
export class UdhCardComponent {
  @Input() title: string = "New Title"
}
