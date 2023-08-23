import { Component, Input } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent {

  constructor(public apiService: ApiService) { }

  // safeUrl: any;
  // valorObtenido: string = '';

  // obtenerValorDeVariable(): string {
  //   return this.apiService.obtenerValor();
  // }

  // sanitizarUrl() {
  //   let unSafe = this.obtenerValorDeVariable();
  //   this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unSafe);
  // }

  ngOnInit(): void {
    // this.obtenerValorDeVariable();
    // this.sanitizarUrl();
    // console.log('url desde el music player', this.safeUrl);
  }
}
