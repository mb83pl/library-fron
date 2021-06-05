import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import {HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonListComponent } from './components/person-list/person-list.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { PersonAddComponent } from './components/person-add/person-add.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { PersonUpdateComponent } from './components/person-update/person-update.component';
import { BookUpdateComponent } from './components/book-update/book-update.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    BookListComponent,
    PersonAddComponent,
    BookAddComponent,
    PersonUpdateComponent,
    BookUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
