import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls:['./add-producto.component.css'],
  standalone: true,
  imports:[
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ]

})
export class AddProductoComponent implements OnInit {
  @Output() cancelar = new EventEmitter<void>();
  formulario!: FormGroup;
  loading = false;
  mensaje = '';


  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    const fecha = new Date();
    const fechaHoy = fecha.toISOString().split('T')[0];
    this.formulario = this.fb.group({
      id: ['', Validators.required],
      name: ['Tarjeta Crédito', Validators.required],
      description: ['', Validators.required],
      logo: ['', Validators.required],
      date_release:['',Validators.required],
      date_revision:[fechaHoy, Validators.required]
    });
  }

  cerrarFormulario() {
    this.cancelar.emit();
  }

  enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const val = this.formulario.value;
    const data = {
      id: val.id,
      name: val.name,
      description: val.description,
      logo: val.logo,
      date_release: val.date_release,
      date_revision: val.date_release
    };

    this.loading = true;
    this.mensaje = '';
    this.http.post('http://localhost:3002/bp/products', data,{
      headers:{
         'Content-Type': 'application/json'
      }
    })
      .subscribe({
        next: res => {
          this.loading = false;
          this.mensaje = '¡Producto enviado exitosamente!';
          console.log('Enviado:', res);
        },
        error: err => {
          this.loading = false;
          this.mensaje = 'Error al enviar producto.';
          console.error('Error:', err);
        }
      });
  }
}
