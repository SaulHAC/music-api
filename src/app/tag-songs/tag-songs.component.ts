import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tag-songs',
  templateUrl: './tag-songs.component.html',
  styleUrls: ['./tag-songs.component.css']
})
export class TagSongsComponent {

  constructor(public apiService: ApiService, private route: ActivatedRoute) { }

  tagSongs: any;
  tag: string = '';
  hit: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => this.tag = params['gender']);
    this.getTagSongs(this.tag);
  }

  getTagSongs(tag: string) {
    this.apiService.getTagSongs(tag).subscribe(data => {
      this.tagSongs = data.tracks.track;
      console.log(tag + ':', this.tagSongs);

    })
  }

  obtenerCancion(i: any) {
    this.hit = this.tagSongs[i];
    console.log('Canción con tag:', this.hit);

    let artisName = this.hit.artist['name'];
    artisName = artisName.replace(/\s/g, '+');
    artisName = artisName.replace(/[\u2070-\u209F\u00B2-\u207F0-9]/g, '');

    let songName = this.hit.name;
    songName = songName.replace(/\s/g, '+');
    songName = songName.replace(/[\u2070-\u209F\u00B2-\u207F0-9]/g, '');

    this.apiService.cambiarUrl(artisName, songName).subscribe(data => {

      this.apiService.youtubeImage = data.items[0]['snippet'].thumbnails.high.url;
      //console.log(data);
      let urlCancion = `https://www.youtube.com/embed/${data.items[0]['id'].videoId}?autoplay=1&enablejsapi=1`;
      console.log('ANTES de cambiar valor global', urlCancion)
      this.cambiarUrlGlobal(urlCancion);
    })
  }

  cambiarUrlGlobal(urlCancion: string) {
    this.apiService.cambiarValor(urlCancion, this.hit.artist['name'], this.hit.name);
    console.log('DESPUES de cambiar valor global', urlCancion)
  }
}
