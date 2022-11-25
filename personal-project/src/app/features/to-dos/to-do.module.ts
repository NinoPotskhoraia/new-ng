import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { ListComponent } from './components/list/list.component';
import { CoreModule } from 'src/app/core/core.module';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TodoComponent, ListComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListComponent,
      },
    ]),
  ],
})
export class ToDoModule {}
