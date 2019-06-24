import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'configure-hotel', loadChildren: './configure-hotel/configure-hotel.module#ConfigureHotelPageModule' },
  { path: 'grp-new', loadChildren: './grp-new/grp-new.module#GrpNewPageModule' },
  { path: 'num-list', loadChildren: './num-list/num-list.module#NumListPageModule' },
  { path: 'registos', loadChildren: './registos/registos.module#RegistosPageModule' },
  { path: 'start', loadChildren: './start/start.module#StartPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
