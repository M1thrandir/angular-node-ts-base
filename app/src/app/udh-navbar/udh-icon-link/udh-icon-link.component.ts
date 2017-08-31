import { Router, RouterLink, Event, NavigationEnd } from "@angular/router"
import { Component, ElementRef, Input, OnInit } from "@angular/core"

@Component({
  selector: "udh-icon-link",
  templateUrl: "./udh-icon-link.component.html",
  styleUrls: ["./udh-icon-link.component.scss"]
})
export class UdhIconLinkComponent implements OnInit {
  @Input() public icon: string = ""
  @Input() public pathParams: object = {}
  @Input() public routerLink: string|object[] = []

  constructor(private elementRef: ElementRef,
              private router: Router) {}

  public ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (this.routerLink.length > 0 && event instanceof NavigationEnd) {
        const active = this.router.isActive(this.routerLink[0] as string, true)
        const el: Element = this.elementRef.nativeElement
        if (active) {
          el.classList.add("active")
        } else {
          el.classList.remove("active")
        }
      }
    })
  }
}
