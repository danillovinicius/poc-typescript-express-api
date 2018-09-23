import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Pedido } from '../model/pedido.model';
import { Produto } from '../model/produto.model';

declare var $: any;

@Component({
  selector: 'app-pedidos-realizados',
  templateUrl: './pedidos-realizados.component.html',
  styleUrls: ['./pedidos-realizados.component.scss']
})
export class PedidosRealizadosComponent implements OnInit {

  public pedido: Pedido;
  public pedidos: Pedido[] = [];

  public constructor(private service: AppService) { }

  public ngOnInit() {
    this.listarPedidosCompra();
  }

  public listarPedidosCompra() {
    this.service.listarPedidos().subscribe(data => this.pedidos = data);
  }

  public cancelar(pedido: Pedido) {
    this.service.cancelarPedidoCompra(pedido).subscribe(data => {
      $.notify({ message: `Pedido cancelado com sucesso!` }, { type: 'success' });
      this.listarPedidosCompra();
    });
  }

  public visualizar(pedido: Pedido) {
    this.pedido = pedido;
  }
}
