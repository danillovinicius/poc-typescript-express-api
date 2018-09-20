import { HistoricoChamado } from "./historico.chamado.model";

export class Chamado {
    idChamado: number;
    idCliente: number;
    registro: Date;
    status: string;
    descricao: string;
    historico: HistoricoChamado [];
}