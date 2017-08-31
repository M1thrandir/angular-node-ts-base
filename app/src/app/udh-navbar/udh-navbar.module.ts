import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core";
import { MdCardModule, MdToolbarModule, MdSidenavModule, MdIconModule, MdButtonModule, MdListModule } from "@angular/material"
import { RouterModule } from "@angular/router"

import { UdhNavbarComponent } from "./udh-navbar.component";
import { UdhNavigationComponent } from "./udh-navigation/udh-navigation.component";
import { UdhIconLinkComponent } from "./udh-icon-link/udh-icon-link.component";
import { UdhLinkGroupComponent } from "./udh-link-group/udh-link-group.component";
import { UdhNavbarIconsComponent } from "./udh-navbar-icons/udh-navbar-icons.component";

@NgModule({
  declarations: [
    UdhNavbarComponent,
    UdhNavigationComponent,
    UdhIconLinkComponent,
    UdhLinkGroupComponent,
    UdhNavbarIconsComponent,
  ],
  exports: [
    UdhNavbarComponent,
    UdhNavigationComponent,
    UdhIconLinkComponent,
    UdhLinkGroupComponent,
    UdhNavbarIconsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MdCardModule,
    MdIconModule,
    MdButtonModule,
    MdToolbarModule,
    MdSidenavModule,
    MdListModule,
  ]
})
export class UdhNavbarModule {}
