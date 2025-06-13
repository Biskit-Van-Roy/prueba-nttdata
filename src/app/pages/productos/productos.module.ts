import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ProductosComponent } from './productos-page.component';
import { FilaProductoComponent } from '../../productos/fila-producto/fila-producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BarraSuperiorComponent } from '../components/barra-superior.component';


@NgModule({

  imports: [
    CommonModule,
    BrowserModule,
    ProductosComponent,
    FilaProductoComponent,
    BarraSuperiorComponent,

     ReactiveFormsModule
  ],
  exports: [
    ProductosComponent
  ]
})
export class ProductosModule { }
