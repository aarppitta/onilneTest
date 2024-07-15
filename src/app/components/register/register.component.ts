import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerUser!: FormGroup;

  constructor(private fb:FormBuilder, private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.registerUser = this.fb.group({
      email : ['',Validators.required],
      password : ['',Validators.required],
      cpassword : ['',Validators.required]
    })
  }

  register(){
    this.http.post<any>("http://localhost:3000/registeredUsers",this.registerUser.value)
    .subscribe(res => {
      alert("Registration Successful!");
      this.registerUser.reset();
      this.router.navigate(['login']);
    }, err => {
      alert("Something went Wrong!");
    })
  }
}
