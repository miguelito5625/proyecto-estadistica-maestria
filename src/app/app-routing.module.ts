import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaPrincipalComponent } from './paginas/pagina-principal/pagina-principal.component';
import { PaginaHistogramaComponent } from './paginas/pagina-histograma/pagina-histograma.component';


const routes: Routes = [
  {
    path: '',
    component: PaginaPrincipalComponent
  },
  {
    path:'histograma',
    component: PaginaHistogramaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
