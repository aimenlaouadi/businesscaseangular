import { Routes } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { ServiceComponent } from './service/service.component';
import { ContactComponent } from './Formulaires/contact/contact.component';
import { authGuard } from './shared/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AproposComponent } from './apropos/apropos.component';
import { PanierComponent } from './panier/panier.component';
import { HomeComponent } from './Page acceuil/home/home.component';
import { InscriptionComponent } from './Formulaires/inscription/inscription.component';
import { ConnexionComponent } from './Formulaires/connexion/connexion.component';
import { ProfiluserComponent } from './profiluser/profiluser.component';
import { PaymentComponent } from './payment/payment.component';

export const routes: Routes = [
    {path:'' , component:HomeComponent},
    {path:'service' , component:ServiceComponent},
    {path:'inscription' , component:InscriptionComponent},
    {path:'connexion' , component:ConnexionComponent},
    {path:'contact' , component:ContactComponent},
    {path:'dashboard' , component:DashboardComponent},
    {path:'apropos' , component:AproposComponent},
    {path:'panier' , component:PanierComponent},
    {path:'payment' , component:PaymentComponent, canActivate: [authGuard] },
    {path:'profiluser', component:ProfiluserComponent, canActivate: [authGuard] },
    {path: '**', component:Error404Component}
]