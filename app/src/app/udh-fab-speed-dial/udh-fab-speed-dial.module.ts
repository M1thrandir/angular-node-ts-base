import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { NgModule } from "@angular/core";
import { MdCardModule, MdButtonModule, MdTooltipModule } from "@angular/material"

import { UdhFabSpeedDialComponent } from "./udh-fab-speed-dial.component";
import { UdhFabActionsComponent } from "./udh-fab-actions/udh-fab-actions.component";
import { UdhFabTriggerDirective } from "./udh-fab-trigger/udh-fab-trigger.directive";
import { UdhSpeedDialButtonComponent } from "./udh-speed-dial-button/udh-speed-dial-button.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdCardModule,
    MdButtonModule,
    MdTooltipModule,
  ],
  exports: [
    UdhFabSpeedDialComponent,
    UdhFabActionsComponent,
    UdhFabTriggerDirective,
    UdhSpeedDialButtonComponent,
  ],
  declarations: [
    UdhFabSpeedDialComponent,
    UdhFabActionsComponent,
    UdhFabTriggerDirective,
    UdhSpeedDialButtonComponent,
],
})
export class UdhFabSpeedDialModule {}
