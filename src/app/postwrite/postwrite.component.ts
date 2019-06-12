import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-postwrite',
  templateUrl: './postwrite.component.html',
  styleUrls: ['./postwrite.component.css']
})
export class PostwriteComponent implements OnInit {

  category: string[]
  selectedOption: string;

  constructor(
    private data:DataService,
    private router:Router,
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.data.getCategory().subscribe(
      response => this.category = response
    )
  }
  write(title,content){
    if(!title.value){
      alert("제목을 입력해주세요")
    }
    else if(!content.value){
      alert("링크를 입력해주세요")
    }
    else if(!this.selectedOption){
      alert("카테고리를 정해주세요")
    }
    else{
      this.data.postwrite(title.value, content.value, this.selectedOption)
      .subscribe(
        response=> {
          alert("글 등록 완료")
          this.router.navigate([""])
        },
        response=> alert("다시 시도 해주세요")
      )
    }
  }

}
