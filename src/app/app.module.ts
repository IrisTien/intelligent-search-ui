import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AngularNeo4jModule } from 'angular-neo4j';
import { BookmarkModule } from './components/bookmark/bookmark.module';
import { CatalogModule } from './components/catalog/catalog.module';
import { GraphModule } from './components/graph/graph.module';
import { HttpClientModule } from '@angular/common/http';
import { WindowRef } from './window-ref';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    AngularNeo4jModule,
    BrowserAnimationsModule,
    BookmarkModule,
    CatalogModule,
    GraphModule
  ],
  providers: [
    WindowRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
