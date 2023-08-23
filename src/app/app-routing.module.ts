import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SongsComponent } from './songs/songs.component';
import { TopAlbumesComponent } from './top-albumes/top-albumes.component';
import { SearchedSongsComponent } from './searched-songs/searched-songs.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AboutComponent } from './about/about.component';
import { TagSongsComponent } from './tag-songs/tag-songs.component';
import { AllTagsComponent } from './all-tags/all-tags.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':artistName/top_albumes',
    component: TopAlbumesComponent
  },
  {
    path: ':artistName/top_albumes/:album/songs',
    component: SongsComponent,
  },
  {
    path: 'search/:query',
    component: SearchedSongsComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: ':gender/top_songs',
    component: TagSongsComponent,
  },
  {
    path: 'all_tags',
    component: AllTagsComponent,
  },
  {
    path: 'all_tags/:gender/top_songs',
    component: TagSongsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
