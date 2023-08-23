import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  unsafedUrl: string = '';
  safeUrl: SafeResourceUrl = '';
  artistName: string = '';
  songName: string = '';
  youtubeImage: string = '';

  videoState: boolean = true;
  videoMute: boolean = false;

  //Artistas, albumes y canciones
  private apiKey = '8f102e2d6e45e028c2ef5650ff82586e'; // Reemplaza con tu clave de API de Last.fm
  private apiUrl = 'http://ws.audioscrobbler.com/2.0/';
  private apiToSearch = 'https://ws.audioscrobbler.com/2.0/?method=track.search&api_key=8f102e2d6e45e028c2ef5650ff82586e&format=json&track=';
  private apiToTags = 'https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&api_key=8f102e2d6e45e028c2ef5650ff82586e&format=json&tag=';
  private apiToAllTags = 'http://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=8f102e2d6e45e028c2ef5650ff82586e&format=json';

  //generos
  private urlGenres = 'https://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=8f102e2d6e45e028c2ef5650ff82586e&format=json';

  //Imagenes
  private customSearchJson = 'https://www.googleapis.com/customsearch/v1?key=';
  private key1 = 'AIzaSyCgYYeGtLe2AKluJxbCJ8cOPquKjk3dzy4';
  private motor1 = '146bfb20aa7bc4662';

  private key2 = 'AIzaSyAVadvuDaGGLBT17TlXjZxw8qu5ic0wriM'
  private motor2 = '75817584198094226';

  //Canciones desde youtube

  //API 1: AIzaSyCx0FBjxDQG8BO8Uta8MhtkgniNDJgar8Y
  //API 2: AIzaSyDF1YFR-mDI81s2WKTJN7cnMFOdVtw4hLI
  private urlYoutube = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&key='; //AIzaSyDF1YFR-mDI81s2WKTJN7cnMFOdVtw4hLI&type=video&q=';
  private youtubeApi1 = 'AIzaSyDF1YFR-mDI81s2WKTJN7cnMFOdVtw4hLI';
  private youtubeApi2 = 'AIzaSyCx0FBjxDQG8BO8Uta8MhtkgniNDJgar8Y';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  public getGeneros(): Observable<any> {
    //TOP ARTISTS
    const url = `${this.urlGenres}`;
    return this.http.get<any>(url);
  }

  public getAllTags(): Observable<any> {
    //TOP ARTISTS
    const url = `${this.apiToAllTags}`;
    return this.http.get<any>(url);
  }

  public getData(): Observable<any> {
    //TOP ARTISTS
    const method = 'chart.gettopartists';
    const url = `${this.apiUrl}?method=${method}&api_key=${this.apiKey}&format=json`;
    return this.http.get<any>(url);
  }

  public getTagSongs(tag: string): Observable<any> {
    const url = `${this.apiToTags}${tag}`;
    return this.http.get<any>(url);
  }

  public getArtistImage(data: any[]): Observable<any> {

    console.log('llegó data', data);

    const observables: Observable<any>[] = [];

    for (let index = 0; index < 4; index++) {
      let artist = data[index];
      let url = `${this.customSearchJson}${this.key1}&cx=${this.motor1}&searchType=image&q=${artist.name}`;

      const observable = this.http.get<any>(url).pipe(
        catchError(error => {
          console.error('Error in API request:', error);
          // Aquí cambias a las claves de respaldo
          url = `${this.customSearchJson}${this.key2}&cx=${this.motor2}&searchType=image&q=${artist.name}`;
          return this.http.get<any>(url); // Retornar el observable corregido
        })
      );

      observables.push(observable);
    }

    return forkJoin(observables);
  }

  public getAlbums(artist: string): Observable<any> {
    //TOP ALBUMS
    const method = 'artist.gettopalbums';
    const url = `${this.apiUrl}?method=${method}&artist=${artist}&api_key=${this.apiKey}&format=json`;
    return this.http.get<any>(url);
  }

  public getSongs(artistName: string, albumName: string): Observable<any> {
    //TOP SONGS
    const method = 'album.getinfo';
    const url = `${this.apiUrl}?method=${method}&artist=${encodeURIComponent(artistName)}&album=${encodeURIComponent(albumName)}&api_key=${this.apiKey}&format=json`;
    return this.http.get<any>(url);
  }

  public cambiarUrl(artisName: string, songName: string): Observable<any> {

    this.videoState = true;
    this.videoMute = false;
    let keySearch = songName + artisName;
    let urlYt = `${this.urlYoutube}${this.youtubeApi1}&type=video&q=${keySearch}`;

    console.log('ponlo:', urlYt);


    const obeservable = this.http.get<any>(urlYt).pipe(
      catchError(error => {
        console.error('Error in API request:', error);
        // Aquí cambias a las claves de respaldo
        urlYt = `${this.urlYoutube}${this.youtubeApi2}&type=video&q=${keySearch}`;
        return this.http.get<any>(urlYt); // Retornar el observable corregido
      })
    );
    return obeservable;
  }

  public playSong(songToPlay: any): Observable<string> {
    let keySearch = songToPlay.album.artist + songToPlay.album.name;
    const urlYt = `${this.urlYoutube}${keySearch}`;

    return this.http.get<any>(urlYt);
  }

  // Funciones
  obtenerValor(): string {
    return this.unsafedUrl;
  }

  cambiarValor(nuevoValor: any, artisName: string, songName: string): void {
    this.unsafedUrl = nuevoValor;
    this.artistName = artisName;
    this.songName = songName;

    // Sanitiza el valor y asigna a la variable de URL segura
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.unsafedUrl);
  }

  public searchSongs(query?: string): Observable<any> {
    //TOP SONGS
    const url = `${this.apiToSearch}${query}`;
    return this.http.get<any>(url);
  }
}
