import { Component } from "@angular/core";
import { DisplayBoardTaskComponent } from "./task/display-board-task.component";

@Component({
    selector: "app-dashboard",
    standalone: true,
    template: `Welcome!
    
    <app-display-board-task/>
    `,
    imports: [DisplayBoardTaskComponent]
})

export class DashboardComponent {

}