import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Login } from '../../interfaces/login';
import { Signup } from '../../interfaces/signup';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  loginModeOn = new BehaviorSubject(true);
  registerModeOn = new BehaviorSubject(false);

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.loginModeOn = this.auth.loginModeOn;
    this.registerModeOn = this.auth.registerModeOn;
  }

  public onRegister(data: Signup): void {
    this.auth.SignUp(data);
  }

  public onLogin(loginData: Login): void {
    this.auth.SignIn(loginData);
  }
}
