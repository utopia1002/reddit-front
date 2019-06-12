import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'  //!import
import { Router } from '@angular/router';  //추가

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  post: string[];  //!post는 여러개가 될 수 있으므로 string[]타입으로
  user_id : string;

  order_by : string;
  order : string;

  constructor(
    private data:DataService,  //!service명을 data로 명명합시다.
    private router:Router,
  ) { }

  ngOnInit() {
    this.getPost()
    this.logoutChecker()
    this.user_id = this.data.getUUID()

  }
  //!getPost 함수는 data서비스의 getPost를 실행,구독 후 responsne를 post에 저장
  getPost(){
    console.log("getPost")
    this.data.getPost().subscribe(
      response=> {
        this.post = response
      }
    )
  }
  logoutChecker(){
    this.data.loginevent.subscribe(
      resposne=> this.user_id="need login"
    )
  }
  recommandUp(postid){
    this.data.recommandUp(postid).subscribe(
      response=> this.getPost(),
      response=> alert("추천에 실패했습니다. 재로그인 후 다시 시도해주세요")
    )
  }
  recommandDown(postid){
    this.data.recommandDown(postid).subscribe(
      response=> this.getPost(),
      response=> alert("비추에 실패했습니다. 재로그인 후 다시 시도해주세요")
    )
  }
  orderby_rec(){
    if(this.order=="positive"){
      this.order = "negative"
    }
    else{
      this.order = "positive"
    }
    console.log(this.order)
    this.data.orderby_rec(this.order).subscribe(
      response => {
        this.post = response,
        console.log(this.post)
      },
      response => console.log("failed")
    )}
  orderby_date(){
    if(this.order=="positive"){
      this.order = "negative"
    }
    else{
      this.order = "positive"
    }
    console.log(this.order)
    this.data.orderby_date(this.order).subscribe(
      response => {
        this.post = response,
        console.log(this.post)
      },
      response => console.log("failed")
    )}
  }
