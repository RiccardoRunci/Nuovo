import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule,ComponenteRouting } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabUtentiComponent } from './tab-utenti/tab-utenti.component';
import {FormsModule} from '@angular/forms'; //databinding a due vie
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { TabCredenzialiComponent } from './tab-credenziali/tab-credenziali.component';
import { AdminComponent } from './admin/admin.component';
import { DjComponentComponent } from './dj-component/dj-component.component';
import { ProvaAdioComponent } from './prova-adio/prova-adio.component';




@NgModule({
  declarations: [
    AppComponent,
    TabUtentiComponent,
    TabCredenzialiComponent,
    AdminComponent,
    ComponenteRouting,
    DjComponentComponent,
    ProvaAdioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, //databinding a 2 vie.
    HttpClientModule, //per usare i service e fare le chiamate a node.
    ReactiveFormsModule //PER FARE I CONTROLLI PER VEDERE SE è SCRITTA BENE L'EMAIL.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
