import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, forkJoin } from 'rxjs';

import { HeroLocation } from '@models/location.interface';
import { Episode } from '@models/episode.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private http: HttpClient) {}

  public getHeroLocation(url: string): Observable<HeroLocation> {
    return this.http.get<HeroLocation>(url);
  }

  public getHeroEpisodes(urls: string[]): Observable<Episode[]> {
    const req = urls.map(url => this.http.get<Episode>(url));

    return forkJoin<Episode[]>(req);
  }
}
