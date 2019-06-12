import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private data: DataService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  login(username, password){
    const credential = {email: username.value, password: password.value}
    this.data.login(credential)
    .subscribe(
      response => {
        this.router.navigate([""]),
        this.data.loginEvent(),
        console.log(response)
      },
      response => alert("다시 시도해주세요"),
    )
  }
  signup(){
    this.router.navigate(["signup"])
  }
}
