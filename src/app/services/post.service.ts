import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Post{
  title:string,
  content:string,
  id?:any
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url :string = "https://localhost:3000/api/posts";

  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get<Post[]>(this.url);
  }

  addPost(p:Partial<Post>){
    return this.http.post<Post>(this.url,p);
  }

  updatePost(id:any, data:{content:string}){
    return this.http.put<Post>(`${this.url}/${id}`,data);
  }

  deletePost(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
