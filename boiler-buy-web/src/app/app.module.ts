import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import { CreateComponent } from './create/create.component';
import { CurrencyPipe } from '@angular/common';
import { PictureUploadComponent } from './picture-upload/picture-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CreateComponent,
    PictureUploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
  // bootstrap: [RegisterComponent]
})
export class AppModule { }