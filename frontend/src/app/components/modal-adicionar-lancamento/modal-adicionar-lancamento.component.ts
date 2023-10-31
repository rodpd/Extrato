import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LancamentosService } from 'src/app/services/lancamentos.service';


@Component({
  selector: 'app-modal-adicionar-lancamento',
  templateUrl: './modal-adicionar-lancamento.component.html',
  styleUrls: ['./modal-adicionar-lancamento.component.scss']
})

export class ModalAdicionarLancamentoComponent {

	constructor(private lancamentos: LancamentosService, private dialog: MatDialogRef<ModalAdicionarLancamentoComponent>) {}

	valorControl = new FormControl('', [Validators.required, Validators.pattern('[+-]?\\d+')]);
	descricaoControl = new FormControl('', [Validators.required, Validators.pattern('([ ]*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\\d]+[ ]*)*')]);

	getMensagemErroValor() {
		if ( this.valorControl.hasError('required')) {
			return 'Campo obrigatório';
		}
		return 'Valor inválido';
	}

	getMensagemErroDescricao() {
		if ( this.descricaoControl.hasError('required')) {
			return 'Campo obrigatório';
		} else {
			if ( this.descricaoControl.value?.replaceAll(' ', '').length == 0 ) {
				return 'Descrição não pode conter apenas espaços';
			}
			return 'Contém caracteres inválidos';
		}
	}
	
	addLancamento() {
		if ( this.valorControl.valid && this.descricaoControl.valid ) {
			this.dialog.close();
			this.lancamentos.addLancamento(
			this.descricaoControl.value ? this.descricaoControl.value : '', 
			this.valorControl.value ? parseInt(this.valorControl.value) : 0);
		}
	}

}
