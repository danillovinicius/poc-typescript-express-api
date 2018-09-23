import { Produto } from './produto.model';

export class Pedido {

    public time: number;
    public cid: number;
    public idCliente: number;
    public idClienteExterno: number;
    public status: string;
    public valor: number;
    public items: Produto[];

    constructor (values: object = {}) {
      Object.assign(this, values);
    }
}
