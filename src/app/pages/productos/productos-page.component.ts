import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto, ProductService } from '../../services/product.service';
import { BarraSuperiorComponent } from '../components/barra-superior.component';
import { AddProductoComponent } from "../../productos/add-producto/add-producto.component";
import { IProducto } from '../../models/producto';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  templateUrl: './productos-page.component.html',
  styleUrls: ['./productos-page.component.css'],
  imports: [
    CommonModule,
    BarraSuperiorComponent,
    AddProductoComponent,
    FormsModule,
    HttpClientModule
  ],
})
export class ProductosComponent implements OnInit {
  filtro: string = '';
  productos: IProducto[] = [];
  productosFiltrados: IProducto[] = [];
  mostrarFormulario: boolean = false;
  menuAbierto: IProducto | null = null;
  productoEditando: IProducto | null = null;


  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.productosFiltrados = productos;
      },
      error: () => {
        console.log("error");
      }
    });
  }

  formularioAdd() {
    this.mostrarFormulario = true;
  }

  listadoBack() {
    this.mostrarFormulario = false;
  }

  filtrarProductos() {
    const texto = this.filtro.toLowerCase().trim();
    this.productosFiltrados = this.productos.filter(p =>
      Object.values(p).some(val =>
        val.toString().toLowerCase().includes(texto)
      )
    );
  }

  toggleMenu(producto: IProducto) {
    this.menuAbierto = this.menuAbierto === producto ? null : producto;
  }

  editarProducto(producto: IProducto) {
    console.log("Editar:", producto);
    this.menuAbierto = null;
  }

  eliminarProducto(producto: IProducto) {
    console.log("Eliminar:", producto);
    this.menuAbierto = null;
  }

  @HostListener('document:click', ['$event'])
  cerrarMenuFuera(event: Event) {
    const target = event.target as HTMLElement;
    const esBotonMenu = target.closest('.menu-wrapper');
    if (!esBotonMenu) {
      this.menuAbierto = null;
    }
  }
}
