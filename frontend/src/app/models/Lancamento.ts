export interface Lancamento {
	id: number;
	descricao: string;
	data: Date;
	valor: number;
	avulso: boolean;
	status: boolean;
}