import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './publicaciones/post-create/post-create.component';
import { PostListComponent } from './publicaciones/post-list/post-list.component';
import { HotelListComponent } from './hoteles/hoteles-list/hotel-list.component';
import { HotelCreateComponent } from './hoteles/hoteles-create/hotel-create.component';
import { ReservacionListComponent } from './reservaciones/reservaciones-list/reservacion-list.component';
import { ReservacionCreateComponent } from './reservaciones/reservaciones-create/reservacion-create.component';
import { FavListComponent} from './hoteles/hoteles-list/fav-list.component'


const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'create', component: PostCreateComponent},
  {path: 'edit/:postId', component: PostCreateComponent},
  {path: 'all', component: HotelListComponent},
  {path: 'createH', component: HotelCreateComponent},
  {path: 'editH/:hotelId', component: HotelCreateComponent},
  {path: 'allRsv', component: ReservacionListComponent},
  {path: 'createR', component: ReservacionCreateComponent},
  {path: 'editR/:reservacionId', component: ReservacionCreateComponent},
  {path: 'fav', component: FavListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
