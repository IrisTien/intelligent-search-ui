import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { APP } from './common/app.constant';
import { GraphComponent } from './components/graph/graph.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('graph', {static: false})
  graph: GraphComponent;

  user = 'ysan san';
  bookmarkRoute = 'bookmark';

  needClear = false;
  searchText:string;
  defaultSearchText = APP.QUERY.TECHFAIR_IDEA;
  isSearchBarFocused = false;

  // searchEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onSearchBarChange(text) {
    this.needClear = text.length > 3;
    this.searchText = text;
  }

  onFocusOut() {
    setTimeout(() => {
      this.isSearchBarFocused=false
    }, 500);
  }

  clearText() {
    this.searchText = '';
  }

  search() {
    // this.searchEvent.emit(this.searchText);
    if (!this.searchText) {
      this.graph.query(this.defaultSearchText);
    } else {
      this.graph.query(this.searchText);
    }
  }

  onSearchTextChange(text) {
    this.searchText = text;
  }
}
