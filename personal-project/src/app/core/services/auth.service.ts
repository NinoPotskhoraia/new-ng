import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: any = {};
  name = new BehaviorSubject('');
  loginModeOn = new BehaviorSubject(true);
  registerModeOn = new BehaviorSubject(false);
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public afs: AngularFirestore,
    public ngZone: NgZone,
    public firestore: Firestore
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  SignIn(loginData) {
    return this.afAuth
      .signInWithEmailAndPassword(loginData.email, loginData.password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/to-do']);
            console.log(this.afAuth.authState);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignUp(signupData) {
    return this.afAuth
      .createUserWithEmailAndPassword(signupData.email, signupData.password)
      .then((result) => {
        this.SetUserData(result.user);
        this.loginModeOn.next(true);
        const dbInstance = collection(
          this.firestore,
          `users/${result.user?.uid}`,
          'tasks'
        );
        addDoc(dbInstance, { activity: '' }).then(
          () => {
            console.log('data sent');
          },
          (err) => {
            alert(err.message);
          }
        );
        const db = collection(
          this.firestore,
          `users/${result.user?.uid}`,
          'name'
        );
        addDoc(db, { name: `${this.name.value}` }).then(
          () => {
            console.log('data sent');
          },
          (err) => {
            alert(err.message);
          }
        );
        this.router.navigate(['auth']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['auth']);
    });
  }
}
