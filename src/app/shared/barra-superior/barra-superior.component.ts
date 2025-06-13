import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {
  @Input() titulo: string = 'BANCO';

  constructor() { }

  ngOnInit() { }
}
