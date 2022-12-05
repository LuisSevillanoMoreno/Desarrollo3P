import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Hotel } from "../hotel.model";
import { HotelService } from "../hotel.service";

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']

})

export class HotelListComponent implements OnInit, OnDestroy{
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
      this.hoteles = hoteles;
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

  Favorite(){
    this.isLoading = true;
    this.hotelesService.favHotel();
    this.hotelesSub = this.hotelesService.getHotelesUpdateListener()
    .subscribe((hoteles: Hotel[]) =>{
      this.isLoading = false;
      this.hoteles = hoteles;
    });
  }

  /*
  onDelete(postId: string){
    this.postsService.deletePost2(postId)
  }*/
}
