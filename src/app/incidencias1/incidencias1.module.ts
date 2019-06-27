import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Incidencias1Page } from './incidencias1.page';

const routes: Routes = [
  {
    path: '',
    component: Incidencias1Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Incidencias1Page]
})
export class Incidencias1PageModule {}
