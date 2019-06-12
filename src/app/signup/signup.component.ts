import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private data:DataService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  signup(email,name,password,check){
    if(password.value!=check.value){
      alert("패스워드가 일치하지 않습니다")
    }
    else{
      this.data.signup(email.value, name.value, password.value).subscribe(
        response=> {
          alert("회원가입이 완료되었습니다"),
          this.router.navigate(["login"])
        },
        response=> {
          alert("다시 시도해주세요")
        }
      )
    }
  }
  gohome(){
    this.router.navigate([''])
  }

}
