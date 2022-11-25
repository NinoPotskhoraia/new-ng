import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'to-do',
    loadChildren: () =>
      import('./features/to-dos/to-do.module').then((m) => m.ToDoModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
