import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Hotel } from "../hotel.model";
import { HotelService } from "../hotel.service";

@Component({
  selector: 'app-hotel-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./hotel-list.component.css']

})

export class FavListComponent implements OnInit, OnDestroy{
  /*posts = [
    {title: "Primer post", content: "Este es el contenido del primer post" },
    {title: "Segundo post", content: "Este es el contenido del segundo post" },
    {title: "Tercer post", content: "Este es el contenido del tercer post" }
  ]*/
  hoteles: Hotel[] = [];
  isLoading = false;
  private hotelesSub: Subscription;

  constructor(public hotelesService: HotelService){

  }
  ngOnInit(){
    this.isLoading = true;
    this.hotelesService.getHoteles();
    this.hotelesSub = this.hotelesService.getHotelesUpdateListener()
    .subscribe((hoteles: Hotel[]) =>{
      this.isLoading = false;
      hoteles.forEach(hotel =>{
        console.log('favorite?', hotel.favorite);
        if(hotel.favorite == "true"){
          this.hoteles.push(hotel);
        }
      });
    });
  }

  ngOnDestroy(){
    this.hotelesSub.unsubscribe();
  }

  Delete(_id:string){
    this.hotelesService.deleteHotel(_id)
    console.log(_id)
    console.log("Eliminado")
  }

  Favorite(id: string, title: string, content: string, image: string, favorite: string){
    this.hotelesService.updateFav(id, title, content, image, favorite);
  }

  /*
  onDelete(postId: string){
    this.postsService.deletePost2(postId)
  }*/
}
