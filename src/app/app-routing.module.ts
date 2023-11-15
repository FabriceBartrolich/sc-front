import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageConnectComponent } from './pages/page-connect/page-connect.component';
import { PageSubscribeComponent } from './pages/page-subscribe/page-subscribe.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageAddShowComponent } from './pages/page-add-show/page-add-show.component';
import { PageShowViewsComponent } from './pages/page-show-views/page-show-views.component';
import { PageShowWishesComponent } from './pages/page-show-wishes/page-show-wishes.component';
import { AuthGuard } from './guards/auth.guard';
import { PageShowDetailsComponent } from './pages/page-show-details/page-show-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PageHomeComponent },
  { path: 'show-views', component: PageShowViewsComponent, canActivate: [AuthGuard] },
  { path: 'show-wishes', component: PageShowWishesComponent, canActivate: [AuthGuard] },
    { path: 'show-details/:id', component: PageShowDetailsComponent },
  { path: 'add-show', component: PageAddShowComponent },
  { path: 'connect', component: PageConnectComponent },
  { path: 'subscribe', component: PageSubscribeComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
