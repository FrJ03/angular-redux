import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nieto',
  standalone: false,
  templateUrl: './nieto.component.html'
})
export class NietoComponent implements OnInit {
  @Input() contador: number = 10;
  @Output() cambioContador = new EventEmitter<number>()
  
  constructor(){}

  ngOnInit(): void {
    
  }

  reset() {
    this.contador = 0
    this.cambioContador.emit(this.contador)
  }
}
