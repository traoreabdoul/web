import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';;
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//primeng
import { ChipsModule } from 'primeng/chips';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api'
import { CalendarModule } from 'primeng/calendar';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuModule } from 'primeng/menu';

//new
import {FieldsetModule} from 'primeng/fieldset';

@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    HttpClientModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,

    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ProgressBarModule,
    SliderModule,

    ChipsModule,
    DialogModule,
    AutoCompleteModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    FormsModule,
    RippleModule,

   
    DividerModule,
    CalendarModule,
    SpeedDialModule,
    MenuModule,
    FieldsetModule

  ],
  bootstrap: [AppComponent],
  providers: [MessageService, ConfirmationService, HttpClient]

})
export class AppModule { }
