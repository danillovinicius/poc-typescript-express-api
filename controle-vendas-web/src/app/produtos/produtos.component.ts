import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto.model';
import { AppService } from '../app.service';

declare var $: any;

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
  public produtos: Produto[] = [];

  public constructor(private service: AppService) {}

  public ngOnInit() {
    this.service.listarProdutos().subscribe(data => (this.produtos = data));
  }

  public incluirNoCarrinho(produto: Produto) {
    this.service.incluirProdutoCarrinhoCompras(produto).subscribe(data => {
      $.notify({ message: `${produto.nome} incluido no carrinho.` }, { type: 'success' });
    });
  }
}
