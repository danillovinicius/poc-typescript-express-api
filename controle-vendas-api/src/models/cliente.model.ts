export class Cliente {
  public id: number;
  public nome: string;
  public senha: string;
  public email: string;
  public endereco: string;
  public cidade: string;
  public uf: string;
  public cep: string;

  constructor (values: object = {}) {
    Object.assign(this, values);
  }
}
