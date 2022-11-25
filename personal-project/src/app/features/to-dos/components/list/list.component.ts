import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoService } from 'src/app/features/services/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(public todoService: TodoService) {}
  todos = new BehaviorSubject([] as any[]);
  ngOnInit(): void {
    this.todos = this.todoService.todos;

    this.todoService.getTasks();
  }

  public addTask(value) {
    if (value) {
      this.todoService.postTask({
        activity: value,
        status: false,
      });
      setTimeout(() => {
        this.todoService.getTasks();
      }, 400);
    }
  }

  public changeStatus(id) {
    this.todoService.changeStatus(id);

    setTimeout(() => {
      this.todoService.getTasks();
    }, 400);
  }

  public deleteTask(id) {
    this.todoService.deleteTask(id);
    setTimeout(() => {
      this.todoService.getTasks();
    }, 400);
  }

  public updateTask(task) {
    this.todoService.updateTask(task);
    setTimeout(() => {
      this.todoService.getTasks();
    }, 400);
  }
}
