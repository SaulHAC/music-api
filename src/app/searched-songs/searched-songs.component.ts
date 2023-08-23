import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-searched-songs',
  templateUrl: './searched-songs.component.html',
  styleUrls: ['./searched-songs.component.css']
})
export class SearchedSongsComponent {

  query_search: string = '';
  canciones_encontradas: any;
  hit: any;

  constructor(private route: ActivatedRoute, public apiService: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.query_search = params['query']
    });

    this.buscar();
  }

  buscar() {
    this.apiService.searchSongs(this.query_search).subscribe(data => {
      this.canciones_encontradas = data.results.trackmatches.track;
      console.log('canciones encontradas:', this.canciones_encontradas)
    })
    console.log(this.query_search);
  }

  obtenerCancion(i: any) {
    this.hit = this.canciones_encontradas[i];
    console.log('Canción buscada:', this.hit);

    let artisName = this.hit.artist;
    artisName = artisName.replace(/\s/g, '+');
    artisName = artisName.replace(/[\u2070-\u209F\u00B2-\u207F0-9]/g, '');

    let songName = this.hit.name;
    songName = songName.replace(/\s/g, '+');
    songName = songName.replace(/[\u2070-\u209F\u00B2-\u207F0-9]/g, '');

    this.apiService.cambiarUrl(artisName, songName).subscribe(data => {

      //IMAGEN DE LA PORTADA DE LA CANCIÓN
      console.log('datos de la canción: ', data);

      this.apiService.youtubeImage = data.items[0]['snippet'].thumbnails.high.url;

      let urlCancion = `https://www.youtube.com/embed/${data.items[0]['id'].videoId}?autoplay=1&enablejsapi=1`;
      console.log('ANTES de cambiar valor global', urlCancion)
      this.cambiarUrlGlobal(urlCancion);
    })
  }

  cambiarUrlGlobal(urlCancion: string) {
    this.apiService.cambiarValor(urlCancion, this.hit.artist, this.hit.name);
    console.log('DESPUES de cambiar valor global', urlCancion)
  }
}
