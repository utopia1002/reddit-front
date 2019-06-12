import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  TOKEN_NAME = "jwt_token";

  @Output() categoryclick = new EventEmitter();
  @Output() loginevent = new EventEmitter();

  constructor(
    private http:HttpClient,
    private router:Router,
    private jwtHelper:JwtHelperService,
  ) { }

  getPost():Observable<string[]>{
    return this.http.get<string[]>('/api/post/')
  }

  orderby_rec(order){
    return this.http.get<string[]>('/api/post/',
      {headers: {orderby:"like", order: order }})
  }

  orderby_date(order){
    return this.http.get<string[]>('/api/post/',
      {headers: {orderby:"date", order: order }})
  }

  getCategory():Observable<string[]>{
    return this.http.get<string[]>('/api/category/')
  }
  getRecent():Observable<string[]>{
    return this.http.get<string[]>('/api/post/recent')
  }
  Categoryview(categoryid){
    this.router.navigate(['category/'+categoryid])
  }
  PostfromCategory(categoryid):Observable<string[]>{
    return this.http.get<string[]>('/api/category/'+categoryid+'/')
  }
  PostDetail(postid):Observable<string>{
    return this.http.get<string>('/api/post/'+postid+'/')
  }
  login(credential):Observable<string>{
    return this.http.post<string>('api-token-auth/',credential)
      .pipe(tap(res=> {
        this.setToken(res['token'])
      }
    ))
  }
  setToken(token:string){
    localStorage.setItem(this.TOKEN_NAME, token)
  }
  getToken():string{
    return localStorage.getItem(this.TOKEN_NAME)
  }
  removeToken():void{
    localStorage.removeItem(this.TOKEN_NAME)
  }
  getUUID(){                                  //추가
    return this.jwtHelper.decodeToken(this.getToken())['user_id']
  }
  logout():void{
    this.removeToken()
    this.logoutEvent()
  }
  isAuthenicated():boolean{
    const token = this.getToken()
    return token ?! this.isTokenExpired(token):false
  }
  isTokenExpired(token:string):boolean{
    return this.jwtHelper.isTokenExpired(token)
  }
  loginEvent(){
    this.loginevent.emit(this.loginEventcontent())
  }
  loginEventcontent(){
    return "로그아웃"
  }
  logoutEvent(){
    this.loginevent.emit(this.logoutEventcontent())
  }
  logoutEventcontent(){
    return "로그인/회원가입"
  }
  postwrite(title, content, category){
    let postdata = {content: title, category:category, link:content}
    return this.http.post('/api/post/add/', postdata,
     {headers: {Authorization: "JWT "+this.getToken()}})
  }
  postEditView(postid):Observable<string>{
    return this.http.get<string>('/api/post/'+postid+'/edit/',
     {headers: {Authorization: "JWT "+this.getToken()}})
  }
  postedit(postid, title, content, category){
    let postdata = {content: title, category:category, link:content}
    return this.http.post('/api/post/'+postid+'/edit/', postdata,
     {headers: {Authorization: "JWT "+this.getToken()}})
  }
  PostRemove(postid){
    return this.http.delete('/api/post/'+postid+'/edit/',
     {headers: {Authorization: "JWT "+this.getToken()}})
  }
  recommandUp(postid){
    var rec_data = {"recommand":"up"}
    return this.http.post('/api/post/'+postid+'/recommand/', rec_data,
     {headers: {Authorization: "JWT "+this.getToken()}})
  }
  recommandDown(postid){
    var rec_data = {"recommand":"down"}
    return this.http.post('/api/post/'+postid+'/recommand/', rec_data,
    {headers: {Authorization: "JWT "+this.getToken()}})
  }
  signup(email, name, password){
    var user_info = {"email":email, "name":name, "password":password}
    return this.http.post('/api/signup/', user_info)
  }
}
