import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  name = new BehaviorSubject('');
  data: any = {};
  user: any = {};

  constructor(
    public firestore: Firestore,
    public auth: AuthService,
    public afAuth: AngularFireAuth
  ) {}

  getName() {
    this.afAuth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.user = JSON.parse(localStorage.getItem('user')!);
      const db = collection(this.firestore, 'users/' + this.user.uid, 'name');
      getDocs(db)
        .then((res) => {
          this.data = [
            ...res.docs.map((item) => {
              return { ...item.data() };
            }),
          ];
          this.name.next(this.data[0].name);
          this.name = this.auth.name;
          console.log(this.data);
        })
        .catch((err) => console.log(err.message));
    });
  }
}
