import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Error404Component } from './error404/error404.component';
import { ProductComponent } from './product/product.component';
import { ServiceComponent } from './service/service.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ContactComponent } from './contact/contact.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {path:'' , component:HomeComponent},
    {path:'service' , component:ServiceComponent, canActivate: [authGuard] },
    {path:'product' , component:ProductComponent},
    {path:'inscription' , component:InscriptionComponent},
    {path:'connexion' , component:ConnexionComponent},
    {path:'contact' , component:ContactComponent},
    {path: '**', component:Error404Component}
]