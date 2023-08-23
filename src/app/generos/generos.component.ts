import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.css']
})
export class GenerosComponent {
  generos: any;
  colores = ['#8C67AC', '#158A08', '#2D46BA', '#BC5800', '#D84000', '#B02896', '#509BF6', '#438271', '#E9142A', '#BA1174', '#056951', '#8B1932', '#7D4B32', '#777777', '#4F374F', '#A56752'];

  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.obtenerGeneros();
  }

  asignarColor() {
    for (let index = 0; index < this.generos.length; index++) {
      const genero = this.generos[index];
      const indiceAleatorio = Math.floor(Math.random() * this.colores.length);
      genero.backgroundColor = this.colores[indiceAleatorio];
    }
  }

  obtenerGeneros() {
    this.apiService.getGeneros().subscribe(data => {
      this.generos = data.toptags.tag;
      this.generos = this.generos.slice(0, 8);
      console.log('generos', this.generos);

      this.asignarColor();
    })
  }
}
