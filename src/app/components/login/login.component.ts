import { HttpClient } from '@angular/common/http';
import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('name')
  nameKey!: ElementRef;

  loginUser!: FormGroup;
  constructor(private fb: FormBuilder, private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.loginUser = this.fb.group({
      email : ['',Validators.required],
      password : ['',Validators.required]
    })
  }

  login(){
    this.http.get<any>("http://localhost:3000/registeredUsers")
    .subscribe(res => {
      const user = res.find((a:any) => {
        return a.email === this.loginUser.value.email && a.password === this.loginUser.value.password
      });
      if(user){
        alert("Login Successfull!!");
        this.loginUser.reset();
        this.router.navigate(['/dashboard'])
      }else{
        alert("Something went wrong!");
      }
    }, err => {
      alert("Something went wrong!");
      console.log(err);
    })

  }

  storeName(){
    localStorage.setItem("name", this.nameKey.nativeElement.value)
  }
}
