import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageConnectComponent } from './pages/page-connect/page-connect.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageSubscribeComponent } from './pages/page-subscribe/page-subscribe.component';
import { PageAddShowComponent } from './pages/page-add-show/page-add-show.component';
import { PageShowViewsComponent } from './pages/page-show-views/page-show-views.component';
import { PageShowWishesComponent } from './pages/page-show-wishes/page-show-wishes.component';
import { CardComponent } from './components/card/card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component'; 


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageHomeComponent,
    PageNotFoundComponent,
    PageConnectComponent,
    PageSubscribeComponent,
    PageAddShowComponent,
    PageShowViewsComponent,
    PageShowWishesComponent,
    CardComponent,
    SearchBarComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
