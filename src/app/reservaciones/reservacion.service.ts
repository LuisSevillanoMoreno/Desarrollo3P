import { Reservacion } from "./reservacion.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class ReservacionService{
  private reservaciones: Reservacion[] = []; //primera matriz
  private reservacionesUpdate = new Subject<Reservacion[]>();

  constructor (private http: HttpClient, private router: Router){

  }

  getReservaciones(){
    this.http.get<{message: string, reservaciones: any}>('http://localhost:3000/api.reservaciones/allRsv')
    .pipe(map((reservacionData) => {
      return reservacionData.reservaciones.map(reservacion =>{
        return{
        title: reservacion.title,
        solicitante: reservacion.solicitante,
        habitaciones: reservacion.habitaciones,
        direccion: reservacion.direccion,
        telefonoSol: reservacion.telefonoSol,
        id: reservacion._id
      };
    });
  }))
    .subscribe((transformedReservaciones)=>{
      this.reservaciones = transformedReservaciones;
      this.reservacionesUpdate.next([...this.reservaciones]);
    });
  }

  getReservacion(id: string){
    return this.http.get<{_id: string, title: string, solicitante: string, habitaciones: number, direccion: string,
      telefonoSol: string}>
    ("http://localhost:3000/api.reservaciones/" + id)
  }

  getReservacionUpdateListener(){
    return this.reservacionesUpdate.asObservable();
  }

  addReservacion(title: string, solicitante: string, habitaciones: number, direccion: string,
    telefonoSol: string){
    const reservacion: Reservacion = {id: null, title: title, solicitante: solicitante, habitaciones: habitaciones, direccion: direccion,
      telefonoSol: telefonoSol};
    this.http.post<{message: string}>('http://localhost:3000/api.reservaciones', reservacion) //agregar después de message postId: string
    .subscribe((responseData)=>{
      console.log(responseData.message); //en luhgar const id = responseData.postId
      this.reservaciones.push(reservacion); //antes de esta linea colocar post.id = id;
      this.reservacionesUpdate.next([...this.reservaciones]);
      this.router.navigate(["/allRsv"])
    });
  }

  deleteReservacion(id: String){
    this.http.delete('http://localhost:3000/api.reservaciones/'+id)
    .subscribe(()=>{
      console.log("Se ha eliminado")
      const index = this.reservaciones.findIndex(reservacionid=>{
        return reservacionid.id == id
      })
      this.reservaciones.splice(index, 1)
      this.reservacionesUpdate.next([...this.reservaciones])
    });
  }

  updateReservacion(id: string, title: string, solicitante: string, habitaciones: number, direccion: string,
    telefonoSol: string){
    const reservacion: Reservacion = {id: id, title: title, solicitante: solicitante, habitaciones: habitaciones, direccion: direccion,
      telefonoSol: telefonoSol}
    this.http.put('http://localhost:3000/api.reservaciones/' + id, reservacion)
    .subscribe(response => {
      const updateReservacion = [...this.reservaciones]
      const oldReservIndex = updateReservacion.findIndex(p => p.id === reservacion.id);
      updateReservacion[oldReservIndex] = reservacion
      this.reservaciones = updateReservacion;
      this.reservacionesUpdate.next([...this.reservaciones]);
      this.router.navigate(["/allRsv"])
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
