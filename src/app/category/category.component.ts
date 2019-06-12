import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  post : string[];
  postid : string;

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
    const id =+this.route.snapshot.paramMap.get('id')
    this.data.PostfromCategory(id).subscribe(
      response=> this.post = response
    )
  }
}
