import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { MatTableModule  } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';


import { AppComponent } from './app.component';
import { ListaLancamentoComponent } from './components/lista-lancamento/lista-lancamento.component';
import { ExtratoComponent } from './components/extrato/extrato.component';
import { ModalAdicionarLancamentoComponent } from './components/modal-adicionar-lancamento/modal-adicionar-lancamento.component';
import { ModalEditarLancamentoComponent } from './components/modal-editar-lancamento/modal-editar-lancamento.component';
import { ModalRemoverLancamentoComponent } from './components/modal-remover-lancamento/modal-remover-lancamento.component';

registerLocaleData(localePt);

const material = [
	MatTableModule,
	MatButtonModule,
	MatDialogModule,
	MatFormFieldModule,
	MatInputModule,
	MatIconModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatMenuModule
]

@NgModule({
  declarations: [
    AppComponent,
    ListaLancamentoComponent,
    ExtratoComponent,
    ModalAdicionarLancamentoComponent,
    ModalEditarLancamentoComponent,
    ModalRemoverLancamentoComponent
  ],
  imports: [
    BrowserModule,
	BrowserAnimationsModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule,
	material,
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
