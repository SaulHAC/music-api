import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSongsComponent } from './tag-songs.component';

describe('TagSongsComponent', () => {
  let component: TagSongsComponent;
  let fixture: ComponentFixture<TagSongsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagSongsComponent]
    });
    fixture = TestBed.createComponent(TagSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
