import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';
import { CarrinhoCompraComponent } from '../../carrinho-compra/carrinho-compra.component';
import { UsuarioLoginComponent } from '../../login/login.component';
import { PedidosRealizadosComponent } from '../../pedidos-realizados/pedidos-realizados.component';
import { CadastroUsuarioComponent } from '../../cadastro-usuario/cadastro-usuario.component';
import { ProdutosComponent } from '../../produtos/produtos.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
  ],
  declarations: [
    CarrinhoCompraComponent,
    UsuarioLoginComponent,
    PedidosRealizadosComponent,
    CadastroUsuarioComponent,
    ProdutosComponent,
  ]
})

export class AdminLayoutModule {}
