import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthModule, SharedModule, RouterModule],
  exports: [AuthModule],
})
export class CoreModule {}
