import { Component, OnInit } from '@angular/core';
import { Auth, getAuth, user } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = true;

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    // user(this.auth).subscribe(user => this.isLoggedIn = !!user);
  }

  login() {
    // signInWithPopup(getAuth(), new GoogleAuthProvider);
  }

  logout() {
    // getAuth().signOut();
  }
}
