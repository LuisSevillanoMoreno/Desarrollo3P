import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Hotel } from "../hotel.model";
import { HotelService } from "../hotel.service";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-hotel-create',
  templateUrl: './hotel-create.component.html',
  styleUrls: ['./hotel-create.component.css']
})


export class HotelCreateComponent implements OnInit{

  enteredTitle = '';
  enteredContent = '';
  form: FormGroup;
  imagePreview: string;
  private mode = 'createH';
  private hotelId: string;
  hotel: Hotel;
  isLoading = false;

  constructor(public hotelesService: HotelService, public route: ActivatedRoute){

  }

  ngOnInit(){
    this.form = new FormGroup({
      "title": new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      "content": new FormControl(null, {validators: [Validators.required]}),
      "image" : new FormControl(null, {validators: [Validators.required],
      asyncValidators: [mimeType]}),
      //"favorite": new FormControl(null, {validators: [Validators.required]}),
    })
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('hotelId')){
        this.mode = 'editH';
        this.hotelId = paramMap.get('hotelId')
        this.isLoading = true;
        this.hotelesService.getHotel(this.hotelId).subscribe(hotelData =>{
          this.isLoading = false;
          this.hotel = {id: hotelData._id, title: hotelData.title, content: hotelData.content, imagePath: hotelData.imagePath, favorite: hotelData.favorite}
          this.form.setValue({
            title: this.hotel.title,
            content: this.hotel.content,
            image: this.hotel.imagePath,
            favorite: this.hotel.favorite
          })
        })
      }else{
        this.mode = 'createH';
        this.hotelId = null;
      }
    })
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity(); //nombrar como el control 'image'
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result as string

    };
    reader.readAsDataURL(file);
  }

  onSaveHotel(){
    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    if(this.mode == "createH"){
      this.hotelesService.addHotel(this.form.value.title, this.form.value.content, this.form.value.image, "False");
    }else{
      this.hotelesService.updateHotel(
        this.hotelId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image,
        "False"
      );
    }

    this.form.reset();
    this.hotelesService.getHoteles()

  }
}
