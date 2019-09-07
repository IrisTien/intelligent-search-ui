import { Injectable } from '@angular/core';
import { APP } from 'src/app/common/app.constant';
import { toArray } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor() { }

  generateRelationships(queryString) {
    let _start = 0;
    let _end = 0;
    let i = -1;

    const _links = [];

    const _objectStr = queryString.substring(queryString.indexOf('return ') + 7);
    const _objectArr = _objectStr.split(/[\s,;]+/).filter(item => item !== "");

    while (_start != -1) {
      _start = queryString.indexOf('[:', i + 1);
      _end = queryString.indexOf(']', i + 1);

      if (_start !== -1 && _end !== -1) {
        const _relation = queryString.substring(_start + 2, _end);

        const _link: any = {};
        _link.relationship = APP.RELATION_MAP[_relation].RELATION;

        _link.from = _objectArr.indexOf(APP.RELATION_MAP[_relation].FROM);
        _link.to = _objectArr.indexOf(APP.RELATION_MAP[_relation].TO);

        _links.push(_link);

        _start += _relation.length + 3;
      }

      i = _start;
    }

    return _links;
  }
}
