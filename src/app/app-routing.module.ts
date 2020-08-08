import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaPrincipalComponent } from './paginas/pagina-principal/pagina-principal.component';
import { PaginaHistogramaComponent } from './paginas/pagina-histograma/pagina-histograma.component';
import { PaginaProyeccionesComponent } from './paginas/pagina-proyecciones/pagina-proyecciones.component';


const routes: Routes = [
  {
    path: 'recoleccion-datos',
    component: PaginaPrincipalComponent
  },
  {
    path:'histograma',
    component: PaginaHistogramaComponent
  },
  {
    path:'proyecciones',
    component: PaginaProyeccionesComponent
  },
  { 
    path: '',   
    redirectTo: '/recoleccion-datos', 
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
