import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  firstName: any = '';
  lastName: any = '';
  fullName = new BehaviorSubject('');
  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.fullName = this.authService.fullName;
  }
  public signUp(email, psw, firstName, lastName) {
    this.authService.SignUp(email, psw);
    this.fullName.next(`${firstName} ${lastName}`);
  }
}
