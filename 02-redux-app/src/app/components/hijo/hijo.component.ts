import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hijo',
  standalone: false,
  templateUrl: './hijo.component.html'
})
export class HijoComponent implements OnInit {
  @Input() contador: number = 10;
  @Output() cambioContador = new EventEmitter<number>()

  constructor(){}

  ngOnInit(): void {
    
  }

  multiplicar(){
    this.contador *= 2
    this.cambioContador.emit(this.contador)
  }

  dividir(){
    this.contador = this.contador / 2
    this.cambioContador.emit(this.contador)
  }
  
  updateContador(newContador: number ){
    this.contador = newContador
    this.cambioContador.emit(this.contador)
  }
}
