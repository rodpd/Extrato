import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ModalEditarLancamentoComponent } from '../modal-editar-lancamento/modal-editar-lancamento.component';
import { ModalRemoverLancamentoComponent } from '../modal-remover-lancamento/modal-remover-lancamento.component';
import { Lancamento } from '../../models/Lancamento';
import { LancamentosService } from 'src/app/services/lancamentos.service';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-lista-lancamento',
  templateUrl: './lista-lancamento.component.html',
  styleUrls: ['./lista-lancamento.component.scss']
})

export class ListaLancamentoComponent {

	dados: Observable<Lancamento[]> = this.lancamentos.getLancamentosValidosFiltradosPorData();
	custoTotal: Observable<number> = this.lancamentos.getCustoTotal();

	constructor(private dialog: MatDialog, private lancamentos: LancamentosService) {}

	statusMap = new Map<boolean, string>([
		[true, "valido"],
		[false, "cancelado"]
	])

	colunas: string[] = ['avulso', 'data', 'descricao', 'valor', 'editar', 'remover', 'menu'];
	
	abrirModalEditarLancamento(lancamento: Lancamento) {
		this.dialog.open(ModalEditarLancamentoComponent, {
			data: {
			  lancamento: lancamento
			},
		  });
		}

	abrirModalRemoverLancamento(lancamento: Lancamento) {
		this.dialog.open(ModalRemoverLancamentoComponent, {
			data: {
				lancamento: lancamento
			},
			});
		}

}
