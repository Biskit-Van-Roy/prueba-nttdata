import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component';

@NgModule({

  imports: [BarraSuperiorComponent],
  exports: [BarraSuperiorComponent]
})
export class SharedModule { }
