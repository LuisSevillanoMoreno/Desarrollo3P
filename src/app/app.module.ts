import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { HttpClientModule } from '@angular/common/http';
//import { ShowApiComponent } from './show-api/show-api.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './body/header/header.component';
import { BodycontentComponent } from './body/bodycontent/bodycontent.component';
import { FooterComponent } from './body/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostCreateComponent } from './publicaciones/post-create/post-create.component';
import { PostListComponent } from './publicaciones/post-list/post-list.component';
import { PostService } from './publicaciones/post.service';
import { HotelCreateComponent } from './hoteles/hoteles-create/hotel-create.component';
import { HotelListComponent} from './hoteles/hoteles-list/hotel-list.component';
import { HotelService } from './hoteles/hotel.service';
import { ReservacionCreateComponent } from './reservaciones/reservaciones-create/reservacion-create.component';
import { ReservacionListComponent } from './reservaciones/reservaciones-list/reservacion-list.component';
import { ReservacionService } from './reservaciones/reservacion.service';
import { FavListComponent } from './hoteles/hoteles-list/fav-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodycontentComponent,
    FooterComponent,
    AppComponent,
    HeaderComponent,
    PostCreateComponent,
    PostListComponent,
    HotelCreateComponent,
    HotelListComponent,
    ReservacionCreateComponent,
    ReservacionListComponent,
    FavListComponent
    //ShowApiComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule

  ],
  providers: [PostService, HotelService, ReservacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
