import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Signup } from '../../interfaces/signup';
import { passwordValidator } from '../../validator/password-validator';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  namee = new BehaviorSubject('');
  @Output() register = new EventEmitter<Signup>();

  loginModeOn = new BehaviorSubject(false);
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
    this.loginModeOn = this.authService.loginModeOn;
    this.namee = this.authService.name;
  }

  public signUp(): void {
    this.register.emit(this.regForm.getRawValue() as Signup);
    this.namee.next(this.name.value);
  }

  public changeMode(): void {
    this.loginModeOn.next(true);
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
