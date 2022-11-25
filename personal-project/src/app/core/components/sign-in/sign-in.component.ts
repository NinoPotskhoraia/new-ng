import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../interfaces/login';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  @Output() signIn = new EventEmitter<Login>();
  registerModeOn = new BehaviorSubject(false);
  constructor(public authService: AuthService) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  ngOnInit(): void {
    this.registerModeOn = this.authService.registerModeOn;
  }
  public onLogin(): void {
    this.signIn.emit(this.loginForm.getRawValue() as Login);
  }

  public changeMode(): void {
    this.registerModeOn.next(true);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
