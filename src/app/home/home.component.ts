import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any;
  arrayImageArtist: any[] = [];

  //Song most popular
  trendingHit: any;
  nameSongTrending: string = '';
  nameArtistTrending: string = '';
  nameAlbumTrending: string = '';

  //reproducir video
  sanitizedUrl: any;

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.llenarData();
  }

  //PROCESO DE ENVIAR LA CANCION Y CAMBIAR VARIABLE DEL SERVICIO
  obtenerCancion() {
    console.log('datos desde home hacia el player', this.nameArtistTrending, this.nameSongTrending);
    this.apiService.artistName = this.nameArtistTrending;
    this.apiService.songName = this.nameSongTrending;


    this.apiService.cambiarUrl(this.trendingHit.album.artist, this.trendingHit.album.tracks.track[0]['name']).subscribe(data => {
      let urlCancion = `https://www.youtube.com/embed/${data.items[0]['id'].videoId}?autoplay=1&enablejsapi=1`;
      console.log('ANTES de cambiar valor global', urlCancion)
      this.cambiarUrlGlobal(urlCancion);
    })
  }

  cambiarUrlGlobal(urlCancion: string) {
    this.apiService.cambiarValor(urlCancion, this.nameArtistTrending, this.nameSongTrending);
    console.log('DESPUES de cambiar valor global', urlCancion)
  }
  //FIN DEL PROCESO

  llenarData() {
    this.apiService.getData().subscribe(data => {
      this.data = data;
      //const canciones = this.data.results.trackmatches.track;
      const artistas = this.data.artists.artist;
      this.data = artistas.slice(0, 4);

      this.trendingHit = this.data[0].name;
      console.log('Artista desde home: ', this.trendingHit);

      this.getTopAlbum(this.trendingHit);

      this.artistImages();
      console.log('home data:', this.data);
    })
  }

  getTopAlbum(artistName: string) {
    this.apiService.getAlbums(artistName).subscribe(data => {
      let album = data.topalbums.album[0];
      this.trendingHit = album;
      console.log('album top desde home: ', album);

      this.getTopSong();
    })
  }

  getTopSong() {
    let nombreArtista = this.trendingHit.artist['name'];
    let nombreAlbum = this.trendingHit.name;

    console.log('datos a INCRUSTAR desde home', nombreArtista, nombreAlbum);


    this.apiService.getSongs(nombreArtista, nombreAlbum).subscribe(data => {
      this.trendingHit = data;
      console.log('Cancion obtenida desde home', this.trendingHit);

      this.nameSongTrending = this.trendingHit.album.tracks.track[0].name;
      this.nameArtistTrending = this.trendingHit.album.artist;
      this.nameAlbumTrending = this.trendingHit.album.name;

      console.log('Mas popular desde home: ', this.trendingHit.album.tracks.track[0].name);
      console.log('Valor de trending hit: ', this.trendingHit);
    })
  }

  artistImages() {
    console.log('antes de enviar data', this.data);
    this.apiService.getArtistImage(this.data).subscribe(data => {
      for (let index = 0; index < data.length; index++) {
        const urlImage = data[index]['items'][2].link;
        this.arrayImageArtist.push(urlImage);
      }
      console.log('custom search json', this.arrayImageArtist);
    })
  }
}
