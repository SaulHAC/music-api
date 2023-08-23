import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top-albumes',
  templateUrl: './top-albumes.component.html',
  styleUrls: ['./top-albumes.component.css']
})
export class TopAlbumesComponent {

  data: any;
  artistName: string = '';
  albumsImages: string = ''

  constructor(public apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.artistName = params['artistName']);
    this.getAlbums(this.artistName);
  }

  getAlbums(artist: string) {
    this.apiService.getAlbums(artist).subscribe(data => {
      this.data = data;
      const albums = this.data.topalbums.album;
      this.data = albums;

      this.albumsImages = albums.image;
      console.log('es esto?', this.data);
    })
  }
}
