import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Reservacion } from "../reservacion.model";
import { ReservacionService } from "../reservacion.service";

@Component({
  selector: 'app-reservacion-create',
  templateUrl: './reservacion-create.component.html',
  styleUrls: ['./reservacion-create.component.css']
})


export class ReservacionCreateComponent implements OnInit{

  enteredTitle = '';
  enteredContent = '';
  form: FormGroup;
  private mode = 'createR';
  private reservacionId: string;
  reservacion: Reservacion;
  isLoading = false;

  constructor(public reservacionesService: ReservacionService, public route: ActivatedRoute){

  }

  ngOnInit(){
    this.form = new FormGroup({
      "title": new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      "solicitante": new FormControl(null, {validators: [Validators.required]}),
      "habitaciones": new FormControl(null, {validators: [Validators.required]}),
      "direccion": new FormControl(null, {validators: [Validators.required]}),
      "telefonoSol": new FormControl(null, {validators: [Validators.required]}),
    })
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('reservacionId')){
        this.mode = 'editR';
        this.reservacionId = paramMap.get('reservacionId')
        this.isLoading = true;
        this.reservacionesService.getReservacion(this.reservacionId).subscribe(reservData =>{
          this.isLoading = false;
          this.reservacion = {id: reservData._id, title: reservData.title, solicitante: reservData.solicitante,
            habitaciones: reservData.habitaciones, direccion: reservData.direccion, telefonoSol: reservData.telefonoSol}
          this.form.setValue({
            title: this.reservacion.title,
            solicitante: this.reservacion.solicitante,
            habitaciones: this.reservacion.habitaciones,
            direccion: this.reservacion.direccion,
            telefonoSol: this.reservacion.telefonoSol
          })
        })
      }else{
        this.mode = 'createR';
        this.reservacionId = null;
      }
    })
  }

  onSaveReservacion(){
    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    if(this.mode == "createR"){
      this.reservacionesService.addReservacion(this.form.value.title, this.form.value.solicitante, this.form.value.habitaciones,
        this.form.value.direccion, this.form.value.telefonoSol);
    }else{
      this.reservacionesService.updateReservacion(
        this.reservacionId,
        this.form.value.title, this.form.value.solicitante, this.form.value.habitaciones, this.form.value.direccion,
        this.form.value.telefonoSol
      );
    }

    this.form.reset();
    this.reservacionesService.getReservaciones()

  }
}
