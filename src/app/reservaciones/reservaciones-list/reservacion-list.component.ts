import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Reservacion } from "../reservacion.model";
import { ReservacionService } from "../reservacion.service";

@Component({
  selector: 'app-reservacion-list',
  templateUrl: './reservacion-list.component.html',
  styleUrls: ['./reservacion-list.component.css']

})

export class ReservacionListComponent implements OnInit, OnDestroy{
  /*posts = [
    {title: "Primer post", content: "Este es el contenido del primer post" },
    {title: "Segundo post", content: "Este es el contenido del segundo post" },
    {title: "Tercer post", content: "Este es el contenido del tercer post" }
  ]*/
  reservaciones: Reservacion[] = [];
  isLoading = false;
  private reservacionesSub: Subscription;

  constructor(public reservacionesService: ReservacionService){

  }
  ngOnInit(){
    this.isLoading = true;
    this.reservacionesService.getReservaciones();
    this.reservacionesSub = this.reservacionesService.getReservacionUpdateListener()
    .subscribe((reservaciones: Reservacion[]) =>{
      this.isLoading = false;
      this.reservaciones = reservaciones;
    });
  }

  ngOnDestroy(){
    this.reservacionesSub.unsubscribe();
  }

  Delete(_id:string){
    this.reservacionesService.deleteReservacion(_id)
    console.log(_id)
    console.log("Eliminado")
  }

  /*
  onDelete(postId: string){
    this.postsService.deletePost2(postId)
  }*/
}
