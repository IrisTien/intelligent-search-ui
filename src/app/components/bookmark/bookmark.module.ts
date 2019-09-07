import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarkComponent } from './bookmark.component';



@NgModule({
  declarations: [BookmarkComponent],
  imports: [
    CommonModule
  ],
  exports: [BookmarkComponent]
})
export class BookmarkModule { }
