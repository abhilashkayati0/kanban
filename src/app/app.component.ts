import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kanban board';
  tasks = [
    { name: 'task 10', stage: 3 },
    { name: 'task 1', stage: 0 },
    { name: 'task 2', stage: 0 },
    { name: 'task 3', stage: 0 },
    { name: 'task 4', stage: 1 },
    { name: 'task 5', stage: 1 },
    { name: 'task 6', stage: 1 },
    { name: 'task 7', stage: 2 },
    { name: 'task 8', stage: 2 },
    { name: 'task 9', stage: 3 },
  ];
}
