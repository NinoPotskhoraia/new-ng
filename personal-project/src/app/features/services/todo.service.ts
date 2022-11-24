import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  collection,
  Firestore,
  getDocs,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(public afAuth: AngularFireAuth, public firestore: Firestore) {}

  data: any = [];
  public user: any = {};
  todos = new BehaviorSubject([] as any[]);
  completed = new BehaviorSubject([] as any[]);
  pending = new BehaviorSubject([] as any[]);

  postTask(task: any) {
    this.afAuth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.user = JSON.parse(localStorage.getItem('user')!);
      const db = collection(this.firestore, 'users/' + this.user.uid, 'tasks');
      addDoc(db, task).then(
        () => {
          console.log('data sent');
        },
        (err) => {
          alert(err.message);
        }
      );
    });
  }

  getTasks() {
    this.afAuth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.user = JSON.parse(localStorage.getItem('user')!);
      const db = collection(this.firestore, 'users/' + this.user.uid, 'tasks');
      getDocs(db)
        .then((res) => {
          this.data = [
            ...res.docs.map((item) => {
              return { ...item.data(), id: item.id };
            }),
          ];
          this.todos.next(this.data);
          console.log(this.data);
        })
        .catch((err) => console.log(err.message));
    });
  }

  getCompleted() {
    this.afAuth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.user = JSON.parse(localStorage.getItem('user')!);
      const db = collection(this.firestore, 'users/' + this.user.uid, 'tasks');
      getDocs(db)
        .then((res) => {
          this.data = [
            ...res.docs.map((item) => {
              return { ...item.data(), id: item.id };
            }),
          ];
          this.completed.next(this.data.filter((item) => item.status === true));
          console.log(this.data);
        })
        .catch((err) => console.log(err.message));
    });
  }

  getPending() {
    this.afAuth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.user = JSON.parse(localStorage.getItem('user')!);
      const db = collection(this.firestore, 'users/' + this.user.uid, 'tasks');
      getDocs(db)
        .then((res) => {
          this.data = [
            ...res.docs.map((item) => {
              return { ...item.data(), id: item.id };
            }),
          ];
          this.pending.next(this.data.filter((item) => item.status === false));
          console.log(this.data);
        })
        .catch((err) => console.log(err.message));
    });
  }

  updateTask(newValue, id) {
    this.afAuth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.user = JSON.parse(localStorage.getItem('user')!);
      const db = collection(this.firestore, 'users/' + this.user.uid, 'tasks');
      const dataToUpdate = doc(db, id);
      const updatedTask = { activity: newValue, status: false };
      updateDoc(dataToUpdate, updatedTask)
        .then(() => {
          console.log('data updated');
        })
        .catch((err) => {
          alert(err.message);
        });
    });
  }

  changeStatus(newValue, id) {
    this.afAuth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.user = JSON.parse(localStorage.getItem('user')!);
      const db = collection(this.firestore, 'users/' + this.user.uid, 'tasks');
      const dataToUpdate = doc(db, id);
      const updatedStatus = { status: newValue };
      updateDoc(dataToUpdate, updatedStatus)
        .then(() => {
          console.log('data updated');
        })
        .catch((err) => {
          alert(err.message);
        });
    });
  }

  deleteTask(id: any) {
    this.afAuth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.user = JSON.parse(localStorage.getItem('user')!);
      const db = collection(this.firestore, 'users/' + this.user.uid, 'tasks');

      const dataToDelete = doc(db, id);

      deleteDoc(dataToDelete)
        .then(() => {
          console.log('data deleted');
        })
        .catch((err) => {
          alert(err.message);
        });
    });
  }
}
