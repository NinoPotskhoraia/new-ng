import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { TodoService } from 'src/app/features/services/todo.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import {
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  collection,
  Firestore,
  getDocs,
} from '@angular/fire/firestore';
import { loadBundle } from 'firebase/firestore';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit {
  task: any = '';
  todos = new BehaviorSubject([] as any[]);
  updating = new BehaviorSubject('');
  isChecked: any = false;
  done: any = false;
  constructor(public todoService: TodoService, public auth: AuthService) {}

  ngOnInit(): void {
    this.todos = this.todoService.todos;
    this.todoService.getTasks();
    console.log('hi');
  }

  public checkValue(id) {
    this.todoService.changeStatus(this.isChecked, id);
    console.log(this.isChecked);

    setTimeout(() => {
      this.todoService.getTasks();
      this.task = '';
      this.updating.next('');
    }, 400);
  }

  public add() {
    this.isChecked = false;
    if (this.task) {
      this.todoService.postTask({
        activity: this.task,
        status: false,
      });
    }

    setTimeout(() => {
      this.todoService.getTasks();
    }, 400);
    this.task = '';
  }

  public delete(task: any) {
    this.todoService.deleteTask(task);
    setTimeout(() => {
      this.todoService.getTasks();
    }, 400);
  }

  public update(id: any, data: any) {
    this.task = data;
    this.updating.next(id);
  }

  public submitUpdated() {
    this.todoService.updateTask(this.task, this.updating.value);
    setTimeout(() => {
      this.todoService.getTasks();
      this.task = '';
      this.updating.next('');
    }, 400);
  }
}
