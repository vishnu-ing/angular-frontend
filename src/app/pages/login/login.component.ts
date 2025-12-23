import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  showPassword = false;
  loading = false;
  error: string | null = null;

  constructor(private router:Router){}

  handleSubmit(){
    this.loading = true;
    this.error = null;

    //      Replace with API Call
    setTimeout(() => {
      if(this.username === 'hr1' && this.password == 'password'){
        localStorage.setItem('token','fake-jwt');
        this.router.navigate(['/']);
      }else{
        this.error = "Invalid Credentials"
      }
      this.loading = false;
    }, 800)

  }
}
