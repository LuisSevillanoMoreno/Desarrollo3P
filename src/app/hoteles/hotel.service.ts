import { Hotel } from "./hotel.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class HotelService{
  private hoteles: Hotel[] = []; //primera matriz
  private hotelesUpdate = new Subject<Hotel[]>();

  constructor (private http: HttpClient, private router: Router){

  }
  getHoteles(){
    this.http.get<{message: string, hoteles: any}>('http://localhost:3000/api.hoteles/all')
    .pipe(map((hotelData) => {
      return hotelData.hoteles.map(hotel =>{
        return{
        title: hotel.title,
        content: hotel.content,
        id: hotel._id,
        favorite: hotel.favorite,
        imagePath: hotel.imagePath
      };
    });
  }))
    .subscribe((transformedHoteles)=>{
      this.hoteles = transformedHoteles;
      this.hotelesUpdate.next([...this.hoteles]);
    });
  }

  getHotel(id: string){
    return this.http.get<{_id: string, title: string, content: string, imagePath: string, favorite: string}>
    ("http://localhost:3000/api.hoteles/" + id)
  }

  getHotelesUpdateListener(){
    return this.hotelesUpdate.asObservable();
  }

  addHotel(title: string, content: string, image: File, favorite: string){
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    postData.append("favorite", favorite)
    //const hotel: Hotel = {id: null, title: title, content: content};
    this.http.post<{message: string, hotel: Hotel}>('http://localhost:3000/api.hoteles', postData) //agregar después de message postId: string
    .subscribe((responseData)=>{
      console.log(responseData.message); //en luhgar const id = responseData.postId
      const hotel: Hotel = {
        id: responseData.hotel.id,
        title: title,
        content: content,
        imagePath: responseData.hotel.imagePath,
        favorite: "false" }
      this.hoteles.push(hotel); //antes de esta linea colocar post.id = id;
      this.hotelesUpdate.next([...this.hoteles]);
      this.router.navigate(["/all"])
    });
  }

  deleteHotel(id: String){
    this.http.delete('http://localhost:3000/api.hoteles/'+id)
    .subscribe(()=>{
      console.log("Se ha eliminado")
      const index = this.hoteles.findIndex(hotelid=>{
        return hotelid.id == id
      })
      this.hoteles.splice(index, 1)
      this.hotelesUpdate.next([...this.hoteles])
    });
  }

  updateFav(id: string, title: string, content: string, image: File | string, favorite: string){
    let postData: Hotel | FormData;
    if(typeof image === "object"){
      postData = new FormData();
      postData.append("id", id)
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", (image), title);
      postData.append("favorite", favorite);
    }else{
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        favorite: favorite
      };
    }
    this.http.put('http://localhost:3000/api.hoteles/' + id, postData)
    .subscribe(response => {
      const updateHotel = [...this.hoteles]
      const oldHotelIndex = updateHotel.findIndex(p => p.id === id);
      const hotel: Hotel = {
        id: id,
        title: title,
        content: content,
        imagePath: "",
        favorite: favorite
      }
      updateHotel[oldHotelIndex] = hotel
      this.hoteles = updateHotel;
      this.hotelesUpdate.next([...this.hoteles]);
      this.router.navigate(["/fav"])
    });
    };

  updateHotel(id: string, title: string, content: string, image: File | string, favorite: string){
    let postData: Hotel | FormData;
    if(typeof image === "object"){
      postData = new FormData();
      postData.append("id", id)
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", (image), title);
      postData.append("favorite", favorite)
    }else{
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        favorite: favorite
      };
    }
    this.http.put('http://localhost:3000/api.hoteles/' + id, postData)
    .subscribe(response => {
      const updateHotel = [...this.hoteles]
      const oldHotelIndex = updateHotel.findIndex(p => p.id === id);
      const hotel: Hotel = {
        id: id,
        title: title,
        content: content,
        imagePath: "",
        favorite: favorite
      }
      updateHotel[oldHotelIndex] = hotel
      this.hoteles = updateHotel;
      this.hotelesUpdate.next([...this.hoteles]);
      this.router.navigate(["/all"])
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
