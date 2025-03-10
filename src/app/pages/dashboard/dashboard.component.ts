import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post, PostService } from '../../services/post.service';
import { Router, RouteReuseStrategy } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  postForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1)]),
    content: new FormControl('', [Validators.required, Validators.minLength(1)]),
  })

  posts: Post[] = [];
  newPost: Partial<Post> = { title: '', content: '' }

  constructor(private postService: PostService, private router: Router) { }
  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe(
      {
        next: (data) => {
          this.posts = data;
        },
        error(err) {
          console.error(err);
        },
      }
    )
  }
  addPost(p: FormGroup) {
    this.newPost.title = p.value.title,
      this.newPost.content = p.value.content

    this.postService.addPost(this.newPost).subscribe(
      {
        next: (data) => {
          console.log(data),
            this.posts.push(data)
        },
        error(err) {
          console.error(err);
        },
      }
    )
  }
  editPost(postObj: Post) {
    const updatedContent = prompt("edit content", postObj.content);
    if (updatedContent !== null) {

      this.postService.updatePost(postObj.id, { content: updatedContent }).subscribe(
        {
          next: () => {
          postObj.content=updatedContent;
          },
          error(err) {
            alert("update error "+err);
            console.error(err.error);
          },
        }
      )
      // this.loadPosts()            


    }
  }

  deletePost(id: any) {
    if(confirm("are you sure ? this post will get deleted  ")){

      this.postService.deletePost(id || 99999).subscribe(
        {
          next: () => {
            this.posts = this.posts.filter(
              (p: Post) => p.id !== id
            )
          },
          error(err) {
            console.error(err);
          },
        }
      )
    }
  }
}
