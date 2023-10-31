import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import {FormGroup, FormControl} from '@angular/forms';
import { ModalAdicionarLancamentoComponent } from '../modal-adicionar-lancamento/modal-adicionar-lancamento.component';
import { FiltroDataService } from 'src/app/services/filtro-data.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})

export class ExtratoComponent {

	constructor(private dialog: MatDialog, private datas: FiltroDataService) {
	}

	private dataAtual = new Date();

	dataInicio = new FormControl(new Date(this.dataAtual.getFullYear(), this.dataAtual.getMonth(), this.dataAtual.getDate()-1));
	dataFim = new FormControl(new Date(this.dataAtual.getFullYear(), this.dataAtual.getMonth(), this.dataAtual.getDate(), 23, 59, 59));

	range = new FormGroup({
		start: this.dataInicio,
		end: this.dataFim
	  });

	  dataInicioAlterada() {
		this.datas.alterarDataInicio(this.dataInicio.value!);
	  }

	  dataFimAlterada() {
		this.dataFim.value?.setHours(23);
		this.dataFim.value?.setMinutes(59);
		this.dataFim.value?.setSeconds(59);
		this.dataFim.value?.setMilliseconds(999);
		this.datas.alterarDataFim(this.dataFim.value!);
	  }
	
	abrirModalAdicionarLancamento() {
		const dialogRef = this.dialog.open(ModalAdicionarLancamentoComponent, {
			width: '400px'
		});

	}

}
