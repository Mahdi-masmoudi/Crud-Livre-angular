import { Component } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private authserv: AuthService, private router: Router) {}

  user: User = new User();
  confirmPassword = '';
  passwordMismatch = false;

  Ajoutuser = () => {
    if (this.user.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }
    this.passwordMismatch = false;
    this.authserv.signUp(this.user).subscribe((data) => {
      this.router.navigate(['login']);
    });

    console.log('User registered successfully!');
  };
}
