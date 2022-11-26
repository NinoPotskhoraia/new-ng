import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Signup } from '../../interfaces/signup';
import { passwordValidator } from '../../validator/password-validator';
import { BehaviorSubject } from 'rxjs';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  namee = new BehaviorSubject('');
  showPsw = faEye;
  hidePsw = faEyeSlash;
  inputType = 'password';
  @Output() register = new EventEmitter<Signup>();

  constructor(public authService: AuthService) {}
  regForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirm: new FormControl('', Validators.required),
    },
    { validators: passwordValidator }
  );

  ngOnInit(): void {
    this.namee = this.authService.name;
  }

  public show(): void {
    this.inputType = 'text';
  }

  public hide(): void {
    this.inputType = 'password';
  }

  public signUp(): void {
    this.register.emit(this.regForm.getRawValue() as Signup);
    this.namee.next(this.name.value);
  }

  public changeMode(): void {
    this.authService.loginModeOn.next(true);
    this.authService.registerModeOn.next(false);
  }

  get name() {
    return this.regForm.get('name');
  }

  get email() {
    return this.regForm.get('email');
  }

  get password() {
    return this.regForm.get('password');
  }

  get confirm() {
    return this.regForm.get('confirm');
  }
}
