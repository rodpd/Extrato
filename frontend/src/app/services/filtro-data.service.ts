import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltroDataService {

  constructor() {
	let dataAtual = new Date();
	this.dataInicio$ = new BehaviorSubject<Date>(new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate()-1));
	this.dataFim$ = new BehaviorSubject<Date>(new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate(), 23, 59, 59, 999));
   }

  dataInicio$: BehaviorSubject<Date>;
  dataFim$: BehaviorSubject<Date>;

  getDataInicio() {
	return this.dataInicio$;
  }

  getDataFim() {
	return this.dataFim$;
  }

  alterarDataInicio(data: Date) {
	this.dataInicio$.next(data);
  }

  alterarDataFim(data: Date) {
	this.dataFim$.next(data);
  }

}
