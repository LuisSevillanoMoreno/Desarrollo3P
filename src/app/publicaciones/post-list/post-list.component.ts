import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../post.model";
import { PostService } from "../post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']

})

export class PostListComponent implements OnInit, OnDestroy{
  /*posts = [
    {title: "Primer post", content: "Este es el contenido del primer post" },
    {title: "Segundo post", content: "Este es el contenido del segundo post" },
    {title: "Tercer post", content: "Este es el contenido del tercer post" }
  ]*/
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;

  constructor(public postsService: PostService){

  }
  ngOnInit(){
    this.isLoading = true;
    this.postsService.getPost();
    this.postsSub = this.postsService.getPostsUpdateListener()
    .subscribe((posts: Post[]) =>{
      this.isLoading = false;
      this.posts = posts;
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

  Delete(_id:string){
    this.postsService.deletePost(_id)
    console.log(_id)
    console.log("Eliminado")
  }

  /*
  onDelete(postId: string){
    this.postsService.deletePost2(postId)
  }*/
}
