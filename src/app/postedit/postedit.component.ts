import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-postedit',
  templateUrl: './postedit.component.html',
  styleUrls: ['./postedit.component.css']
})
export class PosteditComponent implements OnInit {

  category: string[]
  selectedOption: string;
  editingpost: string;

  constructor(
    private data:DataService,
    private router:Router,
    private route:ActivatedRoute,
  ) { }

  id =+ this.route.snapshot.paramMap.get('id')

  ngOnInit() {
    this.editinit()
  }

  editinit(){
    this.data.getCategory().subscribe(
      response => this.category = response
    )
    this.data.postEditView(this.id).subscribe(
      response=> this.editingpost = response,
      response=> {
        alert("작성자만 수정 가능합니다")
        this.router.navigate(['/post/'+this.id])
      },
    )
  }
  edit(title,content){
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
      this.data.postedit(this.id, title.value, content.value, this.selectedOption)
      .subscribe(
        response=> {
          alert("글 수정 완료")
          this.router.navigate([""])
        },
        response=> alert("다시 시도 해주세요")
      )
    }
  }
}
