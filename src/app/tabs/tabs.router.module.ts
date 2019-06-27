import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          }
        ]
      },
      {
        path: 'configure-hotel',
        children: [
          {
            path: '',
            loadChildren: '../configure-hotel/configure-hotel.module#ConfigureHotelPageModule'
          }
        ]
      },
      {
        path: 'grp-new',
        children: [
          {
            path: '',
            loadChildren: '../grp-new/grp-new.module#GrpNewPageModule'
          }
        ]
      },
      {
        path: 'num-list',
        children: [
          {
            path: '',
            loadChildren: '../num-list/num-list.module#NumListPageModule'
          }
        ]
      },
      {
        path: 'registos',
        children: [
          {
            path: '',
            loadChildren: '../registos/registos.module#RegistosPageModule'
          }
        ]
      },
      {
        path: 'start',
        children: [
          {
            path: '',
            loadChildren: '../start/start.module#StartPageModule'
          }
        ]
      },
      {
        path: 'start-cont',
        children: [
          {
            path: '',
            loadChildren: '../start-cont/start-cont.module#StartContPageModule'
          }
        ]
      },
      {
        path: 'lista-incidencias',
        children: [
          {
            path: '',
            loadChildren: '../lista-incidencias/lista-incidencias.module#ListaIncidenciasPageModule'
          }
        ]
      },
      {
        path: 'end-jornada',
        children: [
          {
            path: '',
            loadChildren: '../end-jornada/end-jornada.module#EndJornadaPageModule'
          }
        ]
      },
      {
        path: 'incidencias1',
        children: [
          {
            path: '',
            loadChildren: '../incidencias1/incidencias1.module#Incidencias1PageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
