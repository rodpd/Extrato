import { Injectable } from '@angular/core';
import { Lancamento } from '../models/Lancamento';
import {BehaviorSubject, Observable, Subscription, find, map, of, reduce, tap} from "rxjs"
import { FiltroDataService } from './filtro-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  	constructor(private http: HttpClient, private datas: FiltroDataService) { }

  	dados$: BehaviorSubject<Lancamento[]> = new BehaviorSubject<Lancamento[]>([]);

	dataInicio = this.datas.getDataInicio();
	dataFim = this.datas.getDataFim();

	dataInicioSubscription = this.datas.dataInicio$.subscribe(data => {
		this.dados$.next(this.dados$.getValue());
	});
	dataFimSubscription = this.datas.dataFim$.subscribe(data => {
		this.dados$.next(this.dados$.getValue());
	});

	atualizarLancamentos() {
		this.http.get<Lancamento[]>(`${Constants.API_ENDPOINT}/lancamento`).pipe(
			map((lancamentos) => {
				lancamentos.map((lancamento) => {
					lancamento.data = new Date(lancamento.data); 
					return lancamento;
				});
				return lancamentos;
			}))
		.subscribe((lancamentos: any) => {
			this.dados$.next(lancamentos);
		});
	}

	getLancamentos() {
		this.atualizarLancamentos();
		return this.dados$.asObservable();
	}

	getLancamentosValidos() {
		return this.getLancamentos().pipe(map(lancamentos => lancamentos.filter(lancamento => lancamento.status)));
	}

	getLancamentosValidosFiltradosPorData() {
		this.atualizarLancamentos();
		return this.getLancamentosValidos().pipe(map(lancamentos => lancamentos.filter(lancamento => lancamento.data >= this.dataInicio.value && lancamento.data <= this.dataFim.value)));
	}

	cancelarLancamento(lancamento: Lancamento) {
		lancamento.status = false;
		this.http.put<Lancamento>(`${Constants.API_ENDPOINT}/lancamento/${lancamento.id}`, {...lancamento}).subscribe(() => this.atualizarLancamentos());
	}

	addLancamento (descricao: string, valor: number) {
		this.http.post<Lancamento>(`${Constants.API_ENDPOINT}/lancamento`, {descricao: descricao, valor: valor}).subscribe(() => this.atualizarLancamentos());
	}

	editarLancamento(lancamento: Lancamento, valor: number, data: Date) {
		lancamento.valor = valor;
		lancamento.data = data;
		this.http.put<Lancamento>(`${Constants.API_ENDPOINT}/lancamento/${lancamento.id}`, {...lancamento}).subscribe(() => this.atualizarLancamentos());
	}

	getCustoTotal() {
		return this.getLancamentosValidosFiltradosPorData().pipe(map(lancamentos => lancamentos.reduce((total, lancamento) => total + lancamento.valor, 0)));
	}

}
