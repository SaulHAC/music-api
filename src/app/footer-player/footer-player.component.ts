import { Component, AfterViewInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-footer-player',
  templateUrl: './footer-player.component.html',
  styleUrls: ['./footer-player.component.css']
})
export class FooterPlayerComponent {

  trendingHit: any;
  artistName: any;
  albumName: any;

  data: any;

  // videoState: boolean = true;
  // videoMute: boolean = false;

  constructor(public apiService: ApiService) { }

  test() {
    console.log("funciona");

  }

  //PROCESO DE ENVIAR LA CANCION Y CAMBIAR VARIABLE DEL SERVICIO
  obtenerCancion() {
    this.apiService.cambiarUrl(this.trendingHit.artist['name'], this.trendingHit.name).subscribe(data => {
      let urlCancion = `https://www.youtube.com/embed/${data.items[0]['id'].videoId}?autoplay=1&enablejsapi=1`;
      console.log('ANTES de cambiar valor global', urlCancion)
      this.cambiarUrlGlobal(urlCancion);
    })
  }

  cambiarUrlGlobal(urlCancion: string) {
    this.apiService.cambiarValor(urlCancion, this.trendingHit.artist['name'], this.trendingHit.name);
    console.log('DESPUES de cambiar valor global', urlCancion)
  }
  //FIN DEL PROCESO

  reproducirCancion() {
    this.apiService.videoState = true;
    const listaFrames = document.getElementsByTagName("iframe");

    for (var index = 0; index < listaFrames.length; index++) {
      const iframe = listaFrames[index];
      const iframeWindow = iframe.contentWindow as Window;

      if (iframeWindow && iframeWindow.postMessage) {
        iframeWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
    }
  }

  pausarCancion() {
    this.apiService.videoState = false;
    const listaFrames = document.getElementsByTagName("iframe");

    for (var index = 0; index < listaFrames.length; index++) {
      const iframe = listaFrames[index];
      const iframeWindow = iframe.contentWindow as Window;

      if (iframeWindow && iframeWindow.postMessage) {
        iframeWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    }
  }

  silenciarVideo() {
    this.apiService.videoMute = true;
    const listaFrames = document.getElementsByTagName('iframe');

    for (let index = 0; index < listaFrames.length; index++) {
      const iframe = listaFrames[index];
      const iframeWindow = iframe.contentWindow as Window;

      if (iframeWindow && iframeWindow.postMessage) {
        iframeWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
      }
    }
  }

  restaurarSonido() {
    this.apiService.videoMute = false;
    const listaFrames = document.getElementsByTagName('iframe');

    for (let index = 0; index < listaFrames.length; index++) {
      const iframe = listaFrames[index];
      const iframeWindow = iframe.contentWindow as Window;

      if (iframeWindow && iframeWindow.postMessage) {
        iframeWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
      }
    }
  }

  //Tener una canción en el player
  ngOnInit(): void {
    this.llenarData();
  }

  llenarData() {
    this.apiService.getData().subscribe(data => {
      this.data = data;
      const artistas = this.data.artists.artist;
      this.data = artistas[0];

      this.artistName = this.data.name;

      console.log('que es esto?', this.artistName);

      this.getTopAlbum(this.artistName);
    })
  }

  getTopAlbum(artistName: string) {
    this.apiService.getAlbums(artistName).subscribe(data => {
      let album = data.topalbums.album[0];
      this.albumName = album.name;

      console.log('obtener albumes', this.artistName, this.albumName);
      this.getTopSong();
    })
  }

  getTopSong() {
    this.apiService.getSongs(this.artistName, this.albumName).subscribe(data => {
      this.trendingHit = data.album.tracks.track[0];
      console.log('Cancion del momento', this.trendingHit);
    })
  }
}
