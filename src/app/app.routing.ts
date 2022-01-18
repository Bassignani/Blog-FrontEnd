//IMPORTS NECESARIOS
import { Route } from '@angular/compiler/src/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//IMPORTAR COMPONENTES
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEdiComponent } from './components/user-edi/user-edi.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { ProfileComponent } from './components/profile/profile.component';

import { IdentityGuards } from './services/identity.guard';   //Es servicio que protege las rutas

//Defino una constante appRoutes donse yo defino un array de rutas
//DEFINIR LAS RUTAS
const appRoutes: Routes = [     //Dentro del array indico las rutos en objetos tipo json
    { path: '', component: HomeComponent },
    { path: 'inicio', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout/:sure', component: LoginComponent, canActivate: [IdentityGuards] },  //Protege a las rutas, no se puede entrar si no estamos identificados
    { path: 'registro', component: RegisterComponent },
    { path: 'ajustes', component: UserEdiComponent, canActivate: [IdentityGuards] },
    { path: 'crear-categoria', component: CategoryNewComponent, canActivate: [IdentityGuards] },
    { path: 'crear-entrada',component: PostNewComponent, canActivate: [IdentityGuards] },
    { path: 'entrada/:id' , component: PostDetailComponent },
    { path: 'editar-entrada/:id' , component: PostEditComponent, canActivate: [IdentityGuards] },
    { path: 'categoria/:id' , component: CategoryDetailComponent},
    { path: 'perfil/:id' , component: ProfileComponent  },
    { path: '**', component: ErrorComponent}  //El doble * es para una ruta que no este especificada, y es importante que esta ruta este al finalde todas las rutas para que el resto funcione bien
];

//EXPORTAR CONFIGURACIÓN
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);
