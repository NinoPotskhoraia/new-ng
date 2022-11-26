import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { TodoService } from 'src/app/features/services/todo.service';
import { ProfileService } from '../../services/profile.service';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss'],
})
export class ProfileDataComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public todoService: TodoService,
    public profileService: ProfileService
  ) {}
  completed = new BehaviorSubject([] as any[]);
  pending = new BehaviorSubject([] as any[]);
  name = new BehaviorSubject('');
  filmIcon = faFilm;

  ngOnInit(): void {
    this.profileService.getName();
    this.name = this.profileService.name;
    this.completed = this.todoService.completed;
    this.pending = this.todoService.pending;
    this.todoService.getCompleted();
    this.todoService.getPending();
  }
}
