import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent {
  data: any;
  artistName: string = '';
  songName: string = '';
  albumName: string = '';

  hit: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.artistName = params['artistName'];
      this.albumName = params['album']
    });

    this.getSongs(this.artistName, this.albumName);
  }

  getSongs(artistName: string, albumName: string) {
    this.apiService.getSongs(artistName, albumName).subscribe(data => {
      this.data = data;
      //const canciones = this.data.results.trackmatches.track;
      //const canciones = this.data.artists.artist;
      const canciones = this.data.album.tracks.track;
      this.data = canciones;
      console.log(this.data);
    })
  }

  obtenerCancion(i: any) {
    this.hit = this.data[i];
    this.songName = this.hit.name;
    console.log('Canción:', this.hit);

    let artisName = this.hit.artist['name'];
    artisName = artisName.replace(/\s/g, '+');
    artisName = artisName.replace(/[\u2070-\u209F\u00B2-\u207F0-9]/g, '');

    let songName = this.hit.name;
    songName = songName.replace(/\s/g, '+');
    songName = songName.replace(/[\u2070-\u209F\u00B2-\u207F0-9]/g, '');

    this.apiService.cambiarUrl(artisName, songName).subscribe(data => {

      this.apiService.youtubeImage = data.items[0]['snippet'].thumbnails.high.url;

      let urlCancion = `https://www.youtube.com/embed/${data.items[0]['id'].videoId}?autoplay=1&enablejsapi=1`;
      console.log('ANTES de cambiar valor global', urlCancion)
      this.cambiarUrlGlobal(urlCancion);
    })
  }

  cambiarUrlGlobal(urlCancion: string) {
    this.apiService.cambiarValor(urlCancion, this.artistName, this.songName);
    console.log('DESPUES de cambiar valor global', urlCancion)
  }
}
