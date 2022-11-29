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
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit {
  updating = new BehaviorSubject('');
  status = new BehaviorSubject(false);

  @Output() sendActivity = new EventEmitter<string>();
  @Output() sendStatus = new EventEmitter<string>();
  @Output() toDelete = new EventEmitter<string>();
  @Output() toUpdate = new EventEmitter<string>();
  @Input() tasks: Post[] = [];
  constructor(public todoService: TodoService, public auth: AuthService) {}

  activity = new FormControl('', Validators.required);
  check = new FormControl(false);
  isChecked = new FormControl(true);

  ngOnInit(): void {
    this.updating = this.todoService.updating;
    this.status = this.todoService.status;

    console.log('hi');
  }

  public add(value) {
    if (value) {
      this.sendActivity.emit(value);
    }

    console.log('a');

    this.activity.reset();
  }

  public checkValue(id: string) {
    this.status.next(true);
    this.sendStatus.emit(id);
    this.check.setValue(false);
  }

  public uncheckValue(id: string) {
    this.status.next(false);
    this.sendStatus.emit(id);
    this.isChecked.setValue(true);
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
}
