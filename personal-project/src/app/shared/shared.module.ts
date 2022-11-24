import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing/profile-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, FormsModule],
  exports: [HeaderComponent, FormsModule],
})
export class SharedModule {}
