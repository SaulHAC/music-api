import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAlbumesComponent } from './top-albumes.component';

describe('TopAlbumesComponent', () => {
  let component: TopAlbumesComponent;
  let fixture: ComponentFixture<TopAlbumesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopAlbumesComponent]
    });
    fixture = TestBed.createComponent(TopAlbumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
