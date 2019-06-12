import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginmenu : string;

  constructor(
    private data:DataService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.initCheck()
    this.loginCheck()
  }

  initCheck():void{
    if(this.data.isAuthenicated()){
      this.loginmenu = "로그아웃"
    }
    else{
      this.loginmenu = "로그인/회원가입"
    }
  }

  loginCheck():void{
    this.data.loginevent.subscribe(
      response=> this.loginmenu = response
    )
  }

  login():void{
    if(!this.data.isAuthenicated()){
      this.router.navigate(["login"])
    }
    else{
      this.logout()
      this.router.navigate([""])
    }
  }

  logout():void{
    this.data.logout()
    console.log("로그아웃")
  }
}
