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
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  @Output() signIn = new EventEmitter<Login>();
  showPsw = faEye;
  hidePsw = faEyeSlash;
  inputType = 'password';
  constructor(public authService: AuthService) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  ngOnInit(): void {}
  public onLogin(): void {
    this.signIn.emit(this.loginForm.getRawValue() as Login);
  }

  public show(): void {
    this.inputType = 'text';
  }

  public hide(): void {
    this.inputType = 'password';
  }

  public changeMode(): void {
    this.authService.registerModeOn.next(true);
    this.authService.loginModeOn.next(false);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
