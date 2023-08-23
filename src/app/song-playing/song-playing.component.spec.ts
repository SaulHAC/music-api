import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongPlayingComponent } from './song-playing.component';

describe('SongPlayingComponent', () => {
  let component: SongPlayingComponent;
  let fixture: ComponentFixture<SongPlayingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SongPlayingComponent]
    });
    fixture = TestBed.createComponent(SongPlayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
