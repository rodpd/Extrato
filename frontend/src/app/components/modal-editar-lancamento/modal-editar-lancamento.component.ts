import { formatDate } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { LancamentosService } from 'src/app/services/lancamentos.service';

@Component({
  selector: 'app-modal-editar-lancamento',
  templateUrl: './modal-editar-lancamento.component.html',
  styleUrls: ['./modal-editar-lancamento.component.scss']
})
export class ModalEditarLancamentoComponent {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private lancamentos: LancamentosService,
		private dialog: MatDialogRef<ModalEditarLancamentoComponent>
	){}

	valorControl = new FormControl(this.data.lancamento.valor, [Validators.required, Validators.pattern('[+-]?\\d+')]);
	dataControl = new FormControl(this.data.lancamento.data, [ Validators.required]);
	
	getMensagemErroValor() {
		if ( this.valorControl.hasError('required')) {
			return 'Campo obrigatório';
		}
		return 'Valor inválido';
	}

	public editarLancamento() {
		if ( this.valorControl.valid && this.dataControl.valid ) {
			this.dialog.close();
			this.lancamentos.editarLancamento(this.data.lancamento, parseInt(this.valorControl.value), new Date(this.dataControl.value));
		}
	}

}
