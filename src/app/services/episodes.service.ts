import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, forkJoin } from 'rxjs';

import { Hero } from '@models/hero.interface';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  constructor(private http: HttpClient) {}

  public getEpisodeHeroes(urls: string[]): Observable<Hero[]> {
    const req = urls.slice(0, 5).map(url => this.http.get<Hero>(url));

    return forkJoin<Hero[]>(req);
  }
}
