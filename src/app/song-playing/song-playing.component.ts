import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-song-playing',
  templateUrl: './song-playing.component.html',
  styleUrls: ['./song-playing.component.css']
})
export class SongPlayingComponent {

  constructor(public apiService: ApiService) { }

  youtubeImage: string = this.apiService.youtubeImage;
  artistName: string = this.apiService.artistName;
  songName: string = this.apiService.songName;
}
