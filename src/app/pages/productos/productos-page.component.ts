import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto, ProductService } from '../../services/product.service';
import { BarraSuperiorComponent } from '../components/barra-superior.component';
import { RouterModule } from '@angular/router';
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
     RouterModule,
    HttpClientModule
  ],
})
export class ProductosComponent implements OnInit {

  filtro: string = '';
  productos: IProducto[] = [];
  productosFiltrados: IProducto[] = [];
  productosPaginados: IProducto[] = [];
  mostrarFormulario: boolean = false;
  menuAbierto: IProducto | null = null;
  esEdicion: boolean = false;
  productoEditando: IProducto | null = null;

  // Paginación
  pageSize: number = 5;        // filas por página (5, 10, 20)
  currentPage: number = 1;     // página actual
  totalPaginas: number = 1;    // total de páginas
  productoAEliminar: IProducto | null = null;


  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.productosFiltrados = productos;
        this.actualizarPaginacion();
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
    this.currentPage = 1; // Resetear página al filtrar
    this.actualizarPaginacion();
  }

  actualizarPaginacion() {
    this.totalPaginas = Math.ceil(this.productosFiltrados.length / this.pageSize);
    if (this.currentPage > this.totalPaginas) {
      this.currentPage = this.totalPaginas || 1;
    }
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.productosPaginados = this.productosFiltrados.slice(startIndex, endIndex);
  }

  cambiarPageSize() {
    this.currentPage = 1; // resetear a página 1 cuando cambia tamaño de página
    this.actualizarPaginacion();
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina < 1 || nuevaPagina > this.totalPaginas) return;
    this.currentPage = nuevaPagina;
    this.actualizarPaginacion();
  }

  toggleMenu(producto: IProducto) {
    this.menuAbierto = this.menuAbierto === producto ? null : producto;
  }
  editarProducto(producto: IProducto) {
  console.log("Editar:", producto);
this.productoEditando = {...producto};
  this.mostrarFormulario = true;
  this.menuAbierto = null;
   this.esEdicion = true;
}

  eliminarProducto(producto: IProducto) {
    console.log("Eliminar:", producto);
    this.productoAEliminar = producto;
    this.menuAbierto = null;
  }
guardarProductoEditado() {
  if (!this.productoEditando) return;

  this.productService.editarProducto(this.productoEditando).subscribe({
    next: (productoActualizado: IProducto) => {
      const index = this.productos.findIndex(p => p.id === productoActualizado.id);
      if (index !== -1) {
        this.productos[index] = productoActualizado;
      }
      this.filtrarProductos(); // Para refrescar la lista paginada
      this.productoEditando = null;
      this.mostrarFormulario = false;
    },
    error: (err: any) => {
      console.error('Error al editar producto:', err);
    }
  });
}

  cancelarEliminacion() {
  this.productoAEliminar = null;
  }


  confirmarEliminacion(id: string) {
  this.productService.eliminarProducto(id).subscribe({
    next: () => {
      this.productos = this.productos.filter(p => p.id !== id);
      this.filtrarProductos(); // actualiza paginación y resultados filtrados
      this.productoAEliminar = null;
    },
    error: (err) => {
      console.error("Error al eliminar:", err);
      this.productoAEliminar = null;
    }
  });
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
