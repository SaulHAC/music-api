import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-all-tags',
  templateUrl: './all-tags.component.html',
  styleUrls: ['./all-tags.component.css']
})
export class AllTagsComponent {

  constructor(public apiService: ApiService) { }

  allTags: any;
  colores = ['#8C67AC', '#158A08', '#2D46BA', '#BC5800', '#D84000', '#B02896', '#509BF6', '#438271', '#E9142A', '#BA1174', '#056951', '#8B1932', '#7D4B32', '#777777', '#4F374F', '#A56752'];

  ngOnInit() {
    this.getAllTags();
  }

  asignarColor() {
    for (let index = 0; index < this.allTags.length; index++) {
      const genero = this.allTags[index];
      const indiceAleatorio = Math.floor(Math.random() * this.colores.length);
      genero.backgroundColor = this.colores[indiceAleatorio];
    }
  }

  getAllTags() {
    console.log('llega al getAllTags');

    this.apiService.getAllTags().subscribe(data => {
      this.allTags = data.toptags.tag;
      console.log('all tags:', this.allTags);

      this.asignarColor();
    })
  }
}
