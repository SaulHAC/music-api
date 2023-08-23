import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SongsComponent } from './songs/songs.component';
import { TopAlbumesComponent } from './top-albumes/top-albumes.component';
import { HeaderComponent } from './header/header.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { SearchedSongsComponent } from './searched-songs/searched-songs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterPlayerComponent } from './footer-player/footer-player.component';
import { GenerosComponent } from './generos/generos.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AboutComponent } from './about/about.component';
import { TagSongsComponent } from './tag-songs/tag-songs.component';
import { AllTagsComponent } from './all-tags/all-tags.component';
import { SongPlayingComponent } from './song-playing/song-playing.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SongsComponent,
    TopAlbumesComponent,
    HeaderComponent,
    MusicPlayerComponent,
    SearchedSongsComponent,
    FooterPlayerComponent,
    GenerosComponent,
    FavoritesComponent,
    AboutComponent,
    TagSongsComponent,
    AllTagsComponent,
    SongPlayingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
