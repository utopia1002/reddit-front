import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  post : string;

  constructor(
    private data:DataService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    }

  ngOnInit() {
    this.getPost()
  }

  getPost(){
    const id =+ this.route.snapshot.paramMap.get('id')
    this.data.PostDetail(id).subscribe(
      response=> this.post = response
    )
  }

  postedit(){
    const id =+ this.route.snapshot.paramMap.get('id')
    this.router.navigate(['/post/edit/', id])
  }

  postremove(){
    const id =+ this.route.snapshot.paramMap.get('id')
    if(this.data.getToken()){
      this.data.PostRemove(id).subscribe(
        response=> {
          alert("글 삭제 완료")
          this.router.navigate(['../'])
        },
        response=> alert("글 작성자가 아니거나 오류가 발생했습니다")
      )
    }
    else{
      this.router.navigate(['login'])
    }
  }
}
