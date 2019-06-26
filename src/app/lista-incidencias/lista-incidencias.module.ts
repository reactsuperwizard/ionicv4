import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaIncidenciasPage } from './lista-incidencias.page';

const routes: Routes = [
  {
    path: '',
    component: ListaIncidenciasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaIncidenciasPage]
})
export class ListaIncidenciasPageModule {}
