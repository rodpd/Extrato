import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LancamentosService } from 'src/app/services/lancamentos.service';


@Component({
  selector: 'app-modal-remover-lancamento',
  templateUrl: './modal-remover-lancamento.component.html',
  styleUrls: ['./modal-remover-lancamento.component.scss']
})
export class ModalRemoverLancamentoComponent {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private lancamentos: LancamentosService
	){}

	public cancelarLancamento () {
		this.lancamentos.cancelarLancamento(this.data.lancamento)
	}

}
