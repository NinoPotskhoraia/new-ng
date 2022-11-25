import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { TodoService } from 'src/app/features/services/todo.service';
import { FormControl, Validators } from '@angular/forms';
import { Send } from '../../interfaces/send';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit {
  updating = new BehaviorSubject('');

  @Output() sendActivity = new EventEmitter<string>();
  @Output() sendStatus = new EventEmitter<object>();
  @Output() toDelete = new EventEmitter<string>();
  @Output() toUpdate = new EventEmitter<string>();
  @Input() tasks: Post[] = [];
  constructor(public todoService: TodoService, public auth: AuthService) {}

  activity = new FormControl('', Validators.required);
  isChecked = new FormControl(false);

  ngOnInit(): void {
    this.updating = this.todoService.updating;

    console.log('hi');
  }

  public add(value) {
    this.sendActivity.emit(value);
    this.activity.reset();
  }

  public checkValue(id: string, status: boolean) {
    this.sendStatus.emit({ id, status });
  }

  public delete(id: string) {
    this.toDelete.emit(id);
  }

  public update(id: string, task: string) {
    this.updating.next(id);
    this.activity.setValue(task);
  }

  public submitUpdated(task: string) {
    this.toUpdate.emit(task);
    this.updating.next('');
    this.activity.reset();
  }

  // public checkValue(id) {
  //   this.todoService.changeStatus(this.isChecked, id);
  //   console.log(this.isChecked);

  //   setTimeout(() => {
  //     this.todoService.getTasks();
  //     this.task = '';
  //     this.updating.next('');
  //   }, 400);
  // }

  // public add() {
  //   this.isChecked = false;
  //   if (this.task) {
  //     this.todoService.postTask({
  //       activity: this.task,
  //       status: false,
  //     });
  //   }

  //   setTimeout(() => {
  //     this.todoService.getTasks();
  //   }, 400);
  //   this.task = '';
  // }

  // public delete(task: any) {
  //   this.todoService.deleteTask(task);
  //   setTimeout(() => {
  //     this.todoService.getTasks();
  //   }, 400);
  // }

  // public update(id: any, data: any) {
  //   this.task = data;
  //   this.updating.next(id);
  // }

  // public submitUpdated() {
  //   this.todoService.updateTask(this.task, this.updating.value);
  //   setTimeout(() => {
  //     this.todoService.getTasks();
  //     this.task = '';
  //     this.updating.next('');
  //   }, 400);
  // }
}
