import { Routes } from '@angular/router';
import { ProdutosComponent } from '../../produtos/produtos.component';
import { CarrinhoCompraComponent } from '../../carrinho-compra/carrinho-compra.component';
import { CadastroUsuarioComponent } from '../../cadastro-usuario/cadastro-usuario.component';
import { UsuarioLoginComponent } from '../../login/login.component';
import { PedidosRealizadosComponent } from '../../pedidos-realizados/pedidos-realizados.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'login', component: UsuarioLoginComponent },
    { path: 'signup', component: CadastroUsuarioComponent },
    { path: 'produtos', component: ProdutosComponent },
    { path: 'carrinho', component: CarrinhoCompraComponent },
    { path: 'pedidos', component: PedidosRealizadosComponent },
];
