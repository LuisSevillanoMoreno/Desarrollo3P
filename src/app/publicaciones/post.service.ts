import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class PostService{
  private posts: Post[] = []; //primera matriz
  private postsUpdate = new Subject<Post[]>();

  constructor (private http: HttpClient, private router: Router){

  }

  getPost(){
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api.posts')
    .pipe(map((postData) => {
      return postData.posts.map(post =>{
        return{
        title: post.title,
        content: post.content,
        id: post._id
      };
    });
  }))
    .subscribe((transformedPosts)=>{
      this.posts = transformedPosts;
      this.postsUpdate.next([...this.posts]);
    });
  }

  getPostU(id: string){
    return this.http.get<{_id: string, title: string, content: string}>
    ("http://localhost:3000/api.posts/" + id)
  }

  getPostsUpdateListener(){
    return this.postsUpdate.asObservable();
  }

  addPost(title: string, content: string){
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{message: string}>('http://localhost:3000/api.posts', post) //agregar después de message postId: string
    .subscribe((responseData)=>{
      console.log(responseData.message); //en luhgar const id = responseData.postId
      this.posts.push(post); //antes de esta linea colocar post.id = id;
      this.postsUpdate.next([...this.posts]);
      this.router.navigate(["/"])
    });
  }

  deletePost(id: String){
    this.http.delete('http://localhost:3000/api.posts/'+id)
    .subscribe(()=>{
      console.log("Se ha eliminado")
      const index = this.posts.findIndex(postid=>{
        return postid.id == id
      })
      this.posts.splice(index, 1)
      this.postsUpdate.next([...this.posts])
    });
  }

  updatePost(id: string, title: string, content: string){
    const post: Post = {id: id, title: title, content: content}
    this.http.put('http://localhost:3000/api.posts/' + id, post)
    .subscribe(response => {
      const updatePost = [...this.posts]
      const oldPostIndex = updatePost.findIndex(p => p.id === post.id);
      updatePost[oldPostIndex] = post
      this.posts = updatePost;
      this.postsUpdate.next([...this.posts]);
      this.router.navigate(["/"]);
    });
  }

  /*deletePost2(postId: string){
    this.http.delete('http://localhost:3000/api.posts/'+ postId)
    .subscribe(()=>{
      const updatePosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatePosts;
      this.postsUpdate.next([...this.posts]);
    })
  }*/
}
