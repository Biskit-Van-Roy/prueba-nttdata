import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'barra-superior',
  templateUrl: './barra-superior.component.html'
})

export class BarraSuperiorComponent implements OnInit {
  @Input() titulo: string = 'BANCO'
  constructor() { }

  ngOnInit() { }
}
