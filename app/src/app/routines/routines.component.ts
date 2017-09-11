import { Component, ElementRef, OnInit } from "@angular/core"

@Component({
  selector: "udh-routines",
  templateUrl: "./routines.component.html",
  styleUrls: ["./routines.component.scss"]
})
export class RoutinesComponent {
  public routineTasks: RoutineTask[] = []

  constructor(private elementRef: ElementRef) {}

  public onNewRoutineTask(): void {
    this.routineTasks.push(new RoutineTask())

  }
}

export class RoutineTask {
  title: string = "New Task"
  description?: string = ""
  icon: string = "mdi mdi-checkbox-marked-circle-outline"
  buttons: TaskButton[] = []
}

export class TaskButton {
  icon: string = ""
  tooltipText: ""
}