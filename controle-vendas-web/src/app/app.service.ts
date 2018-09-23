import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandler } from './app.handler';
import { Usuario } from './model/usuario.model';
import { Produto } from './model/produto.model';
import { Pedido } from './model/pedido.model';

@Injectable()
export class AppService {

  private headers: HttpHeaders;
  private API_URL = 'http://localhost:3000/api';

  constructor(protected http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': ' application/json;charset=UTF-8',
      // tslint:disable-next-line:max-line-length
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5vbWUiOiJVc3VhcmlvIiwidXN1YXJpbyI6InVzZXJhIiwic2VuaGEiOiJ1c2VyYSIsImVtYWlsIjoiZGFuaWxsb3ZpbmljaXVzQGdtYWlsLmNvbSIsImVuZGVyZWNvIjoiUnVhIERvbGluYSBmdW5kYSIsImNpZGFkZSI6IlZhemFudGUiLCJ1ZiI6Ik1HIiwiY2VwIjoiMzg3ODAwMDAiLCJjaWQiOjAsIiRjcmVhdGVkIjoiMjAxOC0wOS0yM1QwMTowNDo1MS41NjdaIiwiJHVwZGF0ZWQiOiIyMDE4LTA5LTIzVDAxOjA0OjUxLjU2N1oifSwiaWF0IjoxNTM3NjY0NzE0LCJleHAiOjE1Mzk0NjQ3MTR9.mxM2hZpBIBGhNWxgJcNvgu4Es5_mUrENRz8ToTlWoMo'
    });
  }

  public cadastrarNovoUsuario(entidade: Usuario): Observable<HttpResponse<Response>> {
    return this.http.post<Response>(`${this.API_URL}/cliente/cadastro`, JSON.stringify(entidade),
      { headers: this.headers, observe: 'response' }).catch(ErrorHandler.handleError);
  }

  public login(entidade: Usuario): Observable<HttpResponse<Response>> {
    return this.http.post<Response>(`${this.API_URL}/cliente/login`, JSON.stringify(entidade),
        { headers: this.headers, observe: 'response' }).catch(ErrorHandler.handleError);
  }

  public listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.API_URL}/produtos/listar`, { headers: this.headers }).catch(ErrorHandler.handleError);
  }

  public listarPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.API_URL}/pedido/listar`, { headers: this.headers }).catch(ErrorHandler.handleError);
  }

  public listarCarrinhoCompras(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.API_URL}/pedido/carrinho`, { headers: this.headers }).catch(ErrorHandler.handleError);
  }

  public incluirProdutoCarrinhoCompras(entidade: Produto): Observable<HttpResponse<Response>> {
    return this.http.post<Response>(`${this.API_URL}/pedido/incluir`, JSON.stringify({ id: entidade.id }),
        { headers: this.headers, observe: 'response' }).catch(ErrorHandler.handleError);
  }

  public removerProdutoCarrinhoCompras(entidade: Produto): Observable<HttpResponse<Response>> {
    return this.http.post<Response>(`${this.API_URL}/pedido/remover`, JSON.stringify({ id: entidade.index }),
        { headers: this.headers, observe: 'response' }).catch(ErrorHandler.handleError);
  }

  public cancelarPedidoCompra(entidade: Pedido): Observable<HttpResponse<Response>> {
    return this.http.post<Response>(`${this.API_URL}/pedido/cancelar`, JSON.stringify({ id: entidade.cid }),
        { headers: this.headers, observe: 'response' }).catch(ErrorHandler.handleError);
  }

  public finalizarCompraItemsNoCarrinho(): Observable<HttpResponse<Response>> {
    return this.http.post<Response>(`${this.API_URL}/pedido/finalizar`, JSON.stringify({}),
        { headers: this.headers, observe: 'response' }).catch(ErrorHandler.handleError);
  }
}
