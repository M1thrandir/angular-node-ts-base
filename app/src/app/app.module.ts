import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { CommonModule, LocationStrategy, HashLocationStrategy } from "@angular/common"
import { RouterModule } from "@angular/router"
import { HttpModule } from "@angular/http"

import { MaterialModule } from "./material.module"
import { appRoutes } from "./app.routes"
import { AppComponent } from "./app.component"
import { UdhNavbarComponent } from "./udh-navbar/udh-navbar.component"
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component"
import { LoginComponent } from "./login/login.component"
import { LogoutComponent } from "./logout/logout.component"
import { UdhNavbarModule } from "./udh-navbar/udh-navbar.module"
import { LoggedInGuard } from "./models/logged-in.guard"
import { UserService } from "./services"
import { RoutinesComponent } from "./routines/routines.component";
import { UdhFabSpeedDialModule } from "./udh-fab-speed-dial/udh-fab-speed-dial.module";
import { MortgageLoanComponent } from "./mortgage-loan/mortgage-loan.component";
import { RoutineItemComponent } from "./routine-item/routine-item.component";
import { UdhInputContainerComponent } from "./udh-input-container/udh-input-container.component";
import { UdhListContainerComponent } from "./udh-list-container/udh-list-container.component"
import { UdhCardComponent } from "./udh-list-container/udh-card/udh-card.component" 
import { UdhCardDetailsComponent } from "./udh-list-container/udh-card-details/udh-card-details.component" 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    PageNotFoundComponent,
    RoutinesComponent,
    MortgageLoanComponent,
    RoutineItemComponent,
    UdhInputContainerComponent,
    UdhListContainerComponent,
    UdhCardComponent,
    UdhCardDetailsComponent,
  ],
  imports: [
    UdhNavbarModule,
    UdhFabSpeedDialModule,
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
  ],
  providers: [
    LoggedInGuard,
    { provide: UserService, useClass: UserService },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
