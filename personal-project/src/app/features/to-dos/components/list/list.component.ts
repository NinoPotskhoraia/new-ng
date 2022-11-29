import { isNgTemplate } from '@angular/compiler';
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
  todosArr = [];
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
      this.todosArr.push({
        activity: value,
        status: false,
      });
      this.todos.next(this.todosArr);
      setTimeout(() => {
        this.todoService.getTasks();
      }, 200);
    }
  }

  public changeStatus(id) {
    this.todoService.changeStatus(id);

    this.todos.next(this.todosArr);

    setTimeout(() => {
      this.todoService.getTasks();
    }, 200);
  }

  public deleteTask(id) {
    this.todoService.deleteTask(id);
    this.todosArr = this.todos.value;
    this.todosArr = this.todosArr.filter((obj) => obj.id !== id);
    this.todos.next(this.todosArr);
    setTimeout(() => {
      this.todoService.getTasks();
    }, 200);
  }

  public updateTask(task) {
    this.todoService.updateTask(task);
    this.todos.next(this.todosArr);
    setTimeout(() => {
      this.todoService.getTasks();
    }, 200);
  }
}
