import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Produto } from '../model/produto.model';

declare var $: any;

@Component({
  selector: 'app-carrinho-compra',
  templateUrl: './carrinho-compra.component.html',
  styleUrls: ['./carrinho-compra.component.scss']
})
export class CarrinhoCompraComponent implements OnInit {

  public produtos: Produto[] = [];

  public constructor(private service: AppService) {}

  public ngOnInit() {
    this.listarProdutosCarrinho();
  }

  public finalizarPedido() {
    this.service.finalizarCompraItemsNoCarrinho().subscribe(data => {
      $.notify({ message: `Pedido realizado com sucesso!` }, { type: 'success' });
      this.listarProdutosCarrinho();
    });
  }

  public obterTotalCompra() {
    return this.produtos.map(i => i.valor).reduce((ac, it) => ac + it);
  }

  public listarProdutosCarrinho() {
    this.service.listarCarrinhoCompras().subscribe(data => {
      this.produtos = data;
    });
  }

  public remover(produto: Produto) {
    this.service.removerProdutoCarrinhoCompras(produto).subscribe(data => {
      $.notify({ message: `Removido com sucesso!` }, { type: 'success' });
      this.listarProdutosCarrinho();
    });
  }
}
