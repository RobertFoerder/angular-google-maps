import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AgmSearchBox } from '../../directives/search-box';

@Injectable()
export class SearchBoxManager {

  constructor(private _zone: NgZone) {}

  /** @internal */
  createEventObservable<T>(searchBox: AgmSearchBox): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      searchBox.getSearchBoxEl().addListener('places_changed', (e: T) => {
        this._zone.run(() => observer.next(e));
      });
    });
  }
}
