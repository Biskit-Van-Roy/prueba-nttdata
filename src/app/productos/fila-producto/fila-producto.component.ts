import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
@Component({
  selector: 'fila-producto',
  templateUrl: './fila-producto.component.html',
  styleUrls: ['./fila-producto.component.css']
})
export class FilaProductoComponent {
  @Input() iniciales!: string;
  @Input() nombre!: string;
  @Input() descripcion!: string;
  @Input() fechaLiberacion!: string;
  @Input() fechaReestructuracion!: string;
}
