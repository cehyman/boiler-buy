import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ProfilePicComponent } from './profile-pic/profile-pic.component';
import { FeatureButtonsComponent } from './feature-buttons/feature-buttons.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    UserInfoComponent,
    ProfilePicComponent,
    FeatureButtonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
