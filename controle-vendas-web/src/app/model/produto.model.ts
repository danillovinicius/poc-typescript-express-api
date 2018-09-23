export class Produto {

  public id: number;
  public index: number;
  public nome: string;
  public codigo: string;
  public descricao: string;
  public valor: number;
  public imagens: string[];

  constructor (values: object = {}) {
    Object.assign(this, values);
  }
}
