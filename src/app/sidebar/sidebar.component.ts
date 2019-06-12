import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  category: string[]
  recent: string[]

  constructor(
    private data:DataService
  ) { }

  ngOnInit() {
    this.getCategory()
    this.getRecent()
  }

  getCategory(){
    this.data.getCategory().subscribe(
      response=> this.category = response
    )
  }
  getRecent(){
    this.data.getRecent().subscribe(
      response=> this.recent = response
    )
  }
  search(category){
    this.data.Categoryview(category['id'])
  }
}
