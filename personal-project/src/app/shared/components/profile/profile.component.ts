import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoService } from 'src/app/features/services/todo.service';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  fullName = new BehaviorSubject('');
  data: any = {};
  user: any = {};
  constructor(
    public auth: AuthService,
    public todoService: TodoService,
    public profileService: ProfileService
  ) {}
  completed = new BehaviorSubject([] as any[]);
  pending = new BehaviorSubject([] as any[]);

  ngOnInit(): void {
    this.profileService.getName();
    this.fullName = this.profileService.fullName;
    this.completed = this.todoService.completed;
    this.pending = this.todoService.pending;
    this.todoService.getCompleted();
    this.todoService.getPending();
  }
}
