import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedSongsComponent } from './searched-songs.component';

describe('SearchedSongsComponent', () => {
  let component: SearchedSongsComponent;
  let fixture: ComponentFixture<SearchedSongsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchedSongsComponent]
    });
    fixture = TestBed.createComponent(SearchedSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
