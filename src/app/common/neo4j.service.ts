import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AngularNeo4jService } from 'angular-neo4j';
import { APP } from './app.constant';

@Injectable({
  providedIn: 'root'
})
export class Neo4jService {
  private neo4jconnectPromise;
  constructor(
    private http: HttpClient,
    private neo4j: AngularNeo4jService
  ) {
    this.neo4jconnectPromise = this.neo4j.connect(APP.NEO4J.URL, APP.NEO4J.USER, APP.NEO4J.PASSWORD, true)
    .then(driver => {
      if (driver) {
        console.log(`Successfully connected to ${APP.NEO4J.URL}`);
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  findQueryString(text) {
    return this.http.get(`http://10.117.42.30:5000/`, {
      params: new HttpParams()
        .set('query', encodeURI(text))
    });
  }

  query(query, params?) {
    return this.neo4jconnectPromise
    .then(() => {
      return this.neo4j.run(query, params);
    })
  }

  close() {
    this.neo4j.disconnect();
  }
}
