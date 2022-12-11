import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';;
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//primeng module
import { ChipsModule } from 'primeng/chips';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api'
import { SpeedDialModule } from 'primeng/speeddial';
import {FieldsetModule} from 'primeng/fieldset';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsService } from './shared/services/clients.service';
import { AddClientComponent } from './components/modal/add-client/add-client.component';
import { EditClientComponent } from './components/modal/edit-client/edit-client.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    AddClientComponent,
    EditClientComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    ToastModule,
    ButtonModule,
    ChipsModule,
    DialogModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    FormsModule,
    DividerModule,
    SpeedDialModule,
    FieldsetModule

  ],
  bootstrap: [AppComponent],
  providers: [MessageService, ConfirmationService, HttpClient,ClientsService]

})
export class AppModule { }
