import { Routes } from "@angular/router"

import { LoginComponent } from "./login/login.component"
import { LoggedInGuard } from "./models/logged-in.guard"
import { LogoutComponent } from "./logout/logout.component"
import { MortgageLoanComponent } from "./mortgage-loan/mortgage-loan.component"
import { RoutinesComponent } from "./routines/routines.component"

export const appRoutes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent, canActivate: [LoggedInGuard] },
  { path: "account", component: LoginComponent },
  {
    path: "uSchedule",
    children: [
      { path: "schedule", component: LoginComponent },
      { path: "students", component: LoginComponent },
      { path: "tasks", component: LoginComponent },
    ],
  },
  { path: "loan", component: MortgageLoanComponent },
  {
    path: "uRoutine",
    children: [
      { path: "routines", component: RoutinesComponent },
    ],
  },
]
