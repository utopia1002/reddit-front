import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DataService } from './data.service';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private router:Router, private data:DataService){}

  canActivate():boolean{
    if(!this.data.isAuthenicated()){
      console.log("invalid token");
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
