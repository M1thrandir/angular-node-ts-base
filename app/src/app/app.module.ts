import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { CommonModule, LocationStrategy, HashLocationStrategy } from "@angular/common"
import { RouterModule } from "@angular/router"
import { HttpModule } from "@angular/http"

// Angular Material 2 Modules
import { MaterialModule } from "./material.module"

// Routes
import { appRoutes } from "./app.routes"

// Components
import { AppComponent } from "./app.component"
import { IconComponent } from "./icon/icon.component"
import { DmhButtonIconComponent } from "./dmh-button-icon/dmh-button-icon.component"
import { NavbarComponent } from "./navbar/navbar.component"
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component"
import { LoginComponent } from "./login/login.component"
import { LogoutComponent } from "./logout/logout.component"

// Services
import { UserService } from "./services"
import { LoggedInGuard } from "./models/logged-in.guard"

@NgModule({
  declarations: [
    AppComponent,
    DmhButtonIconComponent,
    IconComponent,
    LoginComponent,
    LogoutComponent,
    NavbarComponent,
    PageNotFoundComponent,
  ],
  imports: [
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
